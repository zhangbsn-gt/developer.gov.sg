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
            <button class="ql-hr">
                <span class="sgds-icon sgds-icon-minus"></span>
            </button>
            <button class="ql-clean"></button>
            <!-- Always keep image as the last element! Will mess up toolbar layout -->
            <v-popover trigger="click">
                <button class="ql-image tooltip-target"></button>
                <template slot="popover">
                    <form @submit.prevent="onInsertImage">
                        <label for="image-src">Enter your image's URL</label>
                        <input type="text" id="image-src" v-model="imageSrc" />
                        <button type="submit" v-close-popover>OK</button>
                    </form>
                    <div :style="{textAlign: 'center'}">
                        <small
                            :style="{fontSize: '0.8rem'}"
                        >(Image will be inserted at your current cursor location)</small>
                    </div>
                </template>
            </v-popover>
        </div>
        <div id="editor"></div>
    </div>
</template>

<script>
import Quill from "quill";
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import "quill/dist/quill.snow.css";

let BlockEmbed = Quill.import("blots/block/embed");
class HrBlot extends BlockEmbed {}
HrBlot.blotName = "hr";
HrBlot.tagName = "hr";
Quill.register({
    "formats/hr": HrBlot
});

export default {
    directives: {
        tooltip: VTooltip,
        "close-popover": VClosePopover
    },
    components: {
        "v-popover": VPopover
    },
    props: {
        page_content: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            quill: null,
            imageSrc: ""
        };
    },
    methods: {
        quillHrHandler() {
            let range = this.quill.getSelection();
            if (range) {
                this.quill.insertEmbed(range.index, "hr", true);
                this.quill.setSelection(range.index + 1);
            }
        },
        quillImageHandler() {
            // This needs to exist as a blank method, if not by default Quill will open the file dialog.
        },
        onInsertImage() {
            let range = this.quill.getSelection(true); // true to focus the editor first
            if (this.imageSrc) {
                this.quill.insertEmbed(
                    range.index,
                    "image",
                    this.imageSrc,
                    Quill.sources.USER
                );
                this.imageSrc = "";
            }
        }
    },
    mounted() {
        this.quill = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: {
                    container: "#toolbar",
                    handlers: {
                        hr: this.quillHrHandler,
                        image: this.quillImageHandler
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


<style>
.ql-editor {
    font-size: 1rem !important;
    line-height: calc(1rem + 0.5rem) !important;
}

.ql-editor h1,
.original-content h1 {
    font-size: 3.375rem !important;
    line-height: 3.75rem !important;
    letter-spacing: -1.5px !important;
    margin-bottom: 1rem !important;
}

.ql-editor h2,
.original-content h2 {
    font-size: 2.75rem !important;
    line-height: 3.75rem !important;
    margin-bottom: 1rem !important;
}

.ql-editor h3,
.original-content h3 {
    font-size: 2rem !important;
    line-height: 2.8125rem !important;
    margin-bottom: 1rem !important;
}

.ql-editor h4,
.original-content h4 {
    font-size: 1.625rem !important;
    line-height: 2.25rem !important;
    font-weight: 600 !important;
    color: #e79529;
    margin-bottom: 1rem !important;
}

.ql-editor h5,
.original-content h5 {
    font-size: 1.375rem !important;
    line-height: 1.875rem !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
}

.ql-editor h6,
.original-content h6 {
    font-size: 1.3rem !important;
    line-height: 1.5rem !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
}

.ql-editor ul > li {
    list-style-type: disc !important;
}

.ql-editor ul > li::before {
    content: none !important;
}

.ql-editor ul {
    padding: 0px !important;
    list-style: disc outside !important;
    margin-left: 1rem !important;
    margin-top: 1em !important;
}

.ql-editor li {
    display: list-item !important;
    text-align: -webkit-match-parent !important;
    padding: 0px !important;
    margin-top: 1em !important;
}

.ql-editor p,
.original-content p {
    margin-bottom: 1em !important;
}

.ql-editor a,
.original-content a {
    cursor: pointer !important;
    text-decoration: none !important;
}

.original-content {
    border: 1px solid #ccc;
    overflow-y: auto;
    padding: 12px 15px;
}

.ql-editor hr,
.original-content hr {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.tooltip {
    display: block;
    z-index: 1000;
}
.tooltip.popover .popover-inner {
    background: #272727;
    color: white;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #272727;
    z-index: 1;
}

.tooltip[x-placement^="top"] {
    margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
    margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
    margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip[x-placement^="left"] {
    margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
}
</style>