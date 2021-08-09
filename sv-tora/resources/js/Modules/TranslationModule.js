/**
 * DEPENDENCIES
 */
import { generateElement, calculateAge, generalVariables } from "./GeneralModule";
import * as MaterialInputsModule from "./MaterialInputsModule";

/**
 * This "Module" contains code responsible for creating inputs from objects or translating inputs to objects
 * @type {{}}
 */

let inputTypes = generalVariables.inputTypes;

/**
 * This variable holds a map which maps keys (e.g. column (headers) to input types in conventional tables (!)
 * @type {Map<string, any>}
 */
let keyToInput = generalVariables.keyToInput;

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
    let container = generateElement("div");
    let inputObject = undefined;
    let heading = undefined;
    if (keyToInput.has(key.toLowerCase())) {
        let inputType = keyToInput.get(key.toLowerCase());
        switch (inputType) {
            case inputTypes.TEXT:
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined);
                if (value) {
                    inputObject.setValue(value);
                }
                container.appendChild(inputObject.inputContainer);
                break;
            case inputTypes.RADIO:
            case inputTypes.CHECKBOX:
                heading = generateElement("h3", ["input-heading"], key);
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, undefined, undefined, undefined, value);
                container.appendChild(heading);
                container.appendChild(inputObject.inputContainer);
                break;
            case inputTypes.DATE:
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined)
                if (value) {
                    inputObject.setValue(value);
                }
                container.appendChild(inputObject.inputContainer);
                break;
            case inputTypes.TIME:
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, key, undefined, undefined, undefined)
                if (value) {
                    inputObject.setValue(value);
                }
                container.appendChild(inputObject.inputContainer);
                break;
            case inputTypes.SELECT:
                heading = generateElement("h3", ["input-heading"], key);
                let options = [];
                let selected = undefined;
                value.forEach((item) => {
                    options.push(item["value"]);
                    if (item["checked"]) {
                        selected = item["value"];
                    }
                });
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, key, undefined, undefined, options);
                if (selected) {
                    inputObject.setValue(selected + "");
                }
                container.appendChild(heading);
                container.appendChild(inputObject.inputContainer);
                break;
            case inputTypes.SWITCH:
                inputObject = MaterialInputsModule.createInput(inputType, [requiredClass], undefined, key, key, key, value, undefined);
                container.appendChild(inputObject.inputContainer);
        }
    } else {
        console.log("This key: " + key + " is not known!");
    }
    return container;
}

/**
 * This functions creates a container element containing input elements according to the given object.
 * @param object {object} The property name is the key and determines the value of the name attribute. Each property (key) has either just a string value or is an array of objects (in case of checkBoxes or radioButtons or Selects). These objects have two properties: "value" is a string containing the value and "checked" is a boolean determining whether this option should be preselected.
 * @param required {boolean} States if all the inputs to be generated should be required
 * @return {HTMLElement}
 */
function translateObjectToInputs(object, required) {
    let container = generateElement("div", ["container"]);
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let value = object[key];
            let subContainer = translateKeyToInput({"key" : key, "value" : value}, required);
            if (subContainer) {
                container.appendChild(subContainer);
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
    let inputObject = MaterialInputsModule.getInputObject(inputContainer);
    let key = inputObject.name;
    let value = inputObject.getValue();
    if (key === "Geburtsdatum") {
        key = "Alter";
        value = calculateAge(value);
    }
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
 * This function translates given keys and values into a json object
 * @param keys {string[]} Contains the different table column headers (data-columns)
 * @param values {object} Optional - contains possible set values
 */
function translateToJson(keys, values) {
    let json = {};
    keys.forEach((key) => {
        json[key] = values[key];
    });
    return json;
}

/**
 * API:
 */
export {
    translateObjectToInputs,
    translateInputsToObject,
    translateToJson,
}
