<script lang="ts">
	import type { ServerEvent } from '$types/utils';
	import type { ListProperties } from '$types/pagination';
	import type { ListResponse } from '$types/list';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { isOk, type ClientResponse } from '$lib/fetchers/internal/status';
	import Pagination from './Pagination.svelte';
	import { cssMap } from '$lib/utils/dom';
	import type { Column, PaginatedFetchFunc } from './types';
	import { capitalize } from '$lib/utils/strings';
	import Spacer from '$components/Spacer.svelte';

	type TFnResponse = $$Generic;
	type TRows = $$Generic<Array<unknown>>;

	export let fn: (
		input: ListProperties,
		event?: ServerEvent
	) => Promise<ClientResponse<ListResponse<TFnResponse>>>;
	export let mapper: (v: TFnResponse) => TRows;
	export let columns: Column<TRows[number]>[];
	export let enableRows: boolean = false;
	export { klass as class };

	/** @ts-ignore: TRows is an array */
	let rows: TRows = [];
	let klass: string = '';
	$: hasActions = $$slots.actions;

	const fetchAndUpdate: PaginatedFetchFunc = async (input, event) => {
		const resp = await fn(input, event);
		if (isOk(resp)) {
			if (!input.isPreload) rows = mapper(resp);
			return resp.nextPageToken;
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

<div class={cssMap('w-modal-wide', klass)}>
	<table class="inline-block table">
		<thead class="text-left">
			{#if enableRows}
				<th class="table-cell">#</th>
			{/if}

			{#each columns as c}
				<th class="table-cell">{capitalize(c.name)}</th>
			{/each}

			{#if hasActions}
				<th class="text-center">Actions</th>
			{/if}
		</thead>

		<tbody class="text-left">
			{#each rows as row, index}
				<tr class="table-row">
					{#if enableRows}
						<th class="table-cell p-5">{index + 1}</th>
					{/if}

					{#each columns as c}
						<td class="table-cell max-w-[50rem] overflow-hidden text-ellipsis">{c.row(row)}</td>
					{/each}

					{#if hasActions}
						<td class="text-center">
							<slot name="actions" value={row} {index} />
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>

	<Spacer />

	<Pagination fn={fetchAndUpdate} />
</div>

<style lang="scss">
	.f {
		display: flex;
	}
</style>
