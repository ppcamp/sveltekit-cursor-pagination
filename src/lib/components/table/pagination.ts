import type { ListResponse } from '$types/list';
import { derived, get, writable } from 'svelte/store';

type Pagination = {
	pageSize?: number;
	pageToken?: string;
};

const createPagination = <Type>(
	fn: (p: Pagination) => Promise<ListResponse<Type>>,
	init?: { pageSize: number }
) => {
	const rows = writable<Type>();
	const size = writable<number>(init?.pageSize ?? 10);

	const current = writable<string>('');
	const tokens = writable<string[]>([]);

	// const token = derived(tokens, (values) => (!values.length ? '' : values[values.length - 1]), '');
	const nextToken = derived(
		tokens,
		(values) => (!values.length ? '' : values[values.length - 1]),
		''
	);

	const fetch = async () => {
		const resp = await fn({ pageSize: get(size), pageToken: get(current) });
		rows.set(resp.data);
		tokens.update((v) => [...v, resp.nextPageToken]);
	};

	// const previous = async () => {
	// 	const prev = get(tokens);
	// 	current.set(prev[prev.length - 1]);
	// };

	const next = async () => {
		const prev = get(tokens);
		current.set(prev[prev.length - 1]);
	};

	return { size, fetch, rows };
};
