/**
 * DEPENDENCIES
 */

import { generalVariables } from "./GeneralModule";

/**
 * This Module contains code responsible for managing categories
 */

let fightingSystemTypes = generalVariables.fightingSystemTypes;
let categoryStatuus = generalVariables.categoryStatuus;

let categories = [];

/**
 * This "class" represents an application specific (fighting) category (only present in a tournament context)
 * @param categoryName {string} A unique name which works as an universal identifier
 * @constructor
 */
let Category = function(categoryName) {
    let This = this;
    this.name = categoryName;
    this.fightingSystemType = undefined;
    this.members = [];
    this.numberMembers = 0;
    this.fightingSystem = undefined;
    this.prepared = false;
    this.editable = true;
    this.examinationType = undefined;
    this.categoryStatus = categoryStatuus[0];
    this.referees = [];
    this.helper = [];

    /**
     * This function adds a new member to the members list of this category
     * @param member {Fighter} The member to be added
     */
    this.addMember = function (member) {
        this.members.push(member);
        this.numberMembers++;

        if (this.fightingSystem) {
            this.fightingSystem.addFighter(member);
        }

    }

    /**
     * This function removes a member from the members list of this category
     * @param firstName {string}
     * @param lastName {string}
     */
    this.removeMember = function (firstName, lastName) {
        let toBeRemoved;
        this.members.forEach((member) => {
            if (member.firstName === firstName && member.lastName === lastName) {
                toBeRemoved = member;
            }
        });

        if (this.fightingSystem) {
            this.fightingSystem.removeFighter(toBeRemoved);
        }

        this.members.splice(this.members.indexOf(toBeRemoved), 1);
        this.numberMembers--;
    }

    /**
     * This function sets a (new) fighting system for this category
     * @param fightingSystem {string}
     */
    this.setFightingSystem = function (fightingSystem) {
        if (Object.values(fightingSystemTypes).includes(fightingSystem)) {
            this.fightingSystemType = fightingSystem;
            this.fightingSystem = FightingSystemModule.createFightingSystemApi(fightingSystem, this.members);
            this.prepared = true;
        }
    }

    this.changeFightingSystemConfiguration = function () {
        if (this.editable) {
            this.fightingSystem.change();
        } else {
            ModalModule.infoModalApi("Änderungen nicht mehr möglich", "Die Kategorie ist nicht mehr editierbar, da diese Kategorie schon am Wettkampf teilnimmt oder teilgenommen hat.");
        }
    }

    /**
     * This function retrieves a configuration of a fighting system from the backend. If none is set (yet) then undefined is returned.
     * @param categoryName {string} This parameter serves as an identifier and determines which fighting system configuration to get
     * @return {Category}
     */
    this.getCategoryConfiguration = function (categoryName) {
        // TODO: Send get request to backend and retrieve json string and build objects (persons (actually only fighter/starter),
        /**
         * JSON String should be build like so:
         * {
         *     fighters: [{firstname: firstname1, lastname: lastname1, club: club1, sex: sex1, ...}, ...],
         *     fightingSystem: "KO-System",
         *     configuration: {
         *         option1: configuration1,
         *         option2: configuration2,
         *         option3: {},
         *         option4: [],
         *         ...
         *     }
         * }
         */
    }

};

/**
 * This function returns a category object on the basis of the given category name (the identifier)
 * @param categoryName {string} The name of the category (mostly a number or combination of a number and a string)
 * @return {*}
 */
function getCategoryByName(categoryName) {
    let wantedCategory = undefined;
    categories.forEach((category) => {
        if (category.name === categoryName) {
            wantedCategory = category;
        }
    });
    return wantedCategory;
}

/**
 * This function creates a new category object and returns it
 * @param categoryName {string} The name of the category (mostly a number or combination of a number and a string)
 * @return {Category}
 */
function createCategory(categoryName) {
    let newCategory = new Category(categoryName);
    categories.push(newCategory);
    return newCategory;
}

/**
 * This function deletes a category object on the basis ot the given category name
 * @param categoryName {string} The name of the category (which works as an identifier) to be deleted
 */
function deleteCategory(categoryName) {
    let deleteCategory;
    categories.forEach((category) => {
        if (category.name === categoryName) {
            deleteCategory = category;
        }
    });
    if (deleteCategory) {
        categories.splice(categories.indexOf(deleteCategory), 1);
        deleteCategory = undefined;
    }
}

/**
 * API:
 */
export {
    getCategoryByName,
    createCategory,
    deleteCategory
}
