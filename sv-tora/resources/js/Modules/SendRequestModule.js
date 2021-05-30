/**
 * DEPENDENCIES
 */

import { generalVariables } from "./GeneralModule";
import {createNotification} from "./NotificationModule";
import { addBigLoader, removeBigLoader } from "./LoaderModule";

/**
 * This Module contains code responsible for managing HTTP requests (mainly to connect to the backend)
 */

let requests = generalVariables.requests;

/**
 * This function sends a HTTP Request to the desired url
 * @param method {string} The desired method to use for the request
 * @param url {string} The destination the request should be sent to
 * @param successCallback {function} An function reference to call when the request returns a successful response
 * @param failureCallback {function} An optional function reference to call when the request returns a failure response
 * @param content {object} The content of the request (body)
 * @param loader {boolean} Determines if a loader animation should be used on the whole page
 */
function sendRequest(method, url, successCallback, failureCallback, content, loader = false) {
    switch(method) {
        case generalVariables.requests.GET:
            getRequest(url, successCallback, failureCallback, loader);
            break;

        case generalVariables.requests.POST:
            postRequest(url, successCallback, failureCallback, content, loader);
            break;
    }
}

function getRequest(url, successCallback, failureCallback, loader) {
    if (loader) {
        addBigLoader();
    }
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (loader) {
                removeBigLoader();
            }
            handleJsonResponse(json, successCallback, failureCallback);
        });
}

function postRequest(url, successCallback, failureCallback, content, loader) {
    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    if (loader) {
        addBigLoader();
    }

    fetch(url, {
        method: generalVariables.requests.POST,
        body: JSON.stringify(content),
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "X-CSRF-TOKEN": csrfToken,
        }
    })
        .then(response => response.json())
        .then(json => {
            if (loader) {
                removeBigLoader();
            }
            handleJsonResponse(json, successCallback, failureCallback);
        });
}

function handleJsonResponse(json, successCallback, failureCallback) {
    //TODO: remove!
    console.log(json);
    if ("type" in json) {
        switch (json["type"]) {
            case "error":
                createNotification(generalVariables.notificationTypes.ERROR, json["message"], json["timestamp"], json["sender"]);
                if (failureCallback) {
                    failureCallback(json);
                }
                break;
            case "success":
                createNotification(generalVariables.notificationTypes.SUCCESS, json["message"], json["timestamp"], json["sender"]);
                if (successCallback) {
                    successCallback(json);
                }
                break;
        }
    } else {
        if (successCallback) {
            successCallback(json);
        }
    }
}

/**
 * API:
 */
export {
    sendRequest
}
