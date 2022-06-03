<template>
  <!-- TODO: rewire the editor. Breaking changes when updating tiptap from v1 to v2 -->
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="material-icons">format_bold</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="material-icons">format_italic</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="material-icons">format_strikethrough</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="material-icons">format_underline</i>
        </button>

        <!-- todo: use select instead of button row for P, H1, ... -->
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          P
        </button>

        <button
          type="button"
          v-for="headingLevel of [1, 2, 3, 4, 5, 6]"
          :key="headingLevel"
          class="menubar__button"
          :class="{
            'is-active': isActive.heading({ level: headingLevel })
          }"
          @click="commands.heading({ level: headingLevel })"
        >
          H{{ headingLevel }}
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="material-icons">format_list_bulleted</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="material-icons">format_list_numbered</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="material-icons">format_quote</i>
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="material-icons">code</i>
          (selection)
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="material-icons">code</i>
          (block)
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <i class="material-icons">
            remove
          </i>
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <i class="material-icons">
            image
          </i>
        </button>

        <button type="button" class="menubar__button" @click="commands.undo">
          <i class="material-icons">
            undo
          </i>
        </button>

        <button type="button" class="menubar__button" @click="commands.redo">
          <i class="material-icons">
            redo
          </i>
        </button>

        <button
          class="menubar__button"
          @click.prevent="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })
          "
        >
          <img :src="TableIcons.Table" alt="create-table" />
        </button>
        <div :style="{flexBasis: '100%', height: 0}"></div> <!-- flex break -->
        <div class="table-controls" v-if="isActive.table()" >
          <button class="menubar__button" @click.prevent="commands.deleteTable">
            <img :src="TableIcons.DeleteTable" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.addColumnBefore">
            <img :src="TableIcons.AddColBefore" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.addColumnAfter">
            <img :src="TableIcons.AddColAfter" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.deleteColumn">
            <img :src="TableIcons.DeleteCol" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.addRowBefore">
            <img :src="TableIcons.AddRowBefore" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.addRowAfter">
            <img :src="TableIcons.AddRowAfter" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.deleteRow">
            <img :src="TableIcons.DeleteRow" alt="" />
          </button>
          <button class="menubar__button" @click.prevent="commands.toggleCellMerge">
            <img :src="TableIcons.CombineCells" alt="" />
          </button>
        </div>
      </div>
    </editor-menu-bar>
    <editor-menu-bubble
      class="menububble"
      :editor="editor"
      @hide="hideLinkMenu"
      v-slot="{ commands, isActive, getMarkAttrs, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <form
          class="menububble__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="menububble__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
          <button
            class="menububble__button"
            @click="setLinkUrl(commands.link, null)"
            type="button"
          >
            remove
          </button>
        </form>

        <template v-else>
          <button
            type="button"
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
            <i class="material-icons" :style="{ marginLeft: '2px' }">link</i>
          </button>
        </template>
      </div>
    </editor-menu-bubble>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-2";
import { mapState, mapActions } from "vuex";
import TableIcons from "./TableIcons";

export default {
  name: "text-editor",
  components: {
    EditorContent,
    FloatingMenu,
    BubbleMenu
  },
  props: {
    initialContent: {
      type: String
    }
  },
  data() {
    return {
      linkUrl: null,
      linkMenuIsActive: false,
      TableIcons
    };
  },
  computed: {
    ...mapState("pageEditor", ["editor"])
  },
  methods: {
    ...mapActions("pageEditor", ["initializeEditor", "destroyEditor"]),
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  },
  created() {
    this.initializeEditor(this.initialContent);
  },
  beforeDestroy() {
    this.destroyEditor();
  }
};
</script>

<style>
.ProseMirror {
  margin: 1rem 0;
}
.editor__content .tableWrapper table tbody tr td {
  border-width: 1px;
}
</style>

<style scoped>
.editor {
  position: relative;
}

.menubar {
  position: sticky;
  top: -1rem;
  z-index: 50;
  padding: 1rem 0.5rem;

  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid #c3c3c3;
}
.menubar__button {
  background: #fff;
  border: 1px solid #e3e3e300;
  /* border-radius: 6px; */
  margin: 0 1px;

  display: flex;
  align-items: center;
  min-width: 2.6rem;

  display: flex;
  justify-content: center;

  transition: all 0.2s;
}
.menubar__button:hover {
  cursor: pointer;
  background: #efefef;
}
.menubar__button.is-active {
  color: #1379ff;
  background-color: #efefef;
  font-weight: bolder;
}

.table-controls {
  display: flex;
  margin-top: 1rem;
}

.menububble {
  position: absolute;
  display: flex;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;

  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
}

.menububble.is-active {
  opacity: 1;
  visibility: visible;
}
.menububble__input {
  border-radius: 3px;
}
.menububble__button {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  /* border-radius: 3px; */
  cursor: pointer;
}
.menububble__button:active {
  color: #000;
  background-color: #fff;
}

.editor__content {
  border: 1px solid #e3e3e3;
}
.editor__content img {
  display: block;
  margin: 0 auto;
}
</style>
