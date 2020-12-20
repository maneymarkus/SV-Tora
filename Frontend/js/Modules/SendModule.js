/*
  Dependencies: None
 */

let SendModule = (function (window, document, undefined) {

    // TODO: TEST THIS!

    function sendRequest(method, url, callback, content) {
        switch(method) {
            case requests.GET:
                getRequest(url, callback);
                break;

            case requests.POST:
                postRequest(url, callback, content);
                break;
        }
    }

    function getRequest(url, callback) {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            callback(json);
        });
    }

    function postRequest(url, callback, content) {
        fetch(url, {
            method: requests.POST,
            body: JSON.stringify(content),
            header: {
                "content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            callback(json);
        });
    }

    return {
        sendRequestApi : function (method, url, callback, content) {
            sendRequest(method, url, callback, content);
        },
    }

})(window, document);