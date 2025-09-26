<script lang="ts">
	import { onMount } from 'svelte';
	// import type Quill from 'quill';

	/**
	 * @type {HTMLDivElement}
	 */
	let editor: HTMLDivElement;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		new Quill(editor, {
			modules: {
				toolbar: {
					container: '#toolbar-container'
				}
			},
			theme: 'snow',
			placeholder: 'Write your slug...'
		});
	});
</script>

<svelte:head>
	<title>Write</title>
	<meta name="description" content="Write a note" />
</svelte:head>

<div class="flex flex-row">
	<div class="editor-wrapper basis-full">
		<div id="toolbar-container">
			<span class="ql-formats">
				<button aria-label="bold" class="ql-bold"></button>
				<button aria-label="italic" class="ql-italic"></button>
				<button aria-label="underline" class="ql-underline"></button>
				<button aria-label="strike" class="ql-strike"></button>
			</span>
			<span class="ql-formats">
				<button aria-label="block quote" class="ql-blockquote"></button>
				<button aria-label="code block" class="ql-code-block"></button>
			</span>
			<span class="ql-formats">
				<button aria-label="clean" class="ql-clean"></button>
			</span>
		</div>
		<div id="scrolling-container" class="h-80">
			<div bind:this={editor}></div>
		</div>
	</div>
</div>

<style lang="postcss">
	@import 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
</style>
