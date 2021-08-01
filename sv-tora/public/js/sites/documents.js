/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */

(function (window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "ModalModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let documentContainer = document.querySelector("div.document-reservoir");
    let documentInteraction = document.querySelector("div.document-interaction");
    let documentNameSpan = documentInteraction.querySelector("span.document-name");
    let documentTypeSpan = documentInteraction.querySelector("span.document-type");
    let documentUploadForm = document.querySelector("form.document-upload");
    let uploadFormSubmitBtn = documentUploadForm.querySelector("button.upload-button");
    let uploadInputElement = documentUploadForm.querySelector("label.file-input-container");
    let uploadInput = App.MaterialInputsModule.getInputObject(uploadInputElement);

    let chosenDocument = undefined;
    let removedInput = false;

    uploadInputElement.addEventListener("change", function() {
        if (uploadInput.getValue()) {
            App.SecondaryButtonModule.enableSecondaryButton(uploadFormSubmitBtn);
        } else {
            App.SecondaryButtonModule.disableSecondaryButton(uploadFormSubmitBtn);
        }
    });

    document.addEventListener("click", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("document") && !target.classList.contains("document-interaction") && !target.classList.contains("upload") && !target.classList.contains("modal-window")) {
            target = target.parentElement;
        }

        if (target.classList.contains("modal-window")) {
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
            let documentType;
            let documentName;
            if (fileName.includes(".")) {
                documentType = fileName.substring(fileName.lastIndexOf("."));
                documentName = fileName.substring(0, fileName.lastIndexOf("."));
            } else {
                documentName = fileName;
                documentType = "";
            }

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
        while (target.nodeName !== "BODY" && !target.classList.contains("rename") && !target.classList.contains("delete") && !target.classList.contains("download")) {
            target = target.parentElement;
        }

        // rename chosen document
        if (target.classList.contains("rename")) {
            removedInput = false;
            let width = documentNameSpan.offsetWidth;
            documentNameSpan.classList.add("no-display");
            let value = documentNameSpan.innerText;
            App.MaterialInputsModule.createQuickTextInput(width, value, endInput, documentTypeSpan, undefined);
            return;
        }

        //download document
        if (target.classList.contains("download")) {
            let id = chosenDocument.getAttribute("id");
            let url = chosenDocument.getAttribute("data-url") + "/" + id + "/download";
            window.open(url, "_blank");
        }

        //delete chosen document
        if (target.classList.contains("delete")) {
            let fileName = chosenDocument.querySelector("p").innerHTML.trim();
            let id = chosenDocument.getAttribute("id");
            let url = chosenDocument.getAttribute("data-url") + "/" + id;
            App.ModalModule.deleteModal("Dokument löschen", "Willst du \"" + fileName + "\" wirklich löschen?", function () {
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, url, () => {
                    chosenDocument.remove();
                    documentInteraction.classList.remove("active");
                    chosenDocument = undefined;
                }, undefined, true);
            });
            return;
        }
    });

    function endInput(value) {
        let renamedDocument = chosenDocument;
        let id = renamedDocument.getAttribute("id");
        let url = renamedDocument.getAttribute("data-url") + "/" + id;
        let newName = value + documentTypeSpan.innerHTML.trim()
        let data = {
            "name": newName
        };
        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.PUT, url, () => {
            documentNameSpan.innerHTML = value;
            documentNameSpan.classList.remove("no-display");
            renamedDocument.querySelector("p").innerHTML = newName;
            documentInteraction.classList.add("active");
        }, data, true);
    }

})(window, document);
