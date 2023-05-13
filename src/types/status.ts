export type BaseResponse<T> = {
	data: T;
};

export type ErrorResponse = {
	error: {
		message: string;
		reason: Error;
	};
};

export type ServerResponse<T> = BaseResponse<T> | ErrorResponse;
