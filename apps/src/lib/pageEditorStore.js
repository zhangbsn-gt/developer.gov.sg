import Vue from "vue";
import Vuex from "vuex";

import { Editor } from "@tiptap/core";
import StartKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const extensions = [
  StartKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Image,
  Link,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Underline,
];

Vue.use(Vuex);

const pageEditor = {
  namespaced: true,
  state: {
    editor: null,
  },
  mutations: {
    setContent({ editor }, content) {
      editor.setContent(content);
    },
    destroyEditor({ editor }) {
      editor.destroy();
    },
    initializeEditor(state, content) {
      if (content == null) {
        // don't use !content to allow 0, "" etc.
        state.editor = new Editor({
          extensions,
          content: `<h1>This is a page builder.</h1>
<p>You can compose <em>rich</em> <strong>content</strong> here.</p>`,
        });
      } else {
        state.editor = new Editor({
          extensions,
          content: content,
        });
      }
    },
  },
  actions: {
    initializeEditor({ commit }, content) {
      commit("initializeEditor", content);
    },
    setEditorContent({ commit }, content) {
      commit("setContent", content);
    },
    destroyEditor({ commit }) {
      commit("destroyEditor");
    },
  },
  getters: {},
};

export default new Vuex.Store({
  modules: {
    pageEditor,
  },
});
