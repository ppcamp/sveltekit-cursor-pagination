<script lang="ts">
	import DeleteAction from '$components/table/DeleteAction.svelte';
	import Table from '$components/table/Table.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { GotApiItem } from '$types/list';
	import { capitalize } from '$lib/utils/strings';
	import fetcher from '$fetchers/list';

	const show = (value: unknown) => {
		const v = value as GotApiItem;
		toastStore.trigger({ message: 'Called DELETE ' + v.name, autohide: true });
	};
</script>

<div class="m-5">
	<div class="mx-auto flex w-3/4 flex-col items-center justify-center gap-8 align-middle">
		<h1>Example Table</h1>

		<Table
			enableRows
			class="min-w-[50rem] rounded-none"
			fn={fetcher.list}
			mapper={(v) => v.data}
			columns={[
				{ name: 'Slug', row: (v) => `${capitalize(v.slug)}` },
				{ name: 'Name', row: (v) => `${v.name}` },
				{ name: 'House', row: (v) => `${capitalize(v.house?.slug || 'N/A')}` },
				{ name: 'Quotes', row: (v) => `${JSON.stringify(v.quotes)}` }
			]}
		>
			<svelte:fragment slot="actions" let:value>
				<DeleteAction on:click={() => show(value)} />
			</svelte:fragment>
		</Table>
	</div>
</div>
