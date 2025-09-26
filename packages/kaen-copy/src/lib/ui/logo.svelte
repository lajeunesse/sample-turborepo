<script lang="ts">
	let { logoWidth = '135.6', logoHeight = '71' } = $props();
	let viewBox = `0 0 ${logoWidth} ${logoHeight}`;
</script>

<svg width="135.6" height="71" {viewBox} xmlns="http://www.w3.org/2000/svg">
	<g>
		<rect width="100" height="100" stroke="#44ff66" fill="#44ff66" />
		<text x="25" y="40" font-family="Verdana" font-size="12" fill="blue">100x100</text>
	</g>
</svg>
