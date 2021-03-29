function init(window, document, undefined) {

    /*

        DECLARATIONS (General Code, Usable Tools, APIs, etc.)

     */

    let globalVariables = {
        graduationsList : ["9.Kyu", "8.Kyu", "7.Kyu", "6.Kyu", "5.Kyu", "4.Kyu", "3.Kyu", "2.Kyu", "1.Kyu", "1.Dan", "2.Dan", "3.Dan", "4.Dan", "5.Dan", "6.Dan"],
    };

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




    let HeaderModule = (function(window, document, undefined) {

        let header = document.getElementsByClassName("header")[0];
        let nav = document.getElementsByClassName("nav")[0];
        let userMenu = header.getElementsByClassName("user-menu")[0];
        let menuBtn = header.getElementsByClassName("menu")[0];
        let userBtn = header.getElementsByClassName("user")[0];

        menuBtn.addEventListener("click", function () {
            nav.classList.add("open");
        });

        userBtn.addEventListener("click", function () {
            userMenu.classList.toggle("open");
        });

        function closeHeader(target) {
            let t = target;
            if (t && t.nodeName !== "HEADER") {
                while (t && t.nodeName !== "HEADER") {
                    t = t.parentNode;
                }
            }
            if (!t || t.nodeName === "BODY") {
                userMenu.classList.remove("open");
            }
        }

        return {
            closeHeaderApi : function (target) {
                closeHeader(target);
            }
        }

    })(window, document);




    let NavModule = (function(window, document, undefined) {

        let nav = document.getElementsByClassName("nav")[0];
        let closeBtn = nav.getElementsByClassName("close")[0];

        closeBtn.addEventListener("click", function () {
            nav.classList.remove("open");
        });

        function closeNav(target) {
            let t = target;
            if (t && t.nodeName !== "NAV" && t.nodeName !== "BODY" && !t.classList.contains("menu")) {
                while (t && t.nodeName !== "NAV" && t.nodeName !== "BODY" && !t.classList.contains("menu")) {
                    t = t.parentNode;
                }
            }
            if (!t || t.nodeName === "BODY") {
                nav.classList.remove("open");
            }
        }

        return {
            closeNavApi : function (target) {
                closeNav(target);
            }
        }

    })(window, document);




    let InputsModule = (function(window, document, undefined) {

        let TimePicker = function(boundElement) {
            let This = this;
            this.timePickerElement = this.createPicker();
            this.boundElement = boundElement;
            this.hour = new Date().getHours();
            this.minute = new Date().getMinutes();
            this.hourElement = this.timePickerElement.querySelector("span.hour");
            this.minuteElement = this.timePickerElement.querySelector("span.minute");

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
                if (pos > 1 || pos === 0) {
                    clockhand.classList.add("short");
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
                if (This.timePickerElement.querySelector(".clock .chosen")) {
                    let chosen = This.timePickerElement.querySelector(".clock .chosen");
                    This.positionClockHand(chosen.innerHTML);
                }
            });

            this.timePickerElement.querySelector(".clock").addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
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
                        This.hourElement.style.fontWeight = "normal";
                        This.minuteElement.style.fontWeight = "bold";
                    } else {
                        This.setMinute(target.innerHTML);
                    }
                }
            });

            this.boundElement.addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                This.timePickerElement.classList.add("show");
                This.updateClock(This.hour, This.minute);
                This.hourElement.style.fontWeight = "bold";
                This.minuteElement.style.fontWeight = "normal";
            });

            this.timePickerElement.querySelector(".pick").addEventListener("click", function () {
                if (This.timePickerElement.querySelector(".minutes.active")) {
                    This.timePickerElement.querySelector(".minutes.active").classList.remove("active");
                    This.timePickerElement.querySelector(".hours").classList.add("active");
                    This.boundElement.querySelector("input").value = This.hourElement.innerHTML + " : " + This.minuteElement.innerHTML;
                    This.hide();
                }
            });

            this.timePickerElement.querySelector(".cancel").addEventListener("click", function () {
                if (This.timePickerElement.querySelector(".minutes.active")) {
                    This.timePickerElement.querySelector(".minutes.active").classList.remove("active");
                    This.timePickerElement.querySelector(".hours").classList.add("active");
                }
                This.hide();
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

        TimePicker.prototype.createPicker = function () {
            let timePickerContainer = Module.generateElementApi("DIV", ["timepicker-container"]);
            let timePicker = Module.generateElementApi("DIV", ["timepicker"]);
            let header = Module.generateElementApi("DIV", ["header"]);
            let hourSpan = Module.generateElementApi("SPAN", ["hour"]);
            header.appendChild(hourSpan);
            let dividerSpan = Module.generateElementApi("SPAN", [], ":");
            header.appendChild(dividerSpan);
            let minuteSpan = Module.generateElementApi("SPAN", ["minute"]);
            header.appendChild(minuteSpan);
            timePicker.appendChild(header);
            let clock = Module.generateElementApi("DIV", ["clock"]);
            let hourClockFace = Module.generateElementApi("DIV", ["clockface", "hours", "active"]);
            let clockhand = Module.generateElementApi("DIV", ["clockhand"]);
            hourClockFace.appendChild(clockhand);
            for (let i = 0; i < 24; i++) {
                let value = i;
                let classNames = ["hour"];
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
                let classNames = ["minute" + value];
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

        let days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
        let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

        let DatePicker = function(boundElement) {
            let This = this;
            this.datePickerElement = this.createPicker();
            this.boundElement = boundElement;
            this.day = new Date().getDate();
            this.month = new Date().getMonth();
            this.year = new Date().getFullYear();
            this.previousMonth = this.datePickerElement.querySelector(".header .previous-month");
            this.nextMonth = this.datePickerElement.querySelector(".header .next-month");
            this.monthElement = this.datePickerElement.querySelector(".header .month");
            this.yearElement = this.datePickerElement.querySelector(".header .year");

            this.datePickerElement.querySelector(".pick").addEventListener("click", function () {
                This.boundElement.querySelector("input").value = This.day + "." + (This.month + 1) + "." + This.year;
                This.hide();
            });

            this.datePickerElement.querySelector(".cancel").addEventListener("click", function () {
                This.hide();
            });

            this.datePickerElement.querySelector("table").addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                if (target && target.classList.contains("selectable")) {
                    if (This.datePickerElement.querySelector(".selected")) {
                        This.datePickerElement.querySelector(".selected").classList.remove("selected")
                    }
                    target.classList.add("selected");
                    This.day = target.innerHTML;
                }
            });

            this.previousMonth.addEventListener("click", function () {
                if (This.month === 0) {
                    This.updateCalender(11, This.year - 1);
                } else {
                    This.updateCalender(This.month - 1, This.year);
                }
            });

            this.nextMonth.addEventListener("click", function () {
                if (This.month === 11) {
                    This.updateCalender(0, This.year + 1);
                } else {
                    This.updateCalender(This.month + 1, This.year);
                }
            });

            this.boundElement.addEventListener("click", function (e) {
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

        DatePicker.prototype.createPicker = function () {
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

        let selects = [];

        let Select = function (classNames, placeholder, options = undefined, dataColumn = undefined) {
            let This = this;
            this.options = options;
            this.placeholder = placeholder;
            this.selectElement = this.createSelect(classNames, placeholder, options, dataColumn);
            this.select = this.selectElement.querySelector("span.input");
            this.selected = this.select.innerHTML;
            selects.push(this);

            this.selectElement.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                if (target && !target.classList.contains("select-input-container") && !target.classList.contains("option")) {
                    while (target && !target.classList.contains("select-input-container") && !target.classList.contains("option")) {
                        target = target.parentNode;
                    }
                }
                if (target && target.classList.contains("select-input-container")) {
                    if (This.selectElement.querySelector("div.options").classList.contains("show")) {
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
                this.select.innerHTML = this.placeholder;
                this.select.classList.add("placeholder");
            };

            this.selectOption = function (selectedOption) {
                this.select.innerHTML = selectedOption;
                this.select.classList.remove("placeholder");
                this.selected = this.select.innerHTML;
            };

            this.show = function () {
                let optionsContainer = this.selectElement.querySelector("div.options");
                optionsContainer.style.display = "block";
                let optionHeight = this.getOptionHeight(this.selectElement);
                let height;
                if (this.options?.length > 5) {
                    height = 5 * optionHeight;
                } else {
                    height = this.options?.length * optionHeight;
                }
                optionsContainer.classList.add("show");
                optionsContainer.style.height = height + "px";
            };

            this.hide = function () {
                let optionsContainer = this.selectElement.querySelector("div.options");
                optionsContainer.classList.remove("show");
                optionsContainer.style.height = "0";
                window.setTimeout(function () {
                    optionsContainer.style.display = "none";
                }, 500);
            };

            this.updateOptions = function (newOptions) {
                this.options = newOptions;
                this.addOptions(this.selectElement.querySelector("div.options"), newOptions);
            }

        };

        Select.prototype.createSelect = function (classNames, placeholder, options, dataColumn) {
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
                this.addOptions(optionsContainer, options);
            }
            selectContainer.appendChild(optionsContainer);
            return selectContainer;
        };

        Select.prototype.addOptions = function (optionsContainer, options) {
            optionsContainer.innerHTML = "";
            options.forEach(function (item) {
                let option = Module.generateElementApi("DIV", ["option"], item);
                optionsContainer.appendChild(option);
            });
        };

        Select.prototype.getOptionHeight = function (selectContainer) {
            let option = selectContainer.querySelector("div.options div.option");
            return option.offsetHeight;
        };

        function closeSelects(target) {
            while (target && target.nodeName !== "BODY" && !target.classList.contains("select-input-container")) {
                target = target.parentNode;
            }
            selects.forEach(function (item) {
                if (item.selectElement !== target) {
                    item.hide();
                }
            });
        }

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
                return new Select(classNames, placeholder, options, dataColumn);
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
            createDatePickerApi : function (boundElement) {
                return new DatePicker(boundElement);
            },
            createTimePickerApi : function (boundElement) {
                return new TimePicker(boundElement);
            },
            resetFormApi : function (form) {
                resetForm(form);
            }
        }

    })(window, document);




    let ModalModule = (function(window, document, undefined) {

        function closeModalWindow(overlay, modalWindow) {
            overlay.classList.remove("show");
            modalWindow.classList.remove("show");
            if (modalWindow.querySelector("form")) {
                InputsModule.resetFormApi(modalWindow.querySelector("form"));
            }
        }

        function showModalWindow(overlay, modalWindow) {
            if (overlay) {
                overlay.classList.add("show");
            }
            modalWindow.classList.add("show");
        }

        function setTopic(modalWindow, header) {
            modalWindow.getElementsByClassName("topic")[0].innerHTML = header;
        }

        function setDeleteName(modalWindow, name) {
            modalWindow.querySelector(".info .name").innerHTML = name;
        }

        return {
            openModalWindowApi : function(overlay = undefined, modalWindow) {
                showModalWindow(overlay, modalWindow);
            },
            closeModalWindowApi : function(overlay = undefined, modalWindow) {
                closeModalWindow(overlay, modalWindow);
            },
            setTopicApi : function (modalWindow, header) {
                setTopic(modalWindow, header);
            },
            setDeleteNameApi : function (modalWindow, name) {
                setDeleteName(modalWindow, name)
            },
        }

    })(window, document);




    let AccordionModule = (function(window, document, undefined) {

        let accordions = [];

        let Accordion = function(accordion) {
            let This = this;
            this.accordionContainer = accordion;
            this.accordionHeaders = this.accordionContainer.querySelectorAll(".accordion-header");
            accordions.push(this);
            this.accordionHeaders.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    handleBarClick(This, item, e);
                });
            });

            this.addAccordionBar = function (nextBarSibling, categoryName, graduation, ageRange, sex, content) {
                let newBar = Module.generateElementApi("DIV", ["accordion-bar", "clearfix"]);
                let newHeader = Module.generateElementApi("DIV", ["accordion-header", "clearfix"]);
                let barIcon = Module.generateElementApi("I", ["material-icons", "open-indicator"], "keyboard_arrow_down");
                newHeader.appendChild(barIcon);
                let categoryHeader = Module.generateElementApi("H4", ["category"], "Kategorie: ");
                let categoryNameSpan = Module.generateElementApi("SPAN", ["category-name"], categoryName);
                categoryHeader.appendChild(categoryNameSpan);
                newHeader.appendChild(categoryHeader);
                let categoryProperties = Module.generateElementApi("H4", ["category-properties"]);
                let graduationSpan = Module.generateElementApi("SPAN", ["category-graduation"], graduation);
                categoryProperties.appendChild(graduationSpan);
                categoryProperties.appendChild(document.createTextNode(" / "));
                let ageSpan = Module.generateElementApi("SPAN", ["category-age"], ageRange);
                categoryProperties.appendChild(ageSpan);
                categoryProperties.appendChild(document.createTextNode(" / "));
                let sexSpan = Module.generateElementApi("SPAN", ["category-sex"], sex);
                categoryProperties.appendChild(sexSpan);
                categoryProperties.appendChild(document.createTextNode(" / "));
                newHeader.appendChild(categoryProperties);
                let tools = Module.generateElementApi("DIV", ["tools"]);
                let print = Module.generateElementApi("A", ["print"]);
                print.appendChild(Module.generateElementApi("I", ["material-icons"], "print"));
                tools.appendChild(print);
                let edit = Module.generateElementApi("A", ["edit"]);
                edit.appendChild(Module.generateElementApi("I", ["material-icons"], "create"));
                tools.appendChild(edit);
                let split = Module.generateElementApi("A", ["split"]);
                split.appendChild(Module.generateElementApi("I", ["material-icons"], "call_split"));
                tools.appendChild(split);
                let merge = Module.generateElementApi("A", ["merge"]);
                merge.appendChild(Module.generateElementApi("I", ["material-icons"], "merge_type"));
                tools.appendChild(merge);
                newHeader.appendChild(tools);
                newBar.appendChild(newHeader);
                let newContent = Module.generateElementApi("DIV", ["accordion-content"]);
                newContent.appendChild(content);
                newBar.appendChild(newContent);
                This.accordionContainer.insertBefore(newBar, nextBarSibling);
                newHeader.addEventListener("click", function (e) {
                    handleBarClick(This, this, e);
                });
            }
        };

        function handleBarClick (This, item, e) {
            let ev = e || window.event;
            let target = ev.target || window.target;
            ev.preventDefault();
            while (target && target.nodeName !== "BODY" && !target.classList.contains("tools")) {
                target = target.parentNode;
            }
            if (target.classList.contains("tools")) {
                return;
            }
            let condition = item.parentElement.classList.contains("open");
            if (!condition) {
                This.hideAllExcept(This, item.parentElement);
                This.show(item.parentElement);
                document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
            } else {
                This.hide(item.parentElement);
                document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");
            }
        }

        function deleteCategoryBar (accordion, accordionBar) {
            accordionBar.remove();
        }

        function insertNewCategoryBar (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
            accordions.forEach(function (item) {
                if (item.accordionContainer === accordion) {
                    item.addAccordionBar(nextBarSibling, categoryName, graduation, ageRange, sex, content);
                }
            });
        }

        Accordion.prototype.show = function (accordionBar) {
            accordionBar.classList.add("open");
            let content = accordionBar.querySelector("div.accordion-content");
            let getHeight = function () {
                content.style.display = "block";
                return content.scrollHeight;
            };
            content.style.height = getHeight() + "px";
        };

        Accordion.prototype.hide = function (accordionBar) {
            accordionBar.classList.remove("open");
            let content = accordionBar.querySelector("div.accordion-content");
            content.style.height = "0";

            window.setTimeout(function () {
                content.style.display = "none";
            },500);
        };

        Accordion.prototype.hideAllExcept = function(accordion, accordionBar) {
            let openBars = document.querySelectorAll(".open");
            openBars.forEach(function (item) {
                if (item !== accordionBar) {
                    item.classList.remove("open");
                    accordion.hide(item);
                }
            });
        };

        function getOpenBar() {
            let openBar = document.querySelector("div.accordion-bar.open");
            return openBar;
        }

        return {
            createAccordionApi : function (accordionElement) {
                return new Accordion(accordionElement);
            },
            getOpenBarApi : function () {
                return getOpenBar();
            },
            insertNewCategoryBarApi : function (accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content) {
                insertNewCategoryBar(accordion, nextBarSibling, categoryName, graduation, ageRange, sex, content);
            },
            deleteCategoryBarApi : function (accordion, accordionBar) {
                deleteCategoryBar(accordion, accordionBar);
            }
        }

    })(window, document);




    let FilterModule = (function(window, document, undefined) {

        let filters = [];
        let filterToChange;

        let Filter = function (column, value, filterModal) {
            let This = this;
            this.filterColumn = column;
            this.filterValue = value;
            this.filterModal = filterModal;
            this.filterElement = this.createFilterElement(column, value);
            filters.push(this);
            this.filterElement.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                while (target && !target.classList.contains("filter-container") && !target.classList.contains("delete")) {
                    target = target.parentNode;
                }
                if (target.classList.contains("delete")) {
                    This.removeFilter(This.filterElement);
                    let index = filters.indexOf(This);
                    filters.splice(index, 1);
                    This = undefined;
                } else if (target.classList.contains("filter-container")) {
                    let selects = InputsModule.getAllSelectsApi();
                    selects.forEach(function (item) {
                        if (item.selectElement.classList.contains("filter-column-input")) {
                            item.selectOption(This.filterColumn);
                            item.options = [];
                        }
                        if (item.selectElement.classList.contains("filter-value-input")) {
                            item.selectOption(This.filterValue);
                        }
                    });
                    ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], This.filterModal);
                    ModalModule.setTopicApi(This.filterModal, "Filter bearbeiten");
                    sessionStorage.setItem("newFilter", "0");
                    filterToChange = This;
                }
            });

        };

        Filter.prototype.createFilterElement = function (column, value) {
            let filterContainer = Module.generateElementApi("SPAN", ["filter-container"]);
            let filterDetails = Module.generateElementApi("SPAN", ["filter-details"]);
            let filterColumn = Module.generateElementApi("SPAN", ["filter-column"], column);
            filterDetails.appendChild(filterColumn);
            filterDetails.appendChild(document.createTextNode(": "));
            let filterValue = Module.generateElementApi("SPAN", ["filter-value"], value);
            filterDetails.appendChild(filterValue);
            filterContainer.appendChild(filterDetails);
            let deleteBtn = Module.generateElementApi("A", ["delete"]);
            let deleteIcon = Module.generateElementApi("I", ["material-icons"], "close");
            deleteBtn.appendChild(deleteIcon);
            filterContainer.appendChild(deleteBtn);
            return filterContainer;
        };

        Filter.prototype.removeFilter = function (filter) {
            filter.remove();
        };

        function changeFilter(newValue) {
            if (filterToChange) {
                filterToChange.filterElement.getElementsByClassName("filter-value")[0].innerHTML = newValue;
                filterToChange.filterValue = newValue;
                filterToChange = undefined;
            }
        }

        return {
            createNewFilterApi : function (column, value, parentEl) {
                return new Filter(column, value, parentEl)
            },
            changeFilterApi : function (newValue) {
                changeFilter(newValue);
            },
            getActiveFilters : function () {
                return filters;
            }
        }

    })(window, document);




    let TablesModule = (function(window, document, undefined) {

        let lastFilters = [];

        function getPossibleFilter(table) {
            let allFilters = {};
            let ths = table.getElementsByClassName("column-header");
            let headers = [];
            for (let i = 0; i < ths.length; i++) {
                let value = ths[i].innerHTML;
                headers.push(value);
                allFilters[value] = [];
            }
            let rows = table.getElementsByTagName("TR");
            for (let i = 1; i < rows.length; i++) {
                let tds = rows[i].getElementsByTagName("TD");
                for (let j = 0; j < (tds.length - 1); j++) {
                    let value = tds[j].innerHTML;
                    if (!allFilters[headers[j]].includes(value)) {
                        allFilters[headers[j]].push(value);
                    }
                }
            }
            return allFilters;
        }

        function applyFilter(table, column, value) {
            let ths = table.getElementsByClassName("column-header");
            let index = 0;
            for (let i = 0; i < ths.length; i++) {
                if (ths[i].innerHTML === column) {
                    index = i;
                }
            }
            let rows = table.getElementsByTagName("TR");
            for (let i = 1; i < rows.length; i++) {
                let row = rows[i];
                let tdValue = row.getElementsByTagName("TD")[index].innerHTML;
                if (tdValue === value) {
                    row.classList.remove("hide");
                }
            }
        }

        function filterTable(table, filters) {
            lastFilters = filters;
            let rows = table.querySelectorAll("table tr");
            rows.forEach(function (item) {
                item.classList.remove("hide");
            });
            if (filters.length > 0) {
                for (let i = 1; i < rows.length; i++) {
                    rows[i].classList.add("hide");
                }
                filters.forEach(function (item) {
                    let column = item.filterColumn;
                    let value = item.filterValue;
                    applyFilter(table, column, value);
                });
            }
        }

        function editRow(table, data) {
            if (rowIndex = sessionStorage.getItem("editRow")) {
                deleteRow(table, rowIndex);
                insertDataIntoTable(table, data, rowIndex);
                filterTable(table, lastFilters);
            }
        }

        function insertDataIntoModalWindow(modalWindow, data) {
            for (let property in data) {
                let dataElements = modalWindow.querySelectorAll("[data-column='" + property + "']");
                switch (property) {
                    case "Name":
                        dataElements[0].value = data[property];
                        break;
                    case "Vorname":
                        dataElements[0].value = data[property];
                        break;
                    case "Alter":
                        if (Array.isArray(data[property])) {
                            dataElements[0].innerHTML = data[property][0];
                            dataElements[1].innerHTML = data[property][1];
                            dataElements[0].classList.remove("placeholder");
                            dataElements[1].classList.remove("placeholder");
                        } else {
                            //TODO: Age of persons
                            dataElements[0].innerHTML = data[property];
                            dataElements[0].classList.remove("placeholder");
                        }
                        break;
                    case "Geschlecht":
                        if (data[property] === "m") {
                            dataElements[0].checked = true;
                        } else {
                            dataElements[1].checked = true;
                        }
                        break;
                    case "Kategorie":
                        dataElements[0].innerHTML = data[property];
                        dataElements[0].classList.remove("placeholder");
                        break;
                    case "Graduierung":
                        let gradArray;
                        if (Array.isArray(data[property])) {
                            gradArray = data[property];
                        } else {
                            gradArray = [data[property]];
                        }
                        for (let i = 0; i < dataElements.length; i++) {
                            dataElements[i].checked = false;
                        }
                        gradArray.forEach(function (item) {
                            for (let i = 0; i < dataElements.length; i++) {
                                if (dataElements[i].value === item) {
                                    dataElements[i].checked = true;
                                }
                            }
                        });
                        break;
                    case "Verein":
                        dataElements[0].innerHTML = data[property];
                        dataElements[0].classList.remove("placeholder");
                        break;
                    case "Teams":
                        dataElements[0].checked = data[property] === "Ja";
                        break;
                    case "Kihon":
                        dataElements[0].checked = data[property] === "Ja";
                        break;
                    case "Mitglieder":
                        if (data[property].length > 0) {
                            data[property].forEach(function (item) {
                                InputsModule.createMemberInputApi(modalWindow.getElementsByTagName("form")[0], item);
                            });
                        }
                        break;
                    case "Anzahl Mitglieder":
                        dataElements[0].value = data[property];
                        break;
                    default:
                        console.log("I wasn't expecting this type of data: " + property);
                }
            }
        }

        function insertDataIntoTable(table, data, rowIndex = undefined) {
            let newRow = document.createElement("TR");
            let columnHeaders = table.getElementsByClassName("column-header");
            let propertyColumnMap = {};
            for (let i = 1; i < columnHeaders.length; i++) {
                propertyColumnMap[i - 1] = columnHeaders[i].innerHTML;
            }
            let firstTd = document.createElement("TD");
            if (rowIndex) {
                firstTd.innerHTML = rowIndex;
            } else {
                firstTd.innerHTML = table.getElementsByTagName("TR").length + "";
            }
            newRow.appendChild(firstTd);
            for (let i = 0; i < columnHeaders.length - 1; i++) {
                let tdElement = document.createElement("TD");
                let dataToInsert = "";
                let label = propertyColumnMap[i];
                let d = data[propertyColumnMap[i]];
                switch (label) {
                    case "Name":
                        dataToInsert = d;
                        break;
                    case "Vorname":
                        dataToInsert = d;
                        break;
                    case "Geschlecht":
                        dataToInsert = d;
                        break;
                    case "Alter":
                        if (Array.isArray(d)) {
                            dataToInsert = d[0] + "-" + d[1];
                        } else {
                            // Todo: Age of persons
                            dataToInsert = d;
                        }
                        break;
                    case "Graduierung":
                        if (d.length > 1) {
                            let gradArray = d;
                            let counter = 0;
                            let lastGrad = gradArray[0];
                            while (gradArray.length !== 0) {
                                let startGrad = gradArray.shift();
                                dataToInsert += startGrad.replace(".", ". ");
                                let nextGrad = gradArray[0];
                                let startIndex = globalVariables.graduationsList.indexOf(startGrad);
                                let nextIndex = globalVariables.graduationsList.indexOf(nextGrad);
                                if ((nextIndex - startIndex) === 1) {
                                    while ((nextIndex - startIndex) === 1) {
                                        startIndex += 1;
                                        lastGrad = gradArray.shift();
                                        nextGrad = gradArray[0];
                                        nextIndex = globalVariables.graduationsList.indexOf(nextGrad);
                                    }
                                    dataToInsert += " - " + lastGrad.replace(".", ". ") + ", ";
                                } else {
                                    dataToInsert += ", " + gradArray.shift().replace(".", ". ") + ", ";
                                }
                            }
                            dataToInsert = dataToInsert.substring(0, dataToInsert.length - 2);
                        } else {
                            dataToInsert = d;
                        }
                        break;
                    case "Kategorie":
                        dataToInsert = d;
                        break;
                    case "Verein":
                        dataToInsert = d;
                        break;
                    case "Teams":
                        dataToInsert = d;
                        break;
                    case "Kihon":
                        dataToInsert = d;
                        break;
                    case "Mitglieder":
                        let members = "";
                        d.forEach(function (item) {
                            members += item + ", ";
                        });
                        members = members.substring(0, members.length - 2);
                        dataToInsert = members;
                        break;
                    case "Anzahl Mitglieder":
                        if (d === "") {
                            dataToInsert = "0";
                        } else {
                            dataToInsert = d;
                        }
                        break;
                    default:
                        console.log("I can't handle this data: " + data[propertyColumnMap[i]]);
                }
                tdElement.innerHTML = dataToInsert;
                newRow.appendChild(tdElement);
            }
            newRow.appendChild(createLastTd());
            if (rowIndex) {
                let afterChild = table.getElementsByTagName("TR")[rowIndex];
                table.getElementsByTagName("TBODY")[0].insertBefore(newRow, afterChild);
            } else {
                table.getElementsByTagName("TBODY")[0].appendChild(newRow);
            }
            filterTable(table, lastFilters);
        }

        function createLastTd() {
            let lastTd = document.createElement("TD");
            let createBtn = createLastTdBtns("create");
            let deleteBtn = createLastTdBtns("delete");
            lastTd.appendChild(createBtn);
            lastTd.appendChild(deleteBtn);
            return lastTd;
        }

        function createLastTdBtns(btnAction) {
            let btn = Module.generateElementApi("A", [btnAction]);
            btn.href = "#";
            let icon = Module.generateElementApi("I", ["material-icons"], btnAction);
            btn.appendChild(icon);
            return btn;
        }

        function extractDataFromRow(table, rowIndex) {
            let row = table.getElementsByTagName("TR")[rowIndex];
            let rowTds = row.getElementsByTagName("TD");
            let columnHeaders = table.getElementsByClassName("column-header");
            let propertyColumnMap = [];
            for (let i = 0; i < columnHeaders.length; i++) {
                propertyColumnMap[i] = columnHeaders[i].innerHTML;
            }
            let properties = {};
            for (let i = 1; i < rowTds.length - 1; i++) {
                let label = propertyColumnMap[i];
                let data = rowTds[i].innerHTML;
                switch (label) {
                    case "Name":
                        properties[label] = data;
                        break;
                    case "Vorname":
                        properties[label] = data;
                        break;
                    case "Alter":
                        //TODO: Age of persons
                        let dividerPattern = /[ ]?-[ ]?/;
                        if (dividerPattern.test(data)) {
                            data = data.replace(/ /g, "");
                            let dividerIndex = data.indexOf("-");
                            let startAge = data.substring(0, dividerIndex);
                            let endAge = data.substring(dividerIndex + 1);
                            properties[label] = [startAge, endAge];
                        } else if (!isNaN(Number(data))) {
                            properties[label] = data;
                        }
                        break;
                    case "Graduierung":
                        let graduations = [];
                        data = data.replace(/ /g, "");
                        let graduationArray = data.split(",");
                        for (let j = 0; j < graduationArray.length; j++) {
                            let gradPart = graduationArray[j];
                            if (gradPart.includes("-")) {
                                let dividerIndex = gradPart.indexOf("-");
                                let startGrad = gradPart.substring(0, dividerIndex);
                                let endGrad = gradPart.substring(dividerIndex + 1);
                                let startGradIndex = globalVariables.graduationsList.indexOf(startGrad);
                                let endGradIndex = globalVariables.graduationsList.indexOf(endGrad);
                                for (let k = startGradIndex; k <= endGradIndex; k++) {
                                    graduations.push(globalVariables.graduationsList[k]);
                                }
                            } else {
                                graduations.push(gradPart);
                            }
                            properties[label] = graduations;
                        }
                        break;
                    case "Teams":
                        properties[label] = data;
                        break;
                    case "Kihon":
                        properties[label] = data;
                        break;
                    case "Geschlecht":
                        properties[label] = data;
                        break;
                    case "Kategorie":
                        properties[label] = data;
                        break;
                    case "Verein":
                        properties[label] = data;
                        break;
                    case "Mitglieder":
                        let members = [];
                        membersStringArray = data.split(", ");
                        membersStringArray.forEach(function (item) {
                            members.push(item);
                        });
                        properties[label] = members;
                        break;
                    case "Anzahl Mitglieder":
                        properties[label] = data;
                        break;
                    default:
                        console.log("Didn't expect that chunk of data: " + data);
                        break;
                }
            }
            return properties;
        }

        function extractDataFromForm(form) {
            let dataElements = form.querySelectorAll("[data-column]");
            let properties = {};
            for (let i = 0; i < dataElements.length; i++) {
                let label = dataElements[i].getAttribute("data-column");
                switch (label) {
                    case "Name":
                        properties[label] = dataElements[i].value;
                        break;
                    case "Vorname":
                        properties[label] = dataElements[i].value;
                        break;
                    case "Geschlecht":
                        properties[label] = "w";
                        if (dataElements[i].value === "m" && dataElements[i].checked) {
                            properties[label] = "m";
                        }
                        break;
                    case "Alter":
                        let ageElements = form.querySelectorAll("[data-column='Alter']");
                        if (ageElements.length > 1) {
                            if (properties[label]) {
                                properties[label].push(dataElements[i].innerText);
                            } else {
                                properties[label] = [dataElements[i].innerText];
                            }
                        } else {
                            // TODO: age of persons
                            properties[label] = dataElements[i].innerText;
                        }
                        break;
                    case "Graduierung":
                        if (dataElements[i].checked) {
                            let value = dataElements[i].value;
                            if (properties[label]) {
                                properties[label].push(value);
                            } else {
                                properties[label] = [value];
                            }
                        }
                        break;
                    case "Kategorie":
                        properties[label] = dataElements[i].innerText;
                        break;
                    case "Verein":
                        properties[label] = dataElements[i].innerText;
                        break;
                    case "Teams":
                        if (dataElements[i].checked) {
                            properties[label] = "Ja";
                        } else {
                            properties[label] = "Nein";
                        }
                        break;
                    case "Kihon":
                        if (dataElements[i].checked) {
                            properties[label] = "Ja";
                        } else {
                            properties[label] = "Nein";
                        }
                        break;
                    case "Mitglieder":
                        if (properties[label]) {
                            properties[label].push(dataElements[i].innerHTML);
                        } else {
                            properties[label] = [dataElements[i].innerHTML];
                        }
                        InputsModule.removeMemberInputApi(dataElements[i]);
                        break;
                    case "Anzahl Mitglieder":
                        properties[label] = dataElements[i].value;
                        break;
                    default:
                        console.log("I don't know what to do with this: " + label);
                }
            }
            return properties;
        }

        function getSortParams(table, target) {
            let firstRow = table.getElementsByTagName("tr")[0];
            let firstRowCells = firstRow.getElementsByTagName("th");
            let ascending = true;
            if (target.classList.contains("ascending")) {
                ascending = false;
                target.classList.remove("ascending");
                target.classList.add("descending");
            } else {
                target.classList.remove("descending");
                target.classList.add("ascending");
            }
            let t = target;
            while (t && t.nodeName !== "TH") {
                t = t.parentNode;
            }
            let columnIndex = 0;
            for (let i = 0; i < (firstRowCells.length - 1); i++) {
                if (t === firstRowCells[i]) {
                    columnIndex = i;
                    continue;
                }
                let sort;
                if (sort = firstRowCells[i].getElementsByClassName("sort")[0]) {
                    sort.classList.remove("ascending");
                    sort.classList.remove("descending");
                }
            }
            sortTable(table, columnIndex, ascending);
        }

        function sortTable(table, column, ascending) {
            let rows, switching, i, x, y, shouldSwitch;
            switching = true;
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[column].innerHTML;
                    y = rows[i + 1].getElementsByTagName("TD")[column].innerHTML;
                    if (!isNaN(Number(x))) {
                        x = Number(x);
                        y = Number(y);
                    } else {
                        x = x.toLowerCase();
                        y = y.toLowerCase();
                    }
                    if (ascending) {
                        if (x > y) { //ascending
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (x < y) { //descending
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }

        function deleteRow(table, rowIndex) {
            if (table.getElementsByTagName("tr")[rowIndex]) {
                table.getElementsByTagName("tr")[rowIndex].remove();
            }
        }

        function renumberRows(table) {
            let trs = table.getElementsByTagName("tr");
            for (let i = 1; i <= trs.length; i++) { // skip first Row (which contains headings)
                if (trs[i]) {
                    trs[i].getElementsByTagName("td")[0].innerHTML = "" + i;
                }
            }
        }

        return {
            getFilterApi : function (table) {
                return getPossibleFilter(table);
            },
            filterTableApi : function (table, filters) {
                filterTable(table, filters);
            },
            editRowApi : function (table, data) {
                editRow(table, data);
            },
            insertDataIntoModalWindowApi : function (modalWindow, data) {
                insertDataIntoModalWindow(modalWindow, data);
            },
            insertDataIntoTableApi : function (table, data, rowIndex = undefined) {
                insertDataIntoTable(table, data, rowIndex);
            },
            extractDataFromRowApi : function (table, rowIndex) {
                return extractDataFromRow(table, rowIndex);
            },
            extractDataFromFormApi : function (form) {
                return extractDataFromForm(form);
            },
            sortTableApi : function (table, target) {
                getSortParams(table, target);
            },
            deleteRowApi : function (table, rowIndex) {
                deleteRow(table, rowIndex);
            },
            renumberRowsApi : function (table) {
                renumberRows(table);
            }
        }

    })(window, document);




    let CarouselModule = (function(window, document, undefined) {

        let Carousel = function (carouselElement) {
            let This = this;
            this.carouselContainer = carouselElement;
            this.pageElements = this.carouselContainer.getElementsByClassName("page");
            this.controlLeft = this.carouselContainer.getElementsByClassName("left")[0];
            this.controlRight = this.carouselContainer.getElementsByClassName("right")[0];

            this.controlLeft.addEventListener("click", function () {
                This.switchPages("left");
            });

            this.controlRight.addEventListener("click", function () {
                This.switchPages("right");
            });

            this.carouselContainer.addEventListener("wheel", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                ev.preventDefault();
                if (ev.deltaY > 0) {
                    This.switchPages("left");
                } else {
                    This.switchPages("right");
                }
            });

            this.switchPages = function (direction) {
                for (let i = 1; i <= 5; i++) {
                    let page = This.carouselContainer.getElementsByClassName("page" + i)[0];
                    page.classList.remove("page" + i);
                    if (direction === "right") {
                        if (page.nextElementSibling) {
                            page.nextElementSibling.classList.add("page" + i);
                        } else {
                            This.carouselContainer.getElementsByClassName("page")[0].classList.add("page" + i);
                        }
                    } else {
                        if (page.previousElementSibling) {
                            page.previousElementSibling.classList.add("page" + i);
                        } else {
                            This.carouselContainer.getElementsByClassName("page")[(This.pageElements.length - 1)].classList.add("page" + i);
                        }
                    }
                }
            }

        };

        return {
            createCarouselApi : function (carouselElement) {
                return new Carousel(carouselElement);
            }
        }

    })(window, document);




    let MailModule = (function(window, document, undefined) {

        let clubBtns = [];

        function createClubCheckboxes(clubs) {
            let checkBoxes = [];
            let chosenClubs = [];
            clubBtns.forEach(function (item) {
                chosenClubs.push(item.name);
            });
            clubs.forEach(function (item) {
                let checked = false;
                if (chosenClubs.includes(item)) {
                    checked = true;
                }
                let clubCheckbox = createClubCheckbox(item, checked);
                checkBoxes.push(clubCheckbox);
            });
            return checkBoxes;
        }

        function createClubCheckbox(name, checked = false) {
            let checkboxContainer = document.createElement("LABEL");
            checkboxContainer.classList.add("checkbox-input-container");
            checkboxContainer.innerHTML = name;
            let input = document.createElement("INPUT");
            input.type = "checkbox";
            input.value = name;
            input.checked = checked;
            checkboxContainer.appendChild(input);
            let checkmark = document.createElement("SPAN");
            checkmark.classList.add("checkmark");
            checkboxContainer.appendChild(checkmark);
            return checkboxContainer;
        }

        let ClubButton = function (clubName) {
            let This = this;
            this.name = clubName;
            this.clubBtn = this.createBtn(clubName);
            clubBtns.push(this);
            document.getElementsByClassName("chosen-clubs")[0].appendChild(this.clubBtn);
            let removeBtn = this.clubBtn.getElementsByClassName("delete")[0];
            removeBtn.addEventListener("click", function () {
                This.removeBtn(This);
                let index = clubBtns.indexOf(This);
                clubBtns.splice(index, 1);
            });
        };

        ClubButton.prototype.createBtn = function (clubName) {
            let clubContainer = Module.generateElementApi("SPAN", ["club-container"]);
            let nameSpan = Module.generateElementApi("SPAN", ["club-name"], clubName);
            clubContainer.appendChild(nameSpan);
            let deleteBtn = Module.generateElementApi("A", ["delete"]);
            let deleteIcon = Module.generateElementApi("I", ["material-icons"], "close");
            deleteBtn.appendChild(deleteIcon);
            clubContainer.appendChild(deleteBtn);
            return clubContainer;
        };

        ClubButton.prototype.removeBtn = function (clubButton) {
            clubButton.clubBtn.remove();
        };

        function removeClubButtons() {
            clubBtns.forEach(function (item) {
                item.removeBtn(item);
            });
            clubBtns = [];
        }

        return {
            createClubCheckBoxesApi : function (clubs) {
                return createClubCheckboxes(clubs);
            },
            createClubButtonApi : function (clubName) {
                return new ClubButton(clubName);
            },
            removeClubButtonsApi : function () {
                removeClubButtons();
            }
        }

    })(window, document);









    /*

        Interactive Code

     */

    let GeneralModule = (function(window, document, undefined) {

        /*
            Handle Clicks
         */

        document.addEventListener("click", function (e) {
            let ev = e || window.event;
            let target = ev.target || window.target;

            HeaderModule.closeHeaderApi(target);
            NavModule.closeNavApi(target);
            InputsModule.closeSelectsApi(target);
        });

        /*
            Create Accordions
         */

        if (document.getElementsByClassName("accordion")[0]) {
            let accordionContainers = document.getElementsByClassName("accordion");
            accordionContainers = Array.prototype.slice.call(accordionContainers);

            accordionContainers.forEach(function (item) {
                AccordionModule.createAccordionApi(item);
            });

        }

        /*
            Handle ModalWindows
         */

        if (document.getElementsByClassName("modal-window")[0]) {
            let modalWindows = document.getElementsByClassName("modal-window");
            modalWindows = Array.prototype.slice.call(modalWindows);

            modalWindows.forEach(function (item) {
                let closeBtn;
                if (closeBtn = item.getElementsByClassName("close")[0]) {
                    closeBtn.addEventListener("click", function () {
                        if (item.getElementsByClassName("member-row")[0]) {
                            window.setTimeout(function () {
                                InputsModule.removeAllMemberInputsApi(item.getElementsByClassName("member-row")[0]);
                            },500);
                        }
                        ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], item);
                    });
                }
            });
        }

        /*
            Handle Forms
         */

        if (document.getElementsByTagName("form")[0]) {

            let forms = document.getElementsByTagName("form");
            forms = Array.prototype.slice.call(forms);

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

            forms.forEach(function (item) {

                item.addEventListener("focusout", function (e) {
                    let ev = e || window.event;
                    let target = ev.target || window.target;
                    if (target.value) {
                        target.classList.add("filled");
                    } else {
                        target.classList.remove("filled");
                    }
                });

                item.addEventListener("keydown", function (e) {
                    let ev = e || window.event;
                    let keyNum = ev.keyCode || ev.which;
                    if (keyNum == 13) { // key for enter
                        if (!InputsModule.checkIfInputsFilledApi(item)) {
                            ev.preventDefault();
                        }
                    }
                });

                if (item.getElementsByClassName("add-member")[0]) {

                    let addMemberBtn = item.getElementsByClassName("add-member")[0];

                    addMemberBtn.addEventListener("click", function () {
                        InputsModule.createMemberInputApi(item);
                    });
                }
            });

            if (document.querySelector("form div.row.club-select")) {

                let parentEl = document.querySelector("form div.row.club-select");
                let clubSelect = InputsModule.createSelectApi(["club-input", "select-input-container", "input-container"], "Verein", ["SV Tora", "Nicht SV Tora"], "Verein");

                parentEl.appendChild(clubSelect.selectElement);

            }

            if (document.querySelector("form div.row.category-select")) {

                let parentEl = document.querySelector("form div.row.category-select");
                let categorySelect = InputsModule.createSelectApi(["category-input", "select-input-container", "input-container"], "Kategorie", ["1", "2", "3", "4"], "Kategorie");

                parentEl.appendChild(categorySelect.selectElement);

            }

            if (document.querySelector("form div.row.age-2-select")) {

                let parentEl = document.querySelector("form div.row.age-2-select");
                let ages = ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
                let ageStartSelect = InputsModule.createSelectApi(["age-input", "from-age", "select-input-container", "input-container"], "Alter", ages, "Alter");
                let ageEndSelect = InputsModule.createSelectApi(["age-input", "to-age", "select-input-container", "input-container"], "Alter", ages, "Alter");

                parentEl.appendChild(ageStartSelect.selectElement);
                parentEl.appendChild(Module.generateElementApi("SPAN", ["between"], "bis"));
                parentEl.appendChild(ageEndSelect.selectElement);

            }

            if (document.querySelector("form div.row.age-select")) {

                //TODO: Age Selector
                let parentEl = document.querySelector("form div.row.age-select");
                let ages = ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
                let ageSelect = InputsModule.createSelectApi(["age-input", "select-input-container", "input-container"], "Alter", ages, "Alter");

                parentEl.appendChild(ageSelect.selectElement);

            }

            if (document.getElementsByClassName("date-input-container")[0]) {

                let dateInputContainers = document.querySelectorAll(".date-input-container");
                dateInputContainers.forEach(function (item) {
                    document.getElementsByTagName("body")[0].appendChild(InputsModule.createDatePickerApi(item).datePickerElement);
                });

            }

            if (document.getElementsByClassName("time-input-container")[0]) {

                let timeInputContainers = document.querySelectorAll(".time-input-container");
                timeInputContainers.forEach(function (item) {
                    document.getElementsByTagName("body")[0].appendChild(InputsModule.createTimePickerApi(item).timePickerElement);
                });

            }

        }

        /*
            Create Filters
         */

        if (document.querySelector("div.filter")) {

            sessionStorage.setItem("newFilter", "1");

            let filterContainer = document.querySelector("div.filter");
            let insertFilter = filterContainer.getElementsByClassName("chosen-filters")[0];
            let addFilterBtn = filterContainer.getElementsByClassName("add-filter")[0];

            let filterModal = document.getElementsByClassName("filter-modal")[0];
            let filterModalBtn = filterModal.getElementsByClassName("save-button")[0];

            let useFilterColumns = [];
            let useFilterValues = [];

            function getFilters() {
                let allFilters = TablesModule.getFilterApi(document.getElementsByClassName("table")[0]);
                let meaningfulFilters = ["Verein", "Kategorie", "Geschlecht", "Graduierung", "Alter"];
                for (let filter in allFilters) {
                    if (meaningfulFilters.includes(filter)) {
                        useFilterColumns.push(filter);
                        useFilterValues[filter] = allFilters[filter];
                    }
                }
            }

            let columnFilter = InputsModule.createSelectApi(["filter-column", "filter-column-input", "select-input-container", "input-container"], "Filter", useFilterColumns);
            let valueFilter = InputsModule.createSelectApi(["filter-column", "filter-value-input", "select-input-container", "input-container"], "Wert");

            let dest = filterModal.querySelector("form div.row");

            dest.appendChild(columnFilter.selectElement);
            dest.appendChild(valueFilter.selectElement);

            addFilterBtn.addEventListener("click", function () {
                getFilters();
                columnFilter.updateOptions(useFilterColumns);
                ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], filterModal);
                ModalModule.setTopicApi(filterModal, "Filter hinzufügen");
                sessionStorage.setItem("newFilter", "1");
            });

            filterModalBtn.addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                getFilters();
                let columnInputElement = filterModal.getElementsByClassName("filter-column-input")[0];
                let valueInputElement = filterModal.getElementsByClassName("filter-value-input")[0];
                let column = columnInputElement.getElementsByClassName("input")[0].innerHTML;
                let value = valueInputElement.getElementsByClassName("input")[0].innerHTML;
                if (sessionStorage.getItem("newFilter") === "1") {
                    let filter = FilterModule.createNewFilterApi(column, value, filterModal);
                    insertFilter.appendChild(filter.filterElement);
                } else {
                    FilterModule.changeFilterApi(value);
                }
                let activeFilters = FilterModule.getActiveFilters();
                TablesModule.filterTableApi(document.getElementsByClassName("table")[0], activeFilters);
                InputsModule.resetFormApi(filterModal.querySelector("form"));
                ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], filterModal);
            });

            columnFilter.selectElement.addEventListener("click", function () {
                if (columnFilter.selected !== columnFilter.placeholder) {
                    valueFilter.updateOptions(useFilterValues[columnFilter.selected]);
                }
            });

            filterContainer.addEventListener("click", function () {
                let activeFilters = FilterModule.getActiveFilters();
                TablesModule.filterTableApi(document.getElementsByClassName("table")[0], activeFilters);
            });
        }

        /*
            tournament-dashboard.php
         */

        if (document.getElementsByClassName("no-tournament")[0]) {

            let createTournamentBtn = document.getElementsByClassName("host-tournament")[0];
            let cancelTournamentBtn = document.getElementsByClassName("cancel-tournament")[0];
            let noTournament = document.getElementsByClassName("no-tournament")[0];
            let tournamentDashboard = document.getElementsByClassName("tournament-dashboard")[0];
            let overlay = document.getElementsByClassName("overlay")[0];
            let createModal = document.querySelector(".modal-window.create");
            let deleteModal = document.querySelector(".modal-window.delete");

            let tournamentSelectDest = createModal.querySelector(".tournament.row");
            let tournamentSelect = InputsModule.createSelectApi(["select-input-container", "tournament-select", "input-container"], "Wettkampf", ["Tora-Pokal", "Nachwuchsturnier", "Weihnachtsturnier"]);
            tournamentSelectDest.appendChild(tournamentSelect.selectElement);

            createTournamentBtn.addEventListener("click", function () {
                ModalModule.openModalWindowApi(overlay, createModal);
                ModalModule.setTopicApi(createModal, "Wettkampf erstellen");
            });

            createModal.getElementsByClassName("save-button")[0].addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                noTournament.classList.add("hide");
                tournamentDashboard.querySelector(".tournament-container .tournament-name").innerHTML = tournamentSelect.selected;
                tournamentDashboard.querySelector(".tournament-container .tournament-date").innerHTML = createModal.querySelector(".tournament-date.date-input-container input").value;
                tournamentDashboard.querySelector(".tournament-container .tournament-time").innerHTML = createModal.querySelector(".tournament-time.time-input-container input").value + " Uhr";
                tournamentDashboard.querySelector(".tournament-container .enrollment-start").innerHTML = createModal.querySelector(".enrollment-period .start-container input").value;
                tournamentDashboard.querySelector(".tournament-container .enrollment-end").innerHTML = createModal.querySelector(".enrollment-period .end-container input").value;
                tournamentDashboard.querySelector("status").innerHTML = "Wettkampf erstellt";
                tournamentDashboard.classList.remove("hide");
                InputsModule.resetFormApi(createModal.querySelector("form"));
                ModalModule.closeModalWindowApi(overlay, createModal);
            });

            cancelTournamentBtn.addEventListener("click", function () {
                let tournamentName = document.querySelector("div.tournament-container h3.tournament-name").innerHTML;
                ModalModule.openModalWindowApi(overlay, deleteModal);
                ModalModule.setTopicApi(deleteModal, "Wettkampf löschen");
                deleteModal.getElementsByClassName("name")[0].innerHTML = tournamentName;
            });

            deleteModal.getElementsByClassName("delete")[0].addEventListener("click", function () {
                noTournament.classList.remove("hide");
                tournamentDashboard.classList.add("hide");
                ModalModule.closeModalWindowApi(overlay, deleteModal);
                tournamentDashboard.querySelector("status").innerHTML = "";
            });

            deleteModal.getElementsByClassName("cancel")[0].addEventListener("click", function () {
                ModalModule.closeModalWindowApi(overlay, deleteModal);
            });

            let changeTournamentProperties = tournamentDashboard.getElementsByClassName("change-tournament-properties")[0];

            changeTournamentProperties.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                if (target.nodeName === "A") {
                    if (target.classList.contains("change-tournament")) {
                        console.log("change tournament");
                    }
                    if (target.classList.contains("change-date-time")) {
                        console.log("change date and time");
                    }
                    if (target.classList.contains("change-enrollment-period")) {
                        console.log("change enrollment period");
                    }
                }
            });

            let enrolledPersonsContainer = tournamentDashboard.getElementsByClassName("enrolled-persons-container")[0];

            enrolledPersonsContainer.addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                let target = ev.target || window.target;
                while (target && target.nodeName !== "BODY" && target.nodeName !== "A") {
                    target = target.parentNode;
                }
                if (target.classList.contains("add")) {
                    if (target.classList.contains("add-starter")) {

                    }
                    if (target.classList.contains("add-coach")) {

                    }
                    if (target.classList.contains("add-referee")) {

                    }
                    if (target.classList.contains("add-helper")) {

                    }
                    if (target.classList.contains("add-team")) {

                    }

                }
            });

        }

        /*
            Create new Carousel
         */

        if (document.getElementsByClassName("carousel-container")[0]) {

            let carousels = document.getElementsByClassName("carousel-container");
            carousels = Array.prototype.slice.call(carousels);

            carousels.forEach(function (item) {
                CarouselModule.createCarouselApi(item);
            });

        }

        /*
            Wettkampf/categories.php
         */

        if (document.getElementsByClassName("split-container")[0]) {

            let dragTarget;
            let dragElementStart;
            let overlay = document.getElementsByClassName("overlay")[0];
            let editContainer = document.getElementsByClassName("edit-container")[0];
            let splitContainer = document.getElementsByClassName("split-container")[0];
            let mergeContainer = document.getElementsByClassName("merge-container")[0];
            let oldCategory = splitContainer.getElementsByClassName("old-category")[0];
            let categoryLeftContainer = splitContainer.getElementsByClassName("category-left")[0];
            let categoryRightContainer = splitContainer.getElementsByClassName("category-right")[0];
            let accordions = document.querySelectorAll("div.accordion");
            let closeBtn = splitContainer.getElementsByClassName("close")[0];

            closeBtn.addEventListener("click", function () {
                ModalModule.closeModalWindowApi(overlay, splitContainer);
            });

            accordions.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    let ev = e || window.event;
                    let target = ev.target || window.target;
                    let test = target;
                    while (test && test.nodeName !== "BODY" && !test.classList.contains("tools")) {
                        test = test.parentNode;
                    }
                    if (!test.classList.contains("tools")) {
                        return;
                    }
                    while (target && target.nodeName !== "A") {
                        target = target.parentNode;
                    }
                    let tcl = target.classList;
                    let bar = target;
                    while (bar && bar.nodeName !== "BODY" && !bar.classList.contains("accordion-bar")) {
                        bar = bar.parentNode;
                    }
                    let categoryName = bar.querySelector("span.category-name").innerHTML;
                    let categoryGraduation = bar.querySelector("span.category-graduation").innerHTML;
                    let categoryAge = bar.querySelector("span.category-age").innerHTML;
                    let categorySex = bar.querySelector("span.category-sex").innerHTML;
                    if (tcl.contains("print")) {
                        alert("Ich drucke aus! (Mach ich aber grad nicht wirklich :'D)");
                    } else if (tcl.contains("edit")) {
                        let categoryInput = document.getElementById("category-name");
                        categoryInput.value = categoryName;
                        categoryInput.classList.add("filled");
                        ModalModule.setTopicApi(editContainer, "Kategorie " + categoryName + " umbenennen");
                        ModalModule.openModalWindowApi(overlay, editContainer);
                    } else if (tcl.contains("split")) {
                        let content = bar.nextElementSibling;
                        let starters = [];
                        let tableRows = content.querySelectorAll("tr");
                        tableRows.forEach(function (item) {
                            let name = item.getElementsByTagName("TD")[0].innerHTML;
                            let club = item.getElementsByTagName("TD")[1].innerHTML;
                            let array = [name, club];
                            starters.push(array);
                        });
                        let oldCategory = splitContainer.getElementsByClassName("old-category")[0];
                        oldCategory.getElementsByClassName("old-category-name")[0].innerHTML = categoryName;
                        oldCategory.getElementsByClassName("old-category-graduation")[0].innerHTML = categoryGraduation;
                        oldCategory.getElementsByClassName("old-category-age")[0].innerHTML = categoryAge;
                        oldCategory.getElementsByClassName("old-category-sex")[0].innerHTML = categorySex;
                        document.getElementById("left-category-name").value = categoryName + "a";
                        document.getElementById("right-category-name").value = categoryName + "b";
                        let oldPersonContent = oldCategory.getElementsByClassName("person-content")[0];
                        oldPersonContent.innerHTML = "";
                        starters.forEach(function (item) {
                            let personContainer = createDragElement(item[0], item[1]);
                            oldPersonContent.appendChild(personContainer);
                        });
                        splitContainer.querySelector(".category-left .person-content").innerHTML = "";
                        splitContainer.querySelector(".category-right .person-content").innerHTML = "";
                        ModalModule.openModalWindowApi(overlay, splitContainer);
                    } else if (tcl.contains("merge")) {
                        let oldCategoryProperties = mergeContainer.getElementsByClassName("old-category-properties")[0];
                        oldCategoryProperties.getElementsByClassName("category-name")[0].innnerHTML = categoryName;
                        oldCategoryProperties.getElementsByClassName("graduation")[0].innerHTML = categoryGraduation;
                        oldCategoryProperties.getElementsByClassName("age")[0].innerHTML = categoryAge;
                        oldCategoryProperties.getElementsByClassName("sex")[0].innerHTML = categorySex;
                        oldCategoryProperties.getElementsByClassName("member")[0].innerHTML = bar.querySelectorAll(".accordion-content tr").length;
                        fillMergeContainer(bar);
                        ModalModule.setTopicApi(mergeContainer, "Kategorie " + categoryName + " mit welcher Kategorie zusammen führen?");
                        ModalModule.openModalWindowApi(overlay, mergeContainer);
                    } else {
                        console.log("I have no idea where you clicked");
                    }
                });
            });

            function fillMergeContainer(openBar) {
                let accordion = openBar.parentElement;
                let bars = accordion.querySelectorAll(".accordion-bar");
                let formRow = mergeContainer.querySelector("form .row");
                formRow.innerHTML = "";
                bars.forEach(function (item) {
                    if (item !== openBar) {
                        let categoryName = item.querySelector("span.category-name").innerHTML;
                        let categoryGraduation = item.querySelector("span.category-graduation").innerHTML;
                        let categoryAge = item.querySelector("span.category-age").innerHTML;
                        let categorySex = item.querySelector("span.category-sex").innerHTML;
                        let numberMembers = item.querySelectorAll(".accordion-content tr").length;
                        formRow.appendChild(addOption(categoryName, categoryGraduation, categoryAge, categorySex, numberMembers));
                        formRow.appendChild(Module.generateElementApi("BR"));
                    }
                });
            }

            function addOption(name, graduation, age, sex, numberMembers) {
                let label = Module.generateElementApi("LABEL", ["radio-input-container"]);
                let text = document.createTextNode("Kategorie " + name + ": " + graduation + " / " + age + " / " + sex + " (" + numberMembers + " Teilnehmer)");
                label.appendChild(text);
                let input = Module.generateElementApi("INPUT");
                input.setAttribute("type", "radio");
                input.setAttribute("name", "categoryMerge");
                input.value = name;
                label.appendChild(input);
                let checkmark = Module.generateElementApi("SPAN", ["checkmark"]);
                label.appendChild(checkmark);
                return label;
            }

            function uniqueCategoryName(newName, openBar) {
                let accordion = openBar.parentElement;
                let categoryNames = accordion.querySelectorAll("h4.category span.category-name");
                let uniqueName = true;
                categoryNames.forEach(function (item) {
                    if (item.innerHTML === newName) {
                        uniqueName = false;
                    }
                });
                return uniqueName;
            }

            editContainer.getElementsByClassName("save-button")[0].addEventListener("click", function (e) {
                //TODO: categories have to have a unique name
                let ev = e || window.event;
                ev.preventDefault();
                if (InputsModule.checkIfInputsFilledApi(editContainer.querySelector("form"))) {
                    let newName = document.getElementById("category-name").value;
                    let openBar = AccordionModule.getOpenBarApi();
                    let uniqueName = uniqueCategoryName(newName, openBar);
                    if (uniqueName) {
                        openBar.querySelector("h4.category span.category-name").innerHTML = newName;
                        ModalModule.closeModalWindowApi(overlay, editContainer);
                    } else {
                        //TODO: Tooltip
                        alert("Diese Kategorie existiert leider schon, bitte wähle einen anderen Namen :)");
                    }
                }
            });

            splitContainer.getElementsByClassName("save-button")[0].addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                if (!splitContainer.querySelector("div.old-category div.person-content div")) {
                    let newNameLeft = document.getElementById("left-category-name").value;
                    let newNameRight = document.getElementById("right-category-name").value;
                    let openBar = AccordionModule.getOpenBarApi();
                    let uniqueNameLeft = uniqueCategoryName(newNameLeft, openBar);
                    let uniqueNameRight = uniqueCategoryName(newNameRight, openBar);
                    if (uniqueNameLeft && uniqueNameRight) {
                        let newCategoryLeftPersons = splitContainer.querySelectorAll("div.category-left div.person-content .person");
                        let newCategoryRightPersons = splitContainer.querySelectorAll("div.category-right div.person-content .person");
                        let personsLeft = [];
                        let personsRight = [];
                        newCategoryLeftPersons.forEach(function (item) {
                            let person = [];
                            let personName = item.getElementsByClassName("person-name")[0].innerHTML;
                            let personClub = item.getElementsByClassName("person-club")[0].innerHTML;
                            person["name"] = personName;
                            person["club"] = personClub;
                            personsLeft.push(person);
                        });
                        newCategoryRightPersons.forEach(function (item) {
                            let person = [];
                            let personName = item.getElementsByClassName("person-name")[0].innerHTML;
                            let personClub = item.getElementsByClassName("person-club")[0].innerHTML;
                            person["name"] = personName;
                            person["club"] = personClub;
                            personsRight.push(person);
                        });
                        let contentLeft = createAccordionContent(personsLeft);
                        let contentRight = createAccordionContent(personsRight);
                        let accordion = openBar.parentElement;
                        let categoryGraduation = oldCategory.getElementsByClassName("old-category-graduation")[0].innerHTML;
                        let categoryAge = oldCategory.getElementsByClassName("old-category-age")[0].innerHTML;
                        let categorySex = oldCategory.getElementsByClassName("old-category-sex")[0].innerHTML;
                        AccordionModule.insertNewCategoryBarApi(accordion, openBar, document.getElementById("left-category-name").value, categoryGraduation, categoryAge, categorySex, contentLeft);
                        AccordionModule.insertNewCategoryBarApi(accordion, openBar, document.getElementById("right-category-name").value, categoryGraduation, categoryAge, categorySex, contentRight);
                        AccordionModule.deleteCategoryBarApi(accordion, openBar);
                        ModalModule.closeModalWindowApi(overlay, splitContainer);
                    } else {
                        //TODO: Tooltip
                        if (!uniqueNameLeft) {
                            alert("Die Kategorie vom linken Fenster existiert leider schon. Bitte wähle eine andere :)");
                        } else {
                            alert("Die Kategorie vom rechten Fenster existiert leider schon. Bitte wähle eine andere :)");
                        }
                    }
                } else {
                    //TODO: error since not all persons have been split
                    alert("Es gibt noch Teilnehmer, die noch nicht aufgeteilt wurden. Ich weiß nicht, was ich mit ihnen machen soll, bitte entscheide du das... :)");
                }
            });

            mergeContainer.getElementsByClassName("save-button")[0].addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                let radioBtns = mergeContainer.querySelectorAll("form .row input");
                radioBtns.forEach(function (item) {
                    if (item.checked) {
                        let openBar = AccordionModule.getOpenBarApi();
                        let trsToAdd = openBar.querySelectorAll(".accordion-content tr");
                        let accordion = openBar.parentElement;
                        let destinationCategory = item.value;
                        let categories = accordion.querySelectorAll(".accordion-bar");
                        categories.forEach(function (item) {
                            let categoryName = item.getElementsByClassName("category-name")[0].innerHTML;
                            if (categoryName === destinationCategory) {
                                let tBody = item.querySelector(".accordion-content table tbody");
                                trsToAdd.forEach(function (tr) {
                                    tBody.appendChild(tr);
                                });
                            }
                        });
                        AccordionModule.deleteCategoryBarApi(accordion, openBar);
                        ModalModule.closeModalWindowApi(overlay, mergeContainer);
                    }
                });
            });

            function createAccordionContent(persons) {
                let table = Module.generateElementApi("TABLE");
                persons.forEach(function (item) {
                    let row = Module.generateElementApi("TR");
                    row.appendChild(Module.generateElementApi("TD", [], item["name"]));
                    row.appendChild(Module.generateElementApi("TD", [], item["club"]));
                    table.appendChild(row);
                });
                return table;
            }

            function createDragElement(name, club) {
                let personContainer = Module.generateElementApi("DIV", ["person"]);
                let icon = Module.generateElementApi("I", ["material-icons"], "drag_handle");
                personContainer.appendChild(icon);
                let nameSpan = Module.generateElementApi("SPAN", ["person-name"], name);
                personContainer.appendChild(nameSpan);
                let clubSpan = Module.generateElementApi("SPAN", ["person-club"], club);
                personContainer.appendChild(clubSpan);
                return personContainer;
            }

            splitContainer.addEventListener("mousedown", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                if (target.classList.contains("text-input-container") || target.parentElement.classList.contains("text-input-container")) {
                    return;
                }
                ev.preventDefault();
                while (target.nodeName !== "BODY" && !target.classList.contains("person")) {
                    target = target.parentNode;
                }
                if (target.classList.contains("person")) {
                    dragTarget = target;
                    if (target.nextElementSibling) {
                        target.nextElementSibling.classList.add("drag-before");
                        target.nextElementSibling.classList.remove("drag-before");
                    }
                    while (target.nodeName !== "BODY" && !target.classList.contains("person-content")) {
                        target = target.parentNode;
                    }
                    if (target.classList.contains("person-content")) {
                        dragElementStart = target;
                    }
                    dragTarget.classList.add("dragging");
                    dragTarget.style.left = ev.clientX + "px";
                    dragTarget.style.top = ev.clientY + "px";
                    document.getElementsByTagName("body")[0].appendChild(dragTarget);
                }
            });

            document.addEventListener("mouseup", function (e) {
                if (!dragTarget) {
                    return;
                }
                let ev = e || window.event;
                let target = ev.target || window.target;
                ev.preventDefault();
                while (target.nodeName !== "BODY" && !target.classList.contains("person-content")) {
                    target = target.parentNode;
                }
                if (target.classList.contains("person-content")) {
                    target.appendChild(dragTarget);
                } else {
                    dragElementStart.appendChild(dragTarget);
                }
                dragTarget.style.left = "0";
                dragTarget.style.top = "0";
                dragTarget.classList.remove("dragging");
                dragTarget = null;
                dragElementStart = null;
            });

            document.addEventListener("mousemove", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                if (!dragTarget) {
                    return;
                }
                dragTarget.style.left = ev.clientX + 20 + "px";
                dragTarget.style.top = ev.clientY + "px";
            });

            let toLeftBtn = splitContainer.getElementsByClassName("to-left")[0];
            let toRightBtn = splitContainer.getElementsByClassName("to-right")[0];

            toLeftBtn.addEventListener("click", function () {
                let childElements = oldCategory.getElementsByClassName("person");
                childElements = Array.prototype.slice.call(childElements);
                let target = categoryLeftContainer.getElementsByClassName("person-content")[0];
                childElements.forEach(function (item) {
                    target.appendChild(item);
                });
            });

            toRightBtn.addEventListener("click", function () {
                let childElements = oldCategory.getElementsByClassName("person");
                childElements = Array.prototype.slice.call(childElements);
                let target = categoryRightContainer.getElementsByClassName("person-content")[0];
                childElements.forEach(function (item) {
                    target.appendChild(item);
                });
            });

        }

        /*
            Handle Fighting System
         */

        //TODO: When to use fighting system?
        if (false) {

            const fightingSystemEnum = {"Doppel-KO-System":1, "KO-System":2, "Brasilianisches KO-System":3, "Tafelsystem":4, "Jeder-Gegen-Jeden":5, "Doppel-KO-System mit finalen Tafeln":6, "KO-System mit finalen Tafeln":7};
            Object.freeze(fightingSystemEnum);
            let fighters = ["Marcus Popov", "Florian Reichstein", "Micheal J. White", "Vin Diesel"];

            // TODO
            //let fightingSystem = fightingSystemEnum["KO-System"];
            let fightingSystem = undefined;

            switch (fightingSystem) {
                case fightingSystemEnum["Doppel-KO-System"]:
                    // KO-System with Trostrunde (loser out of each fight gets another chance in the Trostrunde)
                    break;
                case fightingSystemEnum["KO-System"]:
                    ko(fighters);
                    break;
                case fightingSystemEnum["Brasilianisches KO-System"]:

                    break;
                case fightingSystemEnum.Tafelsystem:
                    let numTables = 2;
                    if (fighters.length > 12) {
                        numTables = 3;
                        //first round has fighters.length number of rows
                        // second round has 12 number of rows
                        // third round has 4 number of rows
                    }
                    // first round has fighters.length number of rows
                    // second round has 4 number of rows
                    break;
                case fightingSystemEnum["Jeder-Gegen-Jeden"]:
                    dogEatDog(fighters);
                    break;
                case fightingSystemEnum["Doppel-KO-System mit finalen Tafeln"]:
                    // 2 winners out of KO-System ("Finale")
                    // 2 winners out of Trostrunde ("Finale")
                    // 1 round of Tafelsystem (4 number of rows obviously)
                    break;
                case fightingSystemEnum["KO-System mit finalen Tafeln"]:
                    // 4 winners out of KO-System ("Finale")
                    // 1 round of Tafelsystem (4 number of rows obviously)
                    break;
                default:

                    break;
            }

            /*
                Code for "KO-System"
             */

            function ko(f) {
                let fighters = f;
                let numFighters = fighters.length;
                let numberLevels = Math.floor(getBaseLog(2, numFighters)); // how many "levels"
                let numberPreFights = numFighters % (2 ** numberLevels);
                let numberFights = Math.floor((numFighters - numberPreFights * 2) / 2);
                let destination = document.getElementsByTagName("main")[0];
                numberLevels = 3;
                numberPreFights = 0;
                numberFights = 4;
                numFighters = 8;
                fighters = undefined;
                buildTree(destination, numberLevels, numberPreFights, numberFights, numFighters, fighters);
                //console.log(preFights);
                //console.log(fights);
                //console.log(fighters[0]);
            }

            function buildTree(destination, numberLevels, numberPreFights, numberFights, numFighters, f) {
                let fighters = f;
                let fightCounter = 1;
                let containerHeight = numberLevels;
                if (numberPreFights === 0) {
                    containerHeight -= 1;
                }
                let container = createElement("DIV", ["fight-tree", "clearfix", "height-" + containerHeight]);
                if (f) {
                    if (numberPreFights > 0) {
                        let preColumn = createElement("DIV", ["column", "column-" + (numberLevels + 1)]);
                        for (let i = 0; i < numberPreFights; i++) {
                            let fightPosition = (2 ** numberLevels) - numberPreFights + i;
                            let firstFightDiv = createElement("DIV", ["first-fight", "fight", "fight-" + fightPosition]);
                            let rI = randomIndex(fighters);
                            let fighter1 = fighters[rI];
                            fighters.splice(rI, 1);
                            rI = randomIndex(fighters);
                            let fighter2 = fighters[rI];
                            fighters.splice(rI, 1);
                            let topFighterSlotDiv = createFighterSlot(["fighter-slot", "top"], undefined, fighter1);
                            let bottomFighterSlotDiv = createFighterSlot(["fighter-slot", "bottom"], undefined, fighter2);
                            firstFightDiv.appendChild(topFighterSlotDiv);
                            firstFightDiv.appendChild(bottomFighterSlotDiv);
                            preColumn.appendChild(firstFightDiv);
                        }
                        container.appendChild(preColumn);
                    }
                    let firstColumn = createElement("DIV", ["column", "column-" + numberLevels]);
                    let fighterCounter = 0;
                    let limit = numberFights * 2;
                    let fighterLimit = numFighters - 2 * numberPreFights;
                    for (let i = 0; i < 2 ** (numberLevels - 1); i++) {
                        let firstFightDiv, topFighterSlotDiv, bottomFighterSlotDiv;
                        if (fighterCounter + 1 > limit) {
                            firstFightDiv = createElement("DIV", ["fight", "fight-" + i]);
                        } else {
                            firstFightDiv = createElement("DIV", ["first-fight", "fight", "fight-" + i]);
                        }
                        let fighter1, fighter2;
                        let rI = randomIndex(fighters);
                        fighter1 = fighters[rI];
                        fighters.splice(rI, 1);
                        rI = randomIndex(fighters);
                        fighter2 = fighters[rI];
                        fighters.splice(rI, 1);
                        let cNames = ["fighter-slot", "top"];
                        if (fighterCounter === limit && numberPreFights % 2 !== 0) {
                            cNames.push("unsymmetrical");
                        }
                        let fNumber = undefined;
                        if (fighterCounter >= fighterLimit) {
                            fNumber = fightCounter;
                            fightCounter++;
                        }
                        topFighterSlotDiv = createFighterSlot(cNames, fNumber, fighter1);
                        fighterCounter++;
                        cNames = ["fighter-slot", "bottom"];
                        if (fighterCounter === limit && numberPreFights % 2 !== 0) {
                            cNames.push("unsymmetrical");
                        }
                        fNumber = undefined;
                        if (fighterCounter >= fighterLimit) {
                            fNumber = fightCounter;
                            fightCounter++;
                        }
                        bottomFighterSlotDiv = createFighterSlot(cNames, fNumber, fighter2);
                        fighterCounter++;
                        firstFightDiv.appendChild(topFighterSlotDiv);
                        firstFightDiv.appendChild(bottomFighterSlotDiv);
                        firstColumn.appendChild(firstFightDiv);
                    }
                    container.appendChild(firstColumn);
                }
                for (let i = numberLevels - 1; i >= 0; i--) {
                    let column = createElement("DIV", ["column", "column-" + i]);
                    if (i === 0) {
                        let lastDiv = createFighterSlot(["fighter-slot", "winner"], fightCounter);
                        column.appendChild(lastDiv);
                    } else {
                        let numberFightDivs = 2 ** (i - 1);
                        for (let j = 0; j < numberFightDivs; j++) {
                            let fightDiv = createElement("DIV", ["fight", "fight-" + j]);
                            let topFighterSlotDiv = createFighterSlot(["fighter-slot", "top"], fightCounter);
                            fightCounter++;
                            let bottomFighterSlotDiv = createFighterSlot(["fighter-slot", "bottom"], fightCounter);
                            fightCounter++;
                            fightDiv.appendChild(topFighterSlotDiv);
                            fightDiv.appendChild(bottomFighterSlotDiv);
                            column.appendChild(fightDiv);
                        }
                    }
                    container.appendChild(column);
                }
                destination.appendChild(container);
            }

            function createFighterSlot(classNames, fightNumber = undefined, fighterName = undefined) {
                let fighterSlotDiv = createElement("DIV", classNames);
                let fightNumberSpan = createElement("SPAN", ["fight-number"], fightNumber);
                let fighterNameSpan = createElement("SPAN", ["fighter-name"], fighterName);
                let underlineSpan = createElement("SPAN", ["underline"]);
                fighterSlotDiv.appendChild(fightNumberSpan);
                fighterSlotDiv.appendChild(fighterNameSpan);
                fighterSlotDiv.appendChild(underlineSpan);
                return fighterSlotDiv;
            }

            function createElement(el, classNames, textContent = undefined) {
                let element = document.createElement(el);
                for (let i = 0; i < classNames.length; i++) {
                    element.classList.add(classNames[i]);
                }
                if (textContent) {
                    element.innerHTML = textContent;
                }
                return element;
            }

            function randomIndex(fighters) {
                return Math.floor(Math.random() * fighters.length);
            }

            function getBaseLog(x, y) {
                return Math.log(y) / Math.log(x);
            }

            /*
                End of Code for "KO-System"
             */

            /*
                Code for "Jeder-Gegen-Jeden"
             */

            function dogEatDog(fighters) {
                let fights = [];
                for (let i = 0; i < fighters.length; i++) {
                    for (let j = i + 1; j < fighters.length; j++) {
                        let fight = fighters[i] + " : " + fighters[j];
                        fights.push(fight);
                    }
                }
                if (fights.length > 3) {
                    switchFights(fights);
                }
            }

            function switchFights(fights) {
                let divider = " : ";
                let newFights = [];
                let loops = fights.length;
                let index = 0;
                let lastFighter1 = "";
                let lastFighter2 = "";
                for (let i = 0; i < loops; i++) {
                    let fight = fights[index];
                    let dividerPosition = fight.indexOf(divider);
                    let fighter = fight.substring(0, dividerPosition);
                    while (fighter === lastFighter1 || fighter === lastFighter2) {
                        index = (index + 1) % fights.length;
                        fight = fights[index];
                        dividerPosition = fight.indexOf(divider);
                        fighter = fight.substring(0, dividerPosition);
                    }
                    newFights.push(fight);
                    fights.splice(index, 1);
                    lastFighter1 = fight.substring(0, dividerPosition);
                    lastFighter2 = fight.substring(dividerPosition + 3);
                    if (fighters.length === 4) {
                        index = (index + (Math.round(fights.length * 0.5))) % fights.length;
                    } else {
                        index = (index + Math.round(index * 0.9)) % fights.length;
                    }
                }
            }

            /*
                End of Code for "Jeder-Gegen-Jeden"
             */

        }

        /*
            mail.php
         */

        if (document.getElementsByClassName("mail-content")[0]) {

            let clubs = ["SV Tora", "Nicht SV Tora 1", "Nicht SV Tora 2", "Nicht SV Tora 3", "Nicht SV Tora 4", "Nicht SV Tora 5", "Nicht SV Tora 6", "Nicht SV Tora 7", "Nicht SV Tora 8", "Nicht SV Tora 9", "Nicht SV Tora 10"];
            let receiver = document.getElementsByClassName("receiver")[0];
            let chosenClubsRadio = receiver.querySelector("input[value=chosen]");
            let chooseClubsBtn = receiver.getElementsByClassName("choose-clubs")[0];
            let modalWindow = document.getElementsByClassName("modal-window")[0];
            let chooseBtn = modalWindow.getElementsByClassName("choose-button")[0];

            chooseBtn.addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                let checkboxes = modalWindow.querySelectorAll(".checkbox-input-container");
                document.getElementsByClassName("chosen-clubs")[0].innerHTML = "";
                checkboxes.forEach(function (item) {
                    let input = item.getElementsByTagName("INPUT")[0];
                    if (input.checked) {
                        MailModule.createClubButtonApi(input.value);
                    }
                });
                ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], modalWindow);
            });

            receiver.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                if (chosenClubsRadio.checked) {
                    chooseClubsBtn.classList.remove("disabled");
                } else {
                    chooseClubsBtn.classList.add("disabled");
                    MailModule.removeClubButtonsApi();
                }
            });

            chooseClubsBtn.addEventListener("click", function () {
                let clubCheckBoxes = MailModule.createClubCheckBoxesApi(clubs);
                let clubsContainer = modalWindow.getElementsByClassName("all-clubs")[0];
                clubsContainer.innerHTML = "";
                clubCheckBoxes.forEach(function (item) {
                    clubsContainer.appendChild(item);
                    clubsContainer.appendChild(document.createElement("BR"));
                });
                ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], modalWindow);
            });

        }

        /*
            Handle Tables
         */

        if (document.getElementsByClassName("table-content")[0]) {

            if (document.getElementsByClassName("table-content")[0]) {
                let table = document.getElementsByClassName("table")[0];
                let createEditModalWindow = document.getElementsByClassName("create-edit")[0];
                let deleteModalWindow = document.querySelector(".modal-window.delete");
                let deleteBtn = deleteModalWindow.getElementsByClassName("delete")[0];
                let cancelBtn = deleteModalWindow.getElementsByClassName("cancel")[0];
                let dataMode;

                table.addEventListener("click", function (e) {
                    let ev = e || window.event;
                    let target = ev.target || window.target;
                    if (target.classList.contains("create") || target.parentNode.classList.contains("create")) { // edit row
                        let t = target;
                        while (t && t.nodeName !== "TR") {
                            t = t.parentNode;
                        }
                        let name = t.getElementsByTagName("td")[1].innerHTML; // get second column for name
                        let row = t.getElementsByTagName("td")[0].innerHTML;
                        sessionStorage.setItem("editRow", row);
                        let properties = TablesModule.extractDataFromRowApi(table, row);
                        TablesModule.insertDataIntoModalWindowApi(createEditModalWindow, properties);
                        dataMode = "edit";
                        ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], createEditModalWindow);
                        ModalModule.setTopicApi(createEditModalWindow, name + " bearbeiten");
                    }
                    if (target.classList.contains("delete") || target.parentNode.classList.contains("delete")) { // delete row
                        let t = target;
                        while (t && t.nodeName !== "TR") {
                            t = t.parentNode;
                        }
                        let name = t.getElementsByTagName("td")[1].innerHTML; // get second column for name
                        let row = t.getElementsByTagName("td")[0].innerHTML;
                        sessionStorage.setItem("deleteRow", row);
                        ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], deleteModalWindow);
                        ModalModule.setTopicApi(deleteModalWindow, name + " löschen");
                        ModalModule.setDeleteNameApi(deleteModalWindow, name);
                    }
                    if (target.classList.contains("sort")) {
                        TablesModule.sortTableApi(table, target);
                    } else if (target.parentNode.classList.contains("sort")) {
                        TablesModule.sortTableApi(table, target.parentNode);
                    }
                });

                deleteBtn.addEventListener("click", function () {
                    ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], deleteModalWindow);
                    if (sessionStorage.getItem("deleteRow")) {
                        TablesModule.deleteRowApi(table, sessionStorage.getItem("deleteRow"));
                        TablesModule.renumberRowsApi(table);
                    }
                    sessionStorage.removeItem("deleteRow");
                });

                cancelBtn.addEventListener("click", function () {
                    sessionStorage.removeItem("deleteRow");
                    ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], deleteModalWindow);
                });

                if (document.getElementsByClassName("add-button")[0]) {

                    let addBtn = document.getElementsByClassName("add-button")[0];
                    let addBtnTxt = addBtn.innerText.substring(3);
                    let closeBtn = createEditModalWindow.getElementsByClassName("close")[0];

                    addBtn.addEventListener("click", function () {
                        dataMode = "create";
                        ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], createEditModalWindow);
                        ModalModule.setTopicApi(createEditModalWindow, addBtnTxt);
                    });

                    closeBtn.addEventListener("click", function () {
                        sessionStorage.removeItem("editRow");
                        InputsModule.resetFormApi(createEditModalWindow.querySelector("form"));
                        ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], createEditModalWindow);
                    });

                }

                if (document.getElementsByClassName("save-button")[0]) {

                    let saveBtn = document.getElementsByClassName("save-button")[0];

                    saveBtn.addEventListener("click", function (e) {
                        let ev = e || window.event;
                        let target = ev.target || window.target;
                        ev.preventDefault();
                        while (target.nodeName !== "FORM") {
                            target = target.parentNode;
                        }
                        let preconditions = true;
                        preconditions = InputsModule.checkIfInputsFilledApi(target);
                        if (createEditModalWindow.getElementsByClassName("from-age")[0]) {
                            preconditions = InputsModule.checkAgeApi(target)
                        }
                        if (preconditions) {
                            let properties = TablesModule.extractDataFromFormApi(target);
                            if (dataMode === "create") {
                                TablesModule.insertDataIntoTableApi(table, properties);
                            } else if (dataMode === "edit") {
                                TablesModule.editRowApi(table, properties);
                            }
                            sessionStorage.removeItem("editRow");
                            if (createEditModalWindow.getElementsByClassName("member-row")[0]) {
                                InputsModule.removeAllMemberInputsApi(createEditModalWindow.getElementsByClassName("member-row")[0]);
                            }
                            InputsModule.resetFormApi(createEditModalWindow.querySelector("form"));
                            ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], createEditModalWindow);
                        }
                    });

                }
            }

        }

    })(window, document);

}

document.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});
