<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Column } from './types';
	import { capitalize } from '$lib/utils/strings';

	const dispatch = createEventDispatcher();

	type TData = $$Generic;

	let klass: string = '';
	export { klass as class };
	export let columns: Column<TData>[];
	export let data: TData[];

	$: hasActions = $$slots.actions;
</script>

<div class={klass + 'm-5'}>
	<table class="table">
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
						<td class="table-cell">{c.row(value)}</td>
					{/each}

					{#if hasActions}
						<td class="text-center">
							<slot name="actions" {value} {index} />
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>

		<tfoot>
			<tr>
				<td><b>Total</b></td>
				<td>
					<span class="badge variant-soft-primary"> {data.length} Elements </span>
				</td>
			</tr>
		</tfoot>
	</table>
</div>
