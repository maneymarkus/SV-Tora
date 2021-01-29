/**
 * This "Module" contains code responsible for checking forms and groups of inputs
 * @type {{}}
 */
var FormModule = (function(window, document, undefined) {

    let dependencies = ["MaterialInputsModule"];
    GeneralModule.checkDependenciesApi(dependencies);

    let inputTypes = GeneralModule.generalVariables.inputTypes;
    let errorTypes = GeneralModule.generalVariables.errorTypes;

    /**
     * This function relates two given inputs (containers) to each other in terms of equal input. It is recommended to only use this on two text inputs
     * @param inputContainer1 {HTMLElement}
     * @param inputContainer2 {HTMLElement}
     */
    function checkRepetition (inputContainer1, inputContainer2) {
        let input1 = MaterialInputsModule.getInputObjectApi(inputContainer1);
        let input2 = MaterialInputsModule.getInputObjectApi(inputContainer2);

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
            input2.throwInputError(errorTypes.REPEAT);
        } else {
            input2.revokeInputError(errorTypes.REPEAT);
        }

    }

    /**
     * This function relates two given input container to each other in terms of a time period. Therefore the given input containers must be of type date input or time input (container)
     * @param inputContainer1 {HTMLElement}
     * @param inputContainer2 {HTMLElement}
     */
    function checkTime(inputContainer1, inputContainer2) {
        let input1 = MaterialInputsModule.getInputObjectApi(inputContainer1);
        let input2 = MaterialInputsModule.getInputObjectApi(inputContainer2);

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
            if (MaterialInputsModule.compareDatesApi(value1, value2)) {
                input2.revokeInputError(errorTypes.DATE);
            } else {
                input2.throwInputError(errorTypes.DATE);
            }
        } else {
            if (MaterialInputsModule.compareTimesApi(value1, value2)) {
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
        let inputObject = MaterialInputsModule.getInputObjectApi(inputContainer);
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
     * API:
     */
    return {
        /**
         * This api function connects two inputs and checks (while the user inputs) whether both of them have the same value
         * @param inputContainer1 {HTMLElement}
         * @param inputContainer2 {HTMLElement}
         */
        checkRepetitionApi : function (inputContainer1, inputContainer2) {
            checkRepetition(inputContainer1, inputContainer2);
        },
        /**
         * This api function connects two time or date inputs and checks (while the user inputs) whether the first date/time is earlier than the second date/time
         * @param inputContainer1 {HTMLElement}
         * @param inputContainer2 {HTMLElement}
         */
        checkTimeApi : function (inputContainer1, inputContainer2) {
            checkTime(inputContainer1, inputContainer2);
        },
        /**
         * This api function checks a form mainly if all the required elements are filled with user input
         * @param form {HTMLElement} A container element which contains input elements (does not necessarily need to be a form element)
         * @param throwErrors {Boolean} Determines if not only to check for errors but also throw them (if true)
         * @return {boolean}
         */
        checkFormApi : function (form, throwErrors) {
            return checkForm(form, throwErrors);
        },
        /**
         * This api function enables other Modules to check a single input element if it has user input when it is marked as "required" or if it has any other errors and returns true if everything is fine
         * @param inputContainer {HTMLElement} The custom container element of the actual input to be checked
         * @param throwErrors {boolean} If this is true then this function will immediately throw "required" errors while checking
         * @return {boolean}
         */
        checkInputApi : function (inputContainer, throwErrors) {
            if (inputContainer.classList.contains("input-container")) {
                return checkInput(inputContainer, throwErrors);
            } else {
                return false;
            }
        }
    }

})(window, document);