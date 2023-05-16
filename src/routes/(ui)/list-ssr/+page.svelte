<script lang="ts">
	import DeleteAction from '$components/table/DeleteAction.svelte';
	import Table from '$components/table/Table.svelte';
	import type { Column, FetchFunc } from '$components/table/types';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { isOk } from '$fetchers/internal/status';
	import type { GotApiItem, GotApiItemList } from '$types/list';
	import { capitalize } from '$lib/utils/strings';
	import fetcher from '$fetchers/list';
	import { browser } from '$app/environment';

	type TData = GotApiItem;

	const columns: Column<TData>[] = [
		{ name: 'Slug', row: (v) => `${capitalize(v.slug)}` },
		{ name: 'Name', row: (v) => `${v.name}` },
		{ name: 'House', row: (v) => `${capitalize(v.house?.slug || 'N/A')}` },
		{ name: 'Quotes', row: (v) => `${JSON.stringify(v.quotes)}` }
	];

	const show = (v: TData) => {
		toastStore.trigger({ message: 'Called DELETE ' + v.name, autohide: true });
	};

	const doFetch: FetchFunc<TData> = async (input, event) => {
		const resp = await fetcher.list(input, event);
		if (isOk(resp)) {
			return resp;
		}
		if (browser) {
			toastStore.trigger({
				message: 'Fail to fetch elements',
				autohide: true,
				background: 'variant-filled-warning'
			});
		}
		throw 'err';
	};
</script>

<div class="m-5">
	<div class="mx-auto flex w-3/4 flex-col items-center justify-center gap-8 align-middle">
		<h1>Example Table</h1>

		<Table class="min-w-[50rem] rounded-none" {columns} fetcher={doFetch}>
			<svelte:fragment slot="actions" let:value>
				<DeleteAction on:click={() => show(value)} />
			</svelte:fragment>
		</Table>
	</div>
</div>
