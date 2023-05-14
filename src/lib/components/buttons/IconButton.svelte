<script lang="ts">
	import Button from './Button.svelte';
	import Icon, { type IconName, type Variant } from '../icons/Icon.svelte';

	export let icon: IconName;
	export let variant: Variant = 'default';

	let klass: string = '';
	export { klass as class };

	$: hasSlot = $$slots.default;
</script>

<Button variant={hasSlot ? 'default' : 'transparent'} class={klass} on:click>
	<span class="mr-3"><Icon {icon} {variant} /></span>
	{#if hasSlot}
		<span><slot /></span>
	{/if}
</Button>
