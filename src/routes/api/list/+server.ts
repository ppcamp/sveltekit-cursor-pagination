import { handle } from '$server/handler';
import type { GotApiItem, GotApiItemList } from '$types/list';

// SEE https://github.com/public-apis/public-apis
const GOT_API = 'https://api.gameofthronesquotes.xyz/v1/characters';

export const GET = handle(async (event) => {
	const pageToken = event.url.searchParams.get('pageToken') ?? '';
	const pageSize = +(event.url.searchParams.get('pageSize') ?? '5');

	const data = await simulateSQLapi(event.fetch, pageToken, pageSize);

	return data satisfies GotApiItemList;
});

const encode = (v: string) => Buffer.from(v, 'utf8').toString('base64');
const decode = (v: string) => Buffer.from(v, 'base64').toString('utf8');

const simulateSQLapi = async (fetch: Function, pageToken: string, pageSize: number) => {
	const res = await fetch(GOT_API);
	const data = (await res.json()) as GotApiItem[];

	const decodedPageToken = decode(pageToken);

	let pageTokenNumber = -1;
	let reachEndCursor = false;
	pageTokenNumber = data.findIndex((v) => v.slug == decodedPageToken);

	if (pageTokenNumber == -1) {
		if (decodedPageToken != '') {
			return { data: [], nextPageToken: '' };
		}
		pageTokenNumber = 0;
	}

	let toPageSize = pageSize + pageTokenNumber;
	if (toPageSize <= 0 || toPageSize >= data.length) {
		toPageSize = data.length;
		reachEndCursor = true;
	}

	const slice = data.slice(pageTokenNumber, toPageSize);
	// pass a cursor to a pagination that doesn't exist, telling that you finish the pagination
	const nextPageToken = !reachEndCursor ? data[toPageSize].slug : 'EOC';

	return { data: slice, nextPageToken: encode(nextPageToken) };
};
