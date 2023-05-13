<script lang="ts">
	import Pagination from './Pagination.svelte';

	import { cssMap } from '$lib/utils/dom';

	import { createEventDispatcher } from 'svelte';
	import type { Column } from './types';
	import { capitalize } from '$lib/utils/strings';
	import Spacer from '../Spacer.svelte';

	const dispatch = createEventDispatcher();

	type TData = $$Generic;

	let klass: string = '';
	export { klass as class };
	export let columns: Column<TData>[];
	export let data: TData[];

	$: hasActions = $$slots.actions;
</script>

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
			{#each data as value, index}
				<tr class="table-row">
					{#each columns as c}
						<td class="table-cell max-w-[50rem] overflow-hidden text-ellipsis">{c.row(value)}</td>
					{/each}

					{#if hasActions}
						<td class="text-center">
							<slot name="actions" {value} {index} />
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>

	<Spacer />

	<div class="container flex rounded bg-surface-800 p-5 align-middle">
		<div class="w-full">
			<div class="f flex align-middle">
				<b>Total</b>
				<span class="badge variant-soft-primary ml-5"> {data.length} Elements </span>
			</div>
		</div>

		<div class="flex w-full justify-end">
			<Pagination />
		</div>
	</div>
</div>

<style lang="scss">
	.f {
		display: flex;
	}
</style>
