<script lang="ts" context="module">
	const available = ['delete', 'home'] as const;

	type Icon = (typeof available)[number];
</script>

<script lang="ts">
	export let icon: Icon | undefined = undefined;

	let klass: string = '';
	export { klass as class };
</script>

{#if !$$slots.svg}
	<span class={'material-icons ' + klass}>{icon}</span>
{:else}
	<slot name="svg" />
{/if}
