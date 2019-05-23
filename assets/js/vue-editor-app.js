const editorModal = {
    delimiters: ["((", "))"],
    template: "#editor-modal",
    props: ["initial_content", "page_path", "page_title", "page_category"],
    data() {
        return {
            form_name: "edit-form",
        };
    },
    methods: {
        submit() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };
            this.page_content = document.querySelector(".ql-editor").innerHTML;
            const dataToEncode = {
                page_path: this.page_path,
                page_title: this.page_title,
                page_category: this.page_category,
                page_content: this.page_content,
                form_name: this.form_name
            };
            dataToEncode["form-name"] = this.form_name;
            axios
                .post("/", urlEncode(dataToEncode), axiosConfig)
                .then(response => {
                    new Noty({
                        type: "success",
                        layout: "bottomRight",
                        text:
                            "Your contribution has been submitted! <a href='https://github.com/GovTechSG/developer.gov.sg/pulls'>View its progress here</a>"
                    }).show();
                    this.$emit("form-submit-success");
                })
                .catch(function(error) {
                    new Noty({
                        type: "error",
                        layout: "bottomRight",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        }
    },
    mounted() {
        this.editor = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    ["bold", "italic", "underline", "link"],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"]
                    // [{ header: 1 }, { header: 2 }], // custom button values
                    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    // [{ direction: "rtl" }], // text direction
                    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    // [{ font: [] }],
                    // [{ align: [] }],
                ]
            }
        });
    }
};

new Vue({
    el: "#edit-app",
    delimiters: ["((", "))"],
    components: {
        editorModal
    },
    data: {
        showEditorModal: false
    },
    methods: {
        openEditor(pageTitle, pagePermalink, page_category) {
            this.page_path = pagePermalink;
            this.page_title = pageTitle;
            this.page_category = page_category;
            this.content = document.getElementsByClassName(
                "article"
            )[0].innerHTML;
            this.showEditorModal = true;
        }
    }
});

function urlEncode(data) {
    const encodedDataArray = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            encodedDataArray.push(
                encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            );
        }
    }
    return encodedDataArray.join("&");
}