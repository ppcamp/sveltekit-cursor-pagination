import { derived, get, writable, type Readable, readable } from 'svelte/store';
import type { FetchFunc } from './types';

interface Paginated<T> {
	pageSize: Readable<number>;
	rows: Readable<Array<T>>;
	fetchers: {
		next: () => Promise<void>;
		back: () => Promise<void>;
		first: () => Promise<void>;
		last: () => Promise<void>;
		fetch: () => Promise<void>;
	};
	can: {
		next: Readable<boolean>;
		back: Readable<boolean>;
		first: Readable<boolean>;
		last: Readable<boolean>;
	};
	cursors: {
		begin: Readable<string>;
		end: Readable<string>;
		current: Readable<string>;
		next: Readable<string>;
	};
}

type InitPageSize = { pageSize: number };
type InitAll<Type> = InitPageSize & {
	rows: Array<Type>;
	tokens: Array<Type>;
	currentCursor: string;
	nextCursor: string;
	canFetch: boolean;
};

/**
 * Method used to create a pagination object
 *
 * @param fn Function used to fetch elements
 * @param init Base value
 * @returns pagination elements with all cursor logic embed
 */
export function createPagination<Type>(fn: FetchFunc<Type>): Paginated<Type>;
export function createPagination<Type>(fn: FetchFunc<Type>, init: InitAll<Type>): Paginated<Type>;
export function createPagination<Type>(fn: FetchFunc<Type>, init: InitPageSize): Paginated<Type>;
export function createPagination<Type>(
	fn: FetchFunc<Type>,
	init?: InitAll<Type> | InitPageSize
): Paginated<Type> {
	let _init = {
		canFetch: true,
		currentCursor: '',
		nextCursor: '',
		pageSize: 10,
		rows: [],
		tokens: []
	} satisfies InitAll<Type>;

	if (init) {
		// @ts-ignore: initpagesize shares the same variable with initall
		_init = { ..._init, ...init };
	}

	//#region stores
	const rows = writable<Array<Type>>(_init.rows);
	const pageSize = writable<number>(_init.pageSize);

	const tokens = writable<string[]>(_init.tokens);
	const currentCursor = writable<string>(_init.currentCursor);
	const _canFetch = writable<boolean>(_init.canFetch);
	const nextCursor = writable<string>(_init.nextCursor);

	//#endregion

	//#region subs/derived
	const endCursor = derived(
		[tokens, _canFetch],
		([values, can]) => (!values.length || can ? '' : values[values.length - 1]),
		''
	);

	const beginCursor = readable(''); // the first will always be a blank
	const canNext = derived([endCursor, currentCursor], ([e, c]) => c != e || !e.length);
	const canBack = derived(currentCursor, (c) => c != get(beginCursor));
	const canLast = derived([endCursor, currentCursor], ([e, c]) => e != '' && c != e);

	// whenever pageSize changes, we need to drop old (future) tokens
	// example, imagine that we have 7 pages, we already fetch them all and have all tokens,
	// but we are currently in 5th page, and we change the pageSize. Thus, all tokens from that point to further aren't valid
	// cause they won't reflect the data correctly
	pageSize.subscribe((v) => {
		const f = get(tokens).findIndex((v) => v == get(currentCursor));
		if (f >= 0) {
			tokens.update((v) => v.slice(0, f)); // drop old tokens, since they aren't valid due to pagination changes
			_canFetch.set(true); // reset the cursor to blank again;
		}
	});

	//#endregion

	//#region methods
	const _preload = async () => {
		// prefetch to see if there's more
		const resp = await fn({ pageSize: get(pageSize), pageToken: get(nextCursor) });
		if (!resp.data.length) _canFetch.set(false); // reached the end of cursor
	};

	const _cursorAt = () => {
		const t = get(tokens);
		const f = t.findIndex((v) => v == get(currentCursor));
		return f;
	};

	const fetch = async () => {
		let resp = await fn({ pageSize: get(pageSize), pageToken: get(currentCursor) });
		rows.set(resp.data);
		nextCursor.set(resp.nextPageToken);

		_preload();
	};

	const next = async () => {
		currentCursor.set(get(nextCursor));
		const cursorAt = _cursorAt();
		if (cursorAt == -1) tokens.update((v) => [...v, get(currentCursor)]);
		await fetch();
	};

	const back = async () => {
		const at = _cursorAt();
		if (at >= 0) {
			if (at == 0) currentCursor.set('');
			else currentCursor.set(get(tokens)[at - 1]);
		}
		await fetch();
	};

	const first = async () => {
		currentCursor.set('');
		await fetch();
	};

	const last = async () => {
		if (get(canLast)) currentCursor.set(get(endCursor));
		await fetch();
	};
	//#endregion

	return {
		pageSize,
		rows,
		can: {
			next: canNext,
			back: canBack,
			first: canBack,
			last: canLast
		},
		cursors: {
			begin: beginCursor,
			end: endCursor,
			current: currentCursor,
			next: nextCursor
		},
		fetchers: {
			next,
			back,
			first,
			last,
			fetch
		}
	};
}
