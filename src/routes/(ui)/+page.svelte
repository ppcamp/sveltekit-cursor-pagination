<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import fetcher from '$lib/fetchers/server';
	import { isOk } from '$lib/fetchers/internal/status';
	import type { PageData } from './$types';
	import { capitalize } from '$utils/strings';
	import { goto } from '$app/navigation';
	import Spacer from '$lib/components/Spacer.svelte';

	export let data: PageData;

	const handleCLk = async () => {
		const modal: ModalSettings = {
			type: 'alert',
			// Data
			title: 'Ping'
		};

		const out = await fetcher.ping();
		if (isOk(out)) {
			modal.body = `<b>received:</b> ${out.data}`;
		} else {
			modal.body = `<b>error:</b> ${out.error}`;
		}

		modalStore.trigger(modal);
	};
</script>

<div class="container mx-auto flex flex-col">
	<div class="m-4 mx-auto">
		<IconButton icon="settings_ethernet" variant="symbols-outlined" on:click={handleCLk}
			>Ping server</IconButton
		>
	</div>

	<Spacer />

	<div class="m-5 text-center">
		<p>Current available links</p>
	</div>

	<div class="m-4 mx-auto flex justify-center">
		{#each data.dirs as d}
			<IconButton icon="arrow_forward" on:click={() => goto('/' + d)}>{capitalize(d)}</IconButton>
		{/each}
	</div>
</div>
