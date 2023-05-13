import type { LoadEvent } from '@sveltejs/kit';
import { doFetch } from './internal/client-fetch';

const ping = async (event?: LoadEvent) => {
	return await doFetch<string>('/api/ping', event).do();
};

export default { ping };
