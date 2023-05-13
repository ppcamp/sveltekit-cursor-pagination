import { handle } from '$server/handler';
import type { ListResponse } from '$types/list';

export const GET = handle((event) => {
	return [
		{ name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ name: 'Boron', weight: 10.811, symbol: 'B' }
	] satisfies ListResponse[];
});
