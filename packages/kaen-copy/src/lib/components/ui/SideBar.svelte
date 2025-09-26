<script lang="ts">
	export let open = false;
</script>

<aside class="absolute h-full w-full border-r-2 bg-gray-800 shadow-lg sm:hidden" class:open>
	<nav class="p-12 text-xl">
		<a class="block" href="#about">About</a>
		<a class="block" href="#contact">Contact</a>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3 ease-in-out;
	}
	.open {
		left: 0;
	}
</style>
