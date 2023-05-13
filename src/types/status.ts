export type BaseResponse<T extends object> = T;

export type ErrorResponse = {
	error: {
		message: string;
		reason: Error;
	};
};

export type ServerResponse<T> = BaseResponse<T> | ErrorResponse;
