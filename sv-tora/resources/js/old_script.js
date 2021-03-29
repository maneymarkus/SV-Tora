function init(window, document, LoadingModule, undefined) {

    /*
        DECLARATIONS
     */

    let globalVariables = {
        graduationsList : ["9.Kyu", "8.Kyu", "7.Kyu", "6.Kyu", "5.Kyu", "4.Kyu", "3.Kyu", "2.Kyu", "1.Kyu", "1.Dan", "2.Dan", "3.Dan", "4.Dan", "5.Dan", "6.Dan"],
    };

    let Module = (function(window, document, undefined) {

        let nav = document.getElementsByClassName("nav")[0];
        let userMenu = document.getElementsByClassName("user-menu")[0];

        document.addEventListener("click", function (e) {
            let ev = e || window.event;
            let target = ev.target || window.target;

            HeaderModule.closeHeaderApi(target);
            NavModule.closeNavApi(target);
            InputsModule.closeSelectsApi(target);

        });

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




    let ModalModule = (document.getElementsByClassName("modal-window")[0]) ? (function(window, document, undefined) {

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

        function closeModalWindow(overlay, modalWindow) {
            overlay.classList.remove("show");
            modalWindow.classList.remove("show");
            resetModalWindow(modalWindow);
        }

        function resetModalWindow(modalWindow) {
            if (modalWindow.getElementsByClassName("filter-column-input")[0]) {
                let selectInput = modalWindow.getElementsByClassName("filter-column-input")[0].querySelector("span.input");
                selectInput.innerHTML = "Filter";
                selectInput.classList.add("placeholder");
            }
            if (modalWindow.getElementsByClassName("filter-value-input")[0]) {
                let selectInput = modalWindow.getElementsByClassName("filter-value-input")[0].querySelector("span.input");
                selectInput.innerHTML = "Wert";
                selectInput.classList.add("placeholder");
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

    })(window, document) : "" ;




    let SettingsModule = (function(window, document, undefined) {

        if (document.getElementsByClassName("darkmode-switcher")[0]) {

            let darkmodeSwitch = document.getElementById("darkmode-switch");
            let body = document.getElementsByTagName("body")[0];

            darkmodeSwitch.addEventListener("click", function () {
                if (body.classList.contains("darkmode")) {
                    body.classList.remove("darkmode");
                    body.classList.add("lightmode");
                } else {
                    body.classList.remove("lightmode");
                    body.classList.add("darkmode");
                }
            });

        }

    })(window, document);





    let AccordionModule = (document.getElementsByClassName("accordion")[0]) ? (function(window, document, undefined) {

        let accordionContainers = document.getElementsByClassName("accordion");
        accordionContainers = Array.prototype.slice.call(accordionContainers);

        let Accordion = function(accordion) {
            let This = this;
            this.accordionContainer = accordion;
            this.accordionBars = this.accordionContainer.querySelectorAll(".accordion-bar");
            this.accordionBars.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    let ev = e || window.event;
                    let target = ev.target || window.target;
                    ev.preventDefault();
                    while (target && target.nodeName !== "BODY" && !target.classList.contains("tools")) {
                        target = target.parentNode;
                    }
                    if (target.classList.contains("tools")) {
                        return;
                    }
                    let condition = this.classList.contains("open");
                    if (!condition) {
                        This.hideAllExcept(This, item);
                        This.show(item);
                        document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
                    } else {
                        This.hide(item);
                        document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");
                    }
                });
            });
        };

        Accordion.prototype.show = function (accordionBar) {
            accordionBar.classList.add("open");
            let content = accordionBar.nextElementSibling;
            let getHeight = function () {
                content.style.display = "block";
                return content.scrollHeight;
            };
            content.style.height = getHeight() + "px";
        };

        Accordion.prototype.hide = function (accordionBar) {
            accordionBar.classList.remove("open");
            let content = accordionBar.nextElementSibling;
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

        accordionContainers.forEach(function (item) {
            new Accordion(item);
        });

    })(window, document) : "";




    let FilterModule = (function(window, document, undefined) {

        let filterModal;
        let filters = [];
        let newFilter = true;
        let changeThisFilter;

        if (document.querySelector("div.filter")) {

            let filterContainer = document.querySelector("div.filter");
            let insertFilter = filterContainer.getElementsByClassName("chosen-filters")[0];
            let addFilterBtn = filterContainer.getElementsByClassName("add-filter")[0];

            filterModal = document.getElementsByClassName("filter-modal")[0];
            let filterModalBtn = filterModal.getElementsByClassName("save-button")[0];

            let allFilters;

            let dest = filterModal.querySelector("form div.row");

            let columnFilter = InputsModule.createSelectApi(["filter-column", "filter-column-input", "select-input-container"], "Filter", ["Verein", "Geschlecht", "Alter", "Kategorie", "Graduierung"]);
            let valueFilter = InputsModule.createSelectApi(["filter-column", "filter-value-input", "select-input-container"], "Wert", ["SV Tora", "Nicht SV Tora"]);

            dest.appendChild(columnFilter.selectElement);
            dest.appendChild(valueFilter.selectElement);

            addFilterBtn.addEventListener("click", function () {
                ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], filterModal);
                ModalModule.setTopicApi(filterModal, "Filter hinzufügen");
            });

            filterModalBtn.addEventListener("click", function (e) {
                let ev = e || window.event;
                ev.preventDefault();
                let columnInputElement = filterModal.getElementsByClassName("filter-column-input")[0];
                let valueInputElement = filterModal.getElementsByClassName("filter-value-input")[0];
                let column = columnInputElement.getElementsByClassName("input")[0].innerHTML;
                let value = valueInputElement.getElementsByClassName("input")[0].innerHTML;
                if (newFilter) {
                    filters.push(new Filter(column, value, insertFilter));
                } else {
                    changeThisFilter.changeFilter(changeThisFilter.filterElement, value);
                    newFilter = true;
                }
                ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], filterModal);
                
            });

            return {
                getFilterApi : function () {
                    allFilters = TablesModule.getFilterApi()
                }

            }
        }

        let Filter = function (column, value, parentEl) {
            let This = this;
            this.filterColumn = column;
            this.filterValue = value;
            this.filterElement = this.createFilterElement(column, value);
            parentEl.appendChild(this.filterElement);
            let removeBtn = this.filterElement.getElementsByClassName("delete")[0];
            this.filterElement.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                while (target && !target.classList.contains("filter-container") && !target.classList.contains("delete")) {
                    target = target.parentNode;
                }
                if (target.classList.contains("delete")) {
                    This.removeFilter(This.filterElement);
                    This = undefined;
                } else if (target.classList.contains("filter-container")) {
                    let columnInputElement = filterModal.getElementsByClassName("filter-column-input")[0];
                    let select = columnInputElement.getElementsByClassName("input")[0];
                    select.innerHTML = This.filterColumn;
                    select.classList.remove("placeholder");
                    ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], filterModal);
                    ModalModule.setTopicApi(filterModal, "Filter bearbeiten");
                    newFilter = false;
                    changeThisFilter = This;
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

        Filter.prototype.changeFilter = function (filterElement, newValue) {
            filterElement.getElementsByClassName("filter-value")[0].innerHTML = newValue;
        }

    })(window, document);




    let TablesModule = (function(window, document, undefined) {

        let table;

        if (document.getElementsByClassName("table-content")[0]) {
            table = document.getElementsByClassName("table")[0];
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
                    let properties = extractDataFromRow(row);
                    insertDataIntoModalWindow(createEditModalWindow, properties);
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
                    getSortParams(target);
                } else if (target.parentNode.classList.contains("sort")) {
                    getSortParams(target.parentNode);
                }
            });

            deleteBtn.addEventListener("click", function () {
                ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], deleteModalWindow);
                if (sessionStorage.getItem("deleteRow")) {
                    deleteRow(sessionStorage.getItem("deleteRow"));
                    renumberRows();
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
                        let properties = extractDataFromForm(target);
                        if (dataMode === "create") {
                            insertDataIntoTable(properties);
                        } else if (dataMode === "edit") {
                            editRow(properties);
                        }
                        sessionStorage.removeItem("editRow");
                        if (createEditModalWindow.getElementsByClassName("member-row")[0]) {
                            InputsModule.removeAllMemberInputsApi(createEditModalWindow.getElementsByClassName("member-row")[0]);
                        }
                        ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], createEditModalWindow);
                    }
                });

            }

        }

        function getPossibleFilter() {
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

        function filterTable(column, value) {
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
                if (tdValue !== value) {
                    row.classList.add("hide");
                }
            }
        }

        //filterTable("Nr.", "2");

        function editRow(data) {
            if (rowIndex = sessionStorage.getItem("editRow")) {
                deleteRow(rowIndex);
                insertDataIntoTable(data, rowIndex);
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

        function insertDataIntoTable(data, rowIndex = undefined) {
            let newRow = document.createElement("TR");
            let columnNames = table.getElementsByTagName("TR")[0].getElementsByTagName("TH");
            let propertyColumnMap = {};
            for (let i = 1; i < columnNames.length - 1; i++) {
                propertyColumnMap[i - 1] = columnNames[i].childNodes[0].nodeValue;
            }
            let firstTd = document.createElement("TD");
            if (rowIndex) {
                firstTd.innerHTML = rowIndex;
            } else {
                firstTd.innerHTML = table.getElementsByTagName("TR").length + "";
            }
            newRow.appendChild(firstTd);
            for (let i = 0; i < columnNames.length - 2; i++) {
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
            let btn = document.createElement("A");
            btn.href = "#";
            btn.classList.add(btnAction);
            let icon = document.createElement("I");
            icon.classList.add("material-icons");
            icon.innerHTML = btnAction;
            btn.appendChild(icon);
            return btn;
        }

        function extractDataFromRow(rowIndex) {
            let row = table.getElementsByTagName("TR")[rowIndex];
            let rowTds = row.getElementsByTagName("TD");
            let columnNames = table.getElementsByTagName("TR")[0].getElementsByTagName("TH");
            let propertyColumnMap = {};
            for (let i = 1; i < columnNames.length - 1; i++) {
                propertyColumnMap[i] = columnNames[i].childNodes[0].nodeValue;
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

        function getSortParams(target) {
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
            sortTable(columnIndex, ascending);
        }

        function sortTable(column, ascending) {
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

        function deleteRow(rowIndex) {
            if (table.getElementsByTagName("tr")[rowIndex]) {
                table.getElementsByTagName("tr")[rowIndex].remove();
            }
        }

        function renumberRows() {
            let trs = table.getElementsByTagName("tr");
            for (let i = 1; i <= trs.length; i++) { // skip first Row (which contains headings)
                if (trs[i]) {
                    trs[i].getElementsByTagName("td")[0].innerHTML = "" + i;
                }
            }
        }

        return {
            getFilterApi : function () {
                return getPossibleFilter();
            }
        }

    })(window, document);




    let InputsModule = (function(window, document, undefined) {

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
                    if (!checkInputs()) {
                        ev.preventDefault();
                    }
                }
            });

            if (item.getElementsByClassName("add-member")[0]) {

                let addMemberBtn = item.getElementsByClassName("add-member")[0];

                addMemberBtn.addEventListener("click", function () {
                    new MemberInput(item);
                });
            }

            /*

            if (item.getElementsByClassName("select-input-container")[0]) {

                let selects = item.getElementsByClassName("select-input-container");
                selects = Array.prototype.slice.call(selects);

                selects.forEach(function (item) {
                    item.addEventListener("click", function (e) {
                        selectInputsHandle(e);
                    });
                    item.getElementsByClassName("options")[0].addEventListener("click", function (e) {
                        selectInputsChosenHandle(item, e)
                    });
                });
            }

             */
        });


        /*

        let Accordion = function(accordion) {
            let This = this;
            this.accordionContainer = accordion;
            this.accordionBars = this.accordionContainer.querySelectorAll(".accordion-bar");
            this.accordionBars.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    let ev = e || window.event;
                    let target = ev.target || window.target;
                    ev.preventDefault();
                    while (target && target.nodeName !== "BODY" && !target.classList.contains("tools")) {
                        target = target.parentNode;
                    }
                    if (target.classList.contains("tools")) {
                        return;
                    }
                    let condition = this.classList.contains("open");
                    if (!condition) {
                        This.hideAllExcept(This, item);
                        This.show(item);
                        document.getElementsByTagName("BODY")[0].classList.add("open-accordion");
                    } else {
                        This.hide(item);
                        document.getElementsByTagName("BODY")[0].classList.remove("open-accordion");
                    }
                });
            });
        };

        Accordion.prototype.show = function (accordionBar) {
            accordionBar.classList.add("open");
            let content = accordionBar.nextElementSibling;
            let getHeight = function () {
                content.style.display = "block";
                return content.scrollHeight;
            };
            content.style.height = getHeight() + "px";
        };

        Accordion.prototype.hide = function (accordionBar) {
            accordionBar.classList.remove("open");
            let content = accordionBar.nextElementSibling;
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

         */

        let selects = [];
        
        let Select = function (classNames, placeholder, options = undefined, dataColumn = undefined) {
            let This = this;
            this.options = options;
            this.placeholder = placeholder;
            this.selectElement = this.createSelect(classNames, placeholder, options, dataColumn);
            this.select = this.selectElement.querySelector("span.input");
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
                    This.show();
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
            };

            this.show = function () {
                let optionHeight = this.getOptionHeight(this.selectElement);
                let height;
                if (this.options?.length > 5) {
                    height = 5 * optionHeight;
                } else {
                    height = this.options?.length * optionHeight;
                }
                let optionsContainer = this.selectElement.querySelector("div.options");
                optionsContainer.style.display = "block";
                optionsContainer.style.height = height + "px";
            };

            this.hide = function () {
                let optionsContainer = this.selectElement.querySelector("div.options");
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
            return option.style.height;
        };

        /*
        
        function selectInputsHandle(e) {
            let ev = e || window.event;
            let target = ev.target || window.target;
            if (target && !target.classList.contains("select-input-container") && !target.classList.contains("options")) {
                while (target && !target.classList.contains("select-input-container") && !target.classList.contains("options")) {
                    target = target.parentNode;
                }
            }
            if (target && target.classList.contains("select-input-container")) {
                target.getElementsByClassName("options")[0].classList.add("show");
            }
        }

        function selectInputsChosenHandle(selectContainer, e) {
            let chosen = selectContainer.getElementsByClassName("chosen")[0];
            let ev = e || window.event;
            let target = ev.target || window.target;
            chosen.classList.remove("placeholder");
            chosen.innerHTML = target.innerHTML;
            closeSelects(target);
        }

         */

        function closeSelects(target) {
            selects.forEach(function (item) {
                item.hide();
            });
            /*
            let selects = document.getElementsByClassName("select-input-container");
            selects = Array.prototype.slice.call(selects);
            let t = target;
            if (t && !t.classList.contains("option")) {
                if (t && t.nodeName !== "BODY" && !t.classList.contains("select-input-container")) {
                    while (t && t.nodeName !== "BODY" && !t.classList.contains("select-input-container")) {
                        t = t.parentNode;
                    }
                }
            }
            selects.forEach(function (item) {
                if (t !== item) {
                    item.getElementsByClassName("options")[0].classList.remove("show");
                }
            });
             */
        }

        function checkInputs(form) {
            //TODO: All types of Inputs;
            let inputs = form.getElementsByTagName("input");
            inputs = Array.prototype.slice.call(inputs);
            let allInputsFilled = true;
            inputs.forEach(function (item) {
                if (!item.disabled) {
                    if (!item.value) {
                        allInputsFilled = false;
                    }
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
            let selectMemberInput = new Select(["member-input", "select-input-container"], "Mitglied", ["Marcus", "Markus", "Florian", "Marckus"], "Mitglieder");
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

        return {
            checkIfInputsFilledApi : function(form) {
                return checkInputs(form);
            },
            closeSelectsApi : function(target) {
                if (target.getElementsByClassName("select-input-container")[0]) {
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
            createSelectApi : function (classNames, placeholder, options) {
                return new Select(classNames, placeholder, options);
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
        }

    })(window, document);




    let TournamentsModule = (function(window, document, undefined) {

        if (document.getElementsByClassName("no-tournament")[0]) {
            let createTournamentBtn = document.getElementsByClassName("host-tournament")[0];
            let cancelTournamentBtn = document.getElementsByClassName("cancel-tournament")[0];
            let noTournament = document.getElementsByClassName("no-tournament")[0];
            let tournamentDashboard = document.getElementsByClassName("tournament-dashboard")[0];
            createTournamentBtn.addEventListener("click", function () {
                noTournament.classList.add("hide");
                tournamentDashboard.classList.remove("hide");
            });
            cancelTournamentBtn.addEventListener("click", function () {
                noTournament.classList.remove("hide");
                tournamentDashboard.classList.add("hide");
            });
        }

    })(window, document);




    let TournamentsSettingsModule = (function(window, document, undefined) {



    })(window, document);




    let CarouselModule = (document.getElementsByClassName("carousel-container")[0]) ? (function(window, document, undefined) {

        let carousel = document.getElementsByClassName("carousel-container")[0];
        let pageElements = carousel.getElementsByClassName("page");
        let controlLeft = carousel.getElementsByClassName("left")[0];
        let controlRight = carousel.getElementsByClassName("right")[0];

        function getPosition(el) {
            let xPosition = 0;
            let yPosition = 0;

            while (el) {
                if (el.tagName === "BODY") {
                    let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
                    let yScrollPos = el.scrollTop || document.documentElement.scrollTop;

                    xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
                    yPosition += (el.offsetTop - yScrollPos + el.clientTop);
                } else {
                    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
                }

                el = el.offsetParent;
            }
            return {
                x: xPosition,
                y: yPosition
            };
        }

        controlLeft.addEventListener("click", function () {
            switchPages("left");
        });

        controlRight.addEventListener("click", function () {
            switchPages("right");
        });

        carousel.addEventListener("wheel", function (e) {
            let ev = e || window.event;
            let target = ev.target || window.target;
            ev.preventDefault();
            if (ev.deltaY > 0) {
                switchPages("left");
            } else {
                switchPages("right");
            }
        });

        function switchPages(direction) {
            for (let i = 1; i <= 5; i++) {
                let page = carousel.getElementsByClassName("page" + i)[0];
                page.classList.remove("page" + i);
                if (direction === "right") {
                    if (page.nextElementSibling) {
                        page.nextElementSibling.classList.add("page" + i);
                    } else {
                        carousel.getElementsByClassName("page")[0].classList.add("page" + i);
                    }
                } else {
                    if (page.previousElementSibling) {
                        page.previousElementSibling.classList.add("page" + i);
                    } else {
                        carousel.getElementsByClassName("page")[(pageElements.length - 1)].classList.add("page" + i);
                    }
                }
            }
        }

    })(window, document) : "";




    let OrganiseCategoriesModule = (document.getElementsByClassName("split-container")[0]) ? (function(window, document, undefined) {

        let dragTarget;
        let dragElementStart;
        let editContainer = document.getElementsByClassName("edit-container")[0];
        let splitContainer = document.getElementsByClassName("split-container")[0];
        let mergeContainer = document.getElementsByClassName("merge-container")[0];
        let oldCategory = splitContainer.getElementsByClassName("old-category")[0];
        let categoryLeftContainer = splitContainer.getElementsByClassName("category-left")[0];
        let categoryRightContainer = splitContainer.getElementsByClassName("category-right")[0];
        let tools = document.querySelectorAll("div.tools");
        let closeBtn = splitContainer.getElementsByClassName("close")[0];

        closeBtn.addEventListener("click", function () {
            ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], splitContainer);
        });

        tools.forEach(function (item) {
            item.addEventListener("click", function (e) {
                let ev = e || window.event;
                let target = ev.target || window.target;
                while (target && target.nodeName !== "A") {
                    target = target.parentNode;
                }
                let tcl = target.classList;
                let bar = target;
                while (bar && bar.nodeName !== "BODY" && !bar.classList.contains("accordion-bar")) {
                    bar = bar.parentNode;
                }
                if (tcl.contains("print")) {
                    alert("Ich drucke aus! (Mach ich aber grad nicht wirklich ;))");
                } else if (tcl.contains("edit")) {
                    ModalModule.setTopicApi(editContainer, "Kategorie n umbenennen");
                    ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], editContainer);
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
                    let oldCategory = splitContainer.querySelector(".old-category .person-content");
                    oldCategory.innerHTML = "";
                    starters.forEach(function (item) {
                        let personContainer = createDragElement(item[0], item[1]);
                        oldCategory.appendChild(personContainer);
                    });
                    ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], splitContainer);
                } else if (tcl.contains("merge")) {
                    ModalModule.setTopicApi(mergeContainer, "Kategorie n mit welcher Kategorie zusammen führen?");
                    ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], mergeContainer);
                } else {
                    console.log("I have no idea where you clicked");
                }
            });
        });

        function createDragElement(name, club) {
            let personContainer = document.createElement("DIV");
            personContainer.classList.add("person");
            let icon = document.createElement("I");
            icon.classList.add("material-icons");
            icon.innerHTML = "drag_handle";
            personContainer.appendChild(icon);
            let nameSpan = document.createElement("SPAN");
            nameSpan.classList.add("person-name");
            nameSpan.innerHTML = name;
            personContainer.appendChild(nameSpan);
            let clubSpan = document.createElement("SPAN");
            clubSpan.classList.add("person-club");
            clubSpan.innerHTML = club;
            personContainer.appendChild(clubSpan);
            return personContainer;
        }

        splitContainer.addEventListener("mousedown", function (e) {
            let ev = e || window.event;
            let target = ev.target || window.target;
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

    })(window, document) : "";




    let FightModule = (function(window, document, undefined) {

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

    })(window, document);




    let MailModule = (document.getElementsByClassName("mail-content")[0]) ? (function(window, document, undefined) {

        let receiver = document.getElementsByClassName("receiver")[0];
        let chosenClubsRadio = receiver.querySelector("input[value=chosen]");
        let chooseClubsBtn = receiver.getElementsByClassName("choose-clubs")[0];
        let modalWindow = document.getElementsByClassName("modal-window")[0];
        let chooseBtn = modalWindow.getElementsByClassName("choose-button")[0];
        let clubs = ["SV Tora", "Nicht SV Tora 1", "Nicht SV Tora 2", "Nicht SV Tora 3", "Nicht SV Tora 4", "Nicht SV Tora 5", "Nicht SV Tora 6", "Nicht SV Tora 7", "Nicht SV Tora 8", "Nicht SV Tora 9", "Nicht SV Tora 10"];
        let clubBtns = [];

        chooseBtn.addEventListener("click", function (e) {
            let ev = e || window.event;
            ev.preventDefault();
            let checkboxes = modalWindow.querySelectorAll(".checkbox-input-container");
            document.getElementsByClassName("chosen-clubs")[0].innerHTML = "";
            checkboxes.forEach(function (item) {
                let input = item.getElementsByTagName("INPUT")[0];
                if (input.checked) {
                    clubBtns.push(new ClubButton(input.value));
                }
            });
            ModalModule.closeModalWindowApi(document.getElementsByClassName("overlay")[0], modalWindow);
        });

        function createClubCheckboxes(clubs) {
            let clubsContainer = modalWindow.getElementsByClassName("all-clubs")[0];
            clubsContainer.innerHTML = "";
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
                clubsContainer.appendChild(clubCheckbox);
                clubsContainer.appendChild(document.createElement("BR"));
            });
        }

        function createClubCheckbox(name, checked = false) {
            let checkboxContainer = document.createElement("LABEL");
            checkboxContainer.classList.add("checkbox-input-container");
            checkboxContainer.innerHTML = name;
            let input = document.createElement("INPUT");
            input.type = "checkbox";
            input.value = name;
            input.checked = checked;
            checkboxContainer.appendChild(input)
            let checkmark = document.createElement("SPAN");
            checkmark.classList.add("checkmark");
            checkboxContainer.appendChild(checkmark);
            return checkboxContainer;
        }

        receiver.addEventListener("click", function (e) {
            let ev = e || window.event;
            let target = ev.target || window.target;
            if (chosenClubsRadio.checked) {
                chooseClubsBtn.classList.remove("disabled");
            } else {
                chooseClubsBtn.classList.add("disabled");
                clubBtns.forEach(function (item) {
                    item.removeBtn(item.clubBtn);
                });
                clubBtns = [];
            }
        });

        chooseClubsBtn.addEventListener("click", function () {
            createClubCheckboxes(clubs);
            ModalModule.openModalWindowApi(document.getElementsByClassName("overlay")[0], modalWindow);
        });

        let ClubButton = function (clubName) {
            let This = this;
            this.name = clubName;
            this.clubBtn = this.createBtn(clubName);
            document.getElementsByClassName("chosen-clubs")[0].appendChild(this.clubBtn);
            let removeBtn = this.clubBtn.getElementsByClassName("delete")[0];
            removeBtn.addEventListener("click", function () {
                This.removeBtn(This.clubBtn);
            });
        };

        ClubButton.prototype.createBtn = function (clubName) {
            let clubContainer = document.createElement("SPAN");
            clubContainer.classList.add("club-container");
            let nameSpan = document.createElement("SPAN");
            nameSpan.classList.add("club-name");
            nameSpan.innerHTML = clubName;
            clubContainer.appendChild(nameSpan);
            let deleteBtn = document.createElement("A");
            deleteBtn.classList.add("delete");
            let deleteIcon = document.createElement("I");
            deleteIcon.classList.add("material-icons");
            deleteIcon.innerHTML = "close";
            deleteBtn.appendChild(deleteIcon);
            clubContainer.appendChild(deleteBtn);
            return clubContainer;
        };

        ClubButton.prototype.removeBtn = function (clubBtn) {
            clubBtn.remove();
        };

    })(window, document) : "";

}

document.addEventListener("DOMContentLoaded", function() {
    init(window, document);
});