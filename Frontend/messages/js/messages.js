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
    SUCCESS : "Success",
    ERROR : "Error",
    WARNING : "Warning",
    INFO : "Info",
  };


  let MessagesModule = (function(window, document, undefined) {

    let messageContainer = document.querySelector("div.message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;

    /**
     * This function appends a notification to the message container (only necessary when new notification appears when user is currently on messages site)
     * @param notification DOM element of the notification
     * @param timestamp String when the notification has been created (Format: dd.mm.yyyy hh:mm (because no further frontend processing needed))
     * @param sender String where the notification has been created (source)
     */
    function appendMessage(notification, timestamp, sender) {
      let message = Module.generateElementApi("div", ["message", "new", "unread"]);
      message.appendChild(Module.generateElementApi("p", ["time"], timestamp));
      message.appendChild(Module.generateElementApi("p", ["sender"], sender));
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

    return {
      appendMessageApi : function (notification, timestamp, sender) {
        return appendMessage(notification, timestamp, sender);
      }
    }

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
