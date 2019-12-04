import Vue from "vue";
import Vuex from "vuex";
import { Editor } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";

Vue.use(Vuex);

const pageEditor = {
  namespaced: true,
  state: {
    editor: new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      content: `
      <h2>Compose page</h2>
      <p>You can compose <em>rich</em> <strong>content</strong> here.</p>
      <blockquote><p>Use the menu bar above to customise the look of your page!</p></blockquote>`
    })
  },
  mutations: {
    setContent({ editor }, content) {
      editor.setContent(content);
    },
    destroyEditor({ editor }) {
      editor.destroy();
    }
  },
  actions: {
    setEditorContent({ commit }, content) {
      commit("setContent", content);
    },
    destroyEditor({ commit }) {
      commit("destroyEditor");
    }
  },
  getters: {}
};

export default new Vuex.Store({
  modules: {
    pageEditor
  }
});
