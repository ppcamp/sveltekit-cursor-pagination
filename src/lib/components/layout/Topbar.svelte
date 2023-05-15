<script lang="ts">
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { goto } from '$app/navigation';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<IconButton transparent icon="home" on:click={() => goto('/')} />
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<Avatar initials="USR" width="w-10" rounded="rounded-full" />
	</svelte:fragment>
	<svelte:fragment slot="headline" />
</AppBar>
