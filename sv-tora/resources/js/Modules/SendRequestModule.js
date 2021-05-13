/**
 * DEPENDENCIES
 */

import { generalVariables } from "./GeneralModule";
import {createNotification} from "./NotificationModule";
import {GeneralModule} from "../app";

/**
 * This Module contains code responsible for managing HTTP requests (mainly to connect to the backend)
 */

let requests = generalVariables.requests;

// TODO: TEST THIS!

/**
 * This function sends a HTTP Request to the desired url
 * @param method {string} The desired method to use for the request
 * @param url {string} The destination the request should be sent to
 * @param successCallback {function} An function reference to call when the request returns a successful response
 * @param failureCallback {function} An optional function reference to call when the request returns a failure response
 * @param content {object} The content of the request (body)
 */
function sendRequest(method, url, successCallback, failureCallback, content) {
    switch(method) {
        case requests.GET:
            getRequest(url, successCallback, failureCallback);
            break;

        case requests.POST:
            postRequest(url, successCallback, failureCallback, content);
            break;
    }
}

function getRequest(url, successCallback, failureCallback) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (successCallback) {
                successCallback(json);
            }
        });
}

function postRequest(url, successCallback, failureCallback, content) {
    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch(url, {
        method: requests.POST,
        body: JSON.stringify(content),
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "X-CSRF-TOKEN": csrfToken,
        }
    })
        .then(response => response.json())
        .then(json => {
            if ("type" in json) {
                switch (json["type"]) {
                    case "error":
                        createNotification(GeneralModule.generalVariables.notificationTypes.ERROR, json["message"], json["timestamp"], json["sender"]);
                        if (failureCallback) {
                            failureCallback(json);
                        }
                        break;
                    case "success":
                        createNotification(GeneralModule.generalVariables.notificationTypes.SUCCESS, json["message"], json["timestamp"], json["sender"]);
                        if (successCallback) {
                            successCallback(json);
                        }
                        break;
                }
            }
        });
}

/**
 * API:
 */
export {
    sendRequest
}
