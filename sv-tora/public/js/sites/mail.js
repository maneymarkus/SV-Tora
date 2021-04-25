/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function init(window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "FormModule", "TranslationModule", "TagModule"];
    App.GeneralModule.checkDependencies(dependencies);

    if (document.querySelector("form.mail-content")) {

        let mailForm = document.querySelector("form.mail-content");
        let receiverSelection = mailForm.querySelector("div.receiver-selection");
        let chooseReceiversBtn = mailForm.querySelector("a.choose-receivers");
        let freeTextBtn = mailForm.querySelector("a.free-text");
        let chosenReceivers = mailForm.querySelector("div.chosen-receivers");
        let envelope = document.querySelector("i.envelope");
        let sendButton = mailForm.querySelector("a.send");
        let cancelButton = mailForm.querySelector("a.cancel");

        let allClubs = App.GeneralModule.generalVariables.clubs;

        let enrolledClubs = App.GeneralModule.generalVariables.enrolledClubs;

        /**
         * This array contains the name of the clubs that should receive this mail
         * @type {string[]}
         */
        let receivers = [];

        App.SecondaryButtonModule.disableSecondaryButton(chooseReceiversBtn);

        sendButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (App.FormModule.checkForm(mailForm, true)) {
                document.getElementsByTagName("body")[0].classList.add("sent");
                window.setTimeout(function () {
                    envelope.innerHTML = "mail";
                }, 1000);
                //TODO: Send form via AJAX
            }
        });

        cancelButton.addEventListener("click", function (e) {
            e.preventDefault();
            App.ModalModule.confirmModal("Seite wirklich verlassen?", "Willst du die Seite wirklich verlassen?", leavePage);
        });

        function leavePage() {
            window.location.href = cancelButton.getAttribute("href");
        }

        let lastSelected = undefined;

        receiverSelection.addEventListener("change", function (e) {
            e.preventDefault();
            App.SecondaryButtonModule.disableSecondaryButton(chooseReceiversBtn);
            let target = e.target;
            if (target.nodeName !== "INPUT") {
                return;
            }
            target.checked = false;
            if (chosenReceivers.querySelector("span.receiver")) {
                App.ModalModule.confirmModal("Empfänger ändern?", "Willst du die Empfänger wirklich ändern? Dies löscht alle bisher hinzugefügten Empfänger!", function () {
                    clearReceiverSection();
                    changeReceiverSelection(target);
                }, function () {
                    lastSelected.checked = true;
                });
            } else {
                changeReceiverSelection(target);
            }

        });

        function changeReceiverSelection(target) {
            target.checked = true;
            if (target.value === "all") {
                addReceivers(allClubs);
            }
            if (target.value === "only-enrolled") {
                addReceivers(enrolledClubs);
            }
            if (target.value === "choose") {
                App.SecondaryButtonModule.enableSecondaryButton(chooseReceiversBtn);
            }
            lastSelected = target;
        }

        function clearReceiverSection() {
            let clubSpans = chosenReceivers.querySelectorAll("span.receiver");
            clubSpans.forEach((span) => {
                let receiverName = span.querySelector("span.tag-value").innerText;
                receivers.splice(receivers.indexOf(receiverName), 1);
                span.remove();
            });
        }

        function addReceivers(receivers) {
            receivers.forEach((receiver) => {
                addReceiver(receiver);
            });
        }

        function addReceiver(receiver) {
            // TODO: If receiver already present don't add it
            receivers.push(receiver);

            let receiverName = "Gast";
            let receiverMail = receiver;
            if (App.GeneralModule.generalVariables.clubMails[receiver]) {
                receiverName = receiver;
                receiverMail = App.GeneralModule.generalVariables.clubMails[receiver];
            }

            let receiverSpan = App.TagModule.createTag(["receiver"], receiverName, receiverMail);
            chosenReceivers.appendChild(receiverSpan);
        }

        chooseReceiversBtn.addEventListener("click", function () {
            // TODO: if pre selected options...
            let options = [];
            allClubs.forEach((club) => {
                let object = {};
                object["value"] = club;
                object["text"] = club;
                object["checked"] = false;
                options.push(object);
            });
            let container = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.CHECKBOX, [], undefined, "receiver", undefined, undefined, undefined, options);
            App.ModalModule.confirmModal("Vereine auswählen", container.inputContainer, function () {
                clearReceiverSection();
                let chosenClubs = App.TranslationModule.translateInputsToObject(container.inputContainer);
                let receivers = chosenClubs["receiver"];
                addReceivers(receivers);
            });
        });

        /**
         * This Event Listener listens for a click on the free-text button which triggers a confirm modal with a text input field where an email address can be inserted manually
         */
        freeTextBtn.addEventListener("click", function () {
            let input = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["email"], undefined, "receiver-address", "E-Mail", undefined, undefined, undefined);
            App.ModalModule.confirmModal("Empfänger hinzufügen", input.inputContainer, function () {
                addReceiver(input.getValue());
            });
        });

        chosenReceivers.addEventListener("click", function (e) {
            let target = e.target;
            while (target.nodeName !== "BODY" && !target.classList.contains("delete")) {
                target = target.parentElement;
            }
            if (target.nodeName === "BODY") {
                return;
            }
            if (target.classList.contains("delete")) {
                target = target.parentElement;
                let receiverName = target.querySelector("span.tag-value").innerText;
                receivers.splice(receivers.indexOf(receiverName), 1)
                target.remove();
            }
        });

    }

})(window, document);
