/**
 * This Module contains code responsible for managing the regular login and login form, as well as the registration and registration forms
 */
var LoginRegistrationModule = (function(window, document, undefined) {

  /**
   * DEPENDENCIES
   */
  let dependencies = ["SecondaryButtonModule", "MaterialInputsModule", "FormModule", "ModalModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let loginContainers = [];
  let registrationContainers = [];

  let loginSubmitFormFunction = undefined;
  let registrationSubmitFormFunction = undefined;

  /**
   * This "class" represents a login form (container) and enables a detailed control over it
   * @param loginContainerElement {HTMLElement} The respective HTML form element this object represents
   * @constructor
   */
  let LoginContainer = function(loginContainerElement) {
    let This = this;
    this.loginContainerElement = loginContainerElement;
    this.form = this.loginContainerElement.querySelector("form");
    this.loginButton = this.loginContainerElement.querySelector(".secondary-button.login-button");
    this.passwordForgottenButton = this.loginContainerElement.querySelector(".link.password-forgotten");

    SecondaryButtonModule.disableSecondaryButtonApi(this.loginButton);

    this.loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (FormModule.checkFormApi(This.form, true)) {
        submitForm(This.form, true);
      }
    });

    this.loginContainerElement.addEventListener("input", function () {
      if (FormModule.checkFormApi(This.form, false)) {
        SecondaryButtonModule.enableSecondaryButtonApi(This.loginButton);
      } else {
        SecondaryButtonModule.disableSecondaryButtonApi(This.loginButton);
      }
    });

    this.passwordForgottenButton.addEventListener("click", function () {
      let emailInput = MaterialInputsModule.createInputApi(GeneralModule.generalVariables.inputTypes.TEXT, ["email"], undefined, "email", "E-Mail-Adresse", undefined, undefined, undefined);
      ModalModule.confirmModalApi("E-Mail Adresse eingeben", emailInput.inputContainer, function () {
        passwordForgotten(emailInput.getValue());
      }, undefined, undefined);
    });

    function passwordForgotten(eMail) {
      // TODO: Finish
      console.log(eMail);
    }

  }


  /**
   * This "class" represents a registration form (container) and enables a detailed control over it
   * @param registrationContainer {HTMLElement} The respective HTML form element this object represents
   * @constructor
   */
  let RegistrationContainer = function (registrationContainer) {
    let This = this;
    this.registrationContainerElement = registrationContainer;
    this.form = this.registrationContainerElement.querySelector("form");
    this.registerButton = this.registrationContainerElement.querySelector(".secondary-button.register-button");
    this.password1 = this.registrationContainerElement.querySelector(".repeat-1");
    this.password2 = this.registrationContainerElement.querySelector(".repeat-2");

    FormModule.checkRepetitionApi(this.password1, this.password2);

    SecondaryButtonModule.disableSecondaryButtonApi(this.registerButton);

    this.registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (FormModule.checkFormApi(This.form, true)) {
        submitForm(This.form, false);
      }
    });

    registrationContainer.addEventListener("input", function () {
      if (FormModule.checkFormApi(This.form, false)) {
        SecondaryButtonModule.enableSecondaryButtonApi(This.registerButton);
      } else {
        SecondaryButtonModule.disableSecondaryButtonApi(This.registerButton);
      }
    });

  }

  /**
   * This function submits a form
   * @param form {HTMLElement} The form that should be submitted
   * @param login {boolean} Determines if the form that should be submitted is a login or registration form
   */
  function submitForm(form, login) {
    if (login) {
      if (loginSubmitFormFunction) {
        loginSubmitFormFunction(form);
      } else {
        form.submit();
      }
    } else {
      if (registrationSubmitFormFunction) {
        registrationSubmitFormFunction(form);
      } else {
        form.submit();
      }
    }
  }

  /**
   * This block initializes the static login container elements on an application page
   */
  let loginContainerElements = document.querySelectorAll("div.login-container");
  loginContainerElements.forEach(function (loginContainer) {
    loginContainers.push(new LoginContainer(loginContainer));
  });

  /**
   * This block initializes the static registration container elements on an application page
   */
  let registrationContainerElements = document.querySelectorAll("div.registration-container");
  registrationContainerElements.forEach(function (registrationContainer) {
    registrationContainers.push(new RegistrationContainer(registrationContainer));
  });

  /**
   * API:
   */
  return {
    /**
     * This api function enables other modules to set a custom submit form function for the login form
     * @param callback {function} The function that should be called on submitting the login form
     */
    setLoginSubmitFormFunctionApi : function (callback) {
      loginSubmitFormFunction = callback;
    },
    /**
     * This api function enables other modules to set a custom submit form function for the registration form
     * @param callback {function} The function that should be called on submitting the registration form
     */
    setRegistrationSubmitFormFunctionApi : function (callback) {
      registrationSubmitFormFunction = callback;
    }
  }

})(window, document);