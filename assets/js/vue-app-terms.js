const contributionForm = {
    delimiters: ["((", "))"], // {{}} clashes with jekyll's templating, must change
    template: "#contribute-terms",
    data: function() {
        return {
            form: {} // See template for all fields
        };
    },
    methods: {
        encode: function(data) {
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
        },
        handleSubmit: function() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };
            const dataToEncode = this.form;
            dataToEncode["form-name"] = "contribute-terms-form"; // check template
            axios
                .post("/", this.encode(dataToEncode), axiosConfig)
                .then(function(response) {
                    new Noty({
                        type: "success",
                        layout: "bottomRight",
                        text:
                            "Your contribution has been submitted! <a href='" +
                            response.data +
                            "'>View its progress here</a>"
                    }).show();
                    this.$emit("form-submit-success");
                })
                .catch(function() {
                    new Noty({
                        type: "error",
                        layout: "bottomRight",
                        text:
                            "There was an error processing your request. Please try again."
                    }).show();
                });
        }
    }
};

new Vue({
    el: "#terms",
    delimiters: ["((", "))"], // {{}} clashes with jekyll's templating, must change
    components: { "contribution-form": contributionForm },
    data: {
        terms: [],
        search: "",
        displaySearchResults: false,
        showContributionForm: false,
        searchBarStyle: {
            display: "flex"
        },
        contributeButtonContainerStyle: {
            display: "flex",
            flexDirection: "row-reverse"
        },
        contributionFormStyle: {
            padding: "1rem 0"
        }
    },
    computed: {
        filteredTerms: function() {
            const vm = this;
            if (vm.terms.length > 0) {
                return vm.terms.filter(function(term) {
                    const searchLowercase = vm.search.toLowerCase();
                    const termName = term.term.toLowerCase();
                    const fullTerm = term.full_term.toLowerCase();
                    const description = term.description.toLowerCase();
                    const link = term.link.toLowerCase();
                    return (
                        termName.indexOf(searchLowercase) !== -1 ||
                        fullTerm.indexOf(searchLowercase) !== -1 ||
                        description.indexOf(searchLowercase) !== -1 ||
                        link.indexOf(searchLowercase) !== -1 ||
                        term.category.indexOf(searchLowercase) !== -1
                    );
                });
            }
        }
    },
    created: function() {
        const vm = this;
        loadJson("/terms.json", function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            sortLoadedTerms(data);
            vm.terms = data;
        });
    }
});

function sortLoadedTerms(terms) {
    terms.sort(function(a, b) {
        var nameA = a.term.toUpperCase();
        var nameB = b.term.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}
function loadJson(location, callback) {
    const xhr = getXHR();
    xhr.open("GET", location, true);
    xhr.onreadystatechange = createStateChangeListener(xhr, callback);
    xhr.send();
}
function getXHR() {
    return window.XMLHttpRequest
        ? new window.XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
}
function createStateChangeListener(xhr, callback) {
    return function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                callback(null, JSON.parse(xhr.responseText));
            } catch (err) {
                callback(err, null);
            }
        }
    };
}
