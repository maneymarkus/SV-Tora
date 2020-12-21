/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

let NotificationModule = (function(window, document, undefined) {

  let body = document.querySelector("body");
  let message = false;

  let notificationTypes = GeneralModule.generalVariables.notificationTypes;

  function notificationFactory(type, content, interactive = false) {
    let notification = GeneralModule.generateElementApi("div", ["notification", "clearfix"]);
    switch (type) {
      case notificationTypes.INFO:
        notification.classList.add("info");
        notification.appendChild(GeneralModule.generateElementApi("i", ["material-icons", "symbol"], "info"))
        break;
      case notificationTypes.SUCCESS:
        notification.classList.add("success");
        notification.appendChild(GeneralModule.generateElementApi("i", ["material-icons", "symbol"], "done"))
        break;
      case notificationTypes.WARNING:
        notification.classList.add("warning");
        notification.appendChild(GeneralModule.generateElementApi("i", ["material-icons", "symbol"], "warning"))
        break;
      case notificationTypes.ERROR:
        notification.classList.add("error");
        notification.appendChild(GeneralModule.generateElementApi("i", ["material-icons", "symbol"], "error_outline"))
        break;
    }
    if (interactive && (type === notificationTypes.INFO || type === notificationTypes.WARNING)) {
      notification.classList.add("interactive");
    }
    notification.appendChild(GeneralModule.generateElementApi("p", ["message"], content));
    notification.appendChild(GeneralModule.generateElementApi("i", ["material-icons", "close"], "close"));
    notification.querySelector(".close").addEventListener("click", function () {
      removeNotification(notification);
    });
    notification.addEventListener("mouseenter", function () {
      notification.style.animation = "none";
    });
    return notification;
  }

  function createNotification(type, content, interactive, timestamp, sender) {
    let newNotification = notificationFactory(type, content, interactive);
    if (!message) {
      appendNotification(newNotification);
    } else {
      appendMessage(newNotification, timestamp, sender);
    }
  }

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
      }, 5000);
    }
  }

  function removeNotification(notification) {
    notification.classList.remove("visible");
    window.setTimeout(function () {
      notification.remove();
    }, 2000);
  }

  /*
    Local Behaviour bound to messages page (new notifications get appended as messages)
   */
  if (document.querySelector("div.message-container")) {

    message = true;

    let messageContainer = document.querySelector("div.message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;

    /**
     * This function appends a notification to the message container (only necessary when new notification appears when user is currently on messages site)
     * @param notification DOM element of the notification
     * @param timestamp String when the notification has been created (Format: dd.mm.yyyy hh:mm (because no further frontend processing needed))
     * @param sender String where the notification has been created (source)
     */
    function appendMessage(notification, timestamp, sender) {
      let message = GeneralModule.generateElementApi("div", ["message", "new", "unread"]);
      message.appendChild(GeneralModule.generateElementApi("p", ["time"], timestamp));
      message.appendChild(GeneralModule.generateElementApi("p", ["sender"], sender));
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

  return {
    createNotificationApi : function (type, content, interactive, timestamp, sender) {
      createNotification(type, content, interactive, timestamp, sender);
    }
  }

})(window, document);

window.setTimeout(function () {
  NotificationModule.createNotificationApi(GeneralModule.generalVariables.notificationTypes.WARNING, "Irgendwas hat geklappt", true);
},1000);
