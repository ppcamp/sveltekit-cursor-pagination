import type { LoadEvent } from '@sveltejs/kit';
import { doFetch } from './internal/client-fetch';
import type { ListResponse } from '$types/list';

const list = async (event?: LoadEvent) => {
	return await doFetch<ListResponse[]>('/api/list', event).do();
};

export default { list };
