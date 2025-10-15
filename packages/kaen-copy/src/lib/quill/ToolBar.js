// @ts-nocheck
export const editorChange =
	(quill, customButton, tagButton) =>
	(eventName, ...args) => {
		if (quill.getFormat().custom) {
			customButton.classList.add('ql-active');
		} else {
			customButton.classList.remove('ql-active');
		}
		if (quill.getFormat().tag) {
			tagButton.classList.add('ql-active');
		} else {
			tagButton.classList.remove('ql-active');
		}
	};
