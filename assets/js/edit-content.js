// register modal component
Vue.component('modal', {
  delimiters: ["((", "))"],
  template: '#modal-template',
  props: ['content'],
  mounted: function () {
    var editor = new Quill('#editor', {
      theme: 'snow'
    });
  }
})

// start app
new Vue({
  el: '#edit-app',
  delimiters: ["((", "))"],
  data: {
    showModal: false,
    content: "",
    pageTitle: "",
    pagePath: ""
  },
  methods: {
    submitForm: function (event) {
      var self = this;
      self.showModal = false;
      var editedHtml = document.getElementsByClassName("ql-editor")[0].outerHTML;
      document.getElementById("page_path").value = self.pagePath;
      document.getElementById("page_content").value = editedHtml;
      document.getElementById("page_title").value = self.pageTitle;
      document.getElementById("form_name").value = "edit-form";
      document.getElementById("edit-form-button").click();
    },
    editClick: function (title) {
      var self = this;
      self.pagePath = document.location.pathname;
      self.pageTitle = title;
      self.content = document.getElementsByClassName("devportal-editable")[0].outerHTML;
      self.showModal = true;
    }
  }
})
