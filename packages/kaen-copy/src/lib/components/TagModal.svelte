<script>
	import Select from '$lib/components/Select.svelte';
	export let showTagModal; // boolean
	export let tagger;

	let dialog; // HTMLDialogElement
	let tags = [
		{ id: 1, text: 'MMT', style: 'sky' },
		{ id: 2, text: 'Palestine', style: 'slate' },
		{ id: 3, text: 'AI', style: 'red' },
		{ id: 4, text: 'Electrolytes', style: 'orange' },
		{ id: 5, text: 'DSA', style: 'yellow' },
		{ id: 6, text: 'Political Corruption', style: 'lime' },
		{ id: 7, text: 'Jeff Beck', style: 'teal' }
	];
	let selected;

	$: if (dialog && showTagModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showTagModal = false)}
	on:click|self={() => dialog.close()}
	class="max-w-md rounded-md border-none p-0 backdrop:bg-gray-50 backdrop:opacity-20"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="p-4 min-h-[200px] max-h-none">
		<select
			size="5"
			bind:value={selected}
			on:change={() => {
				tagger.format('tagstyle', selected.style);
				tagger.format('tagname', selected.text);
				let contents = tagger.getContents();
				console.log(contents);
			}}
		>
			{#each tags as tag}
				<option value={tag} class="tag-{tag.style}">
					{tag.text}
				</option>
			{/each}
		</select>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
		<!-- <Select /> -->
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
