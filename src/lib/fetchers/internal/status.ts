import type { BaseResponse, ErrorResponse, ServerResponse } from '$types/status';

type WithStatus<T> = T & { status: number };
export type BaseClientResponse<T> = WithStatus<BaseResponse<T>>;
export type ErrorClientResponse = WithStatus<ErrorResponse>;
export type ClientResponse<T> = BaseClientResponse<T> | ErrorClientResponse;

export const isError = <T>(response: ClientResponse<T>): response is ErrorClientResponse => {
	return (response as ErrorClientResponse).error !== undefined;
};

export const isResponse = <T>(response: ClientResponse<T>): response is BaseClientResponse<T> => {
	return (response as BaseClientResponse<T>).data !== undefined;
};

export const isOkResponse = <T>(response: ClientResponse<T>): response is BaseClientResponse<T> => {
	const as = response as BaseClientResponse<T>;
	return as.data !== undefined && (as.status == 200 || as.status == 201);
};

export const isOk = <T>(response: ClientResponse<T>): response is BaseClientResponse<T> => {
	const as = response as BaseClientResponse<T>;
	return isOkResponse(response) && as.status >= 200 && as.status <= 204;
};
