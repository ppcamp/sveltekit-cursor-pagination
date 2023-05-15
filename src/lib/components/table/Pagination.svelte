<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconButton from '../buttons/IconButton.svelte';

	export let rowsCount: number | undefined = undefined;
	export let disableNext: boolean = false;
	export let disableLast: boolean = false;
	export let disableBack: boolean = false;
	export let disableFirst: boolean = false;

	const dispatch = createEventDispatcher<{ next: any; back: any; first: any; last: any }>();
</script>

<nav class="flex w-full rounded bg-surface-800 p-5 align-middle">
	<div class="w-full">
		{#if rowsCount}
			<div class="f flex align-middle">
				<b>Total</b>
				<span class="badge variant-soft-primary ml-5"> {rowsCount} Elements </span>
			</div>
		{/if}
	</div>

	<div class="flex w-full justify-end">
		<div class="flex content-around justify-around">
			<IconButton
				disabled={disableFirst}
				transparent
				icon="first_page"
				on:click={(e) => dispatch('first', e)}
			>
				<!-- First -->
			</IconButton>

			<IconButton
				disabled={disableBack}
				transparent
				icon="navigate_before"
				on:click={(e) => dispatch('back', e)}
			>
				<!-- Back -->
			</IconButton>

			<IconButton
				disabled={disableNext}
				transparent
				icon="navigate_next"
				swap
				on:click={(e) => dispatch('next', e)}
			>
				<!-- Next -->
			</IconButton>

			<IconButton
				disabled={disableLast}
				transparent
				icon="last_page"
				swap
				on:click={(e) => dispatch('last', e)}
			>
				<!-- Last -->
			</IconButton>
		</div>
	</div>
</nav>
