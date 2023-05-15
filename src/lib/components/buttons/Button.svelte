<script lang="ts">
	import { cssMap } from '$lib/utils/dom';

	let klass: string = '';
	export { klass as class };

	export let variant: 'transparent' | 'default' = 'default';
</script>

<button
	type="button"
	class:btn={variant == 'default'}
	class:variant-filled={variant == 'default'}
	{...$$restProps}
	class={cssMap(
		'relative block rounded-lg bg-transparent px-2 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white',
		klass
	)}
	on:click
>
	<div class="flex">
		<slot />
	</div>
</button>
