/*
  Dependencies: None
 */

let GeneralModule = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
        let el = document.createElement(element.toUpperCase());
        if (classNames) {
            classNames.forEach(function (item) {
                el.classList.add(item);
            });
        }
        if (value) {
            el.innerHTML = value;
        }
        return el;
    }

    const inputTypes = {
        TEXT: "text",
        PASSWORD: "password",
        RADIO: "radio",
        CHECKBOX: "checkbox",
        SWITCH: "switch",
        SELECT: "select",
        DATE: "date",
        TIME: "time",
        TEXTAREA: "textarea",
        FILE: "file"
    };

    const requests = {
        GET : "GET",
        POST : "POST",
        DELETE : "DELETE",
        PUT : "PUT"
    };

    const notificationTypes = {
        INFO : "Info",
        SUCCESS : "Success",
        WARNING : "Warning",
        ERROR : "Error",
    };

    const modalTypes = {
        DELETE: "delete",
        INFO: "info",
        CONFIRM: "confirm"
    }

    let generalVariables = {
        inputTypes,
        requests,
        notificationTypes,
        modalTypes,
    };

    return {
        generateElementApi : function (element, classNames, value) {
            return generateElement(element, classNames, value);
        },
        generalVariables,
    }

})(window, document);

console.log(GeneralModule.generalVariables);