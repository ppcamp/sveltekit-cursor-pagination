export type ListResponse<T> = {
	data: T;
	nextPageToken: string;
};

export type GotApiItem = {
	name: string;
	slug: string;
	house: string | null;
	quotes: string[];
};

export type GotApiItemList = ListResponse<GotApiItem[]>;
