/*
  Dependencies: None
 */

let GeneralModule = (function(window, document, undefined) {

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

    const errorTypes = {
        REQUIRED: "required",
        EMAIL: "email",
        REPEAT: "repeat",
        TIME: "time",
        DATE: "date",
    }

    /**
     * This variable contains all the different graduations in karate in ascending order
     * @type {string[]}
     */
    const graduations = ["9. Kyu", "8. Kyu", "7. Kyu", "6. Kyu", "5. Kyu", "4. Kyu", "3. Kyu", "2. Kyu", "1. Kyu", "1. Dan", "2. Dan", "3. Dan", "4. Dan", "5. Dan", "6. Dan"];

    /**
     * This variable contains all the different examination types that can be executed at a tournament
     * @type {string[]}
     */
    const examinationTypes = ["Kihon", "Kata", "Kumite", "Kihon Ippon Kumite", "Jiyu Ippon Kumite", "Shobu Ippon Kumite", "Team"];

    /**
     * This variable stores all the different regular categories (tournament,examinationType,graduation,age(-range),special examination type,sex (in this order!) -> determine -> category) (applies to "Nachwuchsturnier" and "Tora-Pokal)
     * @type {Object} (complicated)
     */
    const regularCategoryReference = {
        "Kata" : {
            "7-6.Kyu" : {
                "8-10" : {
                    "m" : "1",
                    "w" : "2",
                },
                "11-12" : {
                    "m" : "10",
                    "w" : "11",
                },
                "13-14" : {
                    "m" : "31",
                    "w" : "32",
                },
            },
            "5.Kyu-6.Dan" : {
                "8-10" : {
                    "m" : "3",
                    "w" : "4",
                },
                "11-12" : {
                    "m" : "12",
                    "w" : "13",
                },
                "13-14" : {
                    "m" : "19",
                    "w" : "20",
                },
                "15-16" : {
                    "m" : "25",
                    "w" : "26",
                }
            }
        },
        "Kumite" : {
            "7.Kyu" : {
                "8-10" : {
                    "Kihon Ippon Kumite" : {
                        "m" : "5",
                        "w" : "5",
                    },
                    "Jiyu Ippon Kumite" : {
                        "m" : "6",
                        "w" : "7",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "8",
                        "w" : "9",
                    },
                },
                "11-12" : {
                    "Kihon Ippon Kumite" : {
                        "m" : "14",
                        "w" : "14",
                    },
                    "Jiyu Ippon Kumite" : {
                        "m" : "15",
                        "w" : "16",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "17",
                        "w" : "18",
                    },
                },
            },
            "6.Kyu" : {
                "8-10" : {
                    "Kihon Ippon Kumite" : {
                        "m" : "5",
                        "w" : "5",
                    },
                    "Jiyu Ippon Kumite" : {
                        "m" : "6",
                        "w" : "7",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "8",
                        "w" : "9",
                    },
                },
                "11-12" : {
                    "Kihon Ippon Kumite" : {
                        "m" : "14",
                        "w" : "14",
                    },
                    "Jiyu Ippon Kumite" : {
                        "m" : "15",
                        "w" : "16",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "17",
                        "w" : "18",
                    },
                },
                "13-14" : {
                    "Jiyu Ippon Kumite" : {
                        "m" : "21",
                        "w" : "22",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "23",
                        "w" : "24",
                    },
                },
                "15-16" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "27",
                        "w" : "28",
                    },
                },
            },
            "5.Kyu-4.Kyu" : {
                "8-10" : {
                    "Jiyu Ippon Kumite" : {
                        "m" : "6",
                        "w" : "7",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "8",
                        "w" : "9",
                    },
                },
                "11-12" : {
                    "Jiyu Ippon Kumite" : {
                        "m" : "15",
                        "w" : "16",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "17",
                        "w" : "18",
                    },
                },
                "13-14" : {
                    "Jiyu Ippon Kumite" : {
                        "m" : "21",
                        "w" : "22",
                    },
                    "Shobu Ippon Kumite" : {
                        "m" : "23",
                        "w" : "24",
                    },
                },
                "15-16" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "27",
                        "w" : "28",
                    },
                },
            },
            "3.Kyu-6.Dan" : {
                "8-10" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "8",
                        "w" : "9",
                    },
                },
                "11-12" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "17",
                        "w" : "18",
                    },
                },
                "13-14" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "23",
                        "w" : "24",
                    },
                },
                "15-16" : {
                    "Shobu Ippon Kumite" : {
                        "m" : "27",
                        "w" : "28",
                    },
                },
            },
        },
        "Team" : {
            "8-11" : "29",
            "12-16" : "30",
        }
    }

    /**
     * This variable stores all the different categories (tournament,examinationType,graduation,age(-range),(special examination type),sex (in this order!) -> determine -> category)
     * @type {Object} (complicated)
     */
    const categoryReference = {
        "Nachwuchsturnier" : {
            "Kihon" : {
                "9.Kyu" : {
                    "6-8" : {
                        "w" : "1",
                        "m" : "2",
                    },
                    "9-10" : {
                        "w" : "3",
                        "m" : "4",
                    },
                },
            },
            "Kata" : {
                "8.Kyu" : {
                    "6-8" : {
                        "w" : "5",
                        "m" : "6",
                    },
                    "9-10" : {
                        "w" : "7",
                        "m" : "8",
                    },
                    "11-12" : {
                        "w" : "9",
                        "m" : "10",
                    },
                },
            },
            "Kumite" : {
                "8.Kyu" : {
                    "6-8" : {
                        "w" : "11",
                        "m" : "12",
                    },
                    "9-10" : {
                        "w" : "13",
                        "m" : "14",
                    },
                    "11-12" : {
                        "w" : "15",
                        "m" : "16",
                    },
                },
            },
        },
        "Tora-Pokal" : regularCategoryReference,
        "Weihnachtsturnier" : regularCategoryReference,
    }

    /**
     * This variable contains the different tournaments
     * @type {string[]}
     * TODO: tournaments can be changed dynamically
     */
    const tournaments = ["Nachwuchsturnier", "Tora-Pokal", "Weihnachtsturnier"];

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
    ]);

    const sex = ["m", "w"];

    /*
     * TODO: Get all clubs (maybe shift this to another module)
     */
    const clubs = ["SV Tora", "SV Tora 2", "SV Tora 3", "SV Tora 4", "SV Tora 5", "SV Tora 6", "SV Tora 7", "SV Tora 8", "SV Tora 9"];

    /*
     * TODO: Get enrolled clubs (maybe shift this to another module)
     */
    const enrolledClubs = ["SV Tora", "SV Tora 3", "SV Tora 4", "SV Tora 7"];

    /**
     * This function generates DOM elements
     * @param element {string} : Determines the element
     * @param classNames {string[]} : ClassNames that should be added to the element
     * @param value {string} : Content of the element
     * @return {HTMLElement}
     */
    function generateElement(element, classNames = undefined, value = undefined) {
        let el = document.createElement(element.toUpperCase());
        if (classNames && classNames.constructor === Array) {
            classNames.forEach(function (item) {
                if (item !== "") {
                    el.classList.add(item);
                }
            });
        }
        if (value) {
            el.innerHTML = value;
        }
        return el;
    }

    // collect general variables that should be globally accessible (at least if this module is integrated) in a variable
    let generalVariables = {
        inputTypes,
        requests,
        notificationTypes,
        modalTypes,
        errorTypes,
        graduations,
        examinationTypes,
        categoryReference,
        tournaments,
        keyToInput,
        sex,
        clubs,
        enrolledClubs
    };

    return {
        generateElementApi : function (element, classNames, value) {
            return generateElement(element, classNames, value);
        },
        //expose general variables
        generalVariables,
    }

})(window, document);