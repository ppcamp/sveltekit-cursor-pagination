<script lang="ts" context="module">
	const available = ['delete', 'home', 'arrow_forward', 'settings_ethernet'] as const;

	export type IconName = (typeof available)[number];
	export type Variant = 'default' | 'symbols-outlined';
</script>

<script lang="ts">
	import { cssMap } from '$lib/utils/dom';

	export let icon: IconName | undefined = undefined;
	export let variant: Variant = 'default';

	let googleClass = variant === 'default' ? 'material-icons' : 'material-symbols-outlined';

	let klass: string = '';
	export { klass as class };
</script>

{#if !$$slots.svg}
	<span class={cssMap(googleClass, klass)}>{icon}</span>
{:else}
	<slot name="svg" />
{/if}
