<script lang="ts">
	export let display: boolean;
	export let quill: any;

	function newSlug() {
		display = false;
	}
	function openRecent() {
		display = false;
	}
	function closeSlug() {
		display = false;
	}
</script>

<div class="card flex flex-col gap-2 p-2 shadow-xl rounded-lg bg-blue border-slate-800 mt-1">
	<button class="px-2 py-1 text-black text-left" on:click={newSlug}>New</button>
	<button class="px-2 py-1 text-black text-left" on:click={openRecent}>Open recent...</button>
	<button class="px-2 py-1 text-black text-left" on:click={closeSlug}>Close</button>
</div>
