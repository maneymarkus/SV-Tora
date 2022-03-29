/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";
import { createInput } from "./MaterialInputsModule";
import { confirmModal } from "./ModalModule";

/**
 * This Module contains code responsible for managing time schedules
 */

    // length in em for coherent depiction in frontend
const ONE_MINUTE_LENGTH_IN_EM = GeneralModule.generalVariables.ONE_MINUTE_LENGTH;
const MAX_LENGTH_IN_HOURS = 15;

let progressEvent = new CustomEvent(
    "timeScheduleProgress",
    {
        bubbles: true,
        cancelable: true,
    }
);

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
    // since start time and end time (on the time scale!) have separate spans, increasing the total amount of spans by 1, we need to deduct a span to get the correct amount of hours displayed on the time scale
    this.lengthInHours = (this.timeScaleElement.querySelectorAll("span.time").length - 1) / 4;
    this.startTime = this.timeScaleElement.querySelector("span.start").innerText;
    // TODO: get expected end time from backend via unique Identifier
    this.expectedEndTime = undefined;
    this.minuteInterval = undefined;
    this.progress = 0;


    /*********************************************************************
     *          Functions                                                *
     ********************************************************************/

    this.enableTimeIndicator = function () {
        if (!This.currentTimeIndicator) {
            This.currentTimeIndicator = GeneralModule.generateElement("hr", ["current-time-indicator"]);
            This.timeScheduleElement.appendChild(This.currentTimeIndicator);
        }

        // calculate start time in minutes
        let currentDate = new Date();

        let currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
        let startTimeInMinutes = 0;
        let parts = This.startTime.split(":");
        startTimeInMinutes += parseInt(parts[0]) * 60;
        startTimeInMinutes += parseInt(parts[1]);

        // calculate max end time in minutes
        let maxEndTimeRelative = This.lengthInHours * 60;

        let currentTimeInMinutesRelative = currentTimeInMinutes - startTimeInMinutes;

        This.minuteInterval = window.setInterval(adjustCurrentTimeIndicator, 60000);

        function adjustCurrentTimeIndicator() {
            currentTimeInMinutesRelative++;
            if (currentTimeInMinutesRelative <= maxEndTimeRelative) {
                let topOffset = currentTimeInMinutesRelative * ONE_MINUTE_LENGTH_IN_EM
                // Top offset can't be smaller than 0
                topOffset = (topOffset < 0) ? 0 : topOffset;
                This.currentTimeIndicator.style.top = topOffset + "em";
                This.locationColumnElements.forEach((column) => {
                    markTimeBlocksAsDone(column, currentTimeInMinutesRelative);
                });
                updateProgress();
            } else {
                clearInterval(This.minuteInterval);
            }
        }

        function updateProgress() {
            let progress = currentTimeInMinutesRelative / maxEndTimeRelative
            This.progress = Math.round(progress * 100) / 100;
            This.timeScheduleElement.dispatchEvent(progressEvent);
        }

    }

    /**
     *  This function disables a prior enabled time indicator
     * @param remove {boolean} This parameter determines if the time indicator element should also be removed (from displaying)
     */
    this.disableTimeIndicator = function (remove = false) {
        if (This.minuteInterval) {
            clearInterval(This.minuteInterval);
            if (remove) {
                This.currentTimeIndicator.remove();
            }
        }
    }

    /**
     * This function sets the height of the time schedule container (after e.g. changing the duration of the tournament)
     * @param countHours {number} This variable determines how high the container should be and can also contain fractions of hours
     */
    this.setHeightOfTimeContainer = function (countHours) {
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
        // the width is calculated in this way: 6em are needed for the time scale on the left, 2em are needed as a little space on the right end of the time container and each of the fight place containers needs 12em of space
        This.timeScheduleElement.style.width = 6 + 2 + (12 * countLocations) + "em";
    }

    /**
     * This function asks the user to change the length of the time schedule in the well defined limits
     */
    this.changeDuration = function () {
        let calculatedMinValue = This.calculateMinDurationValue();
        let minValue = (calculatedMinValue !== 0) ? calculatedMinValue : 1;
        let rangeInput = createInput(GeneralModule.generalVariables.inputTypes.RANGE, [], undefined, "total-duration", "Länge des Wettkampfes (in Stunden):", (This.lengthInHours) ? This.lengthInHours : 1, undefined, undefined);
        rangeInput.setMin(minValue);
        rangeInput.setMax(MAX_LENGTH_IN_HOURS);
        rangeInput.setStep(0.25);

        confirmModal("Länge des Wettkampfes", rangeInput.inputContainer, function () {
            let chosenDuration = rangeInput.getValue();
            let hours = parseInt(This.startTime.substring(0, This.startTime.indexOf(":")));
            let minutes = parseInt(This.startTime.substring(This.startTime.indexOf(":") + 1));
            This.timeScaleElement.innerHTML = "";

            let startTimeSpan = createTimeScaleSpan(hours, minutes, true);
            This.timeScaleElement.appendChild(startTimeSpan);

            let numberQuarterHours = chosenDuration * 4;

            for (let i = 0; i < numberQuarterHours; i++) {
                minutes += 15;
                if (minutes === 60) {
                    minutes = 0;
                    hours += 1;
                }
                if (hours === 24) {
                    hours = 0;
                }
                let span = createTimeScaleSpan(hours, minutes);
                This.timeScaleElement.appendChild(span);
            }

            This.lengthInHours = chosenDuration;
            This.setHeightOfTimeContainer(chosenDuration);

        });
    }

    this.calculateMinDurationValue = function () {
        let longestDuration = this.calculateExpectedEndTime();

        // calculate the number of quarter hours needed
        let minValueInQuarterHours = Math.ceil(longestDuration / 15);

        // convert to hours
        let minValueInHours = minValueInQuarterHours / 4;

        // add another quarter hour as "padding"
        minValueInHours += 0.25;
        return minValueInHours;
    }

    this.calculateExpectedEndTime = function () {
        let maxValue = 0;
        This.locationColumnElements.forEach((column) => {
            let totalTimeForThisLocation = calculateDurationOfLocation(column);
            if (totalTimeForThisLocation > maxValue) {
                maxValue = totalTimeForThisLocation;
            }
        });
        return maxValue;
    }

    /**
     * This function updates properties (after a manual call) that could potentially have changed
     */
    this.updateProperties = function () {
        this.locationColumnElements = timeSchedule.querySelectorAll("div.locations div.fight-place");
        this.numberLocations = this.locationColumnElements.length;
        this.setWidthOfTimeContainer(This.numberLocations);
    }

    /**
     * This function initializes the time schedule element in order to ensure a correct display in frontend
     */
    this.initialization = function () {
        this.setHeightOfTimeContainer(this.lengthInHours);
        this.setWidthOfTimeContainer(this.numberLocations);
        this.expectedEndTime = this.calculateExpectedEndTime();
    }
    this.initialization();

}

function calculateDurationOfLocation(column) {
    if (column.classList.contains("location-column")) {
        let totalTime = 0;
        let timeBlocks = column.querySelectorAll("div.time-block");
        timeBlocks.forEach((timeBlock) => {
            let singleDuration = parseInt(timeBlock.querySelector("span.duration").innerText);
            totalTime += singleDuration;
        });
        return totalTime;
    } else {
        return undefined;
    }
}

/**
 * This function marks time blocks that have been already passed as "done" (the categories e.g. have already been finished)
 * @param column {HTMLElement} The location column element in which the time block should be marked
 * @param currentTime {number} The current time in minutes
 */
function markTimeBlocksAsDone(column, currentTime) {
    let timeBlocks = column.querySelectorAll("div.time-block");
    let cumulativeCategoriesTime = 0;
    timeBlocks.forEach((timeBlock) => {
        let duration = parseInt(timeBlock.querySelector("span.duration").innerText);
        cumulativeCategoriesTime += duration;
        if (cumulativeCategoriesTime < currentTime) {
            timeBlock.classList.add("done");
        }
    });
}

/**
 * This function creates a span element representing a time on the time scale
 * @param hours {number}
 * @param minutes {number}
 * @param start {boolean} Contains if the span to be generated is the first span
 */
function createTimeScaleSpan(hours, minutes, start = false) {
    let span = GeneralModule.generateElement("span", ["time"]);
    let emphasizeSpan = undefined;

    // convert number values to strings
    let textMinutes = minutes + "";
    let textHours = hours + "";


    if (minutes === 0) {
        textMinutes = "00";
    }
    if (hours === 0) {
        textHours = "00";
    }


    if (start) {
        emphasizeSpan = GeneralModule.generateElement("span", ["emphasize"], textHours + ":" + textMinutes);
        span.classList.add("start");
    }

    if (minutes === 0) {
        if (!emphasizeSpan) {
            emphasizeSpan = GeneralModule.generateElement("span", ["emphasize"], textHours + ":" + textMinutes);
        }
        span.classList.add("whole");
    }

    if (emphasizeSpan) {
        span.appendChild(emphasizeSpan);
    } else {
        span.innerHTML = textHours + ":" + textMinutes;
    }

    return span;
}

/**
 * This block initializes the static time schedules on an application page
 */
let timeScheduleElements = document.querySelectorAll(".time-schedule-container");
timeScheduleElements.forEach(function (timeSchedule) {
    timeSchedules.push(new TimeSchedule(timeSchedule));
});

/**
 * This function enables other modules to change the total duration of a time schedule
 * @param timeScheduleElement {HTMLElement} The time schedule element that should be changed in duration
 */
function changeDuration(timeScheduleElement) {
    if (timeScheduleElement.classList.contains("time-schedule-container")) {
        timeSchedules.forEach((tS) => {
            if (tS.timeScheduleElement === timeScheduleElement) {
                tS.changeDuration();
            }
        });
    }
}

/**
 * This function enables other modules to enable the time indicator of a time schedule
 * @param timeScheduleElement {HTMLElement} The time schedule element that should have a time indicator
 */
function enableTimeIndicator(timeScheduleElement) {
    if (timeScheduleElement.classList.contains("time-schedule-container")) {
        timeSchedules.forEach((tS) => {
            if (tS.timeScheduleElement === timeScheduleElement) {
                tS.enableTimeIndicator();
            }
        });
    }
}

/**
 * This function enables other modules to enable the time indicator of a time schedule
 * @param timeScheduleElement {HTMLElement} The time schedule element that should have a time indicator
 * @param remove {boolean} This parameter determines if the corresponding html time indicator element should be removed
 */
function disableTimeIndicator(timeScheduleElement, remove) {
    if (timeScheduleElement.classList.contains("time-schedule-container")) {
        timeSchedules.forEach((tS) => {
            if (tS.timeScheduleElement === timeScheduleElement) {
                tS.disableTimeIndicator(remove);
            }
        });
    }
}

/**
 * This api function returns the progress of a given time schedule element
 * @param timeScheduleElement {HTMLElement} The time schedule element of which the progress is requested
 * @return {number}
 */
function getProgress(timeScheduleElement) {
    let progress = 0;
    if (timeScheduleElement.classList.contains("time-schedule-container")) {
        timeSchedules.forEach((tS) => {
            if (tS.timeScheduleElement === timeScheduleElement) {
                progress = tS.progress;
            }
        });
    }
    return progress;
}

/**
 * This function updates properties of a time schedule object that could potentially have changed
 * @param timeScheduleElement {HTMLElement} The time schedule element of which the progress is requested
 */
function updateProgress(timeScheduleElement) {
    if (timeScheduleElement.classList.contains("time-schedule-container")) {
        timeSchedules.forEach((tS) => {
            if (tS.timeScheduleElement === timeScheduleElement) {
                tS.updateProperties();
            }
        });
    }
}


/**
 * API:
 */
export {
    changeDuration,
    enableTimeIndicator,
    disableTimeIndicator,
    getProgress,
    updateProgress
}
