<script>
	import { Pagination, PaginationItem } from 'flowbite-svelte';
	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
</script>

<div class="flex space-x-3">
	<PaginationItem class="flex items-center" on:click={previous}>
		<svg
			class="mr-2 h-5 w-5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
				clip-rule="evenodd"
			/></svg
		>
		Previous
	</PaginationItem>
	<PaginationItem class="flex items-center" on:click={next}>
		Next
		<svg
			class="ml-2 h-5 w-5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/></svg
		>
	</PaginationItem>
</div>
