<script lang="ts">
	import { cssMap } from '$utils/dom';
	let klass: string = '';
	export { klass as class };

	export let variant: 'transparent' | 'default' = 'default';
</script>

<button
	type="button"
	class:btn={variant == 'default'}
	class:variant-filled={variant == 'default'}
	on:click
>
	<div class={cssMap('flex', klass)}>
		<slot />
	</div>
</button>
