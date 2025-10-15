<script lang="ts">
	import Logo from '$lib/components/ui/Logo.svelte';
	import Hamburger from '$lib/components/ui/Hamburger.svelte';
	import Menu from '$lib/components/ui/Menu.svelte';

	export let sidebar = false;
</script>

<Hamburger bind:open={sidebar}></Hamburger>

<Menu></Menu>
<Logo></Logo>
<header class="flex items-center justify-between border-b-2 bg-gray-200 p-2 text-gray-600">
	<nav class="flex"></nav>
</header>
