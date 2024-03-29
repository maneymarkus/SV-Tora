/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "TooltipModule"];
    App.GeneralModule.checkDependencies(dependencies);

    const BREAK_MAX = 90;
    let currentLength = 3;

    // length in rem for coherent depiction in frontend
    const ONE_MINUTE_LENGTH = App.GeneralModule.generalVariables.ONE_MINUTE_LENGTH;

    let body = document.querySelector("body");
    let timeScheduleContainer = document.querySelector("div.time-schedule-container");
    let locationsContainer = timeScheduleContainer.querySelector("div.locations");
    let buttonContainer = document.querySelector("div.time-actions");
    let resetButton = buttonContainer.querySelector("a.primary-button.reset");
    let saveButton = buttonContainer.querySelector("a.primary-button.save");
    let backButton = buttonContainer.querySelector("a.primary-button.back");
    let timeBlocksContainer = document.querySelector("div.time-blocks-container");
    let categoryContainer = timeBlocksContainer.querySelector(".category-container");

    buttonContainer.addEventListener("click", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("primary-button")) {
            target = target.parentElement;
        }

        // Save and exit
        if (target.classList.contains("save")) {
            e.preventDefault();
            let schedule = {};
            document.querySelectorAll(".locations div.fight-place").forEach(fightPlaceElement => {
                const fightPlaceId = fightPlaceElement.getAttribute("data-fight-place-id");
                schedule[fightPlaceId] = [];
                fightPlaceElement.querySelectorAll(".time-block").forEach(timeBlockElement => {
                    if (timeBlockElement.classList.contains("category")) {
                        const categoryId = timeBlockElement.getAttribute("data-category-id");
                        schedule[fightPlaceId].push(categoryId);
                    }
                    if (timeBlockElement.classList.contains("break")) {
                        const breakDuration = timeBlockElement.querySelector("span.duration").textContent;
                        schedule[fightPlaceId].push("break:" + breakDuration);
                    }
                });
            });
            const data = {"schedule" : schedule};
            let url = target.getAttribute("href");
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, function () {
                App.ModalModule.confirmModal("Änderungen gespeichert. Verlassen?", "Deine Änderungen wurden gespeichert. Willst du nun zum Wettkampf-Dashboard zurück?", function () {
                    window.location.href = backButton.getAttribute("href");
                });
            }, data, true);
        }

        // completely reset any changes
        if (target.classList.contains("reset")) {
            let timeBlocks = locationsContainer.querySelectorAll(".time-block");
            if (timeBlocks.length > 0) {
                App.ModalModule.deleteModal("Änderungen zurücksetzen", "Diese Aktion setzt alle Änderungen komplett zurück. Alle zugeordneten Kämpfe werden wieder aufgehoben. Das kann nicht rückgängig gemacht werden.", function () {
                    let timeBlocks = locationsContainer.querySelectorAll(".time-block");
                    timeBlocks.forEach((timeBlock) => {
                        if (timeBlock.classList.contains("break")) {
                            timeBlock.remove();
                        } else {
                            categoryContainer.appendChild(timeBlock);
                        }
                    });
                });
            }
        }

        // go back to dashboard without saving
        if (target.classList.contains("back")) {
            e.preventDefault();
            App.ModalModule.confirmModal("Seite verlassen", "Deine Änderungen werden nicht gespeichert und du kommst zum Wettkampf-Dashboard zurück.", function () {
                window.location.href = backButton.getAttribute("href");
            });
        }

        //change the length of the time scale (for more "space" (time))
        if (target.classList.contains("duration")) {
            App.TimeScheduleModule.changeDuration(timeScheduleContainer);
        }

    });

    timeBlocksContainer.addEventListener("mousedown", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("time-block")) {
            target = target.parentElement;
        }
        if (target.classList.contains("time-block")) {
            handleMouseDownOnTimeBlock(e, target);
        }
    });

    locationsContainer.addEventListener("mousedown", function (e) {
        let target = e.target;
        while (target.nodeName !== "BODY" && !target.classList.contains("time-block")) {
            target = target.parentElement;
        }
        if (target.classList.contains("time-block")) {
            handleMouseDownOnTimeBlock(e, target);
        }
    });


    /**
     * The following block block contains code responsible for the drag and drop action to create the timing schedule
     */

    let dragProperties = {
        xMouseGlobalPos : 0,
        yMouseGlobalPos : 0,
        xMouseRelativePos : 0,
        yMouseRelativePos : 0,
    }

    let draggingTimeBlock = undefined;
    let dragOrigin = undefined;
    let newBreak = false;
    let then = 0;

    function handleMouseDownOnTimeBlock(e, target) {
        e.preventDefault();
        draggingTimeBlock = target;
        dragOrigin = target;
        while (dragOrigin.nodeName !== "BODY" && !dragOrigin.classList.contains("category-container") && !dragOrigin.classList.contains("fight-place")) {
            dragOrigin = dragOrigin.parentElement;
        }
        if (draggingTimeBlock.classList.contains("break") && draggingTimeBlock.parentElement.classList.contains("break-section")) {
            newBreak = true;
        }
        then = new Date();
        dragProperties.xMouseGlobalPos = e.pageX;
        dragProperties.yMouseGlobalPos = e.pageY;
        let targetRect = draggingTimeBlock.getBoundingClientRect();
        dragProperties.xMouseRelativePos = Math.round((e.clientX - targetRect.left) * 100) / 100;
        dragProperties.yMouseRelativePos = Math.round((e.clientY - targetRect.top) * 100) / 100;
        draggingTimeBlock.classList.add("dragging");
        body.appendChild(draggingTimeBlock);
        window.addEventListener("mousemove", handleMouseMoveOnTimeBlock);
        window.addEventListener("mouseup", handleMouseUpOnTimeBlock);
    }

    function handleMouseMoveOnTimeBlock(e) {
        e.preventDefault();
        dragProperties.xMouseGlobalPos = e.pageX;
        dragProperties.yMouseGlobalPos = e.pageY;
        draggingTimeBlock.style.left = dragProperties.xMouseGlobalPos - dragProperties.xMouseRelativePos + "px";
        draggingTimeBlock.style.top = dragProperties.yMouseGlobalPos - dragProperties.yMouseRelativePos + "px";
    }

    function handleMouseUpOnTimeBlock(e) {
        draggingTimeBlock.hidden = true;
        let dropTarget = document.elementFromPoint(e.clientX, e.clientY);
        draggingTimeBlock.hidden = false;
        while (dropTarget.nodeName !== "BODY" && !dropTarget.classList.contains("category-container") && !dropTarget.classList.contains("fight-place") && !dropTarget.classList.contains("time-block")) {
            dropTarget = dropTarget.parentElement;
        }
        if (dropTarget.classList.contains("fight-place")) {
            dropTarget.appendChild(draggingTimeBlock);
        } else if (dropTarget.classList.contains("category-container") && !draggingTimeBlock.classList.contains("break")) {
            dropTarget.appendChild(draggingTimeBlock);
        } else if (dropTarget.classList.contains("time-block")) {
            let nextSibling = dropTarget;
            while (!dropTarget.classList.contains("category-container") && !dropTarget.classList.contains("fight-place")) {
                dropTarget = dropTarget.parentElement;
            }
            if (dropTarget.classList.contains("category-container") && !draggingTimeBlock.classList.contains("break")) {
                dropTarget.insertBefore(draggingTimeBlock, nextSibling);
            } else if (dropTarget.classList.contains("fight-place")) {
                dropTarget.insertBefore(draggingTimeBlock, nextSibling);
            }
        } else {
            if (!newBreak) {
                dragOrigin.appendChild(draggingTimeBlock);
            } else {
                draggingTimeBlock.remove();
            }
        }

        // if the dragged time block is a new break than set the duration of the break and create a new generic break element and append it directly
        if (newBreak) {
            setBreakDuration(draggingTimeBlock);
            createNewGenericBreakElement();
        }

        let now = new Date();
        if (draggingTimeBlock.classList.contains("break") && (now - then) <= 150) {
            let currentValue = parseInt(draggingTimeBlock.querySelector("span.duration").innerText);
            setBreakDuration(draggingTimeBlock, currentValue);
        }

        draggingTimeBlock.classList.remove("dragging");
        draggingTimeBlock.style.removeProperty("top");
        draggingTimeBlock.style.removeProperty("left");
        draggingTimeBlock = undefined;
        dragOrigin = undefined;
        newBreak = false;
        window.removeEventListener("mousemove", handleMouseMoveOnTimeBlock);
        window.removeEventListener("mouseup", handleMouseUpOnTimeBlock);
    }

    function createNewGenericBreakElement() {
        let breakSection = timeBlocksContainer.querySelector("div.break-section");
        let breakDiv = App.GeneralModule.generateElement("div", ["break", "time-block"]);
        breakDiv.appendChild(App.GeneralModule.generateElement("h3", [], "Pause"));
        let p = App.GeneralModule.generateElement("p", []);
        p.appendChild(App.GeneralModule.generateElement("span", ["duration"], "?"))
        p.appendChild(document.createTextNode(" Minuten"));
        breakDiv.appendChild(p);
        breakSection.appendChild(breakDiv);
    }

    function setBreakDuration(breakElement, initialValue) {
        let rangeInput = App.MaterialInputsModule.createInput(App.GeneralModule.generalVariables.inputTypes.RANGE, [], undefined, "break-duration", "Länge der Pause (in Minuten)", (initialValue) ? initialValue : 0, undefined, undefined);
        rangeInput.setMin(0);
        rangeInput.setMax(BREAK_MAX);

        App.ModalModule.confirmModal("Pausenzeit einstellen", rangeInput.inputContainer, function () {
            let chosenDuration = rangeInput.getValue();
            if (chosenDuration === "0") {
                breakElement.remove();
            } else {
                breakElement.querySelector("span.duration").innerHTML = chosenDuration + "";
                breakElement.style.height = ONE_MINUTE_LENGTH * chosenDuration + "rem";
            }
        }, function () {
            breakElement.remove();
        });
    }

})(window, document);
