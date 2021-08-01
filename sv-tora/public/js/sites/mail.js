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

        let allClubsUrl = receiverSelection.querySelector("input[value='all']").getAttribute("data-url");
        let enrolledClubsUrl = receiverSelection.querySelector("input[value='only-enrolled']").getAttribute("data-url");
        let selectedClubsUrl = receiverSelection.querySelector("input[value='choose']").getAttribute("data-url");

        /**
         * This array contains the name of the clubs that should receive this mail
         * @type {string[]}
         */
        let receivers = [];

        let clubMails = [];

        App.SecondaryButtonModule.disableSecondaryButton(chooseReceiversBtn);

        sendButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (chosenReceivers.querySelector(".tag") === null) {
                App.ModalModule.infoModal("Empfänger hinzufügen", "Um eine E-Mail zu verschicken musst du mindestens einen Empfänger hinzufügen!");
                return;
            }
            if (App.FormModule.checkForm(mailForm, true)) {
                let data = App.TranslationModule.translateInputsToObject(mailForm);
                data["receivers"] = receivers;
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, sendButton.getAttribute("href"), () => {
                    document.querySelector("main").classList.add("sent");
                    window.setTimeout(function () {
                        envelope.innerHTML = "mail";
                    }, 1000);
                    window.setTimeout(function () {
                        window.location.href = cancelButton.getAttribute("href");
                    }, 3000);
                }, data);
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
                if (clubMails.length <= 0) {
                    App.LoaderModule.addBigLoader();
                    App.SendRequestModule.getData(allClubsUrl, (allClubs) => {
                        App.LoaderModule.removeBigLoader();
                        addReceivers(allClubs);
                    });
                } else {
                    addReceivers(clubMails);
                }
            }
            if (target.value === "only-enrolled") {
                App.LoaderModule.addBigLoader();
                App.SendRequestModule.getData(enrolledClubsUrl, (enrolledClubs) => {
                    App.LoaderModule.removeBigLoader();
                    addReceivers(enrolledClubs);
                });
            }
            if (target.value === "choose") {
                if (clubMails.length <= 0) {
                    App.LoaderModule.addBigLoader();
                    App.SendRequestModule.getData(allClubsUrl, (allClubs) => {
                        App.LoaderModule.removeBigLoader();
                        clubMails = allClubs;
                    });
                }
                App.SecondaryButtonModule.enableSecondaryButton(chooseReceiversBtn);
            }
            lastSelected = target;
        }

        function clearReceiverSection() {
            let clubSpans = chosenReceivers.querySelectorAll("span.receiver");
            clubSpans.forEach((span) => {
                span.remove();
            });
            receivers = [];
        }

        function addReceivers(receivers) {
            receivers.forEach((receiver) => {
                addReceiver(receiver);
            });
        }

        function addReceiver(receiver) {
            if (receivers.indexOf(receiver["mail"]) === -1) {
                receivers.push(receiver["mail"]);

                let receiverMail = receiver["mail"];

                let receiverSpan;
                if (typeof receiver["name"] === "undefined") {
                    receiverSpan = App.TagModule.createTag(["receiver"], receiverMail);
                } else {
                    receiverSpan = App.TagModule.createTag(["receiver"], receiver["name"], receiverMail);
                }
                chosenReceivers.appendChild(receiverSpan);
            }
        }

        chooseReceiversBtn.addEventListener("click", function () {
            let options = [];
            let clubs = [];
            clubMails.forEach((club) => {
                if (clubs.indexOf(club["name"]) === -1) {
                    clubs.push(club["name"]);
                }
            });

            clubs.forEach((club) => {
                let object = {};
                object["value"] = club;
                object["text"] = club;
                object["checked"] = false;
                options.push(object);
            });
            let container = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.CHECKBOX, [], undefined, "receivers", undefined, undefined, undefined, options);
            App.ModalModule.confirmModal("Vereine auswählen", container.inputContainer, function () {
                clearReceiverSection();
                let chosenClubs = App.TranslationModule.translateInputsToObject(container.inputContainer);
                let data = {receivers: chosenClubs["receivers"]};
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, selectedClubsUrl, (jsonData) => {
                    addReceivers(jsonData);
                }, data);
            });
        });

        /**
         * This Event Listener listens for a click on the free-text button which triggers a confirm modal with a text input field where an email address can be inserted manually
         */
        freeTextBtn.addEventListener("click", function () {
            let input = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.TEXT, ["email"], undefined, "receiver-address", "E-Mail", undefined, undefined, undefined);
            App.ModalModule.confirmModal("Empfänger hinzufügen", input.inputContainer, function () {
                addReceiver({"mail": input.getValue()});
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
                let receiverMail;
                if (target.querySelector("span.tag-value") !== null) {
                    receiverMail = target.querySelector("span.tag-value").innerText;
                } else {
                    receiverMail = target.querySelector("span.tag-key").innerText;
                }
                receivers.splice(receivers.indexOf(receiverMail), 1)
                target.remove();
            }
        });

    }

})(window, document);
