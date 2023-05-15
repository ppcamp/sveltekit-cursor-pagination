<script lang="ts">
	import Button from './Button.svelte';
	import Icon, { type IconName, type Variant } from '../icons/Icon.svelte';

	export let icon: IconName;
	export let variant: Variant = 'default';
	export let transparent: boolean = true;
	export let swap: boolean = false;

	let klass: string = '';
	export { klass as class };

	$: hasSlot = $$slots.default;
</script>

<Button {...$$restProps} variant={!transparent ? 'default' : 'transparent'} class={klass} on:click>
	{#if swap}
		{#if hasSlot}<span><slot /></span>{/if}
		<span class:mr-3={hasSlot}><Icon {icon} {variant} /></span>
	{:else}
		<span class:mr-3={hasSlot}><Icon {icon} {variant} /></span>
		{#if hasSlot}<span><slot /></span>{/if}
	{/if}
</Button>
