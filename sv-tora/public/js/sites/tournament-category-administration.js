/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "AccordionModule", "ModalModule", "TranslationModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let categoryAccordions = [];

    let CategoryAccordion = function(accordion) {
        let This = this;

        // This property contains the original accordion object with the general functionality
        this.inheritance = App.AccordionModule.getAccordionObject(accordion);

        this.accordionElement = accordion;
        this.accordionBars = this.inheritance.accordionBars;

        this.categoryNames = [];
        this.accordionBars.forEach((bar) => {
            this.categoryNames.push(bar.querySelector("span.category-name").innerText.trim());
        });

        this.accordionElement.addEventListener("click", function (e) {
            let target = e.target;
            if (!target.classList.contains("link")) {
                e.preventDefault();
            }
            while (target.nodeName !== "BODY" && !target.classList.contains("tool") && !target.classList.contains("delete-fighter")) {
                target = target.parentElement;
            }
            if (target.classList.contains("tool")) {
                This.inheritance.stayOpen = true;
                This.handleToolClick(target);
                return;
            }
            if (target.classList.contains("delete-fighter")) {
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, target.getAttribute("href"), () => {
                    while (target.nodeName !== "TR" && target.nodeName !== "BODY") {
                        target = target.parentElement;
                    }
                    if (target.nodeName === "TR") {
                        let bar = target.parentElement.parentElement.parentElement.parentElement;
                        bar.querySelector(".count-members").innerHTML = (parseInt(bar.querySelector(".count-members").innerText) - 1) + "";
                        target.remove();
                    }
                }, undefined, true);
                return;
            }
        });

        this.handleToolClick = function(target) {
            let barHeader = target;
            while (!barHeader.classList.contains("bar-header")) {
                barHeader = barHeader.parentElement;
            }
            let categoryName = barHeader.querySelector("span.category-name").innerHTML.trim();
            let categoryGraduation = barHeader.querySelector("span.graduation").innerHTML.trim();
            let categoryAge = barHeader.querySelector("span.category-age").innerHTML.trim();
            let categorySex = barHeader.querySelector("span.category-sex").innerHTML.trim();
            let categoryMemberCount = barHeader.querySelector("span.count-members").innerHTML.trim();

            //Print category
            if (target.classList.contains("print")) {
                let url = target.getAttribute("href");
                App.ModalModule.infoModal("Kategorie drucken", "Leider wird drucken noch nicht vollständig unterstützt.");
                return;
            }

            // Change category name
            if (target.classList.contains("edit")) {
                let url = target.getAttribute("href");
                This.renameCategory(barHeader, categoryName, url);
                return;
            }

            // split category
            if (target.classList.contains("split")) {
                window.location.href = target.getAttribute("href");
                return;
            }

            // Merge two categories into single one
            if (target.classList.contains("merge")) {
                if (This.accordionBars.length > 1) {
                    let url = target.getAttribute("href");
                    let accordion = target;
                    while (accordion.nodeName !== "BODY" && !accordion.classList.contains("accordion")) {
                        accordion = accordion.parentElement;
                    }
                    This.initiateMerging(accordion, url, barHeader, categoryName, categoryGraduation, categoryAge, categorySex, categoryMemberCount);
                } else {
                    App.ModalModule.infoModal("Kategorien zusammenführen", "Zur Zeit kannst du diese Kategorie nicht mit einer anderen Kategorie zusammenführen, da diese Kategorie die einzige in dieser Prüfungsform ist.");
                }
                return;
            }

            // add fighter
            if (target.classList.contains("add")) {
                window.location.href = target.getAttribute("href");
                return;
            }

            // delete category
            if (target.classList.contains("delete")) {
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.DELETE, target.getAttribute("href"), () => {
                    barHeader.parentElement.remove();
                }, undefined, true);
                return;
            }
        }

        this.initiateMerging = function (accordion, url, mergeInitiatorBarHeader, categoryName, categoryGraduation, categoryAge, categorySex, categoryMemberCount) {
            let otherCategories = [];
            let bars = accordion.querySelectorAll("div.bar-header");
            bars.forEach((bar) => {
                let cName = bar.querySelector("span.category-name").innerText.trim();
                if (cName !== categoryName) {
                    let object = {};
                    object["text"] = bar.querySelector("h4.heading").innerText.replace("Kategorie: ", "");
                    object["value"] = bar.querySelector("span.category-name").innerText.trim();
                    object["checked"] = false;
                    otherCategories.push(object);
                }
            });
            let radioInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.RADIO, ["required"], undefined, "merge_target", undefined, undefined, undefined, otherCategories);
            let categoryToBeMerged = categoryName + " (" + categoryGraduation + "/" + categoryAge + "/" + categorySex + "/" + categoryMemberCount + ")";
            let modalWindow = App.ModalModule.confirmModal("Kategorie " + categoryToBeMerged + " vereinen mit:", radioInput.inputContainer, function () {
                window.setTimeout(function () {
                    window.location.reload();
                }, 5000);
            }, undefined, function () {
                if (!App.FormModule.checkInput(radioInput.inputContainer, true)) {
                    return false;
                } else {
                    let data = App.TranslationModule.translateInputsToObject(radioInput.inputContainer);
                    App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                        modalWindow.closeModal();
                        window.setTimeout(function () {
                            window.location.reload();
                        }, 5000);
                    }, data, true);
                }
            });
        }

        this.renameCategory = function (barHeader, categoryName, url) {
            let categoryNameSpan = barHeader.querySelector("span.category-name");
            let graduationSpan = barHeader.querySelector("span.graduation");
            categoryNameSpan.classList.add("no-display");
            let width = categoryNameSpan.offsetWidth;
            let oldValue = categoryNameSpan.innerText;

            // this variable keeps track if the error that a category name has to be unique has already been shown
            let errorShown = false;

            function endInput(value) {
                let data = {"Name": value};
                categoryNameSpan.innerHTML = oldValue;
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                    categoryNameSpan.innerHTML = value;
                    This.categoryNames.slice(This.categoryNames.indexOf(oldValue), 1);
                    This.categoryNames.push(value);
                }, data, true);
                categoryNameSpan.classList.remove("no-display");
                This.inheritance.stayOpen = false;
                errorShown = false;
            }

            function quickInputValidation(value) {
                let categoryNames = This.categoryNames.slice();
                categoryNames.splice(categoryNames.indexOf(categoryName), 1);
                if (categoryNames.includes(value)) {
                    if (!errorShown) {
                        App.ModalModule.infoModal("Änderung Kategorie Name", "Kategorien müssen einen einzigartigen Namen haben.", function () {
                            return false;
                        });
                    }
                    errorShown = true;
                } else {
                    return true;
                }
            }

            App.MaterialInputsModule.createQuickTextInput(width, categoryName, endInput, graduationSpan, quickInputValidation);

        }

        this.getAccordionBarByCategoryName = function (categoryName) {
            let wantedBar = undefined;
            This.accordionBars.forEach((bar) => {
                let cName = bar.querySelector("span.category-name").innerText.trim();
                if (cName === categoryName) {
                    wantedBar = bar;
                }
            });
            return wantedBar;
        }

    };

    let accordionElements = document.querySelectorAll("div.accordion");
    accordionElements.forEach(function (accordion) {
        categoryAccordions.push(new CategoryAccordion(accordion));
    });

    let addCategoryBtns = document.querySelectorAll(".primary-button.add-category");
    addCategoryBtns.forEach((addCategoryBtn) => {
        let url = addCategoryBtn.getAttribute("href");
        addCategoryBtn.addEventListener("click", function (e) {
            e.preventDefault();
            App.SendRequestModule.getData(url + "/create", function (data) {
                let container = App.TranslationModule.translateObjectToInputs(data, true);
                let modalWindow = App.ModalModule.confirmModal("Kategorie hinzufügen", container, undefined, undefined, function () {
                    if (!App.FormModule.checkForm(container, true)) {
                        return false;
                    } else {
                        let data = App.TranslationModule.translateInputsToObject(container);
                        App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                            modalWindow.closeModal();
                            window.setTimeout(function () {
                                window.location.reload();
                            }, 5000);
                        }, data, true);
                    }
                });
            });
        });
    });

})(window, document);
