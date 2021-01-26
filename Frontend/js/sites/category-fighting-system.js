/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "AccordionModule", "CarouselModule", "ModalModule"];
    GeneralModule.checkDependenciesApi(dependencies);

    let fightingAccordions = [];

    let carouselElement = document.querySelector("div.carousel-container");
    CarouselModule.deactivateCarouselApi(carouselElement);

    let FightingAccordion = function(accordion) {
        let This = this;

        // This property contains the original accordion object with the general functionality
        this.inheritance = AccordionModule.getAccordionObjectApi(accordion);

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
            CarouselModule.deactivateCarouselApi(carouselElement);
            if (target.classList.contains("bar-header")) {
                CarouselModule.enableAllSlidesApi(carouselElement);
                let categoryName = target.querySelector("span.category-name").innerHTML.trim();
                let categoryGraduation = target.querySelector("span.graduation").innerHTML.trim();
                let categoryAge = target.querySelector("span.category-age").innerHTML.trim();
                let categorySex = target.querySelector("span.category-sex").innerHTML.trim();
                let categoryMemberCount = target.querySelector("span.count-members").innerHTML.trim();

                if (parseInt(categoryMemberCount) > 5) {
                    disableFightingSystem("Jeder-Gegen-Jeden");
                }

                if (parseInt(categoryMemberCount) > 12) {
                    disableFightingSystem("Tafelsystem");
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
            if (target.classList.contains("fighting-system")) {
                console.log("hi");
                if (This.inheritance.openBar.classList.contains("prepared")) {
                    ModalModule.confirmModalApi("Kampfsystem wählen...", "Willst du wirklich ein anderes Kampfsystem wählen? Eventuelle Änderungen, die du schon gemacht hast, werden damit überschrieben und das kann nicht rückgängig gemacht werden.", This.chooseFightingSystem);
                } else {
                    This.chooseFightingSystem();
                }
            }
            if (target.classList.contains("print")) {
                let printOptions = []
                printOptions.push({"text" : "Teilnehmerliste", "value" : "member-list", "checked" : false});
                if (This.inheritance.openBar.classList.contains("prepared")) {
                    printOptions.push({"text": "Kampfsystem", "value": "fight-system", "checked": false});
                } else {
                    printOptions.push({"text": "Kampfsystem", "value": "fight-system", "checked": false, "disabled" : true});
                }
                let printChoice = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.CHECKBOX, [], undefined, "print-choice", undefined, undefined, undefined, printOptions);
                ModalModule.confirmModalApi("Drucken", printChoice, function () {
                    ModalModule.infoModalApi("Drucken", "Der Drucker ist gemein und mit so jemandem möchte ich nicht zusammen arbeiten. Sorry :/");
                });
            }
            if (target.classList.contains("edit-fighting-system")) {
                ModalModule.infoModalApi("Kampfsystem anpassen.", "Wir passen jetzt das Kampfsystem an. Gleich. Einen Moment noch. Dauert noch kurz. Ich muss noch kurz was machen. Etwas Geduld noch. Geht gleich los. Kleinen Augenblick bitte noch. Warte. Jetzt gleich. Einen Moment noch. Ich geb dir Bescheid.");
            }
        }

        this.chooseFightingSystem = function () {
            ModalModule.appendOverlayApi();
            CarouselModule.activateCarouselApi(carouselElement);
            CarouselModule.registerCallbackApi(carouselElement, This.handleChosenFightingSystem);
        }

        this.handleChosenFightingSystem = function (target) {
            ModalModule.removeOverlayApi();
            CarouselModule.deactivateCarouselApi(carouselElement);
            CarouselModule.removeCallBackApi(carouselElement, This.handleChosenFightingSystem);
            while (target.nodeName !== "BODY" && !target.classList.contains("page")) {
                target = target.parentElement;
            }
            if (target.classList.contains("page")) {
                let fightingSystem = target.querySelector("h3").innerText.trim();
                let openBar = This.inheritance.openBar;
                openBar.querySelector("a.fighting-system").innerHTML = fightingSystem;
                if (!openBar.classList.contains("prepared")) {
                    This.barIsPrepared(openBar);
                }
            }
        }

        this.barIsPrepared = function (bar) {
            bar.classList.add("prepared");
            let icon = GeneralModule.generateElementApi("i", ["material-icons", "prepared"], "done");
            bar.querySelector(".bar-header").appendChild(icon);
            PrimaryButtonModule.enablePrimaryButtonApi(bar.querySelector("a.edit-fighting-system"));
        }

    };

    function disableFightingSystem(system) {
        let slide = CarouselModule.getSlideByContentApi(carouselElement, "h3", system);
        CarouselModule.disableSlideApi(slide);
    }

    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
        fightingAccordions.push(new FightingAccordion(accordion));
    });

})(window, document);
