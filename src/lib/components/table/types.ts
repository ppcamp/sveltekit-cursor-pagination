export type Column<T> = {
	name: string;
	row: (v: T) => string;
};
