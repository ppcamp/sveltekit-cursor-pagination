import type { BaseResponse, ErrorResponse } from '$types/status';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

type Callback<T extends any | Error> = (event: RequestEvent) => T;

export const handle = <T extends any | Error>(cb: Callback<T>): RequestHandler => {
	return async function (event: RequestEvent) {
		try {
			const resp = cb(event);
			const wrapped = { data: resp } satisfies BaseResponse<T>;
			return json(wrapped);
		} catch (e) {
			const err = e as Error;
			const wrapped = {
				error: {
					message: 'unexpected API error',
					reason: err
				}
			} satisfies ErrorResponse;
			return json(wrapped, { status: 500 });
		}
	};
};
