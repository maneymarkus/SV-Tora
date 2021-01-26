/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "TooltipModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  const BREAK_MAX = 90;

  // length in rem for coherent depiction in frontend
  const ONE_MINUTE_LENGTH = 0.167;

  // length in rem for coherent depiction in frontend
  const ONE_HOUR_LENGTH = 10;

  let body = document.querySelector("body");
  let timeContainer = document.querySelector("div.time-container");
  let fightPlacesContainer = document.querySelector("div.fight-places");
  let buttonContainer = document.querySelector("div.time-actions");
  let resetButton = buttonContainer.querySelector("a.primary-button.reset");
  let saveButton = buttonContainer.querySelector("a.primary-button.save");
  let backButton = buttonContainer.querySelector("a.primary-button.back");
  let timeBlocksContainer = document.querySelector("div.time-blocks-container");
  let categoryContainer = timeBlocksContainer.querySelector(".category-container");
  let fightPlaces = fightPlacesContainer.querySelectorAll("div.fight-place");
  let timeScale = document.querySelector("div.time-scale");

  function initialization() {
    let countFightPlaces = fightPlaces.length;
    let countHours = timeScale.querySelectorAll("div.hour.full").length;

    setWidthOfVisualAids(countFightPlaces);

    setWidthOfTimeContainer(countFightPlaces);

    setHeightOfTimeContainer(countHours);

    let categoryTimeBlocks = document.querySelectorAll(".time-block.category");

    categoryTimeBlocks.forEach((categoryTimeBlock) => {
      let duration = categoryTimeBlock.querySelector("p").innerText;
      let individualIdentifier = "tippy-" + Math.random().toString(16).substr(2, 10);
      categoryTimeBlock.classList.add(individualIdentifier);
      TooltipModule.createTooltipApi("div." + individualIdentifier, duration);
    });

  }
  initialization();

  function setWidthOfTimeContainer(countFightPlaces) {
    // the width is calculated in this way: 8rem are needed for the time scale on the left, 2rem are needed as a little space on the right end of the time container and each of the fight place containers needs 16rem of space
    timeContainer.style.width = 8 + 2 + (16 * countFightPlaces) + "rem";
  }

  function setHeightOfTimeContainer(countHours) {
    // the height is calculated in this way: 5rem are needed for the headings of the fight places and any paddings and margins in the container and 10rem are needed for each hour
    timeContainer.style.height = 5 + (10 * countHours) + "rem";

  }

  function setWidthOfVisualAids(countFightPlaces) {
    let hourlyVisualAids = timeScale.querySelectorAll("span.visual-aid");
    let visualAidsWidth = 16 * countFightPlaces;
    hourlyVisualAids.forEach((visualAid) => {
      visualAid.style.width = visualAidsWidth + "rem";
    });
  }

  buttonContainer.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("primary-button")) {
      target = target.parentElement;
    }

    // Save and exit
    if (target.classList.contains("save")) {
      e.preventDefault();
      //TODO: save configuration and afterwards go to dashboard
      ModalModule.confirmModalApi("Änderungen Speichern und Verlassen", "Deine Änderungen werden gespeichert und du kommst nun zum Wettkampf-Dashboard zurück.", function () {
        window.location.href = saveButton.getAttribute("href");
      });
    }

    // completely reset any changes
    if (target.classList.contains("reset")) {
      let timeBlocks = fightPlacesContainer.querySelectorAll(".time-block");
      if (timeBlocks.length > 0) {
        ModalModule.deleteModalApi("Änderungen zurücksetzen", "Diese Aktion setzt alle Änderungen komplett zurück. Alle zugeordneten Kämpfe werden wieder aufgehoben. Das kann nicht rückgängig gemacht werden.", function () {
          let timeBlocks = fightPlacesContainer.querySelectorAll(".time-block");
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
      ModalModule.confirmModalApi("Seite verlassen", "Deine Änderungen werden nicht gespeichert und du kommst zum Wettkampf-Dashboard zurück.", function () {
        window.location.href = saveButton.getAttribute("href");
      });
    }

    //change the length of the time scale (for more "space" (time)
    if (target.classList.contains("duration")) {
      let initialValue = timeScale.querySelectorAll("div.hour.full").length;
      let calculatedMinValue = calculateMinDurationValue();
      let minValue = (calculatedMinValue !== 0) ? calculatedMinValue : 1;
      let rangeInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RANGE, [], undefined, "total-duration", "Länge des Wettkampfes (in Stunden)", (initialValue) ? initialValue : 1, undefined, undefined);
      rangeInput.setMin(minValue);
      rangeInput.setMax(10);

      ModalModule.confirmModalApi("Pausenzeit einstellen", rangeInput.inputContainer, function () {
        let chosenDuration = rangeInput.getValue();
        let hourText = timeScale.querySelector("div.hour span.whole").innerText;
        let startHour = parseInt(hourText.substring(0, hourText.indexOf(":")));
        timeScale.innerHTML = "";
        let hour = startHour;
        for (let i = 1; i <= chosenDuration; i++) {
          timeScale.appendChild(createFullHourElement(hour++));
        }
        timeScale.appendChild(createShortHourElement(hour));
        let countHours = timeScale.querySelectorAll("div.hour.full").length;
        setHeightOfTimeContainer(countHours);
        setWidthOfVisualAids(fightPlaces.length);
      });
    }

  });

  function createFullHourElement(h) {
    let hour = h % 24;
    let hourContainer = GeneralModule.generateElementApi("div", ["hour", "full"]);

    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["visual-aid"]));
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["whole"], hour + ":00"));
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["quarter"], hour + ":15"));
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["half"], hour + ":30"));
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["three-fourths"], hour + ":45"));

    return hourContainer;
  }

  function createShortHourElement(h) {
    let hour = h % 24;
    let hourContainer = GeneralModule.generateElementApi("div", ["hour", "short"]);
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["visual-aid"]));
    hourContainer.appendChild(GeneralModule.generateElementApi("span", ["whole"], hour + ":00"));
    return hourContainer;
  }

  function calculateMinDurationValue() {
    let minValue = 0;
    fightPlaces.forEach((fightPlace) => {
      let totalTimeForThisPlace = 0;
      let timeBlocks = fightPlace.querySelectorAll("div.time-block");
      timeBlocks.forEach((timeBlock) => {
        let singleDuration = parseInt(timeBlock.querySelector("span.duration").innerText);
        totalTimeForThisPlace += singleDuration;
      });
      if (totalTimeForThisPlace > minValue) {
        minValue = totalTimeForThisPlace;
      }
    });
    let minValueInHours = Math.ceil(minValue / 60);
    return minValueInHours;
  }

  timeBlocksContainer.addEventListener("mousedown", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("time-block")) {
      target = target.parentElement;
    }
    if (target.classList.contains("time-block")) {
      handleMouseDownOnTimeBlock(e, target);
    }
  });

  fightPlacesContainer.addEventListener("mousedown", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("time-block")) {
      target = target.parentElement;
    }
    if (target.classList.contains("time-block")) {
      handleMouseDownOnTimeBlock(e, target);
    }
  });

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
    let breakDiv = GeneralModule.generateElementApi("div", ["break", "time-block"]);
    breakDiv.appendChild(GeneralModule.generateElementApi("h3", [], "Pause"));
    let p = GeneralModule.generateElementApi("p", []);
    p.appendChild(GeneralModule.generateElementApi("span", ["duration"], "?"))
    p.appendChild(document.createTextNode(" Minuten"));
    breakDiv.appendChild(p);
    breakSection.appendChild(breakDiv);
  }

  function setBreakDuration(breakElement, initialValue) {
    let rangeInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RANGE, [], undefined, "break-duration", "Länge der Pause (in Minuten)", (initialValue) ? initialValue : 0, undefined, undefined);
    rangeInput.setMin(0);
    rangeInput.setMax(BREAK_MAX);

    ModalModule.confirmModalApi("Pausenzeit einstellen", rangeInput.inputContainer, function () {
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
