import { page } from '$app/stores';
import type { ErrorResponse, ServerResponse } from '$types/status';
import type { LoadEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { ClientResponse } from './status';

type ServerEvent = Pick<LoadEvent, 'fetch' | 'url'>;

const doFetch = <Type>(url: string, event?: ServerEvent) => {
	const fetcher = event?.fetch ?? fetch;
	const origin = event?.url.origin ?? get(page).url.origin;

	let localURL = new URL(url, origin);

	const _parse = async (r: Response) => {
		try {
			const parsed = (await r.json()) as ServerResponse<Type>;
			return parsed;
		} catch (e) {
			const err = new Error('fail to do fetch', { cause: r.body });
			return { error: { message: 'client fetch error', reason: err } } satisfies ErrorResponse;
		}
	};

	const _do = async (init?: RequestInit) => {
		const r = await fetcher(localURL, init);
		const parsed = await _parse(r);
		return { ...parsed, status: r.status } as ClientResponse<Type>;
	};

	const _prepare = (url: URL) => {
		localURL = url;
		return { do: _do };
	};

	return {
		prepare: (fn: (input: URL) => URL) => _prepare(fn(localURL)),
		do: _do
	};
};

export { doFetch };
