import type { LoadEvent } from '@sveltejs/kit';
import { doFetch } from './internal/client-fetch';
import type { GotApiItemList } from '$types/list';

const list = async (event?: LoadEvent) => {
	return await doFetch<GotApiItemList>('/api/list', event).do();
};

export default { list };
