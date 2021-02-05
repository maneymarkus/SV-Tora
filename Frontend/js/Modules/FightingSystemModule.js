/**
 * This Module contains code responsible for managing all the different fighting systems and specific behaviour
 */
var FightingSystemModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["ModalModule", "MaterialInputsModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let fightingSystemTypes = GeneralModule.generalVariables.fightingSystemTypes;

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

      this.points = {};

      if (typeof this.fighters[0] !== "undefined") {
        this.initializeTable();
      }

    }

    setFighters(fighters) {
      this.fighters = fighters;
      this.initializeTable();
    }

    initializeTable() {
      if (typeof this.fighters[0] !== "undefined") {
        this.fighters.forEach((fighter) => {
          let pointArray = [];
          for (let i = 0; i < this.numberReferees - 1; i++) {
            pointArray.push({
              points: 0,
              canceled: false,
            });
          }
          this.points[fighter.id] = {
            "refereePoints": pointArray,
            "sum": 0,
            "position": undefined,
          };
        });
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
      let numberRefereeInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.RANGE, undefined, undefined, "number-referees", "Anzahl Kampfrichter", this.numberReferees, undefined, undefined);
      numberRefereeInput.setMin(3);
      numberRefereeInput.setMax(15);
      ModalModule.confirmModalApi("Tafelsystem anpassen", numberRefereeInput.inputContainer, function () {
        this.numberReferees = numberRefereeInput.getValue();
        this.tables.forEach((table) => {
          table.initializeTable();
        });
      }.bind(this), undefined, undefined);
    }

    toElement() {
      let container = GeneralModule.generateElementApi("div", ["tafeln"], undefined, undefined);

      this.tables.forEach((table) => {
        let tableElement = GeneralModule.generateElementApi("table", ["tafel"], undefined, undefined);

        let thead = GeneralModule.generateElementApi("thead", undefined, undefined, undefined);
        let tr = GeneralModule.generateElementApi("tr");
        tr.appendChild(GeneralModule.generateElementApi("th", undefined, "Teilnehmer"));
        for (let i = 1; i < this.numberReferees; i++) {
          tr.appendChild(GeneralModule.generateElementApi("th", ["points"], i + ""));
        }
        tr.appendChild(GeneralModule.generateElementApi("th", ["points"], "Gesamt"));
        tr.appendChild(GeneralModule.generateElementApi("th", undefined, "Platzierung"));
        thead.appendChild(tr);
        tableElement.appendChild(thead);

        let tbody = GeneralModule.generateElementApi("tbody");
        table.fighters.forEach((fighter) => {
          let tr = GeneralModule.generateElementApi("tr");

          if (typeof fighter !== "undefined") {
            tr.appendChild(GeneralModule.generateElementApi("td", undefined, fighter.firstName + " " + fighter.lastName));
          } else {
            tr.appendChild(GeneralModule.generateElementApi("td", undefined));
          }

          for (let i = 0; i < this.numberReferees - 1; i++) {
            let pointTd = GeneralModule.generateElementApi("td", ["points"]);
            let points = table.points[fighter.id]["refereePoints"][i];
            pointTd.appendChild(GeneralModule.generateElementApi("input", undefined, points, {"type":"text"}));
            tr.appendChild(pointTd);
          }

          let sumPoints = table.points[fighter.id]["sum"];
          tr.appendChild(GeneralModule.generateElementApi("td", undefined, sumPoints));

          let position = table.points[fighter.id]["position"];
          if (typeof position !== "undefined") {
            tr.appendChild(GeneralModule.generateElementApi("td", undefined, position));
          } else {
            tr.appendChild(GeneralModule.generateElementApi("td", undefined, ""));
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

      // mix the calculated fights up to enable some breaks for the fighters
      let iterations = fights.length;
      for (let i = 0; i < iterations; i++) {
        if (i % 2 === 0) {
          this.fights.push(fights.shift());
        } else {
          this.fights.push(fights.pop());
        }
      }
    }

    change() {

    }

    toElement() {
      let container = GeneralModule.generateElementApi("div", ["dog-eat-dog", "clearfix"]);

      let winLoseTable = GeneralModule.generateElementApi("table", ["win-lose-table", "participants"]);
      let thead = GeneralModule.generateElementApi("thead");
      let theadTr = GeneralModule.generateElementApi("tr");
      theadTr.appendChild(GeneralModule.generateElementApi("th", undefined, "Teilnehmer"));
      theadTr.appendChild(GeneralModule.generateElementApi("th", undefined, "Gewonnen"));
      theadTr.appendChild(GeneralModule.generateElementApi("th", undefined, "Verloren"));
      thead.appendChild(theadTr);
      winLoseTable.appendChild(thead);

      let tbody = GeneralModule.generateElementApi("tbody");

      this.fighters.forEach((fighter) => {
        let tr = GeneralModule.generateElementApi("tr");
        tr.appendChild(GeneralModule.generateElementApi("td", undefined, fighter.firstName + " " + fighter.lastName));
        let winsTd = GeneralModule.generateElementApi("td", ["points"], fighter.firstName + " " + fighter.lastName);
        let wins = this.points[fighter.id]["wins"];
        winsTd.appendChild(GeneralModule.generateElementApi("input", undefined, wins + "", {"type":"text"}));
        tr.appendChild(winsTd);

        let lossesTd = GeneralModule.generateElementApi("td", ["points"], fighter.firstName + " " + fighter.lastName);
        let losses = this.points[fighter.id]["losses"];
        lossesTd.appendChild(GeneralModule.generateElementApi("input", undefined, losses + "", {"type":"text"}));
        tr.appendChild(lossesTd);

        tbody.appendChild(tr);

      });

      winLoseTable.appendChild(tbody);

      let fightOrderElement = GeneralModule.generateElementApi("div", ["fight-order"]);

      this.fights.forEach((fight) => {
        let fightElement = GeneralModule.generateElementApi("div", ["fight"]);
        fightElement.appendChild(GeneralModule.generateElementApi("span", ["fighter", "fighter1"], fight.fighter1.firstName + " " + fight.fighter1.lastName));
        fightElement.appendChild(GeneralModule.generateElementApi("span", ["number"], fight.fighter1));
        fightElement.appendChild(GeneralModule.generateElementApi("span", ["fighter", "fighter2"], fight.fighter2.firstName + " " + fight.fighter2.lastName));
        fightOrderElement.appendChild(fightElement);
      });

      return container;

    }

  }

  // This class represents the binary fight tree that is necessary for every fighting system based on the KO System. A binary fight tree can always be imagined like the soccer world cup match order.
  class BinaryFightTree {
    constructor(fighters, isConsolation, startNumber) {
      this.lastFight = undefined;
      this.fighters = fighters;
      this.startNumber = startNumber;

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

      for (numberFights; numberFights > lowerLimit; numberFights--) {
        let currentNode = newNodes.shift();
        let newFight = new Fight(undefined, undefined, numberFights);
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

    findALlLeafNodes() {
      let leafNodes = [];

      let nodesToCheck = [];

      if (this.lastFight) {
        nodesToCheck.push(this.lastFight);
      }

      while(nodesToCheck.length !== 0) {
        let currentNode = nodesToCheck.shift();
        if (typeof currentNode.left === "undefined" || typeof currentNode.right === "undefined") {
          leafNodes.push(currentNode);
        }
        if (typeof currentNode.left !== "undefined") {
          nodesToCheck.push(currentNode.left);
        }
        if (typeof currentNode.right !== "undefined") {
          nodesToCheck.push(currentNode.right);
        }
      }

      return leafNodes;

    }

    toElement() {
      let tree = GeneralModule.generateElementApi("div", ["tree", "clearfix"]);


      return tree;
    }

  }

  class KO extends FightingSystem {
    constructor(fighters) {
      super(fighters);
      this.fightingSystemType = fightingSystemTypes.KO;
      this.binaryFightTree = new BinaryFightTree(this.fighters, false);
      this.binaryFightTree.lastFight.number++;

      this.winner = this.binaryFightTree.lastFight.winner;
      this.second = this.binaryFightTree.lastFight.loser;

      this.fightForThird = new Fight(undefined, undefined, this.binaryFightTree.lastFight.number - 1);
      this.third = this.fightForThird.winner;
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


  /**
   * API:
   */
  return {
    createFightingSystemApi: function (fightingSystemType, fighters) {
      return createFightingSystemFactory(fightingSystemType, fighters);
    },
    createBinaryFightTree_debug: function (fighters) {
      return new BinaryFightTree(fighters);
    }
  }

})(window, document);
