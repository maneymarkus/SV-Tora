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




  let MessagesModule = (function(window, document, undefined) {

    let messageContainer = document.querySelector("div.message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;

    function createMessage(content, timestamp, sender, status = "info", interactive = false) {
      let message = Module.generateElementApi("div", ["message", "new", "unread"]);
      message.appendChild(Module.generateElementApi("p", ["time"], timestamp));
      message.appendChild(Module.generateElementApi("p", ["sender"], sender));
      let notification;
      if (interactive) {
        notification = Module.generateElementApi("div", ["notification", "interactive", "clearfix"])
      } else {
        notification = Module.generateElementApi("div", ["notification", "clearfix"])
      }
      if (status.toLowerCase() === "warning") {
        notification.appendChild(Module.generateElementApi("i", ["material-icons", "warning", "symbol"], "warning"));
      } else {
        notification.appendChild(Module.generateElementApi("i", ["material-icons", "symbol"], "info"));
      }
      notification.appendChild(Module.generateElementApi("p", ["message"], content));
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
      createMessageApi : function (content, timestamp, sender, status, interactive) {
        return createMessage(content, timestamp, sender, status, interactive);
      }
    }

  })(window, document);

  window.setTimeout(function () {
    MessagesModule.createMessageApi("Wichtige Info", "25.11.2020 20:11", "System", "info", true);
  },1000);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
