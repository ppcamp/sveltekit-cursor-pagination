<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';

	type T = $$Generic;

	export let promise: Promise<T>;
</script>

{#await promise}
	<ProgressBar />
{:then response}
	<slot {response} />
{/await}
