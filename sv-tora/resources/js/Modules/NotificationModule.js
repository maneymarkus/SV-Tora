/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";

/**
 * This Module contains code responsible for managing application specific primary buttons
 */

let body = document.querySelector("body");
let message = false;

let notificationTypes = GeneralModule.generalVariables.notificationTypes;

/**
 * This function creates a notification
 * @param type {string} This indicates the type of the notification to be created
 * @param content {string} The actual content to be displayed inside the notification
 * @return {HTMLElement}
 */
function notificationFactory(type, content) {
    let notification = GeneralModule.generateElement("div", ["notification", "clearfix"]);
    switch (type) {
        case notificationTypes.INFO:
            notification.classList.add("info");
            notification.appendChild(GeneralModule.generateElement("i", ["material-icons", "symbol"], "info"))
            break;
        case notificationTypes.SUCCESS:
            notification.classList.add("success");
            notification.appendChild(GeneralModule.generateElement("i", ["material-icons", "symbol"], "done"))
            break;
        case notificationTypes.WARNING:
            notification.classList.add("warning");
            notification.appendChild(GeneralModule.generateElement("i", ["material-icons", "symbol"], "warning"))
            break;
        case notificationTypes.ERROR:
            notification.classList.add("error");
            notification.appendChild(GeneralModule.generateElement("i", ["material-icons", "symbol"], "error_outline"))
            break;
    }
    notification.appendChild(GeneralModule.generateElement("p", ["message"], content));
    notification.appendChild(GeneralModule.generateElement("i", ["material-icons", "close"], "close"));
    notification.querySelector(".close").addEventListener("click", function () {
        removeNotification(notification);
    });
    notification.addEventListener("mouseenter", function () {
        notification.style.animation = "none";
    });
    return notification;
}

/**
 * This function creates either a new message or a new notification (depending on the site the user is currently on)
 * @param type {string} This indicates the type of the notification to be created
 * @param content {string} The actual content to be displayed inside the notification
 * @param timestamp {string} Each message has a timestamp (when it has been created)
 * @param sender {string} Each message has a sender (where it has originated from)
 */
function createNotification(type, content, timestamp, sender) {
    let newNotification = notificationFactory(type, content);
    if (!message) {
        appendNotification(newNotification);
    } else {
        appendMessage(newNotification, timestamp, sender);
    }
}

/**
 * This function appends a notification to the body and manages the displaying animation (any "old" notification will be removed)
 * @param notification {HTMLElement} The notification to be appended
 */
function appendNotification(notification) {
    if (document.querySelector("div.notification")) {
        let oldNotification = document.querySelector("div.notification");
        removeNotification(oldNotification);
        body.appendChild(notification);
        window.setTimeout(function () {
            notification.classList.add("visible");
        }, 2100);
    } else {
        body.appendChild(notification);
        window.setTimeout(function () {
            notification.classList.add("visible");
        }, 100);
    }
    if (notification.classList.contains("success") || notification.classList.contains("error")) {
        window.setTimeout(function () {
            removeNotification(notification);
        }, 10000);
    }
}

/**
 * This function handles the detachment of a given notification
 * @param notification {HTMLElement} The notification to be detached
 */
function removeNotification(notification) {
    notification.classList.remove("visible");
    window.setTimeout(function () {
        notification.remove();
    }, 2000);
}

/**
 * This block contains code responsible for managing behavior special to only the messages page (in regard of new notification (new notifications there get appended as messages))
 */
if (document.querySelector("div.message-container")) {

    message = true;

    let messageContainer = document.querySelector("div.message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;

    /**
     * This function appends a notification to the message container (only necessary when new notification appears when user is currently on messages site)
     * @param notification {HTMLElement} The notification to be appended (as a new message)
     * @param timestamp {string} Contains the information when the notification has been created (Format: dd.mm.yyyy hh:mm (because no further frontend processing needed))
     * @param sender {string} Contains the information where the notification has been created (source)
     */
    function appendMessage(notification, timestamp, sender) {
        let message = GeneralModule.generateElement("div", ["message", "new", "unread"]);
        message.appendChild(GeneralModule.generateElement("p", ["time"], timestamp));
        message.appendChild(GeneralModule.generateElement("p", ["sender"], sender));
        message.appendChild(notification);
        let scrollDown = false;
        if ((messageContainer.clientHeight + messageContainer.scrollTop) >= messageContainer.scrollHeight) {
            scrollDown = true;
        }
        messageContainer.appendChild(message);
        window.setTimeout(function () {
            message.classList.remove("new");
        }, 1);
        if (scrollDown) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
            window.setTimeout(function () {
                message.classList.remove("unread");
            }, 5000);
        } else {
            messageContainer.addEventListener("scroll", function () {
                handleScroll(message);
            });
        }
    }

    /**
     * This function handles the correct and user comfortable display of new messages (new messages have a specific style -> once the user read the message this style is removed)
     * @param message {HTMLElement} The new message element which gets its "unread" styles removed once scrolled into visibility
     */
    function handleScroll(message) {
        let messageOffset = message.offsetTop + message.offsetHeight;
        if ((messageContainer.clientHeight + messageContainer.scrollTop) >= messageOffset) {
            window.setTimeout(function () {
                message.classList.remove("unread");
            }, 3000);
            messageContainer.removeEventListener("scroll", handleScroll);
        }
    }

}

/**
 * API:
 */
export {
    createNotification
}
