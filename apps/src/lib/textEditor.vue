<template>
<div id="editor-wrapper">
    <!-- Mount Quill Here -->
    <div id="toolbar">
        <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option></option>
        </select>
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-link"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-image"></button>
        <button class="ql-hr">
            <span class="sgds-icon sgds-icon-minus"></span>
        </button>
        <button class="ql-clean"></button>
    </div>
    <div id="editor"></div>
</div>
</template>

<script>

import Quill from "quill";
let BlockEmbed = Quill.import("blots/block/embed");
class HrBlot extends BlockEmbed {}
HrBlot.blotName = "hr";
HrBlot.tagName = "hr";
Quill.register({
    "formats/hr": HrBlot
});

export default {
    props: {
        page_content: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            quill: null
        }
    },
    mounted() {
        this.quill = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: {
                    container: "#toolbar",
                    handlers: {
                        hr() {
                            let range = this.quill.getSelection();
                            if (range) {
                                this.quill.insertEmbed(range.index, "hr", true);
                                this.quill.setSelection(range.index + 1);
                            }
                        }
                    }
                },
                clipboard: {
                    matchVisual: false // Stop quill from auto-adding <br> blocks before headers
                }
            }
        });
        this.quill.clipboard.dangerouslyPasteHTML(this.page_content);
    }
};
</script>