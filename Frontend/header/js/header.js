function init(window, document, undefined) {


  let HeaderModule = (function(window, document, undefined) {

    let header = document.querySelector("header");
    let nav = document.querySelector("nav");
    let userMenu = header.querySelector("div.user-profile");
    let navBtn = header.querySelector("a.menu");
    let userBtn = header.querySelector("a.profile");

    navBtn.addEventListener("click", function () {
      nav.classList.add("open");
    });

    userBtn.addEventListener("click", function () {
      userMenu.classList.toggle("open");
    });

    function closeHeader(target) {
      let t = target;
      if (t && t.nodeName !== "HEADER") {
        while (t && t.nodeName !== "HEADER") {
          t = t.parentNode;
        }
      }
      if (!t || t.nodeName === "BODY") {
        userMenu.classList.remove("open");
      }
    }

    return {
      closeHeaderApi : function (target) {
        closeHeader(target);
      }
    }

  })(window, document);




  let NavModule = (function(window, document, undefined) {

    let nav = document.querySelector("nav.nav");
    let closeBtn = nav.querySelector(".close");
    let navBgText = nav.querySelector(".bg-text");

    closeBtn.addEventListener("click", function () {
      nav.classList.remove("open");
    });

    nav.addEventListener("mousemove", function(e) {
      let a = e.target;
      while (a.nodeName !== "A" && a.nodeName !== "BODY") {
        a = a.parentNode;
      }
      if (a.nodeName === "BODY") {
        navBgText.innerHTML = "";
        return;
      }
      let text = a.innerText.trim();
      navBgText.innerHTML = text;
    });

    let tiltOptions = {maxTilt: 15, scale: 1.15};
    const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

    $('.primary-button').click(function (e){
      e.preventDefault();
    });

    return {

    }

  })(window, document);

  document.addEventListener("click", function (e) {
    let target = e.target;
    HeaderModule.closeHeaderApi(target);
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
