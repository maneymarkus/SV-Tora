function init(window, document, undefined) {

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
  }

  let Module = (function(window, document, undefined) {

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

    return {
      generateElementApi : function (element, classNames, value) {
        return generateElement(element, classNames, value);
      }
    }

  })(window, document);



  let InputsModule = (function(window, document, undefined) {

    /*
      START TIMEPICKER
     */

    let timePicker = undefined;

    let timePickers = [];

    function getTimepickerObject(inputContainer) {
      let iObject = undefined;
      timePickers.forEach((timePicker) => {
        if (timePicker.timeInputContainer === inputContainer) {
          iObject = input;
        }
      });
      return iObject;
    }

    let TimePicker = function(timeInputContainer) {
      let This = this;
      if (timePicker !== undefined) {
        this.timePickerElement = timePicker;
      } else {
        timePicker = TimePicker.createTimePicker();
        this.timePickerElement = timePicker;
        document.getElementsByTagName("body")[0].appendChild(this.timePickerElement);
      }
      this.timeInputContainer = timeInputContainer;
      this.hour = new Date().getHours();
      this.minute = new Date().getMinutes();
      this.hourElement = this.timePickerElement.querySelector(".header span.chosenHour");
      this.minuteElement = this.timePickerElement.querySelector(".header span.chosenMinute");
      this.hasUserInput = false;

      this.positionClockHand = function (position) {
        let clockhand = This.timePickerElement.querySelector(".active .clockhand");
        clockhand.classList.remove("short");
        let pos;
        if (This.timePickerElement.querySelector(".minutes.active")) {
          pos = Math.round(((position / (12 * 5)) + Number.EPSILON) * 100) / 100;
        } else {
          pos = Math.round(((position / 12) + Number.EPSILON) * 100) / 100;
        }
        let degrees = 360 * pos;
        clockhand.style.transform = "translateX(-50%) rotate(" + degrees + "deg)";
        if (This.timePickerElement.querySelector(".hours.active")) {
          if (pos > 1 || pos === 0) {
            clockhand.classList.add("short");
          }
        }
      }

      this.timePickerElement.querySelector(".clock").addEventListener("mousemove", function (e) {
        let ev = e || window.event;
        let target = ev.target || window.target;
        if (target.nodeName === "SPAN") {
          if (!This.timePickerElement.querySelector(".active .chosen")) {
            This.positionClockHand(target.innerHTML);
          }
        }
      });

      this.timePickerElement.querySelector(".clock").addEventListener("mouseleave", function (e) {
        if (This.timePickerElement.querySelector(".clock .active .chosen")) {
          let chosen = This.timePickerElement.querySelector(".clock .chosen");
          This.positionClockHand(chosen.innerHTML);
        }
      });

      this.timePickerElement.addEventListener("click", function (e) {
        let target = e.target;
        if (target.classList.contains("minute") || target.classList.contains("hour")) {
          if (target.nodeName === "SPAN") {
            if (This.timePickerElement.querySelector(".clock .chosen")) {
              This.timePickerElement.querySelector(".clock .chosen").classList.remove("chosen");
            }
            target.classList.add("chosen");
            This.positionClockHand(target.innerHTML);
            This.timePickerElement.querySelector(".clock").classList.add("chosen");
            if (This.timePickerElement.querySelector(".hours.active")) {
              This.setHour(target.innerHTML);
              This.timePickerElement.querySelector(".hours.active").classList.remove("active");
              This.timePickerElement.querySelector(".minutes").classList.add("active");
              This.hourElement.classList.remove("active");
              This.minuteElement.classList.add("active");
            } else {
              This.setMinute(target.innerHTML);
            }
          }
          return;
        }
        if (target.classList.contains("pick")) {
          if (This.timePickerElement.querySelector(".minutes.active")) {
            This.timePickerElement.querySelector(".minutes.active").classList.remove("active");
            This.timePickerElement.querySelector(".hours").classList.add("active");
            This.timeInputContainer.querySelector("input").value = This.hourElement.innerHTML.trim() + " : " + This.minuteElement.innerHTML.trim();
            This.timeInputContainer.querySelector("input").classList.add("filled");
            if (!This.hasUserInput) {
              This.hasUserInput = true;
            }
            This.hide();
          }
          return;
        }
        if (target.classList.contains("cancel")) {
          if (This.timePickerElement.querySelector(".minutes.active")) {
            This.timePickerElement.querySelector(".minutes.active").classList.remove("active");
            This.timePickerElement.querySelector(".hours").classList.add("active");
          }
          This.hide();
          return;
        }
      });

      this.timeInputContainer.addEventListener("click", function (e) {
        let ev = e || window.event;
        ev.preventDefault();
        This.timePickerElement.classList.add("show");
        This.updateClock(This.hour, This.minute);
        This.hourElement.classList.add("active");
        This.minuteElement.classList.remove("active");
      });

      this.hide = function () {
        if (This.timePickerElement.querySelector(".clock .chosen")) {
          This.timePickerElement.querySelector(".clock .chosen").classList.remove("chosen");
        }
        if (This.timePickerElement.querySelector(".clock.chosen")) {
          This.timePickerElement.querySelector(".clock.chosen").classList.remove("chosen");
        }
        This.timePickerElement.classList.remove("show");
      }

      this.setHour = function (hour) {
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

      this.setMinute = function (minute) {
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

      this.updateClock = function (hour, minute) {
        This.setHour(hour);
        This.setMinute(minute);
      }

    }

    TimePicker.createTimePicker = function () {
      let timePickerContainer = Module.generateElementApi("DIV", ["timepicker-container"]);
      let timePicker = Module.generateElementApi("DIV", ["timepicker"]);
      let header = Module.generateElementApi("DIV", ["header"]);
      let hourSpan = Module.generateElementApi("SPAN", ["chosenHour"]);
      header.appendChild(hourSpan);
      let dividerSpan = Module.generateElementApi("SPAN", [], ":");
      header.appendChild(dividerSpan);
      let minuteSpan = Module.generateElementApi("SPAN", ["chosenMinute"]);
      header.appendChild(minuteSpan);
      timePicker.appendChild(header);
      let clock = Module.generateElementApi("DIV", ["clock"]);
      let hourClockFace = Module.generateElementApi("DIV", ["clockface", "hours", "active"]);
      let clockhand = Module.generateElementApi("DIV", ["clockhand"]);
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
        let hourUnit = Module.generateElementApi("SPAN", classNames, value);
        hourClockFace.appendChild(hourUnit);
      }
      clock.appendChild(hourClockFace);
      let minuteClockFace = Module.generateElementApi("DIV", ["clockface", "minutes"]);
      minuteClockFace.appendChild(clockhand.cloneNode(true));
      for (let i = 0; i < 60; i += 5) {
        let value = i;
        if (i === 0) {
          value = "00";
        }
        let classNames = ["minute" + value, "minute"];
        let minuteUnit = Module.generateElementApi("SPAN", classNames, value);
        minuteClockFace.appendChild(minuteUnit);
      }
      clock.appendChild(minuteClockFace);
      timePicker.appendChild(clock);
      let footer = Module.generateElementApi("DIV", ["footer", "clearfix"]);
      let cancelBtn = Module.generateElementApi("A", ["cancel"], "Abbrechen");
      footer.appendChild(cancelBtn);
      let pickBtn = Module.generateElementApi("A", ["pick"], "Wählen");
      footer.appendChild(pickBtn);
      timePicker.appendChild(footer);
      timePickerContainer.appendChild(timePicker);
      return timePickerContainer;
    }

    if (document.getElementsByClassName("time-input-container")[0] !== undefined) {
      initializeTimePicker();
    }

    function initializeTimePicker() {
      let timeInputElements = document.querySelectorAll("div.time-input-container");
      timeInputElements.forEach((t) => {
        timePickers.push(new TimePicker(t));
      });
    }

    /*
      END TIMEPICKER
     */



    /*
      START DATEPICKER
     */

    let days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    let datePicker = undefined;

    let datePickers = [];

    function getDatepickerObject(inputContainer) {
      let iObject = undefined;
      datePickers.forEach((datePicker) => {
        if (datePicker.dateInputContainer === inputContainer) {
          iObject = input;
        }
      });
      return iObject;
    }

    let DatePicker = function(dateInputContainer) {
      let This = this;
      if (datePicker !== undefined) {
        this.datePickerElement = datePicker;
      } else {
        datePicker = DatePicker.createDatePicker();
        this.datePickerElement = datePicker;
        document.getElementsByTagName("body")[0].appendChild(this.datePickerElement);
      }
      this.dateInputContainer = dateInputContainer;
      this.day = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
      this.previousMonth = this.datePickerElement.querySelector(".header .previous-month");
      this.nextMonth = this.datePickerElement.querySelector(".header .next-month");
      this.monthElement = this.datePickerElement.querySelector(".header .month");
      this.yearElement = this.datePickerElement.querySelector(".header .year");
      this.hasUserInput = false;

      this.datePickerElement.addEventListener("click", function (e) {
        let target = e.target;
        if (target.classList.contains("pick")) {
          This.dateInputContainer.querySelector("input").value = This.day + "." + (This.month + 1) + "." + This.year;
          This.dateInputContainer.querySelector("input").classList.add("filled");
          if (!This.hasUserInput) {
            This.hasUserInput = true;
          }
          This.hide();
          return;
        }
        if (target.classList.contains("cancel")) {
          This.hide();
          return;
        }
        if (target.classList.contains("selectable")) {
          if (This.datePickerElement.querySelector(".selected")) {
            This.datePickerElement.querySelector(".selected").classList.remove("selected")
          }
          target.classList.add("selected");
          This.day = target.innerHTML;
          return;
        }
        if (target.classList.contains("previous-month") || target.parentNode.classList.contains("previous-month")) {
          if (This.month === 0) {
            This.updateCalender(11, This.year - 1);
          } else {
            This.updateCalender(This.month - 1, This.year);
          }
          return;
        }
        if (target.classList.contains("next-month") || target.parentNode.classList.contains("next-month")) {
          if (This.month === 11) {
            This.updateCalender(0, This.year + 1);
          } else {
            This.updateCalender(This.month + 1, This.year);
          }
          return;
        }
      });

      this.dateInputContainer.addEventListener("click", function (e) {
        let ev = e || window.event;
        ev.preventDefault();
        This.datePickerElement.classList.add("show");
        This.updateCalender(This.month, This.year);
      });

      this.hide = function () {
        This.datePickerElement.classList.remove("show");
      }

      this.setYear = function (year) {
        this.year = year;
        this.yearElement.innerHTML = year;
      }

      this.setMonth = function (month) {
        this.month = month;
        this.monthElement.innerHTML = months[month];
      }

      this.updateCalender = function (month, year) {
        This.setMonth(month);
        This.setYear(year);
        let numberDays = daysInMonth(month, year);
        let firstWeekday = new Date(year, month, 1).getDay() - 1;
        let tBody = This.datePickerElement.querySelector("table tbody");
        tBody.innerHTML = "";
        let dayCounter = 1;
        while (dayCounter <= numberDays) {
          let row = Module.generateElementApi("TR");
          for (let i = 0; i < 7; i++) {
            let td;
            if (firstWeekday > 0) {
              firstWeekday -= 1;
              td = Module.generateElementApi("TD");
            } else {
              if (dayCounter <= numberDays) {
                if (dayCounter == This.day) {
                  td = Module.generateElementApi("TD", ["selectable", "selected"], dayCounter++);
                } else {
                  td = Module.generateElementApi("TD", ["selectable"], dayCounter++);
                }
              } else {
                td = Module.generateElementApi("TD");
              }
            }
            row.appendChild(td);
          }
          tBody.appendChild(row);
        }
      }
    }

    DatePicker.createDatePicker = function () {
      let datePickerContainer = Module.generateElementApi("DIV", ["datepicker-container"]);
      let datePicker = Module.generateElementApi("DIV", ["datepicker"])
      let header = Module.generateElementApi("DIV", ["header", "clearfix"]);
      let previousMonth = Module.generateElementApi("A", ["previous-month"]);
      let leftIcon = Module.generateElementApi("I", ["material-icons"], "arrow_back");
      previousMonth.appendChild(leftIcon);
      header.appendChild(previousMonth);
      let month = Module.generateElementApi("SPAN", ["month"]);
      header.appendChild(month);
      let year = Module.generateElementApi("SPAN", ["year"]);
      header.appendChild(year);
      let nextMonth = Module.generateElementApi("A", ["next-month"]);
      let rightIcon = Module.generateElementApi("I", ["material-icons"], "arrow_forward");
      nextMonth.appendChild(rightIcon);
      header.appendChild(nextMonth);
      datePicker.appendChild(header);
      let calender = Module.generateElementApi("DIV", ["calender"]);
      let table = Module.generateElementApi("TABLE");
      let tHeader = Module.generateElementApi("THEAD");
      let headerRow = Module.generateElementApi("TR");
      days.forEach(function (item) {
        let td = Module.generateElementApi("TH", [], item);
        headerRow.appendChild(td);
      });
      tHeader.appendChild(headerRow);
      table.appendChild(tHeader);
      let tBody = Module.generateElementApi("TBODY");
      table.appendChild(tBody);
      calender.appendChild(table);
      datePicker.appendChild(calender);
      let footer = Module.generateElementApi("DIV", ["footer", "clearfix"]);
      let cancelBtn = Module.generateElementApi("A", ["cancel"], "Abbrechen");
      footer.appendChild(cancelBtn);
      let pickBtn = Module.generateElementApi("A", ["pick"], "Wählen");
      footer.appendChild(pickBtn);
      datePicker.appendChild(footer);
      datePickerContainer.appendChild(datePicker);
      return datePickerContainer;
    }

    function daysInMonth(month, year) {
      // month has to be increased by one to be coherent with other javascript date indexes
      return new Date(year, month + 1, 0).getDate();
    }

    if (document.getElementsByClassName("date-input-container")[0] !== undefined) {
      initializeDatePicker();
    }

    function initializeDatePicker() {
      let dateInputElements = document.querySelectorAll("div.date-input-container");
      dateInputElements.forEach((d) => {
        datePickers.push(new DatePicker(d));
      });
    }

    /*
      END DATEPICKER
     */


    /*
      START SELECT
     */

    let selects = [];

    function getSelectObject(selectContainer) {
      let sObject = undefined;
      selects.forEach((select) => {
        if (select.selectContainer === selectContainer) {
          sObject = select;
        }
      });
      return sObject;
    }

    let Select = function (selectElement) {
      let This = this;
      this.optionsElement = selectElement.querySelector("div.options");
      this.placeholder = selectElement.querySelector("span.placeholder").innerHTML.trim();
      this.selectContainer = selectElement;
      this.selectInput = selectElement.querySelector("span.select-input");
      this.selected = this.selectInput.innerHTML.trim();
      this.hasUserInput = false;

      this.selectContainer.addEventListener("click", function (e) {
        let ev = e || window.event;
        let target = ev.target || window.target;
        while (target && !target.classList.contains("select-input-container") && !target.classList.contains("option")) {
          target = target.parentNode;
        }
        if (target && target.classList.contains("select-input-container")) {
          if (This.optionsElement.classList.contains("show")) {
            This.hide();
          } else {
            This.show();
          }
        } else if (target && target.classList.contains("option")) {
          This.selectOption(target.innerHTML);
          if (!This.hasUserInput) {
            This.hasUserInput = true;
          }
          This.hide();
        } else {
          This.hide();
        }
      });

      this.resetSelect = function () {
        this.selectInput.innerHTML = this.placeholder;
        this.selectInput.classList.add("placeholder");
      };

      this.selectOption = function (selectedOption) {
        this.selectInput.innerHTML = selectedOption;
        this.selectInput.classList.remove("placeholder");
        this.selected = this.selectInput.innerHTML;
      };

      this.show = function () {
        this.selectContainer.classList.add("open");
        this.optionsElement.classList.add("show");
      };

      this.hide = function () {
        this.selectContainer.classList.remove("open");
        this.optionsElement.classList.remove("show");
      };

      this.updateOptions = function (newOptions) {
        this.options = newOptions;
        this.addOptions(this.optionsElement, newOptions);
      }

    };

    /**
     *  Creates a select DOM element then creates a select object out of this and adds it to the selects array
     *
     *  @param classNames string array of classnames which will be applied to select container
     *  @param name names the (mocked) input element for identification
     *  @param placeholder if no option is selected this placeholder is displayed
     *  @param options string array of all the options that should be available
     *  @return Select Object
     */
    Select.createSelect = function(classNames, name, placeholder, options) {
      let selectContainer = Module.generateElementApi("DIV", ["select-input-container", "input-container"].concat(classNames));
      let label = Module.generateElementApi("LABEL");
      let labelIcon = Module.generateElementApi("I", ["material-icons"], "list");
      label.appendChild(labelIcon);
      selectContainer.appendChild(label);
      let selectSpan = Module.generateElementApi("SPAN", ["select-input", "chosen", "placeholder"], placeholder);
      if (name) {
        selectSpan.setAttribute("data-name", name);
      }
      selectContainer.appendChild(selectSpan);
      selectContainer.appendChild(Module.generateElementApi("I", ["material-icons"], "expand_more"));
      let optionsContainer = Module.generateElementApi("DIV", ["options"]);
      if (options) {
        options.forEach(function (option) {
          let optionElement = Module.generateElementApi("DIV", ["option"], option);
          optionsContainer.appendChild(optionElement);
        });
      }
      selectContainer.appendChild(optionsContainer);
      let newSelect = new Select(selectContainer);
      selects.push(newSelect);
      return newSelect;
    };

    Select.prototype.removeOption = function (options, optionContent) {
      options.forEach((option) => {
        if (option.innerHTML.trim() === optionContent.trim()) {
          options.removeChild(option);
        }
      });
    };

    Select.prototype.addOptions = function (optionsContainer, options) {
      optionsContainer.innerHTML = "";
      options.forEach(function (item) {
        let option = Module.generateElementApi("DIV", ["option"], item);
        optionsContainer.appendChild(option);
      });
    };

    Select.prototype.getOptionHeight = function (option) {
      return option.offsetHeight;
    };

    function closeSelects(target) {
      while (target && target.nodeName !== "BODY" && !target.classList.contains("select-input-container")) {
        target = target.parentNode;
      }
      selects.forEach(function (item) {
        if (item.selectContainer !== target) {
          item.hide();
        }
      });
    }

    if (document.getElementsByClassName("select-input-container")[0] !== undefined) {
      initializeSelects();
    }

    function initializeSelects() {
      let selectElements = document.querySelectorAll("div.select-input-container");
      selectElements.forEach((s) => {
        selects.push(new Select(s));
      });
    }

    /*
      END SELECT
     */

    /*
      START TEXT INPUT
     */

    let inputs = [];

    function getInputObject(inputContainer) {
      let iObject = undefined;
      inputs.forEach((input) => {
        if (input.inputContainer === inputContainer) {
          iObject = input;
        }
      });
      return iObject;
    }

    /**
     * Input Object for all other input elements other than TimePicker, DatePicker, Selects and FileInputs
     * @param inputContainer DOM Element of the particular surrounding container (every input element comes with a surrounding container due to custom styling)
     * @constructor
     */
    let Input = function (inputContainer) {
      let This = this;
      this.inputContainer = inputContainer;
      this.inputElement = (inputContainer.querySelector("input")) ? inputContainer.querySelector("input") : undefined;
      this.hasError = false;
      this.hasUserInput = false;

      this.inputContainer.addEventListener("change", function (e) {
        hasInput();
      });

      function hasInput() {
        if (This.inputContainer.nodeName === "TEXTAREA") {
          This.hasUserInput = This.inputContainer.value.trim() !== "";
          return;
        }
        if (This.inputContainer.classList.contains("text-input-container")) {
          This.hasUserInput = This.inputElement.value.trim() !== "";
          return;
        }
        if (This.inputContainer.classList.contains("radio-input-container") || This.inputContainer.classList.contains("checkbox-input-container") || This.inputContainer.classList.contains("switch-container")) {
          This.hasUserInput = This.inputElement.checked;
          return;
        }
      }

      hasInput();

      if (this.inputContainer.classList.contains("text-input-container")) {
        this.inputContainer.addEventListener("focusout", function (e) {
          let target = e.target;
          if (target.value) {
            target.classList.add("filled");
          } else {
            target.classList.remove("filled");
          }
        });
      }

      if (this.inputContainer.querySelector(".password-label")) {
        let passwordLabel = This.inputContainer.querySelector(".password-label");
        let passwordIcon = passwordLabel.querySelector("i");

        passwordLabel.addEventListener("click", function (e) {
          e.preventDefault();
          This.inputContainer.focus();
          if (This.inputElement.type == "password") {
            passwordIcon.innerHTML = "lock_open";
            This.inputElement.type = "text";
          } else {
            passwordIcon.innerHTML = "lock";
            This.inputElement.type = "password";
          }
        });
      }

    }

    Input.prototype.addError = function (input, errorMessage) {
      let errorElement = createErrorElement(errorMessage);
      input.inputContainer.appendChild(errorElement);
      input.hasError = true;
    };

    function createErrorElement(errorMessage) {
      let errorSpan = Module.generateElementApi("SPAN", ["error"]);
      errorSpan.appendChild(Module.generateElementApi("I", ["material-icons"], "error_outline"));
      errorSpan.appendChild(Module.generateElementApi("SPAN", ["message"], errorMessage));
      return errorSpan;
    }

    Input.prototype.removeError = function (input) {
      if (input.hasError) {
        let error = input.inputContainer.querySelector("span.error");
        error.remove();
        input.hasError = false;
      }
    }

    if (document.querySelector(".input-container")) {
      let inputContainers = document.querySelectorAll(".input-container");
      inputContainers.forEach((i) => {
        inputs.push(new Input(i));
      });
    }

    function throwInputError(inputContainer, errorMessage) {
      inputs.forEach((i) => {
        if (i.inputContainer === inputContainer) {
          i.addError(i, errorMessage);
        }
      });
    }

    function revokeInputError(inputContainer) {
      inputs.forEach((i) => {
        if (i.inputContainer === inputContainer) {
          i.removeError(i);
        }
      });
    }

    let input = document.querySelector(".text-input-container");
    throwInputError(input, "Fehler");

    /*
      END TEXT INPUT
     */

    /*
      START FILE INPUT
     */

    let fileInputContainers = document.querySelectorAll(".file-input-container");
    fileInputContainers.forEach((fIC) => {
      let fInput = fIC.querySelector("input");
      let fileNameSpan = fIC.querySelector("span.file-name");
      let placeholder = fileNameSpan.innerHTML;
      fInput.addEventListener("change", function (e) {
        let fileName = undefined;
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute("data-multiple-caption") || "").replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split("\\").pop();
        }
        if (fileName) {
          fileNameSpan.innerHTML = fileName;
        } else {
          fileNameSpan.innerHTML = placeholder;
        }
      });
    });

    /*
      END FILE INPUT
     */

    /*
      START INPUT FACTORY
     */


    /**
     *
     *  This function creates input elements with all the individual mark-up and some individualization options for usage in e.g. modals
     *
     * @param inputType enum which determines which input should be created
     * @param containerClass array of strings with classes to be applied to the container element
     * @param inputId optional string that sets the id for the input (if none set then a random id is generated to make the labels work)
     * @param name string that sets the name attribute on the input element for identification in general
     * @param placeholder string that either sets the placeholder value for almost all input types or sets the text which accompanies the switch, checkbox or radio button
     * @param checked optional boolean for switch checked attribute
     * @param selectOptions array of strings to determine the options available in select element
     * @param value String for value of value attribute
     * @returns as the inputType has been chosen this function returns a DOM input element
     */
    function createInputFactory(inputType, containerClass, inputId, name, placeholder, checked = false, selectOptions, value) {
      switch (inputType) {
        case inputTypes.TEXT:
          let textId = inputId;
          let textPlaceholder = placeholder;
          if (!textId) {
            textId = Math.random().toString(16).substr(2, 10);
          }
          if (!textPlaceholder) {
            textPlaceholder = "Platzhalter";
          }
          return createTextInput(containerClass, textId, name, textPlaceholder);

        case inputTypes.PASSWORD:
          let passwordId = inputId;
          let passwordPlaceholder = placeholder;
          if (!passwordId) {
            passwordId = Math.random().toString(16).substr(2, 10);
          }
          if (!passwordPlaceholder) {
            passwordPlaceholder = "Passwort";
          }
          return createPasswordInput(containerClass, passwordId, name, passwordPlaceholder);

        case inputTypes.SWITCH:
          let switchId = inputId;
          let switchPlaceholder = placeholder;
          if (!switchId) {
            switchId = Math.random().toString(16).substr(2, 10);
          }
          if (!switchPlaceholder) {
            switchPlaceholder = "Switch";
          }
          return createSwitch(containerClass, switchId, name, switchPlaceholder, checked);

        case inputTypes.SELECT:
          return InputsModule.createSelectApi(containerClass, name, placeholder, selectOptions).selectContainer;

        case inputTypes.DATE:
          let dateId = inputId;
          let datePlaceholder = placeholder;
          if (!dateId) {
            dateId = Math.random().toString(16).substr(2, 10);
          }
          if (!datePlaceholder) {
            datePlaceholder = "Datum";
          }
          return createDateInput(containerClass, dateId, name, datePlaceholder);

        case inputTypes.TIME:
          let timeId = inputId;
          let timePlaceholder = placeholder;
          if (!timeId) {
            timeId = Math.random().toString(16).substr(2, 10);
          }
          if (!timePlaceholder) {
            timePlaceholder = "Datum";
          }
          return createTimeInput(containerClass, timeId, name, timePlaceholder);

        case inputTypes.TEXTAREA:
          let textareaPlaceholder = placeholder;
          if (!textareaPlaceholder) {
            textareaPlaceholder = "Freitexteingabe";
          }
          return createTextarea(containerClass, inputId, name, textareaPlaceholder);

        case inputTypes.CHECKBOX:
          // TODO: restructure
          return createCheckboxOrRadio(true, containerClass, name, placeholder, checked, value);

        case inputTypes.RADIO:
          // TODO: restructure
          return createCheckboxOrRadio(false, containerClass, name, placeholder, checked, value);
      }
    }

    function createTextInput(classes, inputId, name, placeholder) {
      let inputContainer = Module.generateElementApi("span", ["text-input-container", "input-container"].concat(classes));
      let icon = Module.generateElementApi("label", ["icon"]);
      icon.setAttribute("for", inputId);
      icon.appendChild(Module.generateElementApi("i", ["material-icons"], "person"));
      inputContainer.appendChild(icon);
      let input = Module.generateElementApi("input", ["text-input"]);
      input.setAttribute("type", "text");
      input.setAttribute("id", inputId);
      if (name) {
        input.setAttribute("name", name);
      }
      inputContainer.appendChild(input);
      let pLabel = Module.generateElementApi("label", ["text"], placeholder);
      pLabel.setAttribute("for", inputId);
      inputContainer.appendChild(pLabel);
      inputContainer.appendChild(Module.generateElementApi("span", ["underline"]));
      inputs.push(new Input(inputContainer));
      return inputContainer;
    }

    function createPasswordInput(classes, inputId, name, placeholder) {
      let inputContainer = Module.generateElementApi("span", ["text-input-container", "input-container", "password-container"].concat(classes));
      let icon = Module.generateElementApi("label", ["icon", "password-label"]);
      icon.setAttribute("for", inputId);
      icon.appendChild(Module.generateElementApi("i", ["material-icons"], "lock"));
      inputContainer.appendChild(icon);
      let input = Module.generateElementApi("input", ["text-input"]);
      input.setAttribute("type", "password");
      input.setAttribute("id", inputId);
      if (name) {
        input.setAttribute("name", name);
      }
      inputContainer.appendChild(input);
      let pLabel = Module.generateElementApi("label", ["text"], placeholder);
      pLabel.setAttribute("for", inputId);
      inputContainer.appendChild(pLabel);
      inputContainer.appendChild(Module.generateElementApi("span", ["underline"]));
      inputs.push(new Input(inputContainer));
      return inputContainer;
    }

    function createSwitch(classes, id, name, text, checked) {
      let switchContainer = Module.generateElementApi("label", ["switch-input-container", "input-container"].concat(classes));
      switchContainer.setAttribute("for", id);
      let input = Module.generateElementApi("input", ["switch-input"]);
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", id);
      if (name) {
        input.setAttribute("name", name);
      }
      if (checked) {
        input.setAttribute("checked", "checked");
      }
      switchContainer.appendChild(input);
      switchContainer.appendChild(Module.generateElementApi("span", ["switch"]));
      switchContainer.appendChild(Module.generateElementApi("span", ["text"], text));
      inputs.push(new Input(switchContainer));
      return switchContainer;
    }

    function createDateInput(classes, inputId, name, placeholder) {
      let inputContainer = Module.generateElementApi("span", ["date-input-container", "input-container"].concat(classes));
      let icon = Module.generateElementApi("label", ["icon"]);
      icon.setAttribute("for", inputId);
      icon.appendChild(Module.generateElementApi("i", ["material-icons"], "today"));
      inputContainer.appendChild(icon);
      let input = Module.generateElementApi("input", ["date-input"]);
      input.setAttribute("type", "text");
      input.setAttribute("id", inputId);
      if (name) {
        input.setAttribute("name", name);
      }
      inputContainer.appendChild(input);
      let pLabel = Module.generateElementApi("label", ["text"], placeholder);
      pLabel.setAttribute("for", inputId);
      inputContainer.appendChild(pLabel);
      inputContainer.appendChild(Module.generateElementApi("span", ["underline"]));
      timePickers.push(new TimePicker(inputContainer));
      return inputContainer;
    }

    function createTimeInput(classes, inputId, name, placeholder) {
      let inputContainer = Module.generateElementApi("span", ["time-input-container", "input-container"].concat(classes));
      let icon = Module.generateElementApi("label", ["icon"]);
      icon.setAttribute("for", inputId);
      icon.appendChild(Module.generateElementApi("i", ["material-icons"], "schedule"));
      inputContainer.appendChild(icon);
      let input = Module.generateElementApi("input", ["time-input"]);
      input.setAttribute("type", "text");
      input.setAttribute("id", inputId);
      if (name) {
        input.setAttribute("name", name);
      }
      inputContainer.appendChild(input);
      let pLabel = Module.generateElementApi("label", ["text"], placeholder);
      pLabel.setAttribute("for", inputId);
      inputContainer.appendChild(pLabel);
      inputContainer.appendChild(Module.generateElementApi("span", ["underline"]));
      timePickers.push(new TimePicker(inputContainer));
      return inputContainer;
    }

    function createTextarea(classes, id, name, placeholder) {
      let textArea = Module.generateElementApi("textarea", ["textarea", "input-container"].concat(classes));
      if (id) {
        textArea.id = id;
      }
      if (name) {
        textArea.setAttribute("name", name);
      }
      if (placeholder) {
        textArea.setAttribute("placeholder", placeholder);
      }
      inputs.push(new Input(textArea));
      return textArea;
    }

    /**
     * This function creates a checkbox or radio button
     * @param checkbox determines if to create checkbox or radio button
     * @param classes array of strings with classes to be applied to the container element
     * @param name String to determine the value of the name attribute of the input element
     * @param text String that is visible in the frontend
     * @param checked Boolean that determines if input is already checked
     * @param value String that determines the value of the value attribute
     * @return returns array of input container (either checkboxes or radio buttons)
     */
    function createCheckboxOrRadio(checkbox, classes, name, text, checked, value) {
      let type, containerClass;
      if (!value) {
        value = text;
      }
      if (checkbox) {
        type = "checkbox";
        containerClass = ["checkbox-input-container", "input-container"];
      } else {
        type = "radio";
        containerClass = ["radio-input-container", "input-container"];
      }
      let label = Module.generateElementApi("label", containerClass.concat(classes));
      label.appendChild(document.createTextNode(text));
      let input = Module.generateElementApi("input");
      input.setAttribute("type", type);
      input.setAttribute("value", value);
      input.setAttribute("name", name);
      if (checked) {
        input.setAttribute("checked", "checked");
      }
      label.appendChild(input);
      label.appendChild(Module.generateElementApi("span", ["checkmark"]));
      return label;
    }

    /*
      END INPUT FACTORY
     */


    /*
      START MISCELLANEOUS
     */

    /**
     * This functions checks a given container DOM element (does not necessarily need to be a form element) if all the required input elements are filled
     * @param form DOM element containing (required) input elements (containers actually)
     * @return boolean
     */
    function checkRequiredInputs(form) {

      // define some variables
      let requiredContainers = form.querySelectorAll(".required");
      requiredContainers = Array.apply(null, requiredContainers)
      let radios = {};
      let requiredRadioButtons = form.querySelectorAll(".radio-input-container.required");
      let checkboxes = {};
      let requiredCheckBoxes = form.querySelectorAll(".checkbox-input-container.required");

      // group radio buttons according to name attribute
      requiredRadioButtons.forEach((radioButton) => {
        let key = radioButton.querySelector("input").getAttribute("name").trim();
        if (key in radios) {
          if (!radios[key].includes(radioButton)) {
            radios[key].push(radioButton);
          }
        } else {
          radios[key] = [radioButton];
        }
        requiredContainers.splice(requiredContainers.indexOf(radioButton), 1);
      });

      // group checkboxes according to name attribute
      requiredCheckBoxes.forEach((checkbox) => {
        let key = checkbox.querySelector("input").getAttribute("name").trim();
        if (key in checkboxes) {
          if (!checkboxes[key].includes(checkbox)) {
            checkboxes[key].push(checkbox);
          }
        } else {
          checkboxes[key] = [checkbox];
        }
        requiredContainers.splice(requiredContainers.indexOf(checkbox), 1);
      });


      let allFilled = true;

      // check if all inputs other than radio buttons and checkboxes have user input
      requiredContainers.forEach((required) => {
        if (allFilled && !checkInput(required)) {
          allFilled = false;
        }
      });
      if (!allFilled) {
        return false;
      }

      // check if at least one radio button of every required group is selected
      for (let key in radios) {
        let selection = false;
        radios[key].forEach((radio) => {
          if (radio.querySelector("input").checked) {
            selection = true;
          }
        });
        allFilled = selection;
        if (!allFilled) {
          return false;
        }
      }

      // check if at least one checkbox of every required group is selected
      for (let key in checkboxes) {
        let selection = false;
        checkboxes[key].forEach((checkbox) => {
          if (checkbox.querySelector("input").checked) {
            selection = true;
          }
        });
        allFilled = selection;
        if (!allFilled) {
          return false;
        }
      }
      return true;
    }

    /**
     * This function checks all inputs if they have user input
     * @param inputContainer DOM Element of the surrounding style container of the particular input element
     * @returns Boolean whether input has user input or not
     */
    function checkInput(inputContainer) {
      if (inputContainer.classList.contains("time-input-container")) {
        let timeInput = getTimepickerObject(inputContainer);
        return timeInput.hasUserInput;
      }
      if (inputContainer.classList.contains("date-picker-container")) {
        let dateInput = getDatepickerObject(inputContainer);
        return dateInput.hasUserInput;
      }
      if (inputContainer.classList.contains("select-input-container")) {
        let select = getSelectObject(inputContainer);
        return select.hasUserInput;
      }
      let input = getInputObject(inputContainer);
      return input.hasUserInput;
    }

    /**
     * This functions cleans objects out of arrays where the corresponding dom element has already been removed
     */
    function cleanInputArrays() {
      inputs = inputs.filter(Boolean);
      selects = selects.filter(Boolean);
      timePickers = timePickers.filter(Boolean);
      datePickers = datePickers.filter(Boolean);
    }

    /**
     * This functions retrieves the user input of all input elements of a given DOM (container) element (does not necessarily need to be a form element)
     * @param form DOM element containing input elements (containers actually)
     * @return values Object that contains all user input in the following way:
     *          values = {
     *              nameAttributeOfInput1: userInputOfInput1,
     *              nameAttributeOfInput2: userInputOfInput2,
     *              ...
     *          }
     *          NOTICE: Every value is a string except if the corresponding input elements are checkboxes with the same name attribute. Than the (selected) values are stored in an array
     */
    function getUserInput(form) {

      // define some variables
      let values = {};
      let inputContainers = form.querySelectorAll(".input-container");
      inputContainers = Array.apply(null, inputContainers)
      let radios = {};
      let radioButtons = form.querySelectorAll(".radio-input-container");
      let checkboxes = {};
      let checkBoxes = form.querySelectorAll(".checkbox-input-container");

      // group radio buttons according to name attribute
      radioButtons.forEach((radioButton) => {
        let name = radioButton.querySelector("input").getAttribute("name").trim();
        if (name in radios) {
          if (!radios[name].includes(radioButton)) {
            radios[name].push(radioButton);
          }
        } else {
          radios[name] = [radioButton];
        }
        inputContainers.splice(inputContainers.indexOf(radioButton), 1);
      });

      // group checkboxes according to name attribute
      checkBoxes.forEach((checkbox) => {
        let name = checkbox.querySelector("input").getAttribute("name").trim();
        if (name in checkboxes) {
          if (!checkboxes[name].includes(checkbox)) {
            checkboxes[name].push(checkbox);
          }
        } else {
          checkboxes[name] = [checkbox];
        }
        inputContainers.splice(inputContainers.indexOf(checkbox), 1);
      });

      // retrieve input of every input element other than radio buttons or checkboxes
      inputContainers.forEach((inputContainer) => {
        let name = "";
        if (inputContainer.classList.contains("select-input-container")) {
          name = inputContainer.querySelector("span.select-input").getAttribute("data-name");
        } else if (inputContainer.nodeName === "TEXTAREA") {
          name = inputContainer.getAttribute("name");
        } else {
          name = inputContainer.querySelector("input").getAttribute("name");
        }
        if (!name) {
          return undefined;
        }
        let value = getInput(inputContainer);
        values[name] = value;
      });

      // retrieve selected radio button of every group of radio buttons
      for (let name in radios) {
        radios[name].forEach((radio) => {
          if (radio.querySelector("input").checked) {
            values[name] = radio.querySelector("input").getAttribute("value");
          }
        });
      }

      // retrieve all selected checkboxes of every group of checkboxes
      for (let name in checkboxes) {
        checkboxes[name].forEach((checkbox) => {
          let value = checkbox.querySelector("input").getAttribute("value");
          if (checkbox.querySelector("input").checked) {
            if (name in values) {
              values[name].push(value);
            } else {
              values[name] = [value]
            }
          }
        });
      }
      return values;
    }

    /**
     * This function gets the input of any given input (container) except radio buttons and checkboxes (including switches)
     * @param inputContainer DOM Element of the surrounding style container of the particular input element
     * @returns String that contains the user input
     *          Time format: "hh:mm"
     *          Date format: "yyyy-mm-dd"
     *          Select format: "selectedOption"
     *          Text input: "Text"
     */
    function getInput(inputContainer) {
      if (inputContainer.classList.contains("radio-input-container") || inputContainer.classList.contains("checkbox-input-container")) {
        return undefined;
      }
      if (inputContainer.classList.contains("time-input-container")) {
        let timeInput = getTimepickerObject(inputContainer);
        return timeInput.hour + ":" + timeInput.minute;
      }
      if (inputContainer.classList.contains("date-input-container")) {
        let dateInput = getDatepickerObject(inputContainer);
        return dateInput.year + "-" + dateInput.month + "-" + dateInput.day;
      }
      if (inputContainer.classList.contains("select-input-container")) {
        let select = getSelectObject(inputContainer);
        return select.selected;
      }
      if (inputContainer.nodeName === "TEXTAREA") {
        return inputContainer.value;
      }
      return inputContainer.querySelector("input").value;
    }

    /**
     * This functions determines which radio button has been selected and returns the value attribute content of it
     * @param radioInputContainers Array of DOM radio input container elements (logically they should relate to each other)
     * @return String: content of value attribute of selected radio button
     */
    function getSelectedRadioButton(radioInputContainers) {
      let selected = undefined;
      radioInputContainers.forEach((radioInputContainer) => {
        if (radioInputContainer.querySelector("input").checked) {
          selected = radioInputContainer.querySelector("input").getAttribute("value");
        }
      });
      return selected;
    }

    /**
     * This functions determines which checkboxes have been selected and returns the value attribute content of all of the selected ones
     * @param checkboxContainers Array of DOM checkbox input container elements (logically they should relate to each other)
     * @return Array of Strings: content of value attributes of selected checkboxes
     */
    function getCheckedCheckboxes(checkboxContainers) {
      let selections = [];
      checkboxContainers.forEach((checkboxContainer) => {
        if (checkboxContainer.querySelector("input").checked) {
          selections.push(checkboxContainer.querySelector("input").getAttribute("value"));
        }
      });
      return selections;
    }

    let main = document.querySelector("main");
    window.setTimeout(function () {
      console.log(getUserInput(main));
    }, 2000);


    /*
      END MISCELLANEOUS
     */





    /*************************************************************************
     *
     *
     *
     *
     *    NEEDS TO BE REVISED (PROBABLY SHIFT TO FORM MODULE)
     *
     *
     *
     *

    function checkInputs(form) {
      // TODO: radio buttons and checkboxes
      let inputs = form.getElementsByTagName("input");
      let customInputs = form.getElementsByClassName("input");
      inputs = Array.prototype.slice.call(inputs);
      customInputs = Array.prototype.slice.call(customInputs);
      let allInputsFilled = true;
      inputs.forEach(function (item) {
        if (!item.disabled) {
          if (!item.value) {
            allInputsFilled = false;
          }
        }
      });
      customInputs.forEach(function (item) {
        if (item.classList.contains("placeholder")) {
          allInputsFilled = false;
        }
      });
      if (!allInputsFilled) {
        alert("Bitte alle Inputs ausfüllen.");
      }
      return allInputsFilled;
    }

    function checkAgeRange(form) {

      let startAge = Number(form.getElementsByClassName("from-age")[0].getElementsByClassName("chosen")[0].innerHTML);
      let endAge = Number(form.getElementsByClassName("to-age")[0].getElementsByClassName("chosen")[0].innerHTML);

      if (isNaN(startAge) || isNaN(endAge)) {
        //TODO: insert tooltip
        alert("Bitte jeweils ein Alter auswählen.");
        return false;
      } else if (!isNaN(startAge) && !isNaN(endAge) && startAge >= endAge) {
        alert("Das erste Alter muss natürlich kleiner als das zweite Alter sein.");
        return false;
      } else {
        return true;
      }
    }

    let MemberInput = function (form, name = undefined) {
      let This = this;
      this.parentForm = form;
      let memberRow = this.parentForm.getElementsByClassName("member-row")[0];
      let addMemberBtn = this.parentForm.getElementsByClassName("add-member")[0];
      this.memberInputContainer = createMemberInput(memberRow, name);
      memberRow.insertBefore(this.memberInputContainer, addMemberBtn);
      if (this.parentForm.getElementsByClassName("member-container").length > 4) {
        addMemberBtn.style.display = "none";
      }
      this.memberInputContainer.getElementsByClassName("delete-member")[0].addEventListener("click", function () {
        This.removeContainer(This.memberInputContainer);
        if (This.parentForm.getElementsByClassName("member-container").length <= 4) {
          addMemberBtn.style.display = "block";
        }
      });

      this.remove = function () {
        this.memberInputContainer.remove();
      }
    };

    MemberInput.prototype.removeContainer = function (container) {
      container.remove();
    };

    function createMemberInput(memberRow, name = undefined) {
      let container = document.createElement("DIV");
      container.classList.add("clearfix", "member-container");
      let selectMemberInput = new Select(["member-input", "select-input-container", "input-container"], "Mitglied", ["Marcus", "Markus", "Florian", "Marckus"], "Mitglieder");
      if (name) {
        selectMemberInput.selectOption(name);
      }
      let deleteBtn = document.createElement("A");
      deleteBtn.classList.add("delete-member");
      let deleteIcon = document.createElement("I");
      deleteIcon.classList.add("material-icons");
      deleteIcon.innerHTML = "delete";
      deleteBtn.appendChild(deleteIcon);
      container.appendChild(selectMemberInput.selectElement);
      container.appendChild(deleteBtn);
      return container;
    }

    function removeMemberInput(dataElement) {
      let node = dataElement;
      while (node && !node.classList.contains("member-container")) {
        node = node.parentElement;
      }
      node.remove();
    }

    function removeAllMemberInputs(memberRow) {
      let memberInputs = memberRow.querySelectorAll(".member-container");
      memberInputs.forEach(function (item) {
        item.remove();
      });
    }

    function resetForm(form) {
      let inputContainers = form.querySelectorAll(".input-container");
      inputContainers.forEach(function (item) {
        if (item.classList.contains("select-input-container")) {
          selects.forEach(function (select) {
            if (select.selectElement === item) {
              select.resetSelect();
            }
          });
        }
        if (item.classList.contains("text-input-container") || item.classList.contains("date-input-container") || item.classList.contains("time-input-container")) {
          item.querySelector("input").value = "";
          item.querySelector("input").classList.add("placeholder");
        }
        if (item.classList.contains("radio-input-container")) {
          item.querySelector("input").checked = false;
        }
        if (item.classList.contains("checkbox-input-container")) {
          item.querySelector("input").checked = false;
        }
      });
    }

    *******************************************************************/

    return {
      closeSelectsApi : function(target) {
        if (selects.length > 0) {
          closeSelects(target);
        }
      },
      createSelectApi : function (classNames, name, placeholder, options) {
        return Select.createSelect(classNames, name, placeholder, options);
      },
      getAllSelectsApi : function () {
        return selects;
      },
      createDatePickerApi : function () {
        return DatePicker.createDatePicker();
      },
      createTimePickerApi : function () {
        return TimePicker.createTimePicker();
      },
      returnSelectObjectApi : function (selectInputContainer) {
        return getSelectObject(selectInputContainer);
      },
      createInputApi : function (inputType, containerClass, inputId, name, placeholder, checked, selectOptions, value) {
        return createInputFactory(inputType, containerClass, inputId, placeholder, checked, selectOptions, value);
      },
      checkRequiredInputsApi : function (form) {
        return checkRequiredInputs(form);
      },
      checkInputApi(inputContainer) {
        return checkInput(inputContainer);
      },
      getUserInputApi : function(form) {
        return getUserInput(form);
      },
      getInputApi : function (inputContainer) {
        return getInput(inputContainer);
      },
      getSelectedRadioButton : function (radioInputContainers) {
        return getSelectedRadioButton(radioInputContainers);
      },
      getCheckedCheckboxes : function (checkboxContainers) {
        return getCheckedCheckboxes(checkboxContainers);
      }

    }

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
