/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

let NotificationModule = (function(window, document, undefined) {

  let body = document.querySelector("body");

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

  function createNotification(type, content, interactive) {
    let newNotification = notificationFactory(type, content, interactive);
    appendNotification(newNotification);
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

  return {
    createNotificationApi : function (type, content, interactive) {
      return createNotification(type, content, interactive);
    }
  }

})(window, document);

window.setTimeout(function () {
  NotificationModule.createNotificationApi(GeneralModule.generalVariables.notificationTypes.WARNING, "Irgendwas hat geklappt", true);
},1000);
