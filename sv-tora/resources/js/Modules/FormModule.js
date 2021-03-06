/**
 * DEPENDENCIES
 */

import { generalVariables } from "./GeneralModule";
import * as MaterialInputsModule from "./MaterialInputsModule";
import * as SecondaryButtonModule from "./SecondaryButtonModule";

/**
 * This "Module" contains code responsible for checking forms and groups of inputs
 * @type {{}}
 */

let inputTypes = generalVariables.inputTypes;
let errorTypes = generalVariables.errorTypes;

/**
 * This function relates two given inputs (containers) to each other in terms of equal input. It is recommended to only use this on two text inputs
 * @param inputContainer1 {HTMLElement}
 * @param inputContainer2 {HTMLElement}
 */
function checkConfirmation (inputContainer1, inputContainer2) {
    let input1 = MaterialInputsModule.getInputObject(inputContainer1);
    let input2 = MaterialInputsModule.getInputObject(inputContainer2);

    input1.inputContainer.addEventListener("input", function () {
        if (input2.hasUserInput()) {
            checkEquality(input1, input2);
        }
    });
    input2.inputContainer.addEventListener("input", function () {
        if (input1.hasUserInput()) {
            checkEquality(input1, input2);
        }
    });

}

/**
 * This function checks two inputs that are related to each other on exact same user input
 * @param input1 {object}
 * @param input2 {object}
 */
function checkEquality(input1, input2) {
    let value1 = input1.getValue();
    let value2 = input2.getValue();

    if (value1 !== value2) {
        input2.throwInputError(errorTypes.CONFIRMATION);
    } else {
        input2.revokeInputError(errorTypes.CONFIRMATION);
    }

}

/**
 * This function relates two given input container to each other in terms of a time period. Therefore the given input containers must be of type date input or time input (container)
 * @param inputContainer1 {HTMLElement}
 * @param inputContainer2 {HTMLElement}
 */
function checkTime(inputContainer1, inputContainer2) {
    let input1 = MaterialInputsModule.getInputObject(inputContainer1);
    let input2 = MaterialInputsModule.getInputObject(inputContainer2);

    if (input1.inputType === input2.inputType && input1.inputType === (inputTypes.DATE || inputTypes.TIME)) {

        input1.inputContainer.addEventListener("change", function () {
            if (input2.hasUserInput()) {
                checkRelation(input1, input2);
            }
        });
        input2.inputContainer.addEventListener("change", function () {
            if (input1.hasUserInput()) {
                checkRelation(input1, input2);
            }
        });

    }

}

/**
 * This function checks if two date or time inputs that are related refer to a real time period and possibly throws errors
 * @param input1 {object} The first input states the beginning of the time period
 * @param input2 {object} The second input marks the end of the time period and should therefore contain a date reference later than the one from the first input
 */
function checkRelation (input1, input2) {
    let value1 = input1.getValue();
    let value2 = input2.getValue();

    if (input1.inputType === inputTypes.DATE) {
        if (MaterialInputsModule.compareDates(value1, value2)) {
            input2.revokeInputError(errorTypes.DATE);
        } else {
            input2.throwInputError(errorTypes.DATE);
        }
    } else {
        if (MaterialInputsModule.compareTimes(value1, value2)) {
            input2.revokeInputError(errorTypes.TIME);
        } else {
            input2.throwInputError(errorTypes.TIME);
        }
    }

}

/**
 * This function checks a given form containing input elements (does not necessarily need to be a form element) if the inputs do not have any errors and that every required field is filled
 * @param form {HTMLElement}
 * @param throwErrors {boolean} When true this function will immediately throw required errors (if found) while checking. Default is false
 * @return {boolean}
 */
function checkForm(form, throwErrors = false) {
    let check = true;
    let allInputs = form.querySelectorAll(".input-container");
    allInputs.forEach((inputContainer) => {
        if (check) {
            check = checkInput(inputContainer, throwErrors);
        }
    });
    return check;
}

/**
 * This function checks a single input element if it has user input when it is marked as "required" or if it has any other errors and returns true if everything is fine
 * @param inputContainer {HTMLElement} The custom container element of the actual input to be checked
 * @param throwErrors {boolean} If this is true then this function will immediately throw "required" errors while checking
 * @return {boolean}
 */
function checkInput(inputContainer, throwErrors) {
    let check = true;
    let inputObject = MaterialInputsModule.getInputObject(inputContainer);
    if (inputObject.required && !inputObject.hasUserInput()) {
        if (throwErrors) {
            inputObject.throwInputError(errorTypes.REQUIRED);
        }
        check = false;
    }
    if (check && inputObject.incorrect) {
        check = false;
    }
    return check;
}


/**
 * Check if there are form containers on the side
 */
let formContainers = [];

let FormContainer = function (formContainer) {
    let This = this;
    this.formContainerElement = formContainer;
    this.form = this.formContainerElement.querySelector("form");
    this.submitButton = this.formContainerElement.querySelector(".secondary-button.submit-button");
    this.confirmationInputs = this.formContainerElement.querySelectorAll(".confirm");
    this.submitFunction = undefined;

    this.confirmationInputs.forEach((confirmationInput) => {
        let relatedId = confirmationInput.getAttribute("data-confirm");
        let baseInput = document.querySelector("." + relatedId);
        checkConfirmation(baseInput, confirmationInput);
    });

    SecondaryButtonModule.disableSecondaryButton(this.submitButton);

    if (this.submitButton) {
        this.submitButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (checkForm(This.form, true)) {
                if (This.submitFunction) {
                    This.submitFunction(This.form);
                } else {
                    This.form.submit();
                }
            }
        });
    }

    This.formContainerElement.addEventListener("input", function () {
        if (checkForm(This.form, false)) {
            SecondaryButtonModule.enableSecondaryButton(This.submitButton);
        } else {
            SecondaryButtonModule.disableSecondaryButton(This.submitButton);
        }
    });

    this.setSubmitFunction = function(submitFunction) {
        This.submitFunction = submitFunction;
    }

}

function setSubmitFunction(form, submitForm) {
    if (form.classList.contains("form-container")) {
        formContainers.forEach((formContainer) => {
            if (formContainer.formContainerElement === form) {
                formContainer.setSubmitFunction(submitForm);
            }
        });
    }
}

let formContainerElements = document.querySelectorAll(".form-container");
formContainerElements.forEach(function (formContainer) {
    formContainers.push(new FormContainer(formContainer));
});

/**
 * API:
 */
export {
    checkConfirmation,
    checkTime,
    checkForm,
    checkInput,
    setSubmitFunction
}
