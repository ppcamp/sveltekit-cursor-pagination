<script lang="ts">
	import DeleteAction from '$components/table/DeleteAction.svelte';
	import Table from '$components/table/Table.svelte';
	import type { Column } from '$components/table/types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { PageLoad } from './$types';
	import { isOk } from '$fetchers/internal/status';
	import type { ListResponse } from '$types/list';

	export let data: PageLoad;

	$: isErr = !isOk(data);
	$: rows = isErr ? [] : (data.data as ListResponse[]);

	type TData = (typeof rows)[number];
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

		<Table class="min-w-[50rem] rounded-none" {columns} data={rows}>
			<svelte:fragment slot="actions" let:value>
				<DeleteAction on:click={() => show(value)} />
			</svelte:fragment>
		</Table>
	</div>
</div>
