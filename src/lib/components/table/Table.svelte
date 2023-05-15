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
	const { rows, canNext, canBack, canFirst, canLast } = pagination;

	$: hasActions = $$slots.actions;
</script>

<BeforeMount promise={pagination.fetch()}>
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

		<Pagination
			rowsCount={$rows.length}
			disableNext={!$canNext}
			on:next={pagination.next}
			disableBack={!$canBack}
			on:back={pagination.back}
			disableFirst={!$canFirst}
			on:first={pagination.first}
			disableLast={!$canLast}
			on:last={pagination.last}
		/>
	</div>
</BeforeMount>

<style lang="scss">
	.f {
		display: flex;
	}
</style>
