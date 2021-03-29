/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["MaterialInputsModule", "ModalModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let documentContainer = document.querySelector("div.document-reservoir");
  let documentInteraction = document.querySelector("div.document-interaction");
  let documentNameSpan = documentInteraction.querySelector("span.document-name");
  let documentTypeSpan = documentInteraction.querySelector("span.document-type");
  let chosenDocument = undefined;
  let removedInput = false;

  document.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("document") && !target.classList.contains("document-interaction") && !target.classList.contains("upload") && !target.classList.contains("modal-window")) {
      target = target.parentElement;
    }
    if (target.classList.contains("modal-window")) {
      return;
    }
    if (target.classList.contains("upload")) {
      console.log("upload");
      return;
    }
    if (target.classList.contains("document")) {
      let documents = documentContainer.querySelectorAll("div.document");
      documents.forEach((document) => {
        document.classList.remove("chosen");
      });
      chosenDocument = target;
      chosenDocument.classList.add("chosen");
      let fileName = target.querySelector("p").innerHTML.trim();
      let documentType = fileName.substring(fileName.lastIndexOf("."));
      let documentName = fileName.substring(0, fileName.lastIndexOf("."));
      documentNameSpan.innerHTML = documentName;
      documentTypeSpan.innerHTML = documentType;
      documentInteraction.classList.add("active");
    } else {
      if (!target.classList.contains("document-interaction")) {
        documentInteraction.classList.remove("active");
        if (chosenDocument) {
          chosenDocument.classList.remove("chosen");
        }
        chosenDocument = undefined;
      }
    }
  });

  documentInteraction.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("rename") && !target.classList.contains("delete")) {
      target = target.parentElement;
    }

    // rename chosen document
    if (target.classList.contains("rename")) {
      removedInput = false;
      let width = documentNameSpan.offsetWidth;
      documentNameSpan.classList.add("no-display");
      let value = documentNameSpan.innerText;
      MaterialInputsModule.createQuickInputApi(width, value, endInput, documentTypeSpan, undefined);
    }

    //delete chosen document
    if (target.classList.contains("delete")) {
      let fileName = chosenDocument.querySelector("p").innerHTML.trim();
      ModalModule.confirmModalApi("Dokument löschen", "Willst du \"" + fileName + "\" wirklich löschen?", function () {
        chosenDocument.remove();
        documentInteraction.classList.remove("active");
        chosenDocument = undefined;
      });
      return;
    }
  });

  function endInput(value) {
    documentNameSpan.innerHTML = value;
    documentNameSpan.classList.remove("no-display");
    chosenDocument.querySelector("p").innerHTML = value + documentTypeSpan.innerHTML.trim();
  }

})(window, document);
