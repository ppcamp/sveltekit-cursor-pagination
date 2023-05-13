<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	let klass: string = '';

	export { klass as class };

	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
	];

	export function tableSourceMapper(source: any[], keys: string[]): any[] {
		return source.map((row) => {
			const mappedRow: any = {};
			keys.forEach((key) => (mappedRow[key] = row[key]));
			return mappedRow;
		});
	}

	/** Map an array of objects to an array of values. */
	export function tableSourceValues(source: any[]): any[] {
		return source.map((row) => Object.values(row));
	}

	/** Sets object order and returns values. */
	export function tableMapperValues(source: any[], keys: string[]): any[] {
		return tableSourceValues(tableSourceMapper(source, keys));
	}

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Symbol', 'Weight'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">5</code>']
	};
</script>

<div class={klass + 'm-5'}>
	<Table source={tableSimple} />
</div>
