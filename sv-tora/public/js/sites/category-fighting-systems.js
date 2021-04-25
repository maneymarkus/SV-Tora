/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule", "AccordionModule", "CarouselModule", "ModalModule", "CategoryModule", "PersonModule"];
    App.GeneralModule.checkDependencies(dependencies);

    let personTypes = App.GeneralModule.generalVariables.personTypes;
    let fightingSystemTypes = App.GeneralModule.generalVariables.fightingSystemTypes;

    let fighter1 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "sdfg8sdf87g", "Vorname1", "Nachname1", "SV Tora", "19.03.1997", "m", "1. Kyu");
    let fighter2 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "fkt54ktertn4", "Vorname2", "Nachname2", "SV Tora 1", "19.03.1997", "f", "2. Kyu");
    let fighter3 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "nhk345hiukj", "Vorname3", "Nachname3", "SV Tora 2", "19.03.1999", "m", "4. Kyu");
    let fighter4 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "reuith45tkh", "Vorname4", "Nachname4", "SV Tora 3", "15.07.1999", "m", "1. Dan");
    let fighter5 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "bgbrk34hb4te", "Vorname5", "Nachname5", "SV Tora 4", "15.07.1999", "f", "1. Dan");
    let fighter6 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "kenrkj3oh3h4", "Vorname6", "Nachname6", "SV Tora 4", "15.07.1999", "f", "1. Dan");
    let fighter7 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "as3ertdj3lkh", "Vorname7", "Nachname7", "SV Tora 4", "15.07.1999", "f", "1. Dan");
    let fighter8 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "ln456h345h6", "Vorname8", "Nachname8", "SV Tora 4", "15.07.1999", "f", "1. Dan");
    let fighter9 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "asdf86ad7ff", "Vorname9", "Nachname9", "SV Tora 4", "15.07.1999", "f", "1. Dan");
    let fighter10 = App.PersonModule.createPersonFactory(personTypes.FIGHTER, "al4t4l3htjk4", "Vorname10", "Nachname10", "SV Tora 4", "15.07.1999", "f", "1. Dan");

    let dogEatDog = App.FightingSystemModule.createFightingSystemFactory(fightingSystemTypes.DOGEATDOG, [fighter1, fighter2, fighter3, fighter4]);

    let koSystem = App.FightingSystemModule.createFightingSystemFactory(fightingSystemTypes.KO, [fighter1, fighter2, fighter3, fighter4, fighter5, fighter6, fighter7, fighter8, fighter9]);


    let tableSystem = App.FightingSystemModule.createFightingSystemFactory(fightingSystemTypes.TABLES, [fighter1, fighter2, fighter3, fighter4, fighter5]);

    function initializeCategoryObjects() {
        // Todo: Call backend and retrieve all categories as objects
    }




    let fightingAccordions = [];

    let carouselElement = document.querySelector("div.carousel-container");
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
                if (This.inheritance.openBar.classList.contains("prepared")) {
                    App.ModalModule.confirmModal("Kampfsystem wählen...", "Willst du wirklich ein anderes Kampfsystem wählen? Eventuelle Änderungen, die du schon gemacht hast, werden damit überschrieben und das kann nicht rückgängig gemacht werden.", This.chooseFightingSystem);
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
                let printChoice = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.CHECKBOX, [], undefined, "print-choice", undefined, undefined, undefined, printOptions);
                App.ModalModule.confirmModal("Drucken", printChoice.inputContainer, function () {
                    App.ModalModule.infoModal("Drucken", "Der Drucker ist gemein und mit so jemandem möchte ich nicht zusammen arbeiten. Sorry :/");
                });
            }

            if (target.classList.contains("edit-fighting-system")) {
                let bar = target;
                while (bar.nodeName !== "BODY" && !bar.classList.contains("accordion-bar")) {
                    bar = bar.parentElement;
                }
                let categoryName = bar.querySelector(".bar-header span.category-name").innerHTML.trim();
                changeFightingSystemParameter(categoryName);
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
            let icon = App.GeneralModule.generateElement("i", ["material-icons", "prepared"], "done");
            bar.querySelector(".bar-header").appendChild(icon);
            App.PrimaryButtonModule.enablePrimaryButton(bar.querySelector("a.edit-fighting-system"));
        }

    };

    function changeFightingSystemParameter(categoryName) {
        koSystem.change();
    }

    function disableFightingSystem(system) {
        let slide = App.CarouselModule.getSlideByContent(carouselElement, "h3", system);
        App.CarouselModule.disableSlide(slide);
    }

    let accordionElements = document.querySelectorAll("div.accordion");

    accordionElements.forEach(function (accordion) {
        fightingAccordions.push(new FightingAccordion(accordion));
    });

})(window, document);
