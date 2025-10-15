<script lang="ts">
	import { onMount } from 'svelte';
	import TagModal from '$lib/components/TagModal.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import AccountSubMenu from '$lib/components/AccountSubMenu.svelte';
	import FileSubMenu from '$lib/components/FileSubMenu.svelte';
	import { editorChange } from '$lib/quill/ToolBar';
	import { makePreview, type Preview } from '$lib/quill/makePreview';
	import User from '$lib/icons/24/outline/user.svelte';
	import Tag from '$lib/icons/24/outline/tag.svelte';
	import type Quill from 'quill';
	/**
	 * @type {HTMLDivElement}
	 */
	let editor: HTMLDivElement;
	let preview: Preview = {};
	let quill: Quill;
	let showTagModal = false;
	export let data;
	let post = JSON.parse(data.post);
	let id: string;
	let accountMenu: HTMLElement;
	let fileMenu: HTMLElement;
	let subMenu: any;
	let popoverMenu: HTMLElement;
	let displayPopoverMenu: boolean = false;

	onMount(async () => {
		const { default: Quill } = await import('quill');
		const Parchment = Quill.import('parchment');

		let TagClass = new Parchment.Attributor.Class('tagstyle', 'tag', {
			scope: Parchment.Scope.INLINE
		});
		let TagData = new Parchment.Attributor.Attribute('tagname', 'data-tag', {
			scope: Parchment.Scope.INLINE
		});
		let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
			scope: Parchment.Scope.INLINE
		});
		Quill.register(TagClass, true);
		Quill.register(TagData, true);
		Quill.register(CustomClass, true);

		quill = new Quill(editor, {
			modules: {
				toolbar: {
					container: '#toolbar-container',
					handlers: {
						tag: () => {
							const range = quill.getSelection();
							if (range) {
								const format = quill.getFormat(range);
								if (format['tagname']) {
									quill.removeFormat(range.index, range.index + range.length);
								} else {
									showTagModal = true;
								}
							}
						}
					}
				}
			},
			theme: 'snow',
			scrollingContainer: '#scrolling-container',
			placeholder: 'Write your slug...'
		});

		let customButton = document.querySelector('#custom-button');
		let tagButton = document.querySelector('#tag-button');

		quill.on('editor-change', editorChange(quill, customButton, tagButton));
		post.forEach(makePreview(Quill, preview));
	});

	function cite(event: Event) {
		var format = quill.getFormat();
		let contents = quill.getContents();
		if (format.citation) {
			quill.format('citation', '');
		} else {
			quill.format('citation', 'test');
		}
	}
	async function save() {
		let contents = quill.getContents();
		const response = await fetch('/note', {
			method: 'POST',
			body: JSON.stringify(contents),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		id = json.id;
		console.log(json);
	}
</script>

<svelte:head>
	<title>Write</title>
	<meta name="description" content="Write a note" />
</svelte:head>

<TagModal bind:showTagModal tagger={quill} />
<div class="flex flex-row">
	<div class="editor-wrapper basis-full">
		<div id="toolbar-container">
			<span class="ql-formats">
				<button class="ql-bold" />
				<button class="ql-italic" />
				<button class="ql-underline" />
				<button class="ql-strike" />
			</span>
			<span class="ql-formats">
				<button class="ql-blockquote" />
				<button class="ql-code-block" />
			</span>
			<span class="ql-formats">
				<button id="tag-button" class="ql-tag">
					<Tag />
				</button>
			</span>
			<span class="ql-formats">
				<button class="ql-clean" />
			</span>
			<span class="ql-formats float-right">
				<button
					id="account-button"
					on:click={() => {
						popoverMenu = accountMenu;
						subMenu = AccountSubMenu;
						displayPopoverMenu = true;
					}}
					bind:this={accountMenu}
				>
					<User />
				</button>
			</span>
			<span class="ql-formats float-right">
				<button id="custom-button" on:click={save}>Save</button>
			</span>
			<span class="ql-formats float-right">
				<button
					id="file-button"
					on:click={() => {
						popoverMenu = fileMenu;
						subMenu = FileSubMenu;
						displayPopoverMenu = true;
					}}
					bind:this={fileMenu}
				>
					File
				</button>
			</span>
			<span class="ql-formats float-right">
				<button id="citation-button" on:click={cite}>Cite</button>
			</span>
		</div>
		<div>Current id: {id}</div>
		<div id="scrolling-container" class="h-80">
			<div bind:this={editor} />
		</div>
		<Popover target={popoverMenu} display={displayPopoverMenu} class="p-2">
			<svelte:component this={subMenu} bind:display={displayPopoverMenu} />
		</Popover>
		<Modal showModal={true}>
			<div id="preview-container">
				{#each post as note}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div role="button" tabindex="0"
						on:click={() => {
							quill.setContents(note.note_json);
							id = note.id;
						}}
					>
						<div bind:this={preview[note.id]} />
					</div>
				{/each}
			</div>
		</Modal>
		<div>requestAuth : {data.requestAuth}</div>
	</div>
</div>

<style lang="postcss">
	@import 'https://cdn.quilljs.com/1.3.7/quill.snow.css';
</style>
