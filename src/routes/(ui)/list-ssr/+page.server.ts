import type { PageServerLoad } from './$types';
import fetcher from '$fetchers/list';
import type { Actions } from '@sveltejs/kit';

export const load = (async (event) => {
	const response = await fetcher.list({}, event);
	return response;
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: () => {}
};
