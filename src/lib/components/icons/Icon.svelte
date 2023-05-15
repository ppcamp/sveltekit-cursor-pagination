<script lang="ts" context="module">
	const available = [
		'delete',
		'home',
		'arrow_back',
		'arrow_forward',
		'settings_ethernet',
		'keyboard_double_arrow_right',
		'keyboard_double_arrow_left',
		'first_page',
		'last_page',
		'navigate_next',
		'navigate_before'
	] as const;

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
