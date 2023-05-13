<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';

	import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
</script>

<svelte:head>
	<title>Example</title>
</svelte:head>

<Modal />
<Toast position="br" />
<AppShell>
	<svelte:fragment slot="header">
		<Topbar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft" />
	<svelte:fragment slot="sidebarRight" />
	<svelte:fragment slot="pageHeader" />
	<!-- Router Slot -->

	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter" />

	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
