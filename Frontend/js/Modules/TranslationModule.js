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
 * This "Module" contains code responsible to create inputs from objects or translate inputs to objects
 * @type {{}}
 */
let TranslationModule = (function(window, document, undefined) {

    let inputTypes = GeneralModule.generalVariables.inputTypes;

    /**
     * This variable holds a map which maps keys (e.g. column (headers) to input types in conventional tables (!)
     * @type {Map<string, any>}
     */
    let keyToInput = new Map([
        ["name", inputTypes.TEXT],
        ["vorname", inputTypes.TEXT],
        ["alter", inputTypes.DATE],
        ["geschlecht", inputTypes.RADIO],
        ["graduierung", inputTypes.SELECT],
        ["kategorie", inputTypes.SELECT],
        ["verein", inputTypes.SELECT],
        ["mitglieder", "custom"],
        ["teams", inputTypes.SWITCH],
        ["kihon", inputTypes.SWITCH],
        ["wettkampf", inputTypes.SELECT],
        ["datum", inputTypes.DATE],
        ["uhrzeit", inputTypes.TIME],
        ["startdatum", inputTypes.DATE],
        ["enddatum", inputTypes.DATE],
    ]);

    /**
     * This function generates an input element (or multiple in case of checkboxes and radio buttons) out of a given object
     * @param object {object} The property "key" of the given object contains the value of the name attribute for further identification purposes. The "value" property can either be undefined (in case the input element should not contain any content yet) or it contains a string which should already be inserted into the input element or it is an array of objects (in case of checkBoxes or radioButtons or Selects). These objects have two properties: "value" is a string containing the value and "selected" is a boolean determining whether this option should be preselected.
     * @param required {boolean} States if the generated input should be required
     * @return {HTMLElement}
     */
    function translateKeyToInput(object, required) {
        let key = object["key"];
        let value = object["value"];
        let requiredClass = "";
        if (required) {
            requiredClass = "required";
        }
        let inputContainer = undefined;
        if (keyToInput.has(key.toLowerCase())) {
            let inputType = keyToInput.get(key.toLowerCase());
            switch (inputType) {
                case inputTypes.TEXT:
                    inputContainer = MaterialInputsModule.createInputApi(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined);
                    if (value) {
                        let inputObject = MaterialInputsModule.getInputObjectApi(inputContainer);
                        inputObject.setValue(value);
                    }
                    break;
                case inputTypes.RADIO:
                case inputTypes.CHECKBOX:
                    inputContainer = MaterialInputsModule.createInputApi(inputType, [requiredClass], undefined, key, undefined, undefined, undefined, value);
                    break;
                case inputTypes.DATE:
                    inputContainer = MaterialInputsModule.createInputApi(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined)
                    if (value) {
                        let dateInput = MaterialInputsModule.getInputObjectApi(inputContainer);
                        dateInput.setValue(value);
                    }
                    break;
                case inputTypes.TIME:
                    inputContainer = MaterialInputsModule.createInputApi(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined)
                    if (value) {
                        let timeInput = MaterialInputsModule.getInputObjectApi(inputContainer);
                        timeInput.setValue(value);
                    }
                    break;
                case inputTypes.SELECT:
                    let options = [];
                    let selected = undefined;
                    value.forEach((item) => {
                        options.push(item["value"]);
                        if (item["checked"]) {
                            selected = item["value"];
                        }
                    });
                    inputContainer = MaterialInputsModule.createInputApi(inputType, [requiredClass], undefined, key, selected, undefined, undefined, options);
                    break;
            }
        } else {
            console.log("This key: " + key + " is not known!");
        }
        return inputContainer;
    }

    /**
     * This functions creates a container element containing input elements according to the given object.
     * @param object {object} The property name is the key and determines the value of the name attribute. Each property (key) has either just a string value or is an array of objects (in case of checkBoxes or radioButtons or Selects). These objects have two properties: "value" is a string containing the value and "selected" is a boolean determining whether this option should be preselected.
     * @param required {boolean} States if all the inputs to be generated should be required
     * @return {HTMLElement}
     */
    function translateObjectToInputs(object, required) {
        let container = GeneralModule.generateElementApi("div", ["container"]);
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let value = object[key];
                let element = translateKeyToInput({"key" : key, "value" : value}, required);
                if (element) {
                    container.appendChild(element);
                }
            }
        }
        return container;
    }

    /**
     * This functions translates the user input of a given input element into an object structure like: "nameAttribute" : "userInput"
     * @param inputContainer {HTMLElement}
     * @return {{value: String, key: string}}
     */
    function translateInputToObject(inputContainer) {
        let inputObject = MaterialInputsModule.getInputObjectApi(inputContainer);
        let key = inputObject.name;
        let value = inputObject.getValue();
        return {
            "key" : key, "value" : value,
        }
    }

    /**
     * This function creates an object with the name attribute of the input elements as the key and the user input as the value (grouped checkboxes create string arrays!)
     * @param container {HTMLElement} Should contain input elements
     * @return {{}}
     */
    function translateInputsToObject(container) {
        let userInputObject = {}
        let inputContainers = undefined;
        if (container.classList.contains("input-container")) {
            inputContainers = [container];
        } else {
            inputContainers = container.querySelectorAll(".input-container");
        }
        inputContainers.forEach((iC) => {
            let translation = translateInputToObject(iC);
            userInputObject[translation["key"]] = translation["value"];
        });
        return userInputObject;
    }

    /**
     * This function turns a table row containing values into an object
     * @param keys {string[]} Contains the different table column headers (data-columns)
     * @param values {object} Optional - contains possible set values
     */
    function translateRowToObject(keys, values) {
        // initialize object properties
        let object = {};
        keys.forEach((key) => {
            object[key] = undefined;
        });

        // set general values for option inputs
        keys.forEach((key) => {
            switch (key.toLowerCase()) {
                case "geschlecht":
                    let allSexes = GeneralModule.generalVariables.sex;
                    object[key] = [];
                    allSexes.forEach((sex) => {
                        object[key].push({
                            "text" : sex,
                            "value" : sex,
                            "checked" : false,
                        });
                    });
                    break;
                case "graduierung":
                    let allGraduations = GeneralModule.generalVariables.graduations;
                    object[key] = [];
                    allGraduations.forEach((grad) => {
                        object[key].push({
                            "text" : grad,
                            "value" : grad,
                            "checked" : false,
                        });
                    });
                    break;
                case "verein":
                    // TODO: get all clubs
                    let allClubs = ["SV Tora", "Nicht SV Tora"];
                    object[key] = [];
                    allClubs.forEach((club) => {
                        object[key].push({
                            "text" : club,
                            "value" : club,
                            "checked" : false,
                        });
                    });
                    break;
            }
        });

        // if values are given set some values
        if (values) {
            for (let key in values) {
                if (values.hasOwnProperty(key) && object.hasOwnProperty(key)) {
                    switch (key.toLowerCase()) {
                        case "name":
                        case "vorname":
                            object[key] = values[key];
                            break;
                        case "alter":
                            // TODO: get birth date of person not age!
                            object[key] = values[key];
                            break;
                        case "geschlecht":
                            let allSexes = GeneralModule.generalVariables.sex;
                            object[key] = [];
                            allSexes.forEach((sex) => {
                                let checked = false;
                                if (sex === values[key]) {
                                    checked = true;
                                }
                                object[key].push({
                                    "text" : sex,
                                    "value" : sex,
                                    "checked" : checked,
                                });
                            });
                            break;
                        case "graduierung":
                            let allGraduations = GeneralModule.generalVariables.graduations;
                            object[key] = [];
                            allGraduations.forEach((grad) => {
                                let checked = false;
                                if (grad === values[key]) {
                                    checked = true;
                                }
                                object[key].push({
                                    "text" : grad,
                                    "value" : grad,
                                    "checked" : checked,
                                });
                            });
                            break;
                        case "verein":
                            // TODO: get all clubs
                            let allClubs = ["SV Tora", "Nicht SV Tora"];
                            object[key] = [];
                            allClubs.forEach((club) => {
                                let checked = false;
                                if (club === values[key]) {
                                    checked = true;
                                }
                                object[key].push({
                                    "text" : club,
                                    "value" : club,
                                    "checked" : checked,
                                });
                            });
                            break;
                    }
                }
            }
        }
        return object;
    }

    return {
        translateObjectToInputsApi : function (object, required) {
            return translateObjectToInputs(object, required);
        },
        translateInputsToObjectApi : function (container) {
            return translateInputsToObject(container);
        },
        translateRowToObjectApi : function (keys, values) {
            return translateRowToObject(keys, values);
        }
    }

})(window, document);