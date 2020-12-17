function init(window, document, undefined) {

  let Module = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
      let el = document.createElement(element.toUpperCase());
      if (classNames) {
        classNames.forEach(function (item) {
          el.classList.add(item);
        });
      }
      if (value) {
        el.innerHTML = value;
      }
      return el;
    }

    return {
      generateElementApi : function (element, classNames, value) {
        return generateElement(element, classNames, value);
      }
    }

  })(window, document);


  let notificationTypes = {
    INFO : "Info",
    SUCCESS : "Success",
    WARNING : "Warning",
    ERROR : "Error",
  }


  let NotificationModule = (function(window, document, undefined) {

    let body = document.querySelector("body");

    function notificationFactory(type, content, interactive = false) {
      let notification = Module.generateElementApi("div", ["notification", "clearfix"]);
      switch (type) {
        case notificationTypes.INFO:
          notification.classList.add("info");
          notification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "info"))
          break;
        case notificationTypes.SUCCESS:
          notification.classList.add("success");
          notification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "done"))
          break;
        case notificationTypes.WARNING:
          notification.classList.add("warning");
          notification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "warning"))
          break;
        case notificationTypes.ERROR:
          notification.classList.add("error");
          notification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "error_outline"))
          break;
      }
      if (interactive && (type === notificationTypes.INFO || type === notificationTypes.WARNING)) {
        notification.classList.add("interactive");
      }
      notification.appendChild(Module.generateElementApi("p", ["message"], content));
      notification.appendChild(Module.generateElementApi("i", ["material-icons", "close"], "close"));
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
    NotificationModule.createNotificationApi(notificationTypes.WARNING, "Irgendwas hat geklappt", true);
  },1000);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
