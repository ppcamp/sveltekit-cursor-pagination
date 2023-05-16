import type { ListResponse } from '$types/list';
import type { ListProperties } from '$types/pagination';
import type { ServerEvent } from '$types/utils';

export type Column<T> = {
	name: string;
	row: (v: T) => string;
};

export type FetchFunc<Type> = (
	p: ListProperties,
	event?: ServerEvent
) => Promise<ListResponse<Type>>;
