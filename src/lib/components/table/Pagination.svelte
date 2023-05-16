<script lang="ts" context="module">
	export const Key = Symbol();
	export type Context<T> = { pagination: Paginated<T> };
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import type { Paginated } from './pagination';

	export let pageSizes: number[] = [5, 10, 25, 50];

	type T = $$Generic;

	const { pagination } = getContext<Context<T>>(Key);
	const {
		can: { back, next, first, last },
		fetchers,
		rows,
		pageSize
	} = pagination;

	$: rowsCount = $rows.length;
</script>

<nav class="flex w-full rounded bg-surface-800 p-5 align-middle">
	<div class="w-full">
		{#if rowsCount}
			<div class="flex align-middle">
				<b>Total</b>
				<span class="badge variant-soft-primary ml-5"> {rowsCount} Elements </span>
			</div>
		{/if}
	</div>

	<div class="flex w-full items-center justify-evenly">
		<label for="pagesize" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
			>Select page size</label
		>
		<select
			bind:value={$pageSize}
			id="pagesize"
			class="block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
		>
			{#each pageSizes as value}
				<option selected={$pageSize == value}>{value}</option>
			{/each}
		</select>
	</div>

	<div class="flex w-full justify-end">
		<div class="flex content-around justify-around">
			<IconButton disabled={!$first} transparent icon="first_page" on:click={fetchers.first}>
				<!-- First -->
			</IconButton>

			<IconButton disabled={!$back} transparent icon="navigate_before" on:click={fetchers.back}>
				<!-- Back -->
			</IconButton>

			<IconButton disabled={!$next} transparent icon="navigate_next" swap on:click={fetchers.next}>
				<!-- Next -->
			</IconButton>

			<IconButton disabled={!$last} transparent icon="last_page" swap on:click={fetchers.last}>
				<!-- Last -->
			</IconButton>
		</div>
	</div>
</nav>
