<script lang="ts">
	import { createPagination } from './pagination';

	import Pagination from './Pagination.svelte';
	import { cssMap } from '$lib/utils/dom';
	import type { Column, FetchFunc } from './types';
	import { capitalize } from '$lib/utils/strings';
	import Spacer from '$components/Spacer.svelte';
	import BeforeMount from '$components/BeforeMount.svelte';

	type TData = $$Generic;

	let klass: string = '';
	export { klass as class };
	export let columns: Column<TData>[];
	export let fetcher: FetchFunc<TData>;

	const pagination = createPagination(fetcher);
	const { rows, canNext } = pagination;

	$: hasActions = $$slots.actions;
</script>

<BeforeMount promise={pagination.fetch()}>
	<div class={cssMap('m-5', klass)}>
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

		<Pagination rowsCount={$rows.length} on:next={pagination.next} disableNext={!$canNext} />
	</div>
</BeforeMount>

<style lang="scss">
	.f {
		display: flex;
	}
</style>
