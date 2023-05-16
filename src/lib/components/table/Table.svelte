<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { createPagination } from './pagination';
	import Pagination, { type Context, Key } from './Pagination.svelte';
	import { cssMap } from '$lib/utils/dom';
	import type { Column, FetchFunc } from './types';
	import { capitalize } from '$lib/utils/strings';
	import Spacer from '$components/Spacer.svelte';

	type TData = $$Generic;

	let klass: string = '';
	export { klass as class };
	export let columns: Column<TData>[];
	export let fetcher: FetchFunc<TData>;

	$: hasActions = $$slots.actions;

	const pagination = createPagination(fetcher, {
		pageSizePersisted: { key: 'table', location: 'local' }
	});
	const { fetchers, rows } = pagination;
	setContext<Context<TData>>(Key, { pagination });

	onMount(async () => {
		await fetchers.fetch();
	});
</script>

<div class={cssMap('w-modal-wide', klass)}>
	<table class="inline-block table">
		<thead class="text-left">
			{#each columns as c}
				<th class="table-cell">{capitalize(c.name)}</th>
			{/each}

			{#if hasActions}
				<th class="text-center">Actions</th>
			{/if}
		</thead>

		<tbody class="text-left">
			<!-- {#key $currentCursor} -->
			{#each $rows as row, index}
				<tr class="table-row">
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
			<!-- {/key} -->
		</tbody>
	</table>

	<Spacer />

	<Pagination />
</div>

<style lang="scss">
	.f {
		display: flex;
	}
</style>
