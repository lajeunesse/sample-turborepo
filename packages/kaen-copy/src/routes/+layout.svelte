<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/ui/NavBar.svelte';
	import SideBar from '$lib/components/ui/SideBar.svelte';
	let open = $state(false);
	let { children } = $props();
</script>

<SideBar bind:open></SideBar>
<NavBar bind:sidebar={open}></NavBar>
{@render children()}
