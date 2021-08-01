/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";
import * as ModalModule from "./ModalModule";
import { createInput } from "./MaterialInputsModule";
import { checkInput } from "./FormModule";
import { createPrimaryButton } from "./PrimaryButtonModule";
import { getPersonById } from "./PersonModule";

/**
 * This Module contains code responsible for managing all the different fighting systems and specific behaviour
 */

let fightingSystemTypes = GeneralModule.generalVariables.fightingSystemTypes;


/**
 * This function creates and shows and handles a custom modal window to change the ko-system and dog-eat-dog starting configuration
 * @param heading {string} The informative heading of the modal
 * @param content {HTMLElement} The resemblance of the starting configuration of the fighting system
 * @param abortCallback {function} The function that should be called back when aborting the modal window
 * @param confirmCallback {function} The function that should be called back when confirming the changes done
 */
function customChangeFightingSystemModal (heading, content, abortCallback, confirmCallback) {
    let container = GeneralModule.generateElement("div", ["container"]);

    let h2 = GeneralModule.generateElement("h2", undefined, heading);
    h2.style.margin = "0.5em 0 2em 0";
    container.appendChild(h2);

    container.appendChild(content);

    let abortButton = createPrimaryButton(["close"], undefined, "close", "Abbrechen");

    let confirmButton = createPrimaryButton(["apply-changes"], undefined, "done", "Änderungen anwenden");

    container.appendChild(abortButton);
    container.appendChild(confirmButton);

    let ModalWindow = ModalModule.customModal(container, abortCallback);

    abortButton.addEventListener("click", function () {
        if (abortCallback) {
            abortCallback();
        }
        let overlay = container;
        while (overlay.nodeName !== "BODY" && !overlay.classList.contains("overlay")) {
            overlay = overlay.parentElement;
        }
        ModalWindow.closeModal();
    });

    confirmButton.addEventListener("click", function () {
        if (confirmCallback) {
            confirmCallback();
        }
        let overlay = container;
        while (overlay.nodeName !== "BODY" && !overlay.classList.contains("overlay")) {
            overlay = overlay.parentElement;
        }
        ModalWindow.closeModal();
    });

}

/**
 * This class represents a generic fighting system and offers individual methods for handling it
 */
class FightingSystem {
    constructor(fighters) {
        this.fighters = fighters;
        this.fightingSystemType = undefined;

        this.winner = undefined;
        this.second = undefined;
        this.third = undefined;
    }

    addFighter(newFighter) {
        this.fighters.push(newFighter);
        this.changeFighters();
    }

    removeFighter(fighter) {
        this.fighters.splice(this.fighters.indexOf(fighter), 1);
        this.changeFighters();
    }

    changeFighters() {}

    toElement() {}

    change() {}

    toJsonString() {}

}


class FightTable {
    constructor(fighters, numberReferees) {
        this.fighters = fighters;
        this.numberReferees = numberReferees;

        this.stats = {};

        if (this.fighters.length > 0) {
            this.initializeStats();
        }

    }

    addFighter(fighter) {
        this.fighters.push(fighter);
        this.addStat(fighter);
    }

    removeFighter(fighter) {
        this.fighters.splice(this.fighters.indexOf(fighter), 1);
        this.removeStat(fighter);
    }

    initializeStats() {
        this.fighters.forEach((fighter) => {
            this.addStat(fighter);
        });
    }

    addStat(fighter) {
        let pointArray = [];
        for (let i = 0; i < this.numberReferees; i++) {
            let inputElement = GeneralModule.generateElement("input", ["points-input"], "0", {"type":"text"});
            pointArray.push({
                points: 0,
                canceled: false,
                pointInputElement: inputElement,
            });
        }
        let totalPointsTd = GeneralModule.generateElement("td", ["points"]);
        let positionTd = GeneralModule.generateElement("td", ["points"]);
        this.stats[fighter.id] = {
            "points": pointArray,
            "totalPoints": 0,
            "totalPointsTd": totalPointsTd,
            "position": null,
            "positionTd": positionTd,
        };
    }

    /**
     * This function updates the (whole) statistic of a fighter
     * @param fighter {Object} The fighter of which the statistic should be updated
     * @param statObject {Object} This object contains the new points for the fighter
     */
    updateStatForFighter(fighter, statObject) {
        if (this.stats[fighter.id]) {
            if (statObject["points"].length === this.numberReferees) {
                let fighterStat = this.stats[fighter.id];
                fighterStat["sum"] = statObject["sum"];
                fighterStat["sumTd"].innerHTML = statObject["sum"] + "";
                if (statObject["position"]) {
                    fighterStat["position"] = statObject["position"];
                    fighterStat["positionTd"].innerHTML = statObject["position"] + "";
                }
                let newPointsArray = statObject["points"];
                let i = 0;
                newPointsArray.forEach((pointObject) => {
                    this.changeStatBySystem(fighter, i++, pointObject["points"], pointObject["canceled"]);
                });
            }
        }
    }

    removeStat(fighter) {
        delete this.stats[fighter.id];
    }

    changeReferees(newNumberReferees) {
        if (this.numberReferees > newNumberReferees) {
            for (let fighterStat in this.stats) {
                if (this.stats.hasOwnProperty(fighterStat)) {
                    fighterStat["points"] = fighterStat["points"].slice(0, this.numberReferees);
                }
            }
        } else {
            for (let fighterStat in this.stats) {
                if (this.stats.hasOwnProperty(fighterStat)) {
                    let diffNumberReferees = newNumberReferees - this.numberReferees;

// append the "missing" number of referees to each fighter
                    for (let i = 0; i < diffNumberReferees; i++) {
                        let inputElement = GeneralModule.generateElement("input", ["points-input"], "0", {"type":"text"});
                        fighterStat["points"].push({
                            points: 0,
                            canceled: false,
                            pointInputElement: inputElement,
                        });
                    }
                }
            }
        }
        this.numberReferees = newNumberReferees;
    }

    /**
     * This function changes a fighters statistic after it has been manually changed by a user
     * @param changedInputElement {HTMLElement} The respective td element that has been changed
     */
    changeStatByUser(changedInputElement) {
        if (changedInputElement.classList.contains("points-input")) {
            let newPoints = parseInt(changedInputElement.value);
            let fighter;
// iterate over all the fighter statistics in the statistics object
            for (let fighterStat in this.stats) {
                if (this.stats.hasOwnProperty(fighterStat)) {

// get the point array
                    let pointsArray = fighterStat["points"];

// iterate over the point array
                    pointsArray.forEach((pointsObject) => {
                        if (pointsObject.pointInputElement === changedInputElement) {
                            pointsObject.points = newPoints;
                        }
                    });
                }
            }
            this.calculateTotalPoints();
        }
    }

    /**
     * This function changes the points of a fighter (the change on this particular frontend-device was not initiated by the user)
     * @param fighter {Object} The fighter of which the statistics have to be updated
     * @param pointObjectIndex {Number} The index of the point object in the point array that is being changed
     * @param newPoints {Number} The new points
     * @param canceled {Boolean} This parameter determines if the new points are canceled (which means that they are not counted to the total points)
     */
    changeStatBySystem(fighter, pointObjectIndex, newPoints, canceled) {
        if (this.stats[fighter.id] !== undefined) {
            let fighterStat = this.stats[fighter.id];

// get the point array
            let pointsArray = fighterStat["points"];

            pointsArray[pointObjectIndex].points = newPoints;
            pointsArray[pointObjectIndex].inputElement.innerHTML = newPoints + "";
        }
    }

    /**
     * This function automatically cancels points from fighters statistics
     * @param fighter {Object} The fighter where points are canceled
     * @param cancelIndex {Number} The index of the respective points in the points array which should be canceled
     */
    cancelPoints(fighter , cancelIndex) {
        if (this.stats[fighter.id] !== undefined) {
            let fighterStat = this.stats[fighter.id];

// get the point array
            let pointsArray = fighterStat["points"];

            pointsArray[cancelIndex].canceled = true;
            pointsArray[cancelIndex].inputElement.classList.add("canceled");
        }
    }

    /**
     * This function calculates the current total points of a given fighter
     * @param fighter {Object}
     */
    calculateTotalPoints(fighter) {
        if (this.stats[fighter.id] !== undefined) {
            let fighterStat = this.stats[fighter.id];

            let totalPoints = 0;

// get the point array
            let pointsArray = fighterStat["points"];

            pointsArray.forEach((pointObject) => {
                if (!pointObject.canceled) {
                    totalPoints += pointObject.points;
                }
            });

            fighterStat.totalPoints = totalPoints;
            fighterStat.totalPointsTd.innerHTML = totalPoints + "";
        }
    }

}

class Tables extends FightingSystem {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.TABLES;

        this.numberReferees = 7;
        this.rounds = 1;
        if (this.fighters.length > 4) {
            this.rounds = 2;
        }
        if (this.fighters.length > 12) {
            this.rounds = 3;
        }

        this.tables = [];

        this.tables.push(new FightTable(this.fighters, this.numberReferees));
        if (this.fighters.length > 12) {
            this.tables.push(new FightTable([].length = 12), this.numberReferees);
        }
        if (this.fighters.length > 4) {
            this.tables.push(new FightTable([].length = 4, this.numberReferees));
        }

    }

    change() {
        let numberRefereeInput = createInput(GeneralModule.generalVariables.inputTypes.RANGE, undefined, undefined, "number-referees", "Anzahl Kampfrichter", this.numberReferees, undefined, undefined);
        numberRefereeInput.setMin(3);
        numberRefereeInput.setMax(15);
        ModalModule.confirmModal("Tafelsystem anpassen", numberRefereeInput.inputContainer, function () {
            this.numberReferees = numberRefereeInput.getValue();
            this.tables.forEach((table) => {
                table.initializeTable();
            });
        }.bind(this), undefined, undefined);
    }

    toElement() {
        let container = GeneralModule.generateElement("div", ["tafeln"], undefined, undefined);

        this.tables.forEach((table) => {
            let tableElement = GeneralModule.generateElement("table", ["tafel"], undefined, undefined);

            let thead = GeneralModule.generateElement("thead", undefined, undefined, undefined);
            let tr = GeneralModule.generateElement("tr");
            tr.appendChild(GeneralModule.generateElement("th", undefined, "Teilnehmer"));
            for (let i = 1; i < this.numberReferees; i++) {
                tr.appendChild(GeneralModule.generateElement("th", ["points"], i + ""));
            }
            tr.appendChild(GeneralModule.generateElement("th", ["points"], "Gesamt"));
            tr.appendChild(GeneralModule.generateElement("th", undefined, "Platzierung"));
            thead.appendChild(tr);
            tableElement.appendChild(thead);

            let tbody = GeneralModule.generateElement("tbody");
            table.fighters.forEach((fighter) => {
                let tr = GeneralModule.generateElement("tr");

                if (typeof fighter !== "undefined") {
                    tr.appendChild(GeneralModule.generateElement("td", undefined, fighter.firstName + " " + fighter.lastName));
                } else {
                    tr.appendChild(GeneralModule.generateElement("td", undefined));
                }

                for (let i = 0; i < this.numberReferees - 1; i++) {
                    let pointTd = GeneralModule.generateElement("td", ["points"]);
                    let points = table.points[fighter.id]["refereePoints"][i];
                    pointTd.appendChild(GeneralModule.generateElement("input", undefined, points, {"type":"text"}));
                    tr.appendChild(pointTd);
                }

                let sumPoints = table.points[fighter.id]["sum"];
                tr.appendChild(GeneralModule.generateElement("td", undefined, sumPoints));

                let position = table.points[fighter.id]["position"];
                if (typeof position !== "undefined") {
                    tr.appendChild(GeneralModule.generateElement("td", undefined, position));
                } else {
                    tr.appendChild(GeneralModule.generateElement("td", undefined, ""));
                }

                tbody.appendChild(tr);

            });

            container.appendChild(tableElement);

            return container;

        });

    }

}

class Fight {
    constructor(fighter1, fighter2, number) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.winner = undefined;
        this.loser = undefined;
        this.number = number;

// these two properties are only necessary for the binary fight tree
        this.left = undefined;
        this.right = undefined;
    }

    setWinner (winner) {
        if (this.fighter1 === winner) {
            this.winner = this.fighter1;
            this.loser = this.fighter2;
        } else {
            this.winner = this.fighter2;
            this.loser = this.fighter1;
        }
    }

}

class DogEatDog extends FightingSystem {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.DOGEATDOG;
        this.fights = [];

        this.points = {};
        this.fighters.forEach((fighter) => {
            this.points[fighter.id] = {
                "wins": 0,
                "losses": 0,
                "position": 0,
            };
        });

        this.calculateFights();
    }

    changeFighters() {
        this.calculateFights();
    }

    calculateFights() {
        let fights = [];

// calculate all fights (so that each fighter fights all the others once)
        for (let i = 0; i < this.fighters.length - 1; i++) {
            for (let j = i + 1; j < this.fighters.length; j++) {
                let newFight = new Fight(this.fighters[i], this.fighters[j]);
                fights.push(newFight);
            }
        }

        let fightNumber = 1;

// mix the calculated fights up to enable some breaks for the fighters
        let iterations = fights.length;
        for (let i = 0; i < iterations; i++) {
            let fight;
            if (i % 2 === 0) {
                fight = fights.shift();
            } else {
                fight = fights.pop();
            }
            fight.number = fightNumber++;
            this.fights.push(fight);
        }

    }

    getFightWithNumber(number) {
        let wantedFight = undefined;
        if (typeof number === "number") {
            this.fights.forEach((fight) => {
                if (fight.number === number) {
                    wantedFight = fight;
                }
            });
        }
        return wantedFight;
    }

    change() {
        let newOrder = this.fights.slice();
        let This = this;
        let dogEatDogContainer = GeneralModule.generateElement("div", ["dog-eat-dog"]);
        dogEatDogContainer.appendChild(this.fightsToElement());

        dogEatDogContainer.addEventListener("mousedown", handlePick);

        function handlePick(e) {
            let target = e.target;
            while (target.nodeName !== "BODY" && !target.classList.contains("fight")) {
                target = target.parentElement;
            }
            if (target.classList.contains("fight")) {
                let pickedFightNumber = parseInt(target.querySelector("span.number").textContent.trim());
                let fight = This.getFightWithNumber(pickedFightNumber);
                let allOtherFightNumbers = [];
                newOrder.forEach((fight) => {
                    if (fight.number !== pickedFightNumber) {
                        allOtherFightNumbers.push(fight.number);
                    }
                });

                let radioOptions = [];
                allOtherFightNumbers.forEach((fightNumber) => {
                    let option = {};
                    option["text"] = "Kampf Nr. " + fightNumber;
                    option["value"] = fightNumber;
                    option["checked"] = false;
                    radioOptions.push(option);
                });

                let radioInput = createInput(GeneralModule.generalVariables.inputTypes.RADIO, ["required"], undefined, "change-fight", undefined, undefined, undefined, radioOptions);
                radioInput.inputContainer.querySelectorAll("label.radio-input-container").forEach((radioLabel) => {
                    radioLabel.style.display = "block";
                });

                ModalModule.confirmModal("Kampf tauschen mit Kampf Nummer...", radioInput.inputContainer, function () {
                        let chosenFightNumber = parseInt(radioInput.getValue());
                        let fightToChange = This.getFightWithNumber(chosenFightNumber);
                        let fightToChangeElement = target.parentElement.firstChild;
                        while (fightToChangeElement && parseInt(fightToChangeElement.querySelector("span.number").innerText.trim()) !== chosenFightNumber) {
                            fightToChangeElement = fightToChangeElement.nextElementSibling;
                        }

                        let fightIndex = newOrder.indexOf(fight);
                        let fightToChangeIndex = newOrder.indexOf(fightToChange);

// renumber fights in object properties
                        let aux1 = fight.number;
                        fight.number = fightToChange.number;
                        fightToChange.number = aux1;

// swap fights in array
                        let aux2 = newOrder[fightIndex];
                        newOrder[fightIndex] = fightToChange;
                        newOrder[fightToChangeIndex] = aux2;

// swap fights in element container
                        let parent = target.parentElement;
                        let nextTargetElement = target.nextElementSibling;
                        if (nextTargetElement !== fightToChangeElement) {
                            console.log("hi");
                            parent.insertBefore(target, fightToChangeElement);
                            if (nextTargetElement) {
                                parent.insertBefore(fightToChangeElement, nextTargetElement);
                            } else {
                                parent.appendChild(fightToChangeElement);
                            }
                        } else {
                            parent.insertBefore(fightToChangeElement, target);
                        }

// renumber elements
                        target.querySelector("span.number").innerHTML = fight.number;
                        fightToChangeElement.querySelector("span.number").innerHTML = fightToChange.number;

                    }, undefined
                    , function () {
                        return checkInput(radioInput.inputContainer, true);
                    });

            }
        }

        function abortion() {
// revoke renumbering
            for (let i = 0; i < This.fights.length - 1; i++) {
                This.fights[i].number = i + 1;
            }
        }

        function applyChanges() {
            this.fights = newOrder;
        }

        customChangeFightingSystemModal("Kampfreihenfolge Jeder-Gegen-Jeden anpassen", dogEatDogContainer, abortion, applyChanges);

    }

    toElement() {
        let container = GeneralModule.generateElement("div", ["dog-eat-dog", "clearfix"]);

        let winLoseTable = GeneralModule.generateElement("table", ["win-lose-table", "participants"]);
        let thead = GeneralModule.generateElement("thead");
        let theadTr = GeneralModule.generateElement("tr");
        theadTr.appendChild(GeneralModule.generateElement("th", undefined, "Teilnehmer"));
        theadTr.appendChild(GeneralModule.generateElement("th", undefined, "Gewonnen"));
        theadTr.appendChild(GeneralModule.generateElement("th", undefined, "Verloren"));
        thead.appendChild(theadTr);
        winLoseTable.appendChild(thead);

        let tbody = GeneralModule.generateElement("tbody");

        this.fighters.forEach((fighter) => {
            let tr = GeneralModule.generateElement("tr");
            tr.appendChild(GeneralModule.generateElement("td", undefined, fighter.firstName + " " + fighter.lastName));
            let winsTd = GeneralModule.generateElement("td", ["points"], fighter.firstName + " " + fighter.lastName);
            let wins = this.points[fighter.id]["wins"];
            winsTd.appendChild(GeneralModule.generateElement("input", undefined, wins + "", {"type":"text"}));
            tr.appendChild(winsTd);

            let lossesTd = GeneralModule.generateElement("td", ["points"], fighter.firstName + " " + fighter.lastName);
            let losses = this.points[fighter.id]["losses"];
            lossesTd.appendChild(GeneralModule.generateElement("input", undefined, losses + "", {"type":"text"}));
            tr.appendChild(lossesTd);

            tbody.appendChild(tr);

        });

        winLoseTable.appendChild(tbody);

        container.appendChild(winLoseTable);

        container.appendChild(this.fightsToElement());

        return container;

    }

    fightsToElement() {
        let fightOrderElement = GeneralModule.generateElement("div", ["fight-order"]);

        this.fights.forEach((fight) => {
            let fightElement = GeneralModule.generateElement("div", ["fight"]);
            fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter1"], fight.fighter1.firstName + " " + fight.fighter1.lastName));
            fightElement.appendChild(GeneralModule.generateElement("span", ["number"], fight.number));
            fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter2"], fight.fighter2.firstName + " " + fight.fighter2.lastName));
            fightOrderElement.appendChild(fightElement);
        });

        return fightOrderElement;
    }

}

// This class represents the binary fight tree that is necessary for every fighting system based on the KO System. A binary fight tree can always be imagined like the soccer world cup match order.
class BinaryFightTree {
    constructor(fighters, isConsolation, startNumber) {
        this.lastFight = undefined;
        this.fighters = fighters;
        this.startNumber = startNumber;
        this.fights = [];

// This property determines if this tree is a consolation tree (for the fighters who lost in the first place)
        this.isConsolation = isConsolation;

        this.numberFighters = this.fighters.length;

// This property holds the number of all fights in this tree
        this.numberFights = this.fighters.length - 1;

// This property holds the number of "levels" in this tree
        this.numberLevels = Math.floor((Math.log(this.numberFighters) / Math.log(2)));

// This property holds the number of "pre-fights" in this tree. A pre-fight is basically a regular fight but it doesn't fit on the lowest level anymore and needs to open a new "pre-level"
        this.numberPreFights = this.numberFighters % Math.pow(2, this.numberLevels);

    }

    buildTree() {
        let numberFights;
        let lowerLimit;
        if (this.startNumber) {
            numberFights = this.numberFights + this.startNumber;
            lowerLimit = this.startNumber;
        } else {
            numberFights = this.numberFights;
            lowerLimit = 0;
        }
        let newNodes = [];
        this.lastFight = new Fight(undefined, undefined, numberFights--);
        newNodes.push(this.lastFight);
        this.fights.push(this.lastFight);

        for (numberFights; numberFights > lowerLimit; numberFights--) {
            let currentNode = newNodes.shift();
            let newFight = new Fight(undefined, undefined, numberFights);
            this.fights.unshift(newFight);
            newNodes.push(newFight);
            if (typeof currentNode.left === "undefined") {
                currentNode.left = newFight;
                newNodes.unshift(currentNode);
            } else {
                currentNode.right = newFight;
            }
        }

        if (this.isConsolation) {
            this.fighters = [];
        } else {
            this.assignFighters(newNodes);
        }

    }

    assignFighters(leafNodes) {
        let fighters = this.fighters.slice();
        leafNodes.forEach((leafNode) => {
            leafNode.fighter1 = fighters.shift();
            if (typeof leafNode.left === "undefined") {
                leafNode.fighter2 = fighters.shift();
            }
        });
    }

    findAllLeafNodes() {
        let leafNodes = {
            "level1LeafNodes": [],
            "level2LeafNodes": [],
        };

        let numberLeafNodes = Math.ceil(this.numberFighters / 2);

        for (let i = 0; i < this.numberPreFights; i++) {
            leafNodes["level1LeafNodes"].push(this.fights[i]);
        }

        for (let j = this.numberPreFights; j < numberLeafNodes; j++) {
            leafNodes["level2LeafNodes"].push(this.fights[j]);
        }

        return leafNodes;

    }

    leavesToElement() {

        let leafNodes = this.findAllLeafNodes();

        let tree = GeneralModule.generateElement("div", ["tree", "clearfix"]);

// Just add this column, if there are so-called pre-fights
        if (leafNodes["level1LeafNodes"].length > 0) {
            let column1 = GeneralModule.generateElement("div", ["column"]);
            leafNodes["level1LeafNodes"].forEach((leafNode) => {
                let fightElement = GeneralModule.generateElement("div", ["fight"]);
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter1"], leafNode.fighter1.firstName + " " + leafNode.fighter1.lastName));
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter2"], leafNode.fighter2.firstName + " " + leafNode.fighter2.lastName));
                fightElement.appendChild(GeneralModule.generateElement("span", ["fight-number"], leafNode.number));

                column1.appendChild(fightElement);
            });

            tree.appendChild(column1);
        }

        let column2 = GeneralModule.generateElement("div", ["column"]);
        leafNodes["level2LeafNodes"].forEach((leafNode) => {
            let fightElement = GeneralModule.generateElement("div", ["fight"]);
            fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter1"], leafNode.fighter1.firstName + " " + leafNode.fighter1.lastName));
            if (typeof leafNode.fighter2 !== "undefined") {
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter2"], leafNode.fighter2.firstName + " " + leafNode.fighter2.lastName));
            } else {
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter2"]));
            }
            fightElement.appendChild(GeneralModule.generateElement("span", ["fight-number"], leafNode.number));

            column2.appendChild(fightElement);
        });

// check if to fill second column up with "empty" fight elements (just for nicer look)
        if (leafNodes["level1LeafNodes"].length > 1) {
            let numberEmptyFightElements = Math.floor(this.numberPreFights / 2);
            let numbering = leafNodes["level2LeafNodes"][leafNodes["level2LeafNodes"].length - 1].number + 1;
            for (let i = 0; i < numberEmptyFightElements; i++) {
                let fightElement = GeneralModule.generateElement("div", ["fight"]);
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter1"]));
                fightElement.appendChild(GeneralModule.generateElement("span", ["fighter", "fighter2"]));
                fightElement.appendChild(GeneralModule.generateElement("span", ["fight-number"], numbering++));

                column2.appendChild(fightElement);
            }
        }

        tree.appendChild(column2);

        return tree;
    }

    toElement() {
        let tree = GeneralModule.generateElement("div", ["tree", "clearfix"]);


        return tree;
    }

}

class KO extends FightingSystem {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.KO;
        this.binaryFightTree = new BinaryFightTree(this.fighters, false);
        this.binaryFightTree.buildTree();
        this.binaryFightTree.lastFight.number++;

        this.winner = this.binaryFightTree.lastFight.winner;
        this.second = this.binaryFightTree.lastFight.loser;

        this.fightForThird = new Fight(undefined, undefined, this.binaryFightTree.lastFight.number - 1);
        this.third = this.fightForThird.winner;
    }

    change() {
        let This = this;
        let koSystemContainer = GeneralModule.generateElement("div", ["ko-system-tree-container"]);
        koSystemContainer.appendChild(this.binaryFightTree.leavesToElement());

        if (this.binaryFightTree.numberPreFights > 0) {
            let marginTop1Unit = 8;
            let numberMarginUnits = this.fighters.length - (this.binaryFightTree.numberPreFights * 2);

            koSystemContainer.querySelector("div.column div.fight").style.marginTop = marginTop1Unit * numberMarginUnits + "em";
        }

        let changes = [];

        koSystemContainer.addEventListener("click", handlePick);

        function handlePick(e) {
            let target = e.target;
            while (target.nodeName !== "BDOY" && !target.classList.contains("fighter")) {
                target = target.parentElement;
            }
            if (target.classList.contains("fighter")) {
                let chosenFighterName = target.innerText;
                let changeFighterOptions = [];
                let leafNodes = This.binaryFightTree.findAllLeafNodes();
                let allLeafNodes = [];
                allLeafNodes = allLeafNodes.concat(leafNodes["level1LeafNodes"]);
                allLeafNodes = allLeafNodes.concat(leafNodes["level2LeafNodes"]);
                allLeafNodes.forEach((fight) => {
                    if (fight.fighter1 && fight.fighter1.fullName !== chosenFighterName) {
                        changeFighterOptions.push({
                            "text": fight.fighter1.fullName + " aus Kampf Nr. " + fight.number,
                            "value": fight.fighter1.id,
                            "checked": false,
                        });
                    }
                    if (fight.fighter2 && fight.fighter2.fullName !== chosenFighterName) {
                        changeFighterOptions.push({
                            "text": fight.fighter2.fullName + " aus Kampf Nr. " + fight.number,
                            "value": fight.fighter2.id,
                            "checked": false,
                        });
                    }
                });
                let radioInput = createInput(GeneralModule.generalVariables.inputTypes.RADIO, undefined, undefined, "change-ko-fighter", undefined, undefined, undefined, changeFighterOptions);
                radioInput.inputContainer.querySelectorAll("label.radio-input-container").forEach((radioLabel) => {
                    radioLabel.style.display = "block";
                });
                ModalModule.confirmModal("\"" + chosenFighterName + "\" tauschen mit Kämpfer...", radioInput.inputContainer, function () {

// change the displaying of the names in the HTML
                    let changeFighterId = radioInput.getValue();
                    let changeFighter = getPersonById(changeFighterId);
                    let fighterElements = koSystemContainer.querySelectorAll("span.fighter");
                    fighterElements.forEach((fighterElement) => {
                        if (fighterElement.innerText.trim() === changeFighter.fullName) {
                            fighterElement.innerHTML = chosenFighterName;
                        }
                    });
                    target.innerHTML = changeFighter.fullName;

// change the representing objects
                    let targetNumber = parseInt(target.parentElement.querySelector("span.fight-number").innerText);
                    let targetFight;
                    let changeFight;
                    allLeafNodes.forEach((fight) => {
                        if (fight.number === targetNumber) {
                            targetFight = fight;
                        }
                        if (fight.fighter1 && fight.fighter1.id === changeFighterId) {
                            changeFight = fight;
                            changeFighter = "fighter1";
                        }
                        if (fight.fighter2 && fight.fighter2.id === changeFighterId) {
                            changeFight = fight;
                            changeFighter = "fighter2";
                        }
                    });
                    let targetFighter;
                    if (targetFight) {
                        if (targetFight.fighter1.fullName === chosenFighterName) {
                            targetFighter = "fighter1";
                        } else {
                            targetFighter = "fighter2";
                        }
                    }
                    changes.push(
                        [{"fight": targetFight, "fighter": targetFighter}, {"fight": changeFight, "fighter": changeFighter}]
                    );

                }, undefined, function () {
                    return checkInput(radioInput.inputContainer, true);
                });
            }
        }

        function abortion() {
            console.log("Abort");
        }

        function applyChanges() {
            changes.forEach((change) => {
                let aux = change[0]["fight"][change[0]["fighter"]];
                change[0]["fight"][change[0]["fighter"]] = change[1]["fight"][change[1]["fighter"]];
                change[1]["fight"][change[1]["fighter"]] = aux;
            });
        }

        customChangeFightingSystemModal("Startkonfiguration des KO-Systems anpassen", koSystemContainer, abortion, applyChanges);

    }

}

class DoubleKO extends FightingSystem {
    constructor(fighters) {
        super();
        this.fightingSystemType = fightingSystemTypes.DOUBLEKO;
        this.binaryFightTree = new BinaryFightTree(this.fighters, false);

        let auxiliaryFighters = this.fighters.slice();
        auxiliaryFighters.length = auxiliaryFighters.length - 2;
        this.consolationBinaryFightTree = new BinaryFightTree(auxiliaryFighters, true, this.binaryFightTree.lastFight.number);

        this.binaryFightTree.lastFight.number = this.consolationBinaryFightTree.lastFight.number + 1;

        this.fightForSecond = new Fight(undefined, undefined, this.binaryFightTree.lastFight.number + 1);

        this.second = this.fightForSecond.winner;
        this.third = this.fightForSecond.loser;

    }
}

class KOWithTables extends KO {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.KOWITHTABLES;

        this.winner1 = this.binaryFightTree.lastFight.left.fighter1;
        this.winner2 = this.binaryFightTree.lastFight.left.fighter2;
        this.winner3 = this.binaryFightTree.lastFight.right.fighter1;
        this.winner4 = this.binaryFightTree.lastFight.right.fighter2;

        this.table = new Tables([this.winner1, this.winner2, this.winner3, this.winner4]);

    }
}

class DoubleKOWithTables extends DoubleKO {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.DOUBLEKOWITHTABLES;

        this.winner1 = this.binaryFightTree.lastFight.fighter1;
        this.winner2 = this.binaryFightTree.lastFight.fighter2;
        this.winner3 = this.consolationBinaryFightTree.lastFight.fighter1;
        this.winner4 = this.consolationBinaryFightTree.lastFight.fighter2;

        this.table = new Tables([this.winner1, this.winner2, this.winner3, this.winner4]);

    }
}

class BrazilianKO extends KO {
    constructor(fighters) {
        super(fighters);
        this.fightingSystemType = fightingSystemTypes.BRAZILIANKO;

        this.binaryFightTree = new BinaryFightTree(this.fighters, false);
        this.binaryFightTree.buildTree();

        this.losersAgainstWinner = [];



    }
}

function createFightingSystemFactory(fightingSystemType, fighters) {
    switch (fightingSystemType) {
        case fightingSystemTypes.TABLES:
            return new Tables(fighters);
        case fightingSystemTypes.DOGEATDOG:
            return new DogEatDog(fighters);
        case fightingSystemTypes.KO:
            return new KO(fighters);
        case fightingSystemTypes.DOUBLEKO:
            return new DoubleKO(fighters);
        case fightingSystemTypes.KOWITHTABLES:
            return new KOWithTables(fighters);
        case fightingSystemTypes.DOUBLEKOWITHTABLES:
            return new DoubleKOWithTables(fighters);
        case fightingSystemTypes.BRAZILIANKO:
            return new BrazilianKO(fighters);
        default:
            return undefined;
    }
}

function createBinaryFightTree_debug(fighters) {
    return new BinaryFightTree(fighters);
}

/**
 * API:
 */
export {
    createFightingSystemFactory,
    createBinaryFightTree_debug
}
