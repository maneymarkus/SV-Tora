function init(window, document, undefined) {

  let Module = (function(window, document, undefined) {

    function generateElement(element, classNames = undefined, value = undefined) {
      let el = document.createElement(element);
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
        new TimePicker(t);
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

      this.datePickerElement.addEventListener("click", function (e) {
        let target = e.target;
        if (target.classList.contains("pick")) {
          This.dateInputContainer.querySelector("input").value = This.day + "." + (This.month + 1) + "." + This.year;
          This.dateInputContainer.querySelector("input").classList.add("filled");
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
        new DatePicker(d);
      });
    }

    /*
      END DATEPICKER
     */


    /*
      START SELECT
     */

    let selects = [];

    let Select = function (selectElement) {
      let This = this;
      this.optionsElement = selectElement.querySelector("div.options");
      this.placeholder = selectElement.querySelector("span.placeholder").innerHTML.trim();
      this.selectContainer = selectElement;
      this.selectInput = selectElement.querySelector("span.select-input");
      this.selected = this.selectInput.innerHTML.trim();
      selects.push(this);

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

    Select.createSelect = function(classNames, placeholder, options, dataColumn) {
      let selectContainer = Module.generateElementApi("DIV", classNames);
      let label = Module.generateElementApi("LABEL");
      let labelIcon = Module.generateElementApi("I", ["material-icons"], "list");
      label.appendChild(labelIcon);
      selectContainer.appendChild(label);
      let select = Module.generateElementApi("DIV", ["select"]);
      let valueSpan = Module.generateElementApi("SPAN", ["input", "chosen", "placeholder"], placeholder);
      if (dataColumn) {
        valueSpan.setAttribute("data-column", dataColumn);
      }
      let selectIcon = Module.generateElementApi("I", ["material-icons"], "expand_more");
      let underline = Module.generateElementApi("SPAN", ["underline"]);
      select.appendChild(valueSpan);
      select.appendChild(selectIcon);
      select.appendChild(underline);
      selectContainer.appendChild(select);
      let optionsContainer = Module.generateElementApi("DIV", ["options"]);
      if (options) {
        options.forEach(function (item) {
          let option = Module.generateElementApi("DIV", ["option"], item);
          optionsContainer.appendChild(option);
        });
      }
      selectContainer.appendChild(optionsContainer);
      return new Select(selectContainer);
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
        new Select(s);
      });
    }

    /*
      END SELECT
     */

    /*
      START TEXT INPUT
     */

    if (document.querySelector("span.text-input-container") !== undefined) {
      let textInputElements = document.querySelectorAll("span.text-input-container");
      textInputElements.forEach((t) => {
        t.addEventListener("focusout", function (e) {
          let target = e.target;
          if (target.value) {
            target.classList.add("filled");
          } else {
            target.classList.remove("filled");
          }
        });
      });
    }

    if (document.getElementById("password-label")) {
      let passwordLabel = document.getElementById("password-label");
      let passwordIcon = passwordLabel.getElementsByTagName("i")[0];
      let passwordInput = document.getElementById("password");

      passwordLabel.addEventListener("click", function (e) {
        let ev = e || window.event;
        ev.preventDefault();
        passwordInput.focus();
        if (passwordInput.type == "password") {
          passwordIcon.innerHTML = "lock_open";
          passwordInput.type = "text";
        } else {
          passwordIcon.innerHTML = "lock";
          passwordInput.type = "password";
        }
      });
    }

    /*
      END TEXT INPUT
     */



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

    return {
      checkIfInputsFilledApi : function(form) {
        return checkInputs(form);
      },
      closeSelectsApi : function(target) {
        if (selects.length > 0) {
          closeSelects(target);
        } else {
          return;
        }
      },
      checkAgeApi : function(form) {
        let returnValue;
        if (form.getElementsByClassName("from-age")[0]) {
          returnValue = checkAgeRange(form);
        } else {
          returnValue = true;
        }
        return returnValue;
      },
      createSelectApi : function (classNames, placeholder, options, dataColumn) {
        return Select.createSelect(classNames, placeholder, options, dataColumn);
      },
      createMemberInputApi : function (form, name) {
        new MemberInput(form, name);
      },
      removeMemberInputApi : function (dataElement) {
        removeMemberInput(dataElement);
      },
      removeAllMemberInputsApi : function (memberRow) {
        removeAllMemberInputs(memberRow);
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
      resetFormApi : function (form) {
        resetForm(form);
      }
    }

  })(window, document);

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
