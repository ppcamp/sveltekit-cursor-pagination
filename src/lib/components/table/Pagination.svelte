<script lang="ts" context="module">
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let rowsCount: number | undefined = undefined;
	export let disableNext: boolean = false;

	const dispatch = createEventDispatcher<{ next: any }>();
</script>

<div class="container flex rounded bg-surface-800 p-5 align-middle">
	<div class="w-full">
		{#if rowsCount}
			<div class="f flex align-middle">
				<b>Total</b>
				<span class="badge variant-soft-primary ml-5"> {rowsCount} Elements </span>
			</div>
		{/if}
	</div>

	<div class="flex w-full justify-end">
		<div class="flex flex-col items-center">
			<div class="xs:mt-0 mt-2 inline-flex">
				<button disabled={disableNext} type="button" on:click={(e) => dispatch('next', e)}>
					Next
				</button>
			</div>
		</div>
	</div>
</div>
