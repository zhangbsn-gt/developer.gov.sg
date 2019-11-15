<template>
  <div id="editor-wrapper">
    <div id="toolbar" style="display: flex">
      <select class="ql-header" :style="{ width: '115px' }">
        <option value="4">Heading</option>
        <option value="5">Sub-heading</option>
        <option selected></option>
      </select>
      <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
      <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
      <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
      <button class="ql-link" v-tooltip.bottom="'Add link'"></button>
      <button class="ql-blockquote" v-tooltip.bottom="'Block Quote'"></button>
      <button class="ql-code-block" v-tooltip.bottom="'Code Block'"></button>
      <button
        class="ql-list"
        value="ordered"
        v-tooltip.bottom="'Ordered List'"
      ></button>
      <button
        class="ql-list"
        value="bullet"
        v-tooltip.bottom="'Unordered List'"
      ></button>
      <button class="ql-hr" v-tooltip.bottom="'Horizontal Line'">
        <span class="sgds-icon sgds-icon-minus"></span>
      </button>
      <button class="ql-clean" v-tooltip.bottom="'Clear formatting'"></button>
      <v-popover trigger="click">
        <button
          class="ql-video tooltip-target"
          v-tooltip.bottom="'Insert video from URL'"
        ></button>
        <template slot="popover">
          <form @submit.prevent="onInsertVideo">
            <label for="video-src">Enter your video's URL</label>
            <input type="text" id="video-src" v-model="videoSrc" />
            <button type="submit" v-close-popover>OK</button>
          </form>
          <div :style="{ textAlign: 'center' }">
            <small :style="{ fontSize: '0.8rem' }"
              >(Video will be inserted at your current cursor location)</small
            >
          </div>
        </template>
      </v-popover>
      <!-- Always keep image as the last element! Will mess up toolbar layout -->
      <v-popover trigger="click">
        <button
          class="ql-image tooltip-target"
          v-tooltip.bottom="'Insert image from URL'"
        ></button>
        <template slot="popover">
          <form @submit.prevent="onInsertImage">
            <label for="image-src">Enter your image's URL</label>
            <input type="text" id="image-src" v-model="imageSrc" />
            <button type="submit" v-close-popover>OK</button>
          </form>
          <div :style="{ textAlign: 'center' }">
            <small :style="{ fontSize: '0.8rem' }"
              >(Image will be inserted at your current cursor location)</small
            >
          </div>
        </template>
      </v-popover>
    </div>
    <div id="editor" class="article"></div>
  </div>
</template>

<script>
import Quill from "quill";
import sanitizeHtml from "sanitize-html";
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";
import { sanitize } from "./index";

import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import "quill/dist/quill.snow.css";

let BlockEmbed = Quill.import("blots/block/embed");

class HrBlot extends BlockEmbed {}
HrBlot.blotName = "hr";
HrBlot.tagName = "hr";
Quill.register(HrBlot);

class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create();
    node.setAttribute("src", url);
    // Set non-format related attributes with static values
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);
    node.setAttribute("style", "width: 100%; min-height: 300px");
    return node;
  }

  static formats(node) {
    // We still need to report unregistered embed formats
    let format = {};
    if (node.hasAttribute("height")) {
      format.height = node.getAttribute("height");
    }
    if (node.hasAttribute("width")) {
      format.width = node.getAttribute("width");
    }
    return format;
  }

  static value(node) {
    return node.getAttribute("src");
  }

  format(name, value) {
    // Handle unregistered embed formats
    if (name === "height" || name === "width") {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "iframe";

Quill.register(VideoBlot);

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
      sanitizedPageContent: "",
      quill: null,
      imageSrc: "",
      videoSrc: ""
    };
  },
  created() {
    this.sanitizedPageContent = sanitize(this.page_content);
  },
  mounted() {
    this.quill = new Quill("#editor", {
      bounds: "#editor-wrapper",
      theme: "snow",
      placeholder: "",
      formats: [
        "bold",
        "font",
        "code",
        "italic",
        "link",
        "size",
        "underline",
        "blockquote",
        "header",
        "indent",
        "list",
        "code-block",
        "image",
        "video",
        "hr"
      ],
      modules: {
        toolbar: {
          container: "#toolbar",
          handlers: {
            hr: this.quillHrHandler,
            video: () => {}, // This needs to exist as a noop, if not by default Quill will open the file dialog.
            image: () => {}
          }
        },
        clipboard: {
          matchVisual: false // Stop quill from auto-adding <br> blocks before headers
        }
      }
    });
    this.quill.clipboard.dangerouslyPasteHTML(this.sanitizedPageContent);
  },
  methods: {
    quillHrHandler() {
      let range = this.quill.getSelection();
      if (range) {
        this.quill.insertEmbed(range.index, "hr", true);
        this.quill.setSelection(range.index + 1);
      }
    },
    onInsertVideo() {
      let range = this.quill.getSelection(true); // true to focus the editor first
      if (this.videoSrc) {
        this.quill.insertEmbed(
          range.index,
          "video",
          this.videoSrc,
          Quill.sources.USER
        );
        this.videoSrc = "";
      }
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
  }
};
</script>

<style>
#editor {
  background-color: white;
}

.tooltip {
  display: block;
  z-index: 1000;
}

.tooltip .tooltip-inner {
  background: #272727;
  color: white;
  border-radius: 4px;
  padding: 4px 8px 4px;
}

.tooltip.popover .popover-inner {
  background: #272727;
  color: white;
  padding: 12px;
  border-radius: 4px;
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
