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
 * This function simply sends a GET request to the specified url and returns the retrieved data
 * @param url
 * @param callback
 */
async function getData(url, callback) {
    fetch(url)
        .then(response => {
            if (response.status === 403) {
                createNotification(generalVariables.notificationTypes.ERROR, "Dir fehlen die nötigen Berechtigungen für diese Aktion.", undefined, undefined);
            } else {
                return response.json()
            }
        })
        .then(data => {
            handleJsonResponse(data, callback);
        });
}

/**
 * This function sends a HTTP Request to the desired url
 * @param method {string} The desired method to use for the request
 * @param url {string} The destination the request should be sent to
 * @param callback {function} A function reference to call when the request returns a response
 * @param content {object} The content of the request (body)
 * @param loader {boolean} Determines if a loader animation should be used on the whole page
 */
async function sendRequest(method, url, callback, content, loader = false) {
    switch(method) {
        case generalVariables.requests.GET:
            getRequest(url, callback, loader);
            break;

        case generalVariables.requests.POST:
        case generalVariables.requests.DELETE:
        case generalVariables.requests.PUT:
            postRequest(method, url, callback, content, loader);
            break;
    }
}

async function getRequest(url, callback, loader) {
    if (loader) {
        addBigLoader();
    }
    fetch(url)
        .then(response => {
            if (loader) {
                removeBigLoader();
            }
            if (response.status === 403) {
                createNotification(generalVariables.notificationTypes.ERROR, "Dir fehlen die nötigen Berechtigungen für diese Aktion.", undefined, undefined);
            } else {
                return response.json()
            }
        })
        .then(json => {
            handleJsonResponse(json, callback);
        });
}

async function postRequest(method, url, callback, content, loader) {
    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    if (loader) {
        addBigLoader();
    }

    fetch(url, {
        method: method,
        body: JSON.stringify(content),
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "X-CSRF-TOKEN": csrfToken,
        }
    })
        .then(response => {
            if (loader) {
                removeBigLoader();
            }
            if (response.status === 403) {
                createNotification(generalVariables.notificationTypes.ERROR, "Dir fehlen die nötigen Berechtigungen für diese Aktion.", undefined, undefined);
            } else {
                return response.json()
            }
        })
        .then(json => {
            handleJsonResponse(json, callback);
        });
}

function handleJsonResponse(json, callback) {
    //TODO: remove console.log!
    console.log(json);
    let error = false;
    if (typeof json["type"] !== "undefined") {
        switch (json["type"]) {
            case "error":
                error = true;
                createNotification(generalVariables.notificationTypes.ERROR, json["message"], json["timestamp"], json["sender"]);
                break;
            case "success":
                createNotification(generalVariables.notificationTypes.SUCCESS, json["message"], json["timestamp"], json["sender"]);
                break;
        }
    }
    if (typeof json["redirectUrl"] !== "undefined") {
        window.location.href = json["redirectUrl"];
    }
    if (!error && callback && typeof callback == "function") {
        callback(json);
    }
}

/**
 * API:
 */
export {
    sendRequest,
    getData
}
