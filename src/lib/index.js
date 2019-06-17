export function urlEncode(data) {
    const encodedDataArray = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            encodedDataArray.push(
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            );
        }
    }
    return encodedDataArray.join("&");
}

export function sortLoadedTerms(terms) {
    terms.sort((a, b) => {
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

export function loadJson(location, callback) {
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

export const emailRegex =
    process.env.NODE_ENV === "production"
        ? /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]{1,62}\.)*gov\.sg$/
        : /.*/;
