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




  let NotificationModule = (function(window, document, undefined) {

    let body = document.querySelector("body");

    function createNotification(content, status = "info") {
      let notification;
      if (notification = document.querySelector("div.notification")) {
        notification.classList.remove("hoverable");
        window.setTimeout(function () {
          notification.remove();
        }, 2000);
      }
      let newNotification = Module.generateElementApi("div", ["notification", "clearfix"]);
      if (status.toLowerCase() === "warning") {
        newNotification.appendChild(Module.generateElementApi("i", ["material-icons", "warning", "symbol"], "warning"));
      } else {
        newNotification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "info"));
      }
      newNotification.appendChild(Module.generateElementApi("p", ["message"], content));
      newNotification.appendChild(Module.generateElementApi("i", ["material-icons", "close"], "close"));
      body.appendChild(newNotification);
      newNotification.querySelector(".close").addEventListener("click", function () {
        newNotification.classList.remove("hoverable");
      });
      newNotification.addEventListener("mouseenter", function () {
        newNotification.style.animation = "none";
      });
      window.setTimeout(function () {
        newNotification.classList.add("hoverable");
      }, 2000);
    }

    return {
      createNotificationApi : function (content, status) {
        return createNotification(content, status);
      }
    }

  })(window, document);

  window.setTimeout(function () {
    NotificationModule.createNotificationApi("Wichtige Info", "info");
  },1000);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
