export type ListResponse<T> = {
	data: Array<T>;
	nextPageToken: string;
};

export type GotApiItem = {
	name: string;
	slug: string;
	house?: {
		slug: string;
		name: string;
	};
	quotes: string[];
};

export type GotApiItemList = ListResponse<GotApiItem>;
