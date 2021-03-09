/**
 * This Module contains code responsible for managing time schedules
 */
var TimeScheduleModule = (function (window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["SecondaryButtonModule", "MaterialInputsModule", "ModalModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  // length in em for coherent depiction in frontend
  const ONE_MINUTE_LENGTH_IN_EM = GeneralModule.generalVariables.ONE_MINUTE_LENGTH;
  const MAX_LENGTH_IN_HOURS = 15;

  let timeSchedules = [];

  /**
   * This "class" represents a displayed HTML time schedule element and enables a detailed control over it
   * @param timeSchedule {HTMLElement} The respective HTML time schedule element this object represents
   * @constructor
   */
  let TimeSchedule = function (timeSchedule) {
    /*********************************************************************
     *          Properties                                               *
     ********************************************************************/

    let This = this;
    this.timeScheduleElement = timeSchedule;
    this.unqiueIdentifier = this.timeScheduleElement.getAttribute("id");
    this.timeScaleElement = timeSchedule.querySelector("div.time-scale");
    this.locationColumnElements = timeSchedule.querySelectorAll("div.locations div.fight-place");
    this.currentTimeIndicator = undefined;

    this.numberLocations = this.locationColumnElements.length;
    this.lengthInHours = this.timeScaleElement.querySelectorAll("div.hour.full").length;
    this.startTime = this.timeScaleElement.querySelector("div.hour.full span.whole").innerText;
    // TODO: get expected end time from backend via unique Identifier
    this.expectedEndTime = undefined;


    /*********************************************************************
     *          Functions                                                *
     ********************************************************************/

    this.enableTimeIndicator = function () {
      if (!This.currentTimeIndicator) {
        This.currentTimeIndicator = GeneralModule.generateElementApi("hr", ["current-time-indicator"]);
        This.timeScheduleElement.appendChild(This.currentTimeIndicator);
      }

      // calculate start time in minutes
      let currentDate = new Date();
      //let currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
      let currentTimeInMinutes = 960;
      let startTimeInMinutes = 0;
      let parts = This.startTime.split(":");
      startTimeInMinutes += parts[0] * 60;
      startTimeInMinutes += parts[1];

      // TODO: get expected end time from backend
      let expectedEndInMinutes = undefined;

      // calculate max end time in minutes
      let maxEndTimeRelative = This.lengthInHours * 60;

      let currentTimeInMinutesRelative = currentTimeInMinutes - startTimeInMinutes;
      adjustCurrentTimeIndicator(currentTimeInMinutesRelative * ONE_MINUTE_LENGTH_IN_EM);

      let minuteInterval = window.setInterval(adjustCurrentTimeIndicator, 60000);

      function adjustCurrentTimeIndicator() {
        currentTimeInMinutesRelative++;
        if (currentTimeInMinutesRelative <= maxEndTimeRelative) {
          let topOffset = currentTimeInMinutesRelative * ONE_MINUTE_LENGTH_IN_EM
          // Top offset can't be smaller than 0
          topOffset = (topOffset < 0) ? 0 : topOffset;
          This.currentTimeIndicator.style.top = topOffset + "em";
        } else {
          clearInterval(minuteInterval);
        }
      }
    }

    this.setHeightOfTimeContainer = function (countHours) {
      // TODO: calculation of height and width of elements should be done in backend
      let heightOf1Hour = ONE_MINUTE_LENGTH_IN_EM * 60;

      // the height is calculated in this way: 5em are needed for the headings of the locations and any paddings and margins in the container and each hour needs the equalling length of one minute times 60 of space
      This.timeScheduleElement.style.height = 5 + (heightOf1Hour * countHours) + "em";

      This.setHeightOfVisualAids();

    }

    this.setHeightOfVisualAids = function () {
      let heightOf1Hour = ONE_MINUTE_LENGTH_IN_EM * 60;
      This.locationColumnElements.forEach((column) => {
        column.style.backgroundSize = "100% " + heightOf1Hour + "em";
      });
    }

    /**
     * This function sets the width of the time schedule container according to the number of location
     * @param countLocations
     */
    this.setWidthOfTimeContainer = function (countLocations) {
      // the width is calculated in this way: 8em are needed for the time scale on the left, 2em are needed as a little space on the right end of the time container and each of the fight place containers needs 16em of space
      This.timeScheduleElement.style.width = 8 + 2 + (16 * countLocations) + "em";
    }

    /**
     * This function initializes the time schedule element in order to ensure a correct display in frontend
     */
    this.initialization = function () {
      This.setHeightOfTimeContainer(This.lengthInHours);
      This.setWidthOfTimeContainer(This.numberLocations);
    }
    this.initialization();

    /**
     * This function asks the user to change the length of the time schedule in the well defined limits
     */
    this.changeLength = function () {
      let calculatedMinValue = This.calculateMinDurationValue();
      let minValue = (calculatedMinValue !== 0) ? calculatedMinValue : 1;
      let rangeInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RANGE, [], undefined, "total-duration", "Länge des Wettkampfes (in Stunden):", (This.lengthInHours) ? This.lengthInHours : 1, undefined, undefined);
      rangeInput.setMin(minValue);
      rangeInput.setMax(MAX_LENGTH_IN_HOURS);
      rangeInput.setStep(0.25);

      ModalModule.confirmModalApi("Länge des Wettkampfes", rangeInput.inputContainer, function () {
        let chosenDuration = rangeInput.getValue();



        let startHour = parseInt(This.startTime.substring(0, This.startTime.indexOf(":")));
        This.timeScaleElement.innerHTML = "";
        let hour = startHour;
        for (let i = 1; i <= chosenDuration; i++) {
          This.timeScaleElement.appendChild(createFullHourElement(hour++));
        }
        This.timeScaleElement.appendChild(createShortHourElement(hour));
        let countHours = This.timeScaleElement.querySelectorAll("div.hour.full").length;
        This.setHeightOfTimeContainer(countHours);
      });
    }

    this.calculateMinDurationValue = function () {
      let minValue = 0;
      This.locationColumnElements.forEach((column) => {
        let totalTimeForThisLocation = 0;
        let timeBlocks = column.querySelectorAll("div.time-block");
        timeBlocks.forEach((timeBlock) => {
          let singleDuration = parseInt(timeBlock.querySelector("span.duration").innerText);
          totalTimeForThisLocation += singleDuration;
        });
        if (totalTimeForThisLocation > minValue) {
          minValue = totalTimeForThisLocation;
        }
      });
      let minValueInHours = Math.ceil(minValue / 60);
      return minValueInHours;
    }

  }

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

  /**
   * This block initializes the static time schedules on an application page
   */
  let timeScheduleElements = document.querySelectorAll(".time-schedule-container");
  timeScheduleElements.forEach(function (timeSchedule) {
    timeSchedules.push(new TimeSchedule(timeSchedule));
  });

  /**
   * API:
   */
  return {

  }

})(window, document);
