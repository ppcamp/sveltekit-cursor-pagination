<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import DeleteAction from '$lib/components/table/DeleteAction.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import type { Column } from '$lib/components/table/types';
	import { toastStore } from '@skeletonlabs/skeleton';

	const data = [
		{ name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ name: 'Boron', weight: 10.811, symbol: 'B' }
	];

	type TData = (typeof data)[number];
	const columns: Column<TData>[] = [
		{ name: 'Name', row: (v) => `${v.name}` },
		{ name: 'Symbol', row: (v) => `${v.symbol}` },
		{ name: 'Weight', row: (v) => `${v.weight}` }
	];

	const show = (v: TData) => {
		toastStore.trigger({
			message: 'Called DELETE ' + v.name,
			autohide: true
		});
	};
</script>

<div class="m-5">
	<div class="flex flex-col items-center justify-center gap-8 align-middle">
		<h1>Example Table</h1>

		<Table class="min-w-[50rem] rounded-none" {columns} {data}>
			<svelte:fragment slot="actions" let:value>
				<DeleteAction on:click={() => show(value)} />
			</svelte:fragment>
		</Table>
	</div>
</div>
