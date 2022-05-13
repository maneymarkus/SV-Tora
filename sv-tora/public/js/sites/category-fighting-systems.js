/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "AccordionModule", "CarouselModule", "ModalModule", "CategoryModule", "PersonModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let fightingAccordions = [];

    let carouselElement = document.querySelector("div.carousel-container");
    let slides = carouselElement.querySelectorAll("div.page");
    App.CarouselModule.deactivateCarousel(carouselElement);

    let FightingAccordion = function(accordion) {
        let This = this;

        // This property contains the original accordion object with the general functionality
        this.inheritance = App.AccordionModule.getAccordionObject(accordion);

        this.accordionElement = accordion;
        this.accordionBars = this.accordionElement.querySelectorAll(".accordion-bar");

        this.categoryNames = [];
        this.accordionBars.forEach((bar) => {
            this.categoryNames.push(bar.querySelector("span.category-name").innerText.trim());
        });

        this.accordionElement.addEventListener("click", function (e) {
            let target = e.target;
            let originalTarget = target;
            e.preventDefault();
            while (target.nodeName !== "BODY" && !target.classList.contains("bar-header") && !target.classList.contains("bar-content")) {
                target = target.parentElement;
            }
            App.CarouselModule.deactivateCarousel(carouselElement);

            if (target.classList.contains("bar-header")) {
                App.CarouselModule.enableAllSlides(carouselElement);
                let categoryName = target.querySelector("span.category-name").textContent.trim();
                let categoryGraduation = target.querySelector("span.graduation").textContent.trim();
                let categoryAge = target.querySelector("span.category-age").textContent.trim();
                let categorySex = target.querySelector("span.category-sex").textContent.trim();
                let categoryMemberCount = parseInt(target.querySelector("span.count-members").textContent.trim());

                if (target.parentElement.classList.contains("open")) {
                    enableCards();
                } else {
                    disableCards(categoryMemberCount);
                    if (categoryMemberCount <= 0) {
                        window.setTimeout(function () {
                            App.ModalModule.infoModal("Nicht genügend Teilnehmer", "Diese Katgorie verfügt noch nicht über genügend Mitglieder (aktuell 0), um ein Kampfsystem auszuwählen. Füge der Kategorie also erst Mitglieder hinzu und versuche es dann erneut.");
                        }, 500);
                    }
                }

                return;
            }

            if (target.classList.contains("bar-content")) {
                This.handleContentClick(originalTarget);
            }
        });

        this.handleContentClick = function (target) {
            while (target.nodeName !== "BODY" && !target.classList.contains("fighting-system") && !target.classList.contains("print") && !target.classList.contains("edit-fighting-system")) {
                target = target.parentElement;
            }

            if (target.classList.contains("fighting-system") && target.nodeName === "A") {
                if (This.inheritance.openBar.classList.contains("prepared")) {
                    App.ModalModule.confirmModal("Kampfsystem wählen...", "Willst du wirklich ein anderes Kampfsystem wählen? Eventuelle Änderungen, die du schon gemacht hast, werden damit überschrieben und das kann nicht rückgängig gemacht werden.", This.chooseFightingSystem);
                } else {
                    This.chooseFightingSystem();
                }
            }

            if (target.classList.contains("print")) {
                let url = target.getAttribute("href");
                window.open(url, "_blank");
            }

            if (target.classList.contains("edit-fighting-system")) {
                let url = target.getAttribute("href");
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.GET, url, (response) => {
                    changeFightingSystemConfig(response);
                }, undefined, true);
            }
        }

        this.chooseFightingSystem = function () {
            App.ModalModule.appendOverlay();
            App.CarouselModule.activateCarousel(carouselElement);
            App.CarouselModule.registerCallback(carouselElement, This.handleChosenFightingSystem);
        }

        this.handleChosenFightingSystem = function (target) {
            App.ModalModule.removeOverlay();
            App.CarouselModule.deactivateCarousel(carouselElement);
            App.CarouselModule.removeCallback(carouselElement, This.handleChosenFightingSystem);
            while (target.nodeName !== "BODY" && !target.classList.contains("page")) {
                target = target.parentElement;
            }
            if (target.classList.contains("page")) {
                let fightingSystem = target.querySelector("h3").textContent.trim();
                let data = {
                    "fighting_system" : fightingSystem,
                }
                let openBar = This.inheritance.openBar;
                let url = openBar.getAttribute("data-category-url") + "/fighting-system/assign";
                App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                    openBar.querySelector("a.fighting-system").textContent = fightingSystem;
                    if (!openBar.classList.contains("prepared")) {
                        This.barIsPrepared(openBar);
                    }
                }, data, true);
            }
        }

        this.barIsPrepared = function (bar) {
            bar.classList.add("prepared");
            let icon = App.GeneralModule.generateElement("i", ["material-icons", "prepared"], "done");
            bar.querySelector(".bar-header").appendChild(icon);
            App.PrimaryButtonModule.enablePrimaryButton(bar.querySelector("a.edit-fighting-system"));
            App.PrimaryButtonModule.enablePrimaryButton(bar.querySelector("a.print"));
        }

    };

    function changeFightingSystemConfig(response) {
        let modal = App.ModalModule.confirmModal(response["heading"], response["html"], function () {
            let data = {"config" : App.FightingSystemModule.translateToJson(modal.modalWindowElement.querySelector(".mw-content"))};
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, response["updateUrl"], undefined, data, true);
        });
        if (modal.modalWindowElement.querySelector(".draggable")) {
            let modalContent = modal.modalWindowElement.querySelector(".mw-content");
            App.FightingSystemModule.applyDragAndDrop(modalContent);
        }
        if (modal.modalWindowElement.querySelector(".range-input-container")) {
            let rangeInputContainer = modal.modalWindowElement.querySelector(".range-input-container");
            console.log(rangeInputContainer);
            App.MaterialInputsModule.inputs.push(new App.MaterialInputsModule.RangeInput(rangeInputContainer));
        }
    }

    function disableCards(countFighters) {
        slides.forEach(slide => {
            let minFighters = parseInt(slide.getAttribute("data-min-fighters"));
            let maxFighters = parseInt(slide.getAttribute("data-max-fighters"));
            if (countFighters < minFighters || countFighters > maxFighters) {
                App.CarouselModule.disableSlide(slide);
            }
        });
    }

    function enableCards() {
        slides.forEach(slide => {
            App.CarouselModule.enableSlide(slide);
        });
    }

    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
        fightingAccordions.push(new FightingAccordion(accordion));
    });

})(window, document);
