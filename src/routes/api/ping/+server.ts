import { handle } from '$server/handler';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = handle((event: RequestEvent) => {
	return 'ping';
});
