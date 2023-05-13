import { handle } from '$server/handler';
import type { GotApiItem, GotApiItemList } from '$types/list';
import crypto from 'crypto';

// SEE https://github.com/public-apis/public-apis
const GOT_API = 'https://api.gameofthronesquotes.xyz/v1/characters';

export const GET = handle(async (event) => {
	const pageToken = event.url.searchParams.get('pageToken') ?? '';
	const pageSize = +(event.url.searchParams.get('pageSize') ?? '5');

	const data = await simulateSQLapi(event.fetch, pageToken, pageSize);

	return data satisfies GotApiItemList;
});

const encrypt = (v: string) => crypto.createHash('md5').update(v).digest('hex');

const simulateSQLapi = async (fetch: Function, pageToken: string, pageSize: number) => {
	const res = await fetch(GOT_API);
	const data = (await res.json()) as GotApiItem[];

	let pageTokenNumber = -1;
	let reachEndCursor = false;
	pageTokenNumber = data.findIndex((v) => encrypt(v.slug) == pageToken);

	if (pageTokenNumber == -1) {
		if (pageToken != '') {
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
	const nextPageToken = !reachEndCursor ? slice[slice.length - 1].slug : 'EOC';

	return { data: slice, nextPageToken: encrypt(nextPageToken) };
};
