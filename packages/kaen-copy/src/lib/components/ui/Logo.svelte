<script lang="ts">
	import Kill from '$lib/svg/Kill.svelte';
	import All from '$lib/svg/All.svelte';
	import Extremists from '$lib/svg/Extremists.svelte';
	import Now from '$lib/svg/Now.svelte';
</script>

<div class="mb-6 mt-12 flex items-center justify-center space-x-4">
	<a href="/">
		<svg width="1200" height="135" viewBox="0 0 1200 135" xmlns="http://www.w3.org/2000/svg">
			<Kill transform="translate(0 35)"></Kill>
			<All transform="translate(115) scale(1.5)"></All>
			<Extremists transform="translate(290 35)"></Extremists>
			<Now transform="translate(670) scale(1.5)"></Now>
		</svg>
	</a>
</div>
