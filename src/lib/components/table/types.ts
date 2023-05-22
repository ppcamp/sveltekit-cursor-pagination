import type { ListProperties } from '$types/pagination';
import type { ServerEvent } from '$types/utils';

export type Column<T> = {
	name: string;
	row: (v: T) => string;
};

export type Token = string;
export type PaginatedFetchFunc = (
	p: ListProperties & { isPreload: boolean },
	event?: ServerEvent
) => Promise<Token>;
