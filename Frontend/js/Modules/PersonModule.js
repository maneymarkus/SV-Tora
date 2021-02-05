/**
 * This Module contains code responsible for managing all different kinds of persons
 */
var PersonModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = [];
  GeneralModule.checkDependenciesApi(dependencies);

  let personTypes = GeneralModule.generalVariables.personTypes;

  let persons = [];
  let fighters = [];
  let coaches = [];
  let referees = [];
  let helpers = [];

  /**
   * This class represents a generic person and offers individual methods for handling them
   */
  class Person {
    constructor(personType, firstName, lastName, club, id) {
      this.type = personType;
      this.lastName =  lastName;
      this.firstName = firstName;
      this.club = club;
      this.id = id;
    }

    toJsonString() {}

  }

  /**
   * This class represents a fighter
   */
  class Fighter extends Person {
    constructor(personType, firstName, lastName, club, birthdate, sex, graduation) {
      super(personType, firstName, lastName, club);
      this.birthdate = birthdate;
      this.age = 0;
      this.sex = sex;
      this.graduation = graduation;

      this.calculateAge();

    }

    calculateAge() {
      let day = parseInt(this.birthdate.substring(0, this.birthdate.indexOf(".")));
      let month = parseInt(this.birthdate.substring(this.birthdate.indexOf(".") + 1, this.birthdate.indexOf(".", this.birthdate.indexOf(".") + 1))) - 1;
      let year = parseInt(this.birthdate.substring(this.birthdate.indexOf(".", this.birthdate.indexOf(".") + 1) + 1));
      let birthDate = new Date().setFullYear(year, month, day);
      let monthDiff = Date.now() - birthDate;
      let newDate = new Date(monthDiff);
      let ageYear = newDate.getUTCFullYear();

      this.age = Math.abs(ageYear - 1970);
    }

  }

  /**
   * This class represents a coach
   */
  class Coach extends Person {
    constructor(personType, firstName, lastName, club) {
      super(personType, firstName, lastName, club);
    }

  }

  /**
   * This class represents a referee
   */
  class Referee extends Person {
    constructor(personType, firstName, lastName, club) {
      super(personType, firstName, lastName, club);
    }

  }

  /**
   * This class represents a helper
   */
  class Helper extends Person {
    constructor(personType, firstName, lastName, club) {
      super(personType, firstName, lastName, club);
    }

  }

  function createPersonFactory(personType, firstName, lastName, club, birthdate, sex, graduation) {
    switch (personType) {
      case personTypes.FIGHTER:
        return new Fighter(personType, firstName, lastName, club, birthdate, sex, graduation);
      case personTypes.COACH:
        return new Coach(personType, firstName, lastName, club);
      case personTypes.REFEREE:
        return new Referee(personType, firstName, lastName, club);
      case personType.HELPER:
        return new Helper(personType, firstName, lastName, club);
      default:
        return undefined;
    }
  }

  /**
   * API:
   */
  return {
    createPersonApi : function (personType, firstName, lastName, club, birthdate, sex, graduation) {
      return createPersonFactory(personType, firstName, lastName, club, birthdate, sex, graduation);
    },
  }

})(window, document);
