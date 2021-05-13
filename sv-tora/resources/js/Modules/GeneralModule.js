/**
 * DEPENDENCIES
 * NONE!
 */

/**
 * This Module contains general code and globally available constants and variables
 */

/*
/---------------------------------------------------------------
/   Universal constants and variables
/---------------------------------------------------------------
*/

/**
 * This constant contains all available input types
 * @type {{DATE: string, CHECKBOX: string, TEXTAREA: string, PASSWORD: string, RADIO: string, TEXT: string, SWITCH: string, TIME: string, FILE: string, SELECT: string, RANGE: string}}
 */
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
    FILE: "file",
    RANGE: "range",
};

/**
 * This constant contains all available HTTP request methods
 * @type {{DELETE: string, POST: string, GET: string, PUT: string}}
 */
const requests = {
    GET : "GET",
    POST : "POST",
    DELETE : "DELETE",
    PUT : "PUT"
};

/**
 * This constant contains all available notification types
 * @type {{SUCCESS: string, ERROR: string, INFO: string, WARNING: string}}
 */
const notificationTypes = {
    INFO : "Info",
    SUCCESS : "Success",
    WARNING : "Warning",
    ERROR : "Error",
};

/**
 * This constant contains all available modal window types
 * @type {{DELETE: string, INFO: string, CONFIRM: string}}
 */
const modalTypes = {
    DELETE: "delete",
    INFO: "info",
    CONFIRM: "confirm",
    CUSTOM: "custom",
}

/**
 * This constant contains all available error types
 * @type {{DATE: string, CONFIRMATION: string, REQUIRED: string, CUSTOM: string, TIME: string, EMAIL: string}}
 */
const errorTypes = {
    REQUIRED: "required",
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRMATION: "confirm",
    TIME: "time",
    DATE: "date",
    CUSTOM: "custom",
}


/*
/---------------------------------------------------------------
/   Application specific constants and variables
/---------------------------------------------------------------
*/

/**
 * This constant contains all available progress steps in a tournament
 * @type {{"Wettkampf abgeschlossen": number, "Anmeldung geschlossen": number, Wettkampftag: number, "Anmeldung freigeschalten": number, "Wettkampf erstellt": number}}
 */
const progressSteps = {
    "Wettkampf erstellt": 0,
    "Anmeldung freigeschalten": 1,
    "Anmeldung geschlossen": 2,
    "Wettkampftag": 3,
    "Wettkampf abgeschlossen": 4
}

/**
 * This constant contains all different statuses of a tournament in chronological order (actually the plural of status is status (with a long spoken u), so the variable is called statuus on purpose)
 * @type {string[]}
 */
const tournamentStatuusOrder = ["Wettkampf erstellt", "Anmeldung freigeschalten", "Anmeldung geschlossen", "Wettkampftag", "Wettkampf abgeschlossen"];

/**
 * This constant contains all the different manually alterable statuses of a tournament in chronological order (actually the plural of status is status (with a long spoken u), so the variable is called statuus on purpose)
 * @type {string[]}
 */
const tournamentSelectableStatuusOrder = ["Anmeldung freigeschalten", "Anmeldung geschlossen", "Wettkampftag", "Wettkampf abgeschlossen"];

/**
 * This constant contains all the different statuses of a category in a tournament context in chronological order. A category can be "in preparation" (the category is being prepared for the tournament), "ready" (to be executed), "active" (currently executed), "done" (the category (or rather the fighting system) has been successfully finished) and "terminated" (the category is completely finished and winners have been determined)
 * @type {string[]}
 */
const categoryStatuusOrder = ["In Vorbereitung", "Bereit", "Aktiv", "Durchgeführt", "Abgeschlossen"];

/**
 * This constant contains all the different statues of a category in a tournament context
 * @type {{}}
 */
const categoryStatuus = {
    IN_PREPARATION: "In Vorbereitung",
    READY: "Bereit",
    ACTIVE: "Aktiv",
    DONE: "Durchgeführt",
    TERMINATED: "Abgeschlossen",
}

/**
 * This constant contains all the different graduations in karate in ascending order
 * @type {string[]}
 */
const graduationsOrder = ["9. Kyu", "8. Kyu", "7. Kyu", "6. Kyu", "5. Kyu", "4. Kyu", "3. Kyu", "2. Kyu", "1. Kyu", "1. Dan", "2. Dan", "3. Dan", "4. Dan", "5. Dan", "6. Dan"];

/**
 * This constant contains all the different examination types that can be executed at a tournament
 * @type {string[]}
 */
const examinationTypes = {
    KIHON: "Kihon",
    KATA: "Kata",
    KIHON_IPPON_KUMITE: "Kihon Ippon Kumite",
    JIYU_IPPON_KUMITE: "Jiyu Ippon Kumite",
    SHOBU_IPPON_KUMITE: "Shobu Ippon Kumite",
    TEAM: "Team",
}

/**
 * This constant stores all the different regular categories (tournament,examinationType,graduation,age(-range),special examination type,sex (in this order!) -> determine -> category) (applies to "Nachwuchsturnier" and "Tora-Pokal)
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
 * This constant stores all the different categories (tournament,examinationType,graduation,age(-range),(special examination type),sex (in this order!) -> determine -> category)
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
 * This constant contains the different tournaments
 * @type {string[]}
 * TODO: tournaments can be changed dynamically
 */
const tournaments = ["Nachwuchsturnier", "Tora-Pokal", "Weihnachtsturnier"];

const personTypes = {
    FIGHTER: "Starter",
    COACH: "Coach",
    REFEREE: "Kampfrichter",
    HELPER: "Helfer",
}

const fightingSystemTypes = {
    DOGEATDOG: "Jeder-Gegen-Jeden",
    TABLES: "Tafelsystem",
    DOUBLEKOWITHTABLES: "Doppel-KO-System mit finalen Tafeln",
    DOUBLEKO: "Doppel-KO-System",
    KO: "KO-System",
    KOWITHTABLES: "KO-System mit finalen Tafeln",
    BRAZILIANKO: "Brasilianisches KO-System",
}

/**
 * This constant holds a map which maps a (custom application) key (e.g. column (headers) to input types in conventional tables
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

/**
 * This constant contains all available genders
 * @type {string[]}
 */
const sex = ["m", "w"];

/*
 * TODO: Get all clubs (maybe shift this to another module)
 */
const clubs = ["SV Tora", "SV Tora 2", "SV Tora 3", "SV Tora 4", "SV Tora 5", "SV Tora 6", "SV Tora 7", "SV Tora 8", "SV Tora 9", "Anderer Verein", "Noch was anderes"];

// TODO: Get all club mails
const clubMails = {
    "SV Tora" : "sv-tora@verein.de",
    "SV Tora 2" : "sv-tora2@verein.de",
    "SV Tora 3" : "sv-tora3@verein.de",
    "SV Tora 4" : "sv-tora4@verein.de",
    "SV Tora 5" : "sv-tora5@verein.de",
    "SV Tora 6" : "sv-tora6@verein.de",
    "SV Tora 7" : "sv-tora7@verein.de",
    "SV Tora 8" : "sv-tora8@verein.de",
    "SV Tora 9" : "sv-tora9@verein.de",
}

/*
 * TODO: Get enrolled clubs (maybe shift this to another module)
 */
const enrolledClubs = ["SV Tora", "SV Tora 3", "SV Tora 4", "SV Tora 7", "Anderer Verein"];

/*
 * TODO: Get all excluded clubs from a tournament (if there's a tournament)
 */
const excludedClubs = ["SV Tora 5", "Noch was anderes"];

/**
 * This constant contains the amount of rem a single minute represents in timing schedules throughout the application
 * @type {number}
 */
const ONE_MINUTE_LENGTH = 0.1;


/*
/---------------------------------------------------------------
/   Universally available functions
/---------------------------------------------------------------
*/

/**
 * This function generates DOM elements
 * @param element {string} Determines the element
 * @param classNames {string[]} ClassNames that should be added to the element
 * @param value {string} Content of the element
 * @param attributes {object} An object containing of key-value-pairs (strings). The key determines which attribute should be set and the value determines the value of the attribute
 * @return {HTMLElement}
 */
function generateElement(element, classNames = undefined, value = undefined, attributes) {
    let el = document.createElement(element.toUpperCase());
    if (classNames && classNames.constructor === Array) {
        classNames.forEach(function (className) {
            if (className !== "") {
                el.classList.add(className);
            }
        });
    }
    if (value) {
        el.innerHTML = value;
    }
    if (attributes) {
        for (let attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                el.setAttribute(attribute, attributes[attribute]);
            }
        }
    }
    return el;
}

/**
 * This function checks for required dependencies and if they are available
 * @param dependencies {string[]} The required dependencies
 */
function checkDependencies(dependencies) {
    dependencies.forEach((dependency) => {
        if (typeof App[dependency] === "undefined") {
            console.warn("Missing " + dependency + " dependency");
        }
    });
}

let uniqueRandomIdentifiers = [];
/**
 * This function creates a unique random identifier, saves it to an array and returns it
 * @param length {number}
 */
function createUniqueRandomIdentifier(length= 8) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateRandomString(length) {
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomString;
    }

    let uniqueRandomIdentifier = generateRandomString(length);

    if (uniqueRandomIdentifiers.includes(uniqueRandomIdentifier)) {
        while (uniqueRandomIdentifiers.includes(uniqueRandomIdentifier)) {
            uniqueRandomIdentifier = generateRandomString(length);
        }
    }
    uniqueRandomIdentifiers.push(uniqueRandomIdentifier);
    return uniqueRandomIdentifier;
}

/**
 * This function sets a cookie
 * @param key {string} The name of the cookie
 * @param value {string} The value of the cookie
 * @param expiration {number} Determines when this cookie should expire (in days)
 */
function setCookie(key, value, expiration= 365) {
    let date = new Date();
    date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

/**
 * This function returns the value of a set cookie
 * @param key {string}
 */
function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    let value = "";
    cookies.forEach((cookie) => {
        while(cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(key) === 0) {
            value = cookie.substring(key.length, cookie.length);
        }
    });
    return value;
}

/**
 * This variable contains all the variables and constants that should be globally available
 * @type {{inputTypes: {DATE: string, CHECKBOX: string, TEXTAREA: string, PASSWORD: string, RADIO: string, TEXT: string, SWITCH: string, TIME: string, FILE: string, SELECT: string, RANGE: string}, tournaments: string[], examinationTypes: string[], sex: string[], enrolledClubs: [string, string, string, string, string], graduations: string[], requests: {DELETE: string, POST: string, GET: string, PUT: string}, modalTypes: {DELETE: string, INFO: string, CONFIRM: string}, excludedClubs: [string, string], categoryReference: Object, clubMails: {"SV Tora 9": string, "SV Tora": string, "SV Tora 5": string, "SV Tora 6": string, "SV Tora 7": string, "SV Tora 8": string, "SV Tora 2": string, "SV Tora 3": string, "SV Tora 4": string}, clubs: string[], tournamentStatuus: string[], notificationTypes: {SUCCESS: string, ERROR: string, INFO: string, WARNING: string}, errorTypes: {DATE: string, CONFIRMATION: string, REQUIRED: string, CUSTOM: string, TIME: string, EMAIL: string}, progressSteps: {"Wettkampf abgeschlossen": number, "Anmeldung geschlossen": number, Wettkampftag: number, "Anmeldung freigeschalten": number, "Wettkampf erstellt": number}, tournamentSelectableStatuus: string[], keyToInput: Map<string, *>}}
 */
let generalVariables = {
    inputTypes,
    requests,
    notificationTypes,
    modalTypes,
    errorTypes,
    graduationsOrder,
    examinationTypes,
    categoryReference,
    tournaments,
    keyToInput,
    sex,
    clubs,
    enrolledClubs,
    progressSteps,
    clubMails,
    excludedClubs,
    tournamentStatuusOrder,
    tournamentSelectableStatuusOrder,
    categoryStatuusOrder,
    categoryStatuus,
    personTypes,
    fightingSystemTypes,
    ONE_MINUTE_LENGTH
};

/**
 * API
 */
export {
    generateElement,
    checkDependencies,
    createUniqueRandomIdentifier,
    getCookie,
    setCookie,
    generalVariables
}
