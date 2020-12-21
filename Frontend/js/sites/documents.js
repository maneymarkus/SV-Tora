/*
  Dependencies: GeneralModule
 */

if (typeof GeneralModule === "undefined") {
  console.log("Missing GeneralModule Dependency!");
}

/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let documentReservoir = document.querySelector("div.document-reservoir");
  let documentInteraction = document.querySelector("div.document-interaction");
  let documentNameSpan = documentInteraction.querySelector("span.document-name");
  let documentTypeSpan = documentInteraction.querySelector("span.document-type");
  let chosenDocument = undefined;
  let removedInput = false;

  document.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("document") && !target.classList.contains("document-interaction") && !target.classList.contains("upload")) {
      target = target.parentElement;
    }
    if (target.classList.contains("upload")) {
      console.log("upload");
      return;
    }
    if (target.classList.contains("document")) {
      chosenDocument = target;
      let fileName = target.querySelector("p").innerHTML.trim();
      let documentType = fileName.substring(fileName.lastIndexOf("."));
      let documentName = fileName.substring(0, fileName.lastIndexOf("."));
      documentNameSpan.innerHTML = documentName;
      documentTypeSpan.innerHTML = documentType;
      documentInteraction.classList.add("active");
    } else {
      if (!target.classList.contains("document-interaction")) {
        documentInteraction.classList.remove("active");
        chosenDocument = undefined;
      }
    }
  });

  documentInteraction.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("rename") && !target.classList.contains("delete")) {
      target = target.parentElement;
    }
    if (target.classList.contains("rename")) {
      removedInput = false;
      let width = documentNameSpan.offsetWidth;
      documentNameSpan.style.display = "none";
      let dNameInput = GeneralModule.generateElementApi("INPUT", ["document-name"]);
      dNameInput.value = documentNameSpan.innerHTML;
      documentInteraction.querySelector("div.document-meta").insertBefore(dNameInput, documentTypeSpan);
      dNameInput.style.width = width + 50 + "px";
      dNameInput.focus();
      dNameInput.addEventListener("focusout", function() {
        endInput(dNameInput);
      });
      dNameInput.addEventListener("keydown", function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
          endInput(dNameInput);
        }
      });
      return;
    }
    if (target.classList.contains("delete")) {
      let fileName = target.querySelector("p").innerHTML.trim();
      if (window.confirm(fileName + " wirklich löschen?")) {
        chosenDocument.remove();
        documentInteraction.classList.remove("active");
        chosenDocument = undefined;
      }
      return;
    }
  });

  function endInput(input) {
    if (!removedInput) {
      removedInput = true;
      let value = input.value.trim();
      if (value === "") {
        input.focus();
        return;
      }
      input.remove();
      documentNameSpan.innerHTML = value;
      documentNameSpan.style.display = "inline-block";
      chosenDocument.querySelector("p").innerHTML = value + documentTypeSpan.innerHTML.trim();
    }
  }

})(window, document);
