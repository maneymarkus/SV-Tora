function init(window, document, undefined) {
  if (document.getElementsByTagName("form")[0]) {

    let modalWindow = document.getElementsByClassName("modal-window")[0];
    let forms = document.getElementsByTagName("form");
    forms = Array.prototype.slice.call(forms);

    if (document.getElementById("password-label")) {
      let passwordLabel = document.getElementById("password-label");
      let passwordIcon = passwordLabel.getElementsByTagName("i")[0];
      let passwordInput = document.getElementById("password");

      passwordLabel.addEventListener("click", function (e) {
        let ev = e || window.event;
        ev.preventDefault();
        passwordInput.focus();
        if (passwordInput.type == "password") {
          passwordIcon.innerHTML = "lock_open";
          passwordInput.type = "text";
        } else {
          passwordIcon.innerHTML = "lock";
          passwordInput.type = "password";
        }
      });
    }

    forms.forEach(function (item) {

      item.addEventListener("focusout", function (e) {
        let ev = e || window.event;
        let target = ev.target || window.target;
        if (target.value) {
          target.classList.add("filled");
        } else {
          target.classList.remove("filled");
        }
      });

      item.addEventListener("keydown", function (e) {
        let ev = e || window.event;
        let keyNum = ev.keyCode || ev.which;
        if (keyNum == 13) { // key for enter
          /*if (!InputsModule.checkIfInputsFilledApi(item)) {
            ev.preventDefault();
          }*/
        }
      });

      if (item.querySelector("button.login-button")) {
        item.querySelector("button.login-button").addEventListener("click", function (e) {
          e.preventDefault();
          modalWindow.classList.add("sent");
          document.getElementsByTagName("body")[0].classList.add("sent");
          window.setTimeout(function () {
            item.submit();
          }, 3000);
        });
      }

    });
  }
}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
