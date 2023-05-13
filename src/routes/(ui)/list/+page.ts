import type { PageLoad } from './$types';
import fetcher from '$fetchers/list';

export const load = (async (event) => {
	const response = await fetcher.list(event);
	return response;
}) satisfies PageLoad;
