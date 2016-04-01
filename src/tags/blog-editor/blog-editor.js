const EditorTag = {
	init() {
		this.text = '';
	},
	textChange() {
		this.text = this.editorContent.value;
	}
};

export default EditorTag;
