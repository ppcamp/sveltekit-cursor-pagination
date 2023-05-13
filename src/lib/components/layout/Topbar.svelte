<script lang="ts">
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import Icon from '../icons/Icon.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<Icon icon="home" />
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<Avatar initials="USR" width="w-10" rounded="rounded-full" />
	</svelte:fragment>
	<svelte:fragment slot="headline" />
</AppBar>
