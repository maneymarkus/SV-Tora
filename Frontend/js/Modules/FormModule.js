/*
  Dependencies: GeneralModule, MaterialInputsModule
 */

if (typeof GeneralModule === "undefined") {
    console.warn("Missing GeneralModule Dependency!");
}

if (typeof MaterialInputsModule === "undefined") {
    console.warn("Missing MaterialInputsModule Dependency!");
}

/**
 * This "Module" contains code responsible for checking forms and groups of inputs
 * @type {{}}
 */
let FormModule = (function(window, document, undefined) {

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

            input2.inputContainer.addEventListener("change", function () {
                console.log(input1.hasUserInput());
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
     * @return {boolean}
     */
    function checkForm(form) {
        let check = true;
        let allRequiredInputs = form.querySelectorAll(".required");
        allRequiredInputs.forEach((rI) => {
            let inputObject = MaterialInputsModule.getInputObjectApi(rI);
            if (check && !inputObject.hasUserInput()) {
                inputObject.throwInputError(errorTypes.REQUIRED);
                check = false;
            }
        });
        if (!check) {
            return check;
        }
        let allInputs = form.querySelectorAll(".input-container");
        allInputs.forEach((i) => {
            let inputObject = MaterialInputsModule.getInputObjectApi(i);
            if (inputObject.incorrect) {
                check = false;
            }
        });
        return check;
    }

    return {
        checkRepetitionApi : function (inputContainer1, inputContainer2) {
            checkRepetition(inputContainer1, inputContainer2);
        },
        checkTimeApi : function (inputContainer1, inputContainer2) {
            checkTime(inputContainer1, inputContainer2);
        },
        checkFormApi : function (form) {
            return checkForm(form);
        }
    }

})(window, document);