/**
 * This "Module" contains code responsible for the dynamic behaviour of all the different input elements
 * @type {{}}
 */
var MaterialInputsModule = (function(window, document, undefined) {

    /**
     * DEPENDENCIES
     */
    let dependencies = [];
    GeneralModule.checkDependenciesApi(dependencies);

    let inputTypes = GeneralModule.generalVariables.inputTypes;
    let errorTypes = GeneralModule.generalVariables.errorTypes;

    let inputs = [];

    /**
     * This "class" represents an error
     * @param errorType {errorTypes} The type of the error
     * @param errorMessage {string} The error message
     * @constructor
     */
    let Error = function (errorType, errorMessage) {
        let This = this;
        this.errorType = errorType;
        this.errorMessage = "";
        this.errorElement = undefined;

        let classes = [];

        switch(This.errorType) {
            case errorTypes.REQUIRED:
                This.errorMessage = "Dieses Feld muss ausgefüllt werden.";
                classes.push("requiredError");
                break;
            case errorTypes.EMAIL:
                This.errorMessage = "Die E-Mail Adresse muss dieser Form entsprechen: beispiel@provider.de.";
                classes.push("emailError");
                break;
            case errorTypes.REPEAT:
                This.errorMessage = "Der Inhalt muss mit dem anderen Feld übereinstimmen.";
                classes.push("repeatError");
                break;
            case errorTypes.TIME:
                This.errorMessage = "Die erste Zeit muss vor der zweiten Zeit liegen.";
                classes.push("timeError");
                break;
            case errorTypes.DATE:
                This.errorMessage = "Das erste Datum muss vor dem zweiten Datum liegen.";
                classes.push("dateError");
                break;
            case errorTypes.CUSTOM:
                This.errorMessage = errorMessage;
                classes.push("customError");
        }

        let errorSpan = GeneralModule.generateElementApi("SPAN", ["error"].concat(classes));
        errorSpan.appendChild(GeneralModule.generateElementApi("I", ["material-icons"], "error_outline"));
        errorSpan.appendChild(GeneralModule.generateElementApi("SPAN", ["message"], this.errorMessage));
        this.errorElement = errorSpan;

    }

    /**
     * This class handles generic custom input behaviour and provides a universal interface for all types of (custom) input elements
     */
    class Input {
        constructor(inputContainer) {
            this.inputContainer = inputContainer;
            this.inputType = undefined;
            let classes = inputContainer.classList;
            if (classes.contains("text-input-container")) {
                this.inputType = inputTypes.TEXT;
            } else if (classes.contains("switch-container")) {
                this.inputType = inputTypes.SWITCH;
            } else if (classes.contains("checkbox-group")) {
                this.inputType = inputTypes.CHECKBOX;
            } else if (classes.contains("radio-group")) {
                this.inputType = inputTypes.RADIO;
            } else if (classes.contains("select-input-container")) {
                this.inputType = inputTypes.SELECT;
            } else if (classes.contains("date-input-container")) {
                this.inputType = inputTypes.DATE;
            } else if (classes.contains("time-input-container")) {
                this.inputType = inputTypes.TIME;
            } else if (classes.contains("file-input-container")) {
                this.inputType = inputTypes.FILE;
            } else if (classes.contains("textarea")) {
                this.inputType = inputTypes.TEXTAREA;
            } else if (classes.contains("range-input-container")) {
                this.inputType = inputTypes.RANGE;
            } else {
                this.inputType = undefined;
            }

            this.incorrect = false;
            this.errors = [];
            this.userInput = false;
            this.name;
            this.disabled = this.inputContainer.classList.contains("disabled");
            this.required = this.inputContainer.classList.contains("required");

            this.inputContainer.addEventListener("change", this.handleChangeInput.bind(this));

        }

        /**
         * This function is executed when the input changes
         */
        handleChangeInput() {
            this.revokeInputError(errorTypes.CUSTOM);
            if(this.required) {
                if (this.hasUserInput()) {
                    this.revokeInputError(errorTypes.REQUIRED);
                } else {
                    this.throwInputError(errorTypes.REQUIRED);
                }
            }
        }

        /**
         * This function "sets" a new value on an input element (should be overridden by the specific class)
         * @param newInput {string} The new input to be set
         */
        setValue(newInput) {
            console.log("Set new input on " + this + ": " + newInput);
        }

        /**
         * This function "gets" the value of an input element (should be overridden by the specific class)
         */
        getValue() {
            console.log("Return input of " + this);
        }

        /**
         * This function returns if this input element has user input or not
         * @return {boolean}
         */
        hasUserInput() {
            return this.userInput;
        }

        /**
         * This function returns if this input element has an error or not
         * @return {boolean}
         */
        hasError() {
            return this.incorrect;
        }

        /**
         * This function returns if this input element is disabled
         * @return {*}
         */
        isDisabled() {
            this.disabled = this.inputContainer.classList.contains("disabled");
            return this.disabled;
        }

        /**
         * This function disables this input element (no user interaction anymore)
         */
        disable() {
            this.disabled = true;
            this.inputContainer.classList.add("disabled");
        }

        /**
         * This function enables this input element (user interaction possible)
         */
        enable() {
            this.disabled = false;
            this.inputContainer.classList.remove("disabled");
        }

        /**
         * This function throws a(n) (visible) error at this input element
         * @param errorType
         * @param errorMessage
         */
        throwInputError(errorType, errorMessage) {
            let addError = true;
            this.errors.forEach((error) => {
                if (error.errorType === errorType) {
                    addError = false;
                }
            });
            if (addError) {
                let error = undefined;
                if (errorMessage) {
                    error = new Error(errorType, errorMessage);
                } else {
                    error = new Error(errorType);
                }
                this.errors.push(error);
                if (!this.incorrect) {
                    this.inputContainer.appendChild(error.errorElement);
                    this.incorrect = true;
                    this.inputContainer.classList.add("incorrect");
                }
            }
        }

        /**
         * This function revokes a(n) (visible) error of this input element
         * @param errorType {errorTypes} The errortype that should be revoked
         */
        revokeInputError(errorType) {
            this.errors.forEach((error) => {
                if (error.errorType === errorType) {
                    this.inputContainer.querySelector(".error").remove();
                    this.errors[this.errors.indexOf(error)] = undefined;
                }
            });
            this.errors = this.errors.filter(Boolean);
            if (this.errors.length === 0) {
                this.incorrect = false;
                this.inputContainer.classList.remove("incorrect");
            } else {
                this.inputContainer.appendChild(this.errors[0].errorElement);
            }
        }

        /**
         * This function revokes all errors of this input element
         */
        revokeAllInputErrors() {
            if (this.inputContainer.querySelector(".error")) {
                this.inputContainer.querySelector(".error").remove();
            }
            this.errors = [];
            this.errors = this.errors.filter(Boolean);
            this.incorrect = false;
            this.inputContainer.classList.remove("incorrect");
        }

        /**
         * This function returns the input object of a given input container
         * @param inputContainer {HTMLElement} The respective input container element of which the object should be returned
         * @return {*}
         */
        static getInputObject(inputContainer) {
            if (inputContainer.classList.contains("input-container")) {
                let inputObject = undefined;
                inputs.forEach((input) => {
                    if (input.inputContainer === inputContainer) {
                        inputObject = input;
                    }
                });
                return inputObject;
            }
        }

        /**
         *
         *  This function creates input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param inputType {string} Enum which determines the input to be created
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch or range
         * @param value {string} Sets either the value attribute of switches or the value of text inputs, textareas or range inputs
         * @param checked {boolean} Optional: Determines if switch to be checked
         * @param options {string[] || object[]} This should be an array of strings to determine the different options for the select or this is an array of objects with the properties "text" (string), "value" (string), "checked" (boolean) and optional "disabled" (boolean) for the different options of checkboxes and radio buttons
         * @returns {object}
         */
        static createInputFactory(inputType, classNames, inputId, name, placeholder, value, checked, options) {
            if (!inputId) {
                inputId = Math.random().toString(16).substr(2, 10);
            }
            if (typeof classNames === "undefined") {
                classNames = [];
            }
            switch (inputType) {
                case inputTypes.TEXT:
                    return TextInput.createInput(classNames, inputId, name, placeholder, value);
                case inputTypes.SWITCH:
                    return Switch.createInput(classNames, inputId, name, placeholder, value, checked);
                case inputTypes.CHECKBOX:
                    return Checkboxes.createInput(classNames, name, options);
                case inputTypes.RADIO:
                    return RadioButtons.createInput(classNames, name, options);
                case inputTypes.SELECT:
                    return Select.createInput(classNames, placeholder, name, options);
                case inputTypes.DATE:
                    return DateInput.createInput(classNames, inputId, name, placeholder);
                case inputTypes.TIME:
                    return TimeInput.createInput(classNames, inputId, name, placeholder);
                case inputTypes.FILE:
                    return FileInput.createInput(classNames, inputId, name);
                case inputTypes.TEXTAREA:
                    return Textarea.createInput(classNames, inputId, name, placeholder, value);
                case inputTypes.RANGE:
                    return RangeInput.createInput(classNames, inputId, name, placeholder, value)
                default:
                    return undefined;
            }
        }

    }

    /**
     * This class handles custom select specific behaviour
     */
    class Select extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("span.select-input");
            this.optionsElement = inputContainer.querySelector("div.options");
            this.placeholder = inputContainer.querySelector("span.placeholder").innerText;

            // this property contains the text value of the selected option
            this.selected = this.inputElement.innerHTML.trim();

            // this property saves whether the user can click on the options that expand when clicking on the container element (this is necessary due to fade in and out animations)
            this.selectable = false;
            this.name = this.inputElement.getAttribute("data-name");
            this.options = [];
            this.optionsElement.querySelectorAll(".option").forEach((op) => {
                this.options.push(op.innerText);
            });

            this.inputContainer.addEventListener("click", this.handleCLick.bind(this));

            this.inputContainer.addEventListener("changeSelect", this.handleChangeInput.bind(this));

        }

        getValue() {
            return this.selected;
        }

        setValue(newValue) {
            if (newValue && this.options.includes(newValue)) {
                this.inputElement.innerHTML = newValue;
                this.inputElement.classList.remove("placeholder");
                this.selected = newValue;
                this.userInput = true;
            }
        }

        handleCLick(e) {
            if (this.isDisabled()) {
                return;
            }
            let target = e.target;
            while (target && !target.classList.contains("select-input-container") && !target.classList.contains("option")) {
                target = target.parentNode;
            }
            if (target && target.classList.contains("select-input-container")) {
                if (this.optionsElement.classList.contains("show")) {
                    this.hide();
                } else {
                    this.show();
                }
            } else if (target && target.classList.contains("option")) {
                if (this.selectable) {
                    this.selectOption(target.innerHTML);
                }
                if (!this.userInput) {
                    this.userInput = true;
                }
                this.hide();
            } else {
                this.hide();
            }
        }

        show() {
            this.inputContainer.classList.add("open");
            this.optionsElement.classList.add("show");
            window.setTimeout(function () {
                this.selectable = true;
            }.bind(this), 500);
            Select.closeAllSelectsExcept(this);
        }

        hide() {
            this.selectable = false;
            this.inputContainer.classList.remove("open");
            this.optionsElement.classList.remove("show");
        }

        selectOption(selectedOption) {
            this.inputElement.innerHTML = selectedOption;
            this.inputElement.classList.remove("placeholder");
            this.selected = selectedOption;
            this.userInput = true;
            this.inputElement.dispatchEvent(new Event("change", {bubbles: true}));
            this.inputElement.dispatchEvent(new Event("input", {bubbles: true}));
        }

        updateOptions(newOptions) {
            this.options = newOptions;
            this.optionsElement.innerHTML = "";
            let This = this;
            newOptions.forEach(function (item) {
                let option = GeneralModule.generateElementApi("DIV", ["option"], item);
                This.optionsElement.appendChild(option);
            });
        }

        static closeAllSelectsExcept(openSelect) {
            inputs.forEach((input) => {
                if (input.inputType === inputTypes.SELECT) {
                    if (input !== openSelect) {
                        input.hide();
                    }
                }
            });
        }

        /**
         *
         *  This function creates a select element with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button
         * @param options {string[] || object} This should be an array of strings to determine the different options for the select or this is an array of objects with the properties "text", "value", "checked" for the different options of checkboxes and radio buttons
         * @returns {object}
         */
        static createInput(classNames, placeholder, name, options) {
            let selectContainer = GeneralModule.generateElementApi("div", ["select-input-container", "input-container"].concat(classNames));
            let label = GeneralModule.generateElementApi("label", ["icon"]);
            let labelIcon = GeneralModule.generateElementApi("i", ["material-icons"], "list");
            label.appendChild(labelIcon);
            selectContainer.appendChild(label);
            if (!placeholder) {
                placeholder = name;
            }
            let selectSpan = GeneralModule.generateElementApi("span", ["select-input", "chosen", "placeholder"], placeholder);

            // name attribute can only be set on input elements so for further identification purposes this custom select element gets a custom "data-name" attribute
            if (name) {
                selectSpan.setAttribute("data-name", name);
            }
            selectContainer.appendChild(selectSpan);
            selectContainer.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "expand_more"));
            let optionsContainer = GeneralModule.generateElementApi("div", ["options"]);
            if (options) {
                options.forEach(function (option) {
                    let optionElement = GeneralModule.generateElementApi("div", ["option"], option);
                    optionsContainer.appendChild(optionElement);
                });
            }
            selectContainer.appendChild(optionsContainer);
            let newSelect = new Select(selectContainer);

            inputs.push(newSelect);
            return newSelect;
        }

    }

    /**
     * This class handles date input specific behaviour
     */
    class DateInput extends Input {

        /*
         * Format of the date in input element: dd.mm.yyyy
         */

        static datePickerElement = undefined;
        static days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
        static months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];


        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("input");
            this.name = this.inputElement.getAttribute("name");

            if (DateInput.datePickerElement === undefined) {
                DateInput.datePickerElement = DateInput.createDatePicker();
                document.querySelector("body").appendChild(DateInput.datePickerElement);
            }

            this.day = new Date().getDate();
            this.month = new Date().getMonth();
            this.year = new Date().getFullYear();
            this.previousMonth = DateInput.datePickerElement.querySelector(".header .previous-month");
            this.nextMonth = DateInput.datePickerElement.querySelector(".header .next-month");
            this.monthElement = DateInput.datePickerElement.querySelector(".header .month");
            this.yearElement = DateInput.datePickerElement.querySelector(".header .year");

            this.inputContainer.addEventListener("click", this.handleDateInputClick.bind(this));
            this.datePickerEventLister = this.handleDatePickerClick.bind(this);

        }

        getValue() {
            return this.inputElement.value;
        }

        setValue(newInput) {
            this.inputElement.value = newInput;
            this.inputElement.dispatchEvent(new Event("change", {bubbles: true}));
        }

        handleChangeInput() {
            super.handleChangeInput();
            this.hasUserInput();
        }

        hasUserInput() {
            if (this.inputElement.value) {
                this.inputElement.classList.add("filled");
                return this.userInput = true;
            } else {
                this.inputElement.classList.remove("filled");
                return this.userInput = false;
            }
        }

        handleDateInputClick(e) {
            this.show();
        }

        show() {
            DateInput.datePickerElement.classList.add("show");
            this.updateCalendar(this.month, this.year);
            DateInput.datePickerElement.addEventListener("click", this.datePickerEventLister);
        }

        hide() {
            DateInput.datePickerElement.classList.remove("show");
            DateInput.datePickerElement.removeEventListener("click", this.datePickerEventLister);
        }

        setYear(year) {
            this.year = year;
            this.yearElement.innerHTML = year;
        }

        setMonth(month) {
            this.month = month;
            this.monthElement.innerHTML = DateInput.months[month];
        }

        handleDatePickerClick(e) {
            let target = e.target;

            // choose picked date
            if (target.classList.contains("pick")) {
                this.setValue(this.day + "." + (this.month + 1) + "." + this.year);
                if (!this.hasUserInput) {
                    this.userInput = true;
                }

                this.hide();
                return;
            }

            // cancel choosing a date
            if (target.classList.contains("cancel")) {
                this.hide();
                return;
            }


            if (target.classList.contains("selectable")) {
                if (DateInput.datePickerElement.querySelector(".selected")) {
                    DateInput.datePickerElement.querySelector(".selected").classList.remove("selected")
                }
                target.classList.add("selected");
                this.day = target.innerHTML;
                return;
            }

            // show previous month
            if (target.classList.contains("previous-month") || target.parentNode.classList.contains("previous-month")) {
                if (this.month === 0) {
                    this.updateCalendar(11, this.year - 1);
                } else {
                    this.updateCalendar(this.month - 1, this.year);
                }
                return;
            }

            // show next month
            if (target.classList.contains("next-month") || target.parentNode.classList.contains("next-month")) {
                if (this.month === 11) {
                    this.updateCalendar(0, this.year + 1);
                } else {
                    this.updateCalendar(this.month + 1, this.year);
                }
                return;
            }
        }

        updateCalendar(month, year) {
            this.setMonth(month);
            this.setYear(year);
            let numberDays = DateInput.daysInMonth(month, year);
            let firstWeekday = new Date(year, month, 1).getDay() - 1;
            let tBody = DateInput.datePickerElement.querySelector("table tbody");
            tBody.innerHTML = "";
            let dayCounter = 1;
            while (dayCounter <= numberDays) {
                let row = GeneralModule.generateElementApi("TR");
                for (let i = 0; i < 7; i++) {
                    let td;
                    if (firstWeekday > 0) {
                        firstWeekday -= 1;
                        td = GeneralModule.generateElementApi("TD");
                    } else {
                        if (dayCounter <= numberDays) {
                            if (dayCounter == this.day) {
                                td = GeneralModule.generateElementApi("TD", ["selectable", "selected"], dayCounter++);
                            } else {
                                td = GeneralModule.generateElementApi("TD", ["selectable"], dayCounter++);
                            }
                        } else {
                            td = GeneralModule.generateElementApi("TD");
                        }
                    }
                    row.appendChild(td);
                }
                tBody.appendChild(row);
            }
        }


        /**
         * This function compares to dates and returns true if the first date is smaller (=earlier) than the second one
         * @param date1 {string} Format: "dd.mm.yyyy"
         * @param date2 {string} Format: "dd.mm.yyyy"
         * @return {boolean}
         */
        static compareDates(date1, date2) {
            let day1 = parseInt(date1.substring(0, date1.indexOf(".")));
            let month1 = parseInt(date1.substring(date1.indexOf(".") + 1, date1.indexOf(".", date1.indexOf(".") + 1))) - 1;
            let year1 = parseInt(date1.substring(date1.indexOf(".", date1.indexOf(".") + 1) + 1));

            let day2 = parseInt(date2.substring(0, date2.indexOf(".")));
            let month2 = parseInt(date2.substring(date2.indexOf(".") + 1, date2.indexOf(".", date2.indexOf(".") + 1))) - 1;
            let year2 = parseInt(date2.substring(date2.indexOf(".", date2.indexOf(".") + 1) + 1));

            let d1 = new Date().setFullYear(year1, month1, day1);
            let d2 = new Date().setFullYear(year2, month2, day2);

            return d1 < d2;

        }

        static daysInMonth(month, year) {
            // month has to be increased by one to be coherent with other javascript date indexes
            return new Date(year, month + 1, 0).getDate();
        }

        static createDatePicker() {
            let datePickerContainer = GeneralModule.generateElementApi("div", ["datepicker-container"]);
            let datePicker = GeneralModule.generateElementApi("div", ["datepicker"])
            let header = GeneralModule.generateElementApi("div", ["header", "clearfix"]);
            let previousMonth = GeneralModule.generateElementApi("a", ["previous-month"]);
            let leftIcon = GeneralModule.generateElementApi("i", ["material-icons"], "arrow_back");
            previousMonth.appendChild(leftIcon);
            header.appendChild(previousMonth);
            let month = GeneralModule.generateElementApi("span", ["month"]);
            header.appendChild(month);
            let year = GeneralModule.generateElementApi("span", ["year"]);
            header.appendChild(year);
            let nextMonth = GeneralModule.generateElementApi("a", ["next-month"]);
            let rightIcon = GeneralModule.generateElementApi("i", ["material-icons"], "arrow_forward");
            nextMonth.appendChild(rightIcon);
            header.appendChild(nextMonth);
            datePicker.appendChild(header);
            let calender = GeneralModule.generateElementApi("div", ["calender"]);
            let table = GeneralModule.generateElementApi("table");
            let tHeader = GeneralModule.generateElementApi("thead");
            let headerRow = GeneralModule.generateElementApi("tr");
            DateInput.days.forEach(function (item) {
                let td = GeneralModule.generateElementApi("th", [], item);
                headerRow.appendChild(td);
            });
            tHeader.appendChild(headerRow);
            table.appendChild(tHeader);
            let tBody = GeneralModule.generateElementApi("tbody");
            table.appendChild(tBody);
            calender.appendChild(table);
            datePicker.appendChild(calender);
            let footer = GeneralModule.generateElementApi("div", ["footer", "clearfix"]);
            let cancelBtn = GeneralModule.generateElementApi("a", ["cancel"], "Abbrechen");
            footer.appendChild(cancelBtn);
            let pickBtn = GeneralModule.generateElementApi("a", ["pick"], "Wählen");
            footer.appendChild(pickBtn);
            datePicker.appendChild(footer);
            datePickerContainer.appendChild(datePicker);
            return datePickerContainer;
        }

        /**
         *
         *  This function creates a date input element with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button
         * @returns {object}
         */
        static createInput(classNames, inputId, name, placeholder) {
            let inputContainer = GeneralModule.generateElementApi("span", ["date-input-container", "input-container"].concat(classNames));
            let icon = GeneralModule.generateElementApi("label", ["icon"]);
            icon.setAttribute("for", inputId);
            icon.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "today"));
            inputContainer.appendChild(icon);
            let input = GeneralModule.generateElementApi("input", ["date-input"]);
            input.setAttribute("type", "text");
            input.setAttribute("id", inputId);
            if (name) {
                input.setAttribute("name", name);
            }
            inputContainer.appendChild(input);
            let pLabel = GeneralModule.generateElementApi("label", ["text"], placeholder);
            pLabel.setAttribute("for", inputId);
            inputContainer.appendChild(pLabel);
            inputContainer.appendChild(GeneralModule.generateElementApi("span", ["underline"]));

            let newDateInput = new DateInput(inputContainer);
            inputs.push(newDateInput);
            return newDateInput;
        }

    }

    /**
     * This class handles time input specific behaviour
     */
    class TimeInput extends Input {

        /*
         * Format of time in input element: hh:mm
         */

        static timePickerElement = undefined;

        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("input");
            this.name = this.inputElement.getAttribute("name");

            if (TimeInput.timePickerElement === undefined) {
                TimeInput.timePickerElement = TimeInput.createTimePicker();
                document.querySelector("body").appendChild(TimeInput.timePickerElement);

                TimeInput.timePickerElement.querySelector(".clock").addEventListener("mousemove", this.handleMouseMove.bind(this));
                TimeInput.timePickerElement.querySelector(".clock").addEventListener("mouseleave", this.handleMouseLeave.bind(this));
            }

            this.hour = new Date().getHours();
            this.minute = new Date().getMinutes();
            this.hourElement = TimeInput.timePickerElement.querySelector(".header span.chosenHour");
            this.minuteElement = TimeInput.timePickerElement.querySelector(".header span.chosenMinute");

            this.inputElement.addEventListener("click", this.handleTimeInputClick.bind(this));
            this.timePickerEventLister = this.handleTimePickerClick.bind(this);

        }

        getValue() {
            return this.inputElement.value;
        }

        setValue(newInput) {
            this.inputElement.value = newInput;
            this.inputElement.dispatchEvent(new Event("change", {bubbles: true}));
        }

        handleChangeInput() {
            super.handleChangeInput();
            this.hasUserInput();
        }

        hasUserInput() {
            if (this.inputElement.value) {
                this.inputElement.classList.add("filled");
                return this.userInput = true;
            } else {
                this.inputElement.classList.remove("filled");
                return this.userInput = false;
            }
        }

        handleTimeInputClick(e) {
            e.preventDefault();
            this.show();
        }

        show() {
            TimeInput.timePickerElement.classList.add("show");
            this.updateClock(this.hour, this.minute);
            this.hourElement.classList.add("active");
            this.minuteElement.classList.remove("active");
            TimeInput.timePickerElement.addEventListener("click", this.timePickerEventLister);
        }

        handleMouseMove(e) {
            let target = e.target;
            if (target.nodeName === "SPAN") {
                if (!TimeInput.timePickerElement.querySelector(".active .chosen")) {
                    this.positionClockHand(target.innerHTML);
                }
            }
        }

        handleMouseLeave(e) {
            if (TimeInput.timePickerElement.querySelector(".clock .active .chosen")) {
                let chosen = TimeInput.timePickerElement.querySelector(".clock .chosen");
                this.positionClockHand(chosen.innerHTML);
            }
        }

        hide() {
            if (TimeInput.timePickerElement.querySelector(".clock .chosen")) {
                TimeInput.timePickerElement.querySelector(".clock .chosen").classList.remove("chosen");
            }
            if (TimeInput.timePickerElement.querySelector(".clock.chosen")) {
                TimeInput.timePickerElement.querySelector(".clock.chosen").classList.remove("chosen");
            }
            TimeInput.timePickerElement.classList.remove("show");
            TimeInput.timePickerElement.removeEventListener("click", this.timePickerEventLister);
        }

        handleTimePickerClick(e) {
            let target = e.target;

            // complicated
            if (target.classList.contains("minute") || target.classList.contains("hour")) {
                if (target.nodeName === "SPAN") {
                    if (TimeInput.timePickerElement.querySelector(".clock .chosen")) {
                        TimeInput.timePickerElement.querySelector(".clock .chosen").classList.remove("chosen");
                    }
                    target.classList.add("chosen");
                    this.positionClockHand(target.innerHTML);
                    TimeInput.timePickerElement.querySelector(".clock").classList.add("chosen");
                    if (TimeInput.timePickerElement.querySelector(".hours.active")) {
                        this.setHour(target.innerHTML);
                        TimeInput.timePickerElement.querySelector(".hours.active").classList.remove("active");
                        TimeInput.timePickerElement.querySelector(".minutes").classList.add("active");
                        this.hourElement.classList.remove("active");
                        this.minuteElement.classList.add("active");
                    } else {
                        this.setMinute(target.innerHTML);
                    }
                }
                return;
            }

            // pick chosen time
            if (target.classList.contains("pick")) {
                if (TimeInput.timePickerElement.querySelector(".minutes.active")) {
                    TimeInput.timePickerElement.querySelector(".minutes.active").classList.remove("active");
                    TimeInput.timePickerElement.querySelector(".hours").classList.add("active");
                    this.setValue(this.hourElement.innerHTML.trim() + ":" + this.minuteElement.innerHTML.trim());
                    if (!this.hasUserInput) {
                        this.userInput = true;
                    }

                    this.hide();
                }
                return;
            }

            // cancel choosing a time
            if (target.classList.contains("cancel")) {
                if (TimeInput.timePickerElement.querySelector(".minutes.active")) {
                    TimeInput.timePickerElement.querySelector(".minutes.active").classList.remove("active");
                    TimeInput.timePickerElement.querySelector(".hours").classList.add("active");
                }
                this.hide();
                return;
            }
        }

        setHour(hour) {
            this.hour = hour;
            if (hour < 10) {
                if (hour == "00") {
                    this.hourElement.innerHTML = "00";
                } else {
                    this.hourElement.innerHTML = "0" + hour;
                }
            } else {
                this.hourElement.innerHTML = hour;
            }
        }

        setMinute(minute) {
            this.minute = minute;
            if (minute < 10) {
                if (minute == "00") {
                    this.minuteElement.innerHTML = "00";
                } else {
                    this.minuteElement.innerHTML = "0" + minute;
                }
            } else {
                this.minuteElement.innerHTML = minute;
            }
        }

        updateClock(hour, minute) {
            this.setHour(hour);
            this.setMinute(minute);
        }

        positionClockHand(position) {
            let clockhand = TimeInput.timePickerElement.querySelector(".active .clockhand");
            clockhand.classList.remove("short");
            let pos;
            if (TimeInput.timePickerElement.querySelector(".minutes.active")) {
                pos = Math.round(((position / (12 * 5)) + Number.EPSILON) * 100) / 100;
            } else {
                pos = Math.round(((position / 12) + Number.EPSILON) * 100) / 100;
            }
            let degrees = 360 * pos;
            clockhand.style.transform = "translateX(-50%) rotate(" + degrees + "deg)";
            if (TimeInput.timePickerElement.querySelector(".hours.active")) {
                if (pos > 1 || pos === 0) {
                    clockhand.classList.add("short");
                }
            }
        }


        /**
         * This function compares to given times and returns true if the first time is smaller (=earlier) than the second time
         * @param time1 {string} Format: "hh:mm"
         * @param time2 {string} Format: "hh:mm"
         * @return {boolean}
         */
        static compareTimes(time1, time2) {
            let hour1 = parseInt(time1.substring(0, time1.indexOf(":")));
            let minute1 = parseInt(time1.substr(time1.indexOf(":") + 1));

            let hour2 = parseInt(time2.substring(0, time2.indexOf(":")));
            let minute2 = parseInt(time2.substr(time2.indexOf(":") + 1));

            let date1 = new Date().setHours(hour1, minute1);
            let date2 = new Date().setHours(hour2, minute2);

            return date1 < date2;

        }

        static createTimePicker() {
            let timePickerContainer = GeneralModule.generateElementApi("DIV", ["timepicker-container"]);
            let timePicker = GeneralModule.generateElementApi("DIV", ["timepicker"]);
            let header = GeneralModule.generateElementApi("DIV", ["header"]);
            let hourSpan = GeneralModule.generateElementApi("SPAN", ["chosenHour"]);
            header.appendChild(hourSpan);
            let dividerSpan = GeneralModule.generateElementApi("SPAN", [], ":");
            header.appendChild(dividerSpan);
            let minuteSpan = GeneralModule.generateElementApi("SPAN", ["chosenMinute"]);
            header.appendChild(minuteSpan);
            timePicker.appendChild(header);
            let clock = GeneralModule.generateElementApi("DIV", ["clock"]);
            let hourClockFace = GeneralModule.generateElementApi("DIV", ["clockface", "hours", "active"]);
            let clockhand = GeneralModule.generateElementApi("DIV", ["clockhand"]);
            hourClockFace.appendChild(clockhand);
            for (let i = 0; i < 24; i++) {
                let value = i;
                let classNames = ["hour", "hour"];
                if (i === 0) {
                    value = "00";
                    classNames.push("small");
                }
                if (i > 12) {
                    classNames.push("small");
                }
                classNames[0] = classNames[0] + value;
                let hourUnit = GeneralModule.generateElementApi("SPAN", classNames, value);
                hourClockFace.appendChild(hourUnit);
            }
            clock.appendChild(hourClockFace);
            let minuteClockFace = GeneralModule.generateElementApi("DIV", ["clockface", "minutes"]);
            minuteClockFace.appendChild(clockhand.cloneNode(true));
            for (let i = 0; i < 60; i += 5) {
                let value = i;
                if (i === 0) {
                    value = "00";
                }
                let classNames = ["minute" + value, "minute"];
                let minuteUnit = GeneralModule.generateElementApi("SPAN", classNames, value);
                minuteClockFace.appendChild(minuteUnit);
            }
            clock.appendChild(minuteClockFace);
            timePicker.appendChild(clock);
            let footer = GeneralModule.generateElementApi("DIV", ["footer", "clearfix"]);
            let cancelBtn = GeneralModule.generateElementApi("A", ["cancel"], "Abbrechen");
            footer.appendChild(cancelBtn);
            let pickBtn = GeneralModule.generateElementApi("A", ["pick"], "Wählen");
            footer.appendChild(pickBtn);
            timePicker.appendChild(footer);
            timePickerContainer.appendChild(timePicker);
            return timePickerContainer;
        }

        /**
         *
         *  This function creates a time input element with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button[] || object} This should be an array of strings to determine the different options for the select or this is an array of objects with the properties "text", "value", "checked" for the different options of checkboxes and radio buttons
         * @returns {object}
         */
        static createInput(classNames, inputId, name, placeholder) {
            let inputContainer = GeneralModule.generateElementApi("span", ["time-input-container", "input-container"].concat(classNames));
            let icon = GeneralModule.generateElementApi("label", ["icon"]);
            icon.setAttribute("for", inputId);
            icon.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "schedule"));
            inputContainer.appendChild(icon);
            let input = GeneralModule.generateElementApi("input", ["time-input"]);
            input.setAttribute("type", "text");
            input.setAttribute("id", inputId);
            if (name) {
                input.setAttribute("name", name);
            }
            inputContainer.appendChild(input);
            let pLabel = GeneralModule.generateElementApi("label", ["text"], placeholder);
            pLabel.setAttribute("for", inputId);
            inputContainer.appendChild(pLabel);
            inputContainer.appendChild(GeneralModule.generateElementApi("span", ["underline"]));

            let newTimeInput = new TimeInput(inputContainer);
            inputs.push(newTimeInput);
            return newTimeInput;
        }

    }

    /**
     * This class handles radio button input specific behaviour
     */
    class RadioButtons extends Input {
        constructor(inputGroup) {
            super(inputGroup);
            this.inputElements = inputGroup.querySelectorAll("input");
            this.name = this.inputElements[0].getAttribute("name");

            this.selected = undefined;
            this.selectedOption = undefined;
        }

        getValue() {
            let value = undefined;
            this.inputElements.forEach((radio) => {
                if (radio.checked) {
                    value = radio.getAttribute("value");
                }
            });
            return value;
        }

        hasUserInput() {
            if (this.getSelected()) {
                return this.userInput = true;
            } else {
                return this.userInput = false;
            }
        }

        getSelected() {
            this.inputElements.forEach((radio) => {
                if (radio.checked) {
                    this.selected = radio;
                    this.selectedOption = radio.getAttribute("value");
                }
            });
            return this.selected;
        }

        /**
         *
         *  This function creates a group of radio button input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param options {object[]} This is an array of objects with the properties "text" (string), "value" (string), "checked" (boolean) and optional "disabled" (boolean) for the different options of checkboxes and radio buttons
         * @returns {object}
         */
        static createInput(classNames, name, options) {
            let group = GeneralModule.generateElementApi("div", ["radio-group", "input-container"].concat(classNames));

            options.forEach((option) => {
                if (!option["value"]) {
                    option["value"] = option["text"];
                }
                let label = GeneralModule.generateElementApi("label", ["radio-input-container"]);
                label.appendChild(document.createTextNode(option["text"]));
                let input = GeneralModule.generateElementApi("input");
                input.setAttribute("type", "radio");
                input.setAttribute("value", option["value"]);
                input.setAttribute("name", name);
                if (option["checked"]) {
                    input.setAttribute("checked", "checked");
                }
                if (option.hasOwnProperty("disabled") && option["disabled"]) {
                    label.classList.add("disabled");
                    input.setAttribute("disabled", "disabled");
                }
                label.appendChild(input);
                label.appendChild(GeneralModule.generateElementApi("span", ["checkmark"]));
                group.appendChild(label);
            });

            let newRadioButtons = new RadioButtons(group);
            inputs.push(newRadioButtons);
            return newRadioButtons;
        }

    }

    /**
     * This class handles checkbox input specific behaviour
     */
    class Checkboxes extends Input {
        constructor(inputGroup) {
            super(inputGroup);
            this.inputElements = inputGroup.querySelectorAll("input");
            this.name = this.inputElements[0].getAttribute("name");

            this.selected = [];
            this.selectedOptions = [];
        }

        getValue() {
            let values = [];
            this.inputElements.forEach((checkbox) => {
                if (checkbox.checked) {
                    values.push(checkbox.getAttribute("value"));
                }
            });
            return values;
        }

        hasUserInput() {
            this.getSelected();
            if (this.selected.length >= 1) {
                return this.userInput = true;
            } else {
                return this.userInput = false;
            }
        }

        getSelected() {
            this.selected = [];
            this.inputElements.forEach((checkbox) => {
                if (checkbox.checked) {
                    this.selected.push(checkbox);
                    this.selectedOptions.push(checkbox.getAttribute("value"));
                }
            });
            return this.selected;
        }

        /**
         *
         *  This function creates a group of checkbox input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param options {object[]} This is an array of objects with the properties "text" (string), "value" (string), "checked" (boolean) and optional "disabled" (boolean) for the different options of checkboxes and radio buttons
         * @returns {object}
         */
        static createInput(classNames, name, options) {
            let group = GeneralModule.generateElementApi("div", ["checkbox-group", "input-container"].concat(classNames));

            options.forEach((option) => {
                if (!option["value"]) {
                    option["value"] = option["text"];
                }
                let label = GeneralModule.generateElementApi("label", ["checkbox-input-container"]);
                label.appendChild(document.createTextNode(option["text"]));
                let input = GeneralModule.generateElementApi("input");
                input.setAttribute("type", "checkbox");
                input.setAttribute("value", option["value"]);
                input.setAttribute("name", name);
                if (option["checked"]) {
                    input.setAttribute("checked", "checked");
                }
                if (option.hasOwnProperty("disabled") && option["disabled"]) {
                    label.classList.add("disabled");
                    input.setAttribute("disabled", "disabled");
                }
                label.appendChild(input);
                label.appendChild(GeneralModule.generateElementApi("span", ["checkmark"]));
                group.appendChild(label);
            });

            let newCheckboxes = new Checkboxes(group);
            inputs.push(newCheckboxes);
            return newCheckboxes;
        }

    }

    /**
     * This class handles text input specific behaviour
     */
    class TextInput extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("input");
            this.name = this.inputElement.getAttribute("name");
            this.inputValidation = {};

            this.updateInputValidation();

            this.inputContainer.addEventListener("input", this.handleChangeInput.bind(this));

            if (this.inputContainer.querySelector(".password-label")) {
                this.passwordLabel = this.inputContainer.querySelector(".password-label");
                this.passwordIcon = this.passwordLabel.querySelector("i");

                this.passwordLabel.addEventListener("click", this.handlePasswordBehavior.bind(this));
            }

        }

        getValue() {
            return this.inputElement.value;
        }

        setValue(newInput) {
            this.inputElement.value = newInput;
            this.handleChangeInput();
        }

        updateInputValidation() {
            this.revokeAllInputErrors();
            this.inputValidation = {};
            if (this.inputContainer.classList.contains("text-input-container")) {
                // E-Mail text input field validation
                if (this.inputContainer.classList.contains("mail") || this.inputContainer.classList.contains("email") || this.inputContainer.classList.contains("e-mail")) {
                    this.inputValidation.mail = {};
                    this.inputValidation.mail.regex = /^(?:[\w\.\-]{2,})(?:\@)(?:[\w\.\-]{2,})(?:\.)(?:[\w]{2,})$/;
                    this.inputValidation.mail.error = errorTypes.EMAIL;
                }
            }
        }

        handleChangeInput() {
            super.handleChangeInput();
            this.validateInput();
            this.hasUserInput();
        }

        hasUserInput() {
            if (this.inputElement.value) {
                this.inputElement.classList.add("filled");
                this.userInput = true;
            } else {
                this.inputElement.classList.remove("filled");
                this.userInput = false;
            }
            return super.hasUserInput();
        }

        validateInput() {
            for (let property in this.inputValidation) {
                if (this.inputValidation.hasOwnProperty(property)) {
                    if (this.inputValidation[property].regex.test(String(this.inputElement.value))) {
                        this.revokeInputError(this.inputValidation[property].error);
                    } else {
                        this.throwInputError(this.inputValidation[property].error);
                    }
                }
            }
        }

        handlePasswordBehavior() {
            this.inputContainer.focus();
            if (this.inputElement.type == "password") {
                this.passwordIcon.innerHTML = "lock_open";
                this.inputElement.type = "text";
            } else {
                this.passwordIcon.innerHTML = "lock";
                this.inputElement.type = "password";
            }
        }

        /**
         *
         *  This function creates a text input element with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button
         * @param value {string} Optional: Sets the value of this input field
         * @returns {object}
         */
        static createInput(classNames, inputId, name, placeholder, value) {
            let inputContainer = GeneralModule.generateElementApi("span", ["text-input-container", "input-container"].concat(classNames));
            let icon = GeneralModule.generateElementApi("label", ["icon"]);
            icon.setAttribute("for", inputId);

            if (classNames.includes("email") || classNames.includes("e-mail") || classNames.includes("mail")) {
                icon.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "email"));
            } else if (classNames.includes("password")) {
                icon.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "lock"));
            } else {
                icon.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "person"));
            }

            inputContainer.appendChild(icon);
            let input = GeneralModule.generateElementApi("input", ["text-input"]);
            if (classNames.includes("password")) {
                input.setAttribute("type", "password");
            } else {
                input.setAttribute("type", "text");
            }
            input.setAttribute("id", inputId);

            if (name) {
                input.setAttribute("name", name);
            }

            inputContainer.appendChild(input);
            let pLabel = GeneralModule.generateElementApi("label", ["text"], placeholder);
            pLabel.setAttribute("for", inputId);
            inputContainer.appendChild(pLabel);
            inputContainer.appendChild(GeneralModule.generateElementApi("span", ["underline"]));
            let newTextInput = new TextInput(inputContainer)
            inputs.push(newTextInput);
            if (value) {
                newTextInput.setValue(value);
            }
            return newTextInput;
        }

    }

    /**
     * This class handles checkbox input (switch) specific behaviour
     */
    class Switch extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("input");
            this.name = this.inputElement.getAttribute("name");

            // Switches cannot be required!
            this.required = false;
        }

        getValue() {
            return this.inputElement.checked;
        }

        turnOn() {
            this.inputElement.checked = true;
            this.handleChangeInput();
        }

        turnOff() {
            this.inputElement.checked = false;
            this.handleChangeInput();
        }

        toggle() {
            if (this.inputElement.checked) {
                this.turnOff();
            } else {
                this.turnOn();
            }
        }

        /**
         *
         *  This function creates input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param value {string} Sets the value attribute
         * @param checked {boolean} Optional: Determines if switch to be checked
         * @returns {object}
         */
        static createInput(classNames, inputId, name, text, value, checked) {
            if (!value) {
                value = text;
            }

            let switchContainer = GeneralModule.generateElementApi("label", ["switch-container", "input-container"].concat(classNames));
            switchContainer.setAttribute("for", inputId);
            let input = GeneralModule.generateElementApi("input", ["switch-input"]);
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", inputId);
            input.setAttribute("value", value);
            if (name) {
                input.setAttribute("name", name);
            }
            if (checked) {
                input.setAttribute("checked", "checked");
            }
            switchContainer.appendChild(input);
            switchContainer.appendChild(GeneralModule.generateElementApi("span", ["switch"]));
            switchContainer.appendChild(GeneralModule.generateElementApi("span", ["text"], text));

            let newSwitch = new Switch(switchContainer);
            inputs.push(newSwitch);
            return newSwitch;
        }

    }

    /**
     * This class handles file input specific behaviour
     */
    class FileInput extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.inputElement = inputContainer.querySelector("input");
            this.name = this.inputElement.getAttribute("name");
            this.fileNameSpan = inputContainer.querySelector("span.file-name");
            this.placeholder = this.fileNameSpan.innerText;
        }

        handleChangeInput() {
            super.handleChangeInput();
            if (this.inputElement) {
                let fileName = undefined;
                if (this.inputElement.files && this.inputElement.files.length > 1) {
                    fileName = this.inputElement.files.length + " Dateien ausgewählt";
                } else {
                    fileName = this.inputElement.value.split("\\").pop();
                }
                if (fileName) {
                    this.fileNameSpan.innerHTML = fileName;
                } else {
                    this.fileNameSpan.innerHTML = this.placeholder;
                }
            }
            if (!this.hasUserInput()) {
                this.userInput = true;
            }
        }

        /**
         *
         *  This function creates input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @returns {object}
         */
        static createInput(classNames, inputId, name) {
            let fileContainer = GeneralModule.generateElementApi("label", ["file-input-container", "input-container"].concat(classNames));
            fileContainer.setAttribute("for", inputId);
            let input = GeneralModule.generateElementApi("input", ["file-input"]);
            input.setAttribute("type", "file");
            input.setAttribute("id", inputId);
            if (name) {
                input.setAttribute("name", name);
            }
            input.setAttribute("multiple", "multiple");
            fileContainer.appendChild(input);
            fileContainer.appendChild(GeneralModule.generateElementApi("i", ["material-icons"], "publish"));
            fileContainer.appendChild(GeneralModule.generateElementApi("span", ["file-name"], "Datei auswählen..."));

            let newFileInput = new FileInput(fileContainer);
            inputs.push(newFileInput);
            return newFileInput;
        }

    }

    /**
     * This class handles textarea specific behaviour
     */
    class Textarea extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.name = this.inputContainer.getAttribute("name");

        }

        hasUserInput() {
            if (this.inputContainer.value) {
                this.inputContainer.classList.add("filled");
                this.userInput = true;
            } else {
                this.inputContainer.classList.remove("filled");
                this.userInput = false;
            }
            return this.userInput;
        }

        getValue() {
            return this.inputContainer.value;
        }

        setValue(newInput) {
            this.inputContainer.value = newInput;
            this.handleChangeInput();
        }

        /**
         *
         *  This function creates input elements with all the individual mark-up and some individualization options for usage in e.g. modals
         *
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button
         * @param value {string} Optional: Sets the value if this textarea
         * @returns {object}
         */
        static createInput(classNames, inputId, name, placeholder, value) {
            let textArea = GeneralModule.generateElementApi("textarea", ["textarea", "input-container"].concat(classNames));
            if (inputId) {
                textArea.id = inputId;
            }
            if (name) {
                textArea.setAttribute("name", name);
            }
            if (placeholder) {
                textArea.setAttribute("placeholder", placeholder);
            }

            let newTextarea = new Textarea(textArea)
            inputs.push(newTextarea);
            if (value) {
                newTextarea.setValue(value);
            }
            return newTextarea;
        }

    }

    class RangeInput extends Input {
        constructor(inputContainer) {
            super(inputContainer);
            this.name = this.inputContainer.getAttribute("name");
            this.input = this.inputContainer.querySelector("input");
            this.initialValue = this.input.value;
            this.rangeValueSpan = this.inputContainer.querySelector("span.range-value");

            this.input.addEventListener("input", this.handleChangeInput.bind(this));
            this.rangeValueSpan.innerHTML = this.getValue();

        }

        handleChangeInput() {
            super.handleChangeInput();
            this.rangeValueSpan.innerHTML = this.getValue();
        }

        hasUserInput() {
            return this.userInput = this.input.value !== this.initialValue;
        }

        getValue() {
            return this.input.value;
        }

        setValue(newValue) {
            if (newValue && newValue >= this.getMin() && newValue <= this.getMax()) {
                this.input.value = newValue + "";
            }
        }

        setMin(min) {
            this.input.min = min + "";
        }

        getMin() {
            return parseInt((this.input.min) ? this.input.min : "0");
        }

        setMax(max) {
            this.input.max = max + "";
        }

        getMax() {
            return parseInt((this.input.max) ? this.input.max : "100");
        }

        setStep(step) {
            if (step && step <= (this.getMax() - this.getMin())) {
                this.input.step = step + "";
            }
        }


        /**
         * This function creates a new range input object and returns it
         * @param classes {string} The class names that should be added to the input-container
         * @param id {string} The id to connect the label to the input element
         * @param name {string} The value of the name attribute
         * @param text {string} Sets the content of the label which accompanies the input
         * @param initialValue {number} Sets the initial value of the input element
         * @return {RangeInput}
         */
        static createInput(classes, id, name, text, initialValue) {
            let container = GeneralModule.generateElementApi("div", ["range-input-container"].concat(classes));
            let label = GeneralModule.generateElementApi("label", ["range-label"], text + " ", {"for":id})
            label.appendChild(GeneralModule.generateElementApi("span", ["range-value"], (initialValue) ? initialValue + "" : "0"));
            container.appendChild(label);
            container.appendChild(GeneralModule.generateElementApi("input", ["range-input"], undefined, {"id":id, "type":"range", "name":name, "value":initialValue}));

            let newRangeInput = new RangeInput(container);
            inputs.push(newRangeInput);
            return newRangeInput;
        }

    }

    /**
     * This block initializes static input elements of a website
     */
    if (document.querySelector(".input-container")) {
        let textInputs = document.querySelectorAll(".text-input-container");
        let switches = document.querySelectorAll(".switch-container");
        let radioButtons = document.querySelectorAll(".radio-group");
        let checkboxes = document.querySelectorAll(".checkbox-group");
        let selects = document.querySelectorAll(".select-input-container");
        let dateInputs = document.querySelectorAll(".date-input-container");
        let timeInputs = document.querySelectorAll(".time-input-container");
        let fileInputs = document.querySelectorAll(".file-input-container");
        let textareas = document.querySelectorAll(".textarea");
        let rangeInputs = document.querySelectorAll(".range-input-container");

        textInputs.forEach((tI) => {
            inputs.push(new TextInput(tI));
        });

        switches.forEach((sw) => {
            inputs.push(new Switch(sw));
        });

        radioButtons.forEach((r) => {
            inputs.push(new RadioButtons(r));
        });

        checkboxes.forEach((c) => {
            inputs.push(new Checkboxes(c));
        });

        selects.forEach((se) => {
            inputs.push(new Select(se));
        });

        dateInputs.forEach((dI) => {
            inputs.push(new DateInput(dI));
        });

        timeInputs.forEach((tI) => {
            inputs.push(new TimeInput(tI));
        });

        fileInputs.forEach((fI) => {
            inputs.push(new FileInput(fI));
        });

        textareas.forEach((t) => {
            inputs.push(new Textarea(t));
        });

        rangeInputs.forEach((r) => {
            inputs.push((new RangeInput(r)));
        });

    }

    /**
     * API:
     */
    return {
        /**
         * This api function creates an input element and the responsible object and returns the object@param inputType {string} Enum which determines the input to be created
         * @param inputType {string} The inputType that should be created
         * @param classNames {string[]} Contains classes to be applied to the container element (these classes also control input validation for text input fields. See concrete text input creation function for further details)
         * @param inputId {string} Optional: Sets the id for the input (if none set then a random id is generated to make the labels work)
         * @param name {string} Sets the name attribute on the input element for identification in general
         * @param placeholder {string} Either sets the placeholder value for almost all input types or sets the text which accompanies the switch or range
         * @param value {string} Sets either the value attribute of switches or the value of text inputs, textareas or range inputs
         * @param checked {boolean} Optional: Determines if switch to be checked
         * @param options {string[] || object[]} This should be an array of strings to determine the different options for the select or this is an array of objects with the properties "text" (string), "value" (string), "checked" (boolean) and optional "disabled" (boolean) for the different options of checkboxes and radio buttons
         * @return {TextInput|Switch|Checkboxes|RadioButtons|Select|DateInput|TimeInput|FileInput|Textarea|RangeInput}
         */
        createInputApi : function (inputType, classNames, inputId, name, placeholder, value, checked, options) {
            return Input.createInputFactory(inputType, classNames, inputId, name, placeholder, value, checked, options);
        },
        /**
         * This api function returns the responsible input object to a given input container element
         * @param inputContainer {HTMLElement} The input container element of which the responsible object is required
         * @return {object}
         */
        getInputObjectApi : function (inputContainer) {
            return Input.getInputObject(inputContainer);
        },
        /**
         * This api function compares two given dates (in the format of: dd.mm.yyyy) and returns true if the first date is smaller (earlier) than the second date
         * @param date1 {string}
         * @param date2 {string}
         * @return {boolean}
         */
        compareDatesApi : function (date1, date2) {
            return DateInput.compareDates(date1, date2);
        },
        /**
         * This api function compares two given times (in the format of: hh:mm) and returns true if the first time is smaller (earlier) than the second time
         * @param time1 {string}
         * @param time2 {string}
         * @return {boolean}
         */
        compareTimesApi : function (time1, time2) {
            return TimeInput.compareTimes(time1, time2);
        },
    }

})(window, document);
