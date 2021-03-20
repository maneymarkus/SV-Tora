/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

  /**
   * Dependencies
   */
  let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "MaterialInputsModule", "ModalModule", "TooltipModule", "TimeScheduleModule"];
  GeneralModule.checkDependenciesApi(dependencies);

  let main = document.querySelector("main");
  let pageControl = document.querySelector("div.page-control");
  let pageSwitcher = pageControl.querySelectorAll("a.page-switcher");
  let pages = document.querySelectorAll("div.page-container");
  let mainTimeScheduleContainer = document.querySelector("div.main.time-schedule-container");

  // enable time indicator on the main time schedule
  TimeScheduleModule.enableTimeIndicatorApi(mainTimeScheduleContainer);

  pageControl.addEventListener("click", function (e) {
    let target = e.target;
    while (target.nodeName !== "BODY" && !target.classList.contains("page-switcher")) {
      target = target.parentElement;
    }
    if (target.classList.contains("page-switcher") && !target.classList.contains("active")) {
      let targetPageClass = target.getAttribute("data-page");
      pages.forEach((page) => {
        page.classList.remove("active");
        if (page.classList.contains(targetPageClass)) {
          page.classList.add("active");
        }
      });
      pageSwitcher.forEach((pS) => {
        pS.classList.remove("active");
      });
      target.classList.add("active");
    }
  });

  /**
   * The following block contains code responsible for managing the tournament progress
   */

  let tournamentProgressContainer = document.querySelector("div.tournament-progress");
  let startSpan = tournamentProgressContainer.querySelector("span.time-start");
  let endSpan = tournamentProgressContainer.querySelector("span.time-end");
  let progressSpan = tournamentProgressContainer.querySelector("span.progress");
  let progressBar = tournamentProgressContainer.querySelector("span.progress-bar");

  mainTimeScheduleContainer.addEventListener("timeScheduleProgress", function () {
    let progressInPercent = Math.round(TimeScheduleModule.getProgressApi(mainTimeScheduleContainer) * 100);
    progressSpan.innerHTML = progressInPercent + "%";
    progressSpan.style.left = progressInPercent + "%";
    progressBar.style.width = progressInPercent + "%";
  });


  /**
   * The following block contains code responsible for recognizing interactions (more specifically: clicks) with the time schedule
   */

  main.addEventListener("click", function (e) {
    let target = e.target;
    while (document.body !== target && !target.classList.contains("time-block")) {
      target = target.parentElement;
    }
    // every category block is a time block, so if we already found a time block we can check here if it is also a category
    if (target.classList.contains("category")) {
      let categoryName = target.querySelector("span.category-name").innerText;
      enterCategoryDetailedView(categoryName);
    }
  });

  /**
   * The following block contains code responsible for managing the single pool time schedule overview
   */

  let overviewPage = document.querySelector("div.complete-overview");
  let overviewPageLocationsContainer = overviewPage.querySelector("div.locations");

  let detailViewPage = document.querySelector("div.fight-place-detail-view");
  let detailViewPageTimeScheduleElement = detailViewPage.querySelector("div.time-schedule-container");
  let fightPlaceSelectElement = detailViewPage.querySelector("div.select-input-container");
  let fightPlaceSelect = MaterialInputsModule.getInputObjectApi(fightPlaceSelectElement);
  let fightPlaceContainerElement = detailViewPage.querySelector("div.fight-place-container");
  let detailViewPageLocationsContainer = detailViewPage.querySelector("div.locations");

  fightPlaceSelectElement.addEventListener("change", function () {
    let selectedLocationName = fightPlaceSelect.getValue().toLowerCase();
    let selectedLocation = undefined;
    let availableLocations = overviewPageLocationsContainer.querySelectorAll("div.location-column");
    availableLocations.forEach((location) => {
      if (location.getAttribute("data-name") === selectedLocationName) {
        selectedLocation = location;
      }
    });

    // copy the location column element to insert the copy in the detail view page
    let locationCopy = selectedLocation.cloneNode(true);

    // insert copy into location container element
    detailViewPageLocationsContainer.innerHTML = "";
    detailViewPageLocationsContainer.appendChild(locationCopy);

    TimeScheduleModule.updatePropertiesApi(detailViewPageTimeScheduleElement);
    TimeScheduleModule.enableTimeIndicatorApi(detailViewPageTimeScheduleElement);

  });


  /**
   * This function retrieves information from the backend about a given category name
   * @param categoryName {string} The category name
   */
  function getCategory(categoryName) {
    // TODO: get category from backend
  }


  /**
   * The following block contains code responsible for the detailed view of a category
   */
  let categoryDetailView = document.querySelector("div.category-detail-view");
  let detailViewCloseBtn = document.querySelector(".primary-button.close");
  let previousCategoryBtn = document.querySelector("a.previous-category");
  let nextCategoryBtn = document.querySelector("a.next-category");

  /**
   * These two lines registers tooltips for the two category detail control buttons (to switch between next and previous categories)
   */
  TooltipModule.createTooltipApi("a.previous-category", "Zeige die vorherige Kategorie dieses Pools");
  TooltipModule.createTooltipApi("a.next-category", "Zeige die nächste Kategorie dieses Pools");

  /**
   * This block initializes variables to identify the elements with dynamic content
   */
  let categoryStatuus = GeneralModule.generalVariables.categoryStatuus;

  let categoryModal = categoryDetailView.querySelector("div.category-detail-modal");
  let categoryNameElement = categoryModal.querySelector(".category span.category-name");
  let categoryStatusElement = categoryModal.querySelector(".category-status span.current-status");
  let categoryFightingSystemElement = categoryModal.querySelector(".fighting-system");
  let categoryGraduationElement = categoryModal.querySelector(".graduation");
  let categoryAgeElement = categoryModal.querySelector(".age");
  let categorySexElement = categoryModal.querySelector(".sex");
  let categoryFighterElement = categoryModal.querySelector(".fighter");
  let categoryRefereesElement = categoryModal.querySelector(".referees");
  let categoryHelperElement = categoryModal.querySelector(".helper");

  let categoryStatusControlBtn = categoryModal.querySelector(".secondary-button.category-status-control");
  let categoryPrintBtn = categoryModal.querySelector(".primary-button.print");
  let categoryFightingSystemBtn = categoryModal.querySelector(".primary-button.execute-fighting-system");
  let categoryPositioningBtn = categoryModal.querySelector(".primary-button.positioning");

  categoryStatusControlBtn.addEventListener("click", function () {
    if (categoryStatusControlBtn.classList.contains("start-category")) {
      // TODO: start category
      changeCategoryStatusControlBtn(["start-category"], ["finish-category", "accent-2"], "check_circle", "Kategorie abschließen");
      SecondaryButtonModule.disableSecondaryButtonApi(categoryStatusControlBtn);

    } else if (categoryStatusControlBtn.classList.contains("finish-category")) {
      // TODO: finish category
      changeCategoryStatusControlBtn(["finish-category", "accent-2"], ["restart-category", "accent-1"], "replay", "Kategorie neustarten");

    } else if (categoryStatusControlBtn.classList.contains("restart-category")) {
      // TODO: restart category
      changeCategoryStatusControlBtn(["restart-category", "accent-1"], ["finish-category", "accent-2"], "check_circle", "Kategorie abschließen");
      SecondaryButtonModule.disableSecondaryButtonApi(categoryStatusControlBtn);

    }
  });

  function changeCategoryStatusControlBtn(removeClasses, addClasses, iconName, btnText) {
    removeClasses.forEach((rClass) => {
      categoryStatusControlBtn.classList.remove(rClass);
    });
    addClasses.forEach((aClass) => {
      categoryStatusControlBtn.classList.add(aClass);
    });

    let contentSpan = categoryStatusControlBtn.querySelector("span.text");
    contentSpan.innerHTML = "";
    let icon = GeneralModule.generateElementApi("i", ["material-icons"], iconName);
    contentSpan.appendChild(icon);
    contentSpan.appendChild(document.createTextNode(btnText));
  }

  /**
   * This function represents the scope of the detailed category view and is being initiated when clicking on a time-block in the schedule
   */
  function enterCategoryDetailedView(categoryName) {
    categoryDetailView.classList.add("active");
    //let categoryObject = undefined;
    let categoryObject = {status: categoryStatuus.ACTIVE};
    let nextCategoryName = undefined;
    let previousCategoryName = undefined;
    previousCategoryBtn.classList.remove("disabled");
    nextCategoryBtn.classList.remove("disabled");
    categoryModal.scrollTop = 0;

    function prepareCategoryModal(categoryName) {
      // TODO: handle returned data from backend correctly
      let categoryInformation = getCategoryInformation(categoryName);
      categoryNameElement.innerHTML = categoryName;
      registerControlButtons();
      initializeCategoryStatusControlButton();
      initializeCategoryActionButtons();
      initializeCategoryStatusControlButton();
    }
    prepareCategoryModal(categoryName);

    function initializeCategoryActionButtons() {
      if (categoryObject.status === categoryStatuus.DONE || categoryObject.status === categoryStatuus.TERMINATED) {
        PrimaryButtonModule.enablePrimaryButtonApi(categoryPositioningBtn);
      }
    }

    function initializeCategoryStatusControlButton() {
      categoryStatusControlBtn.className = "";
      categoryStatusControlBtn.classList.add("secondary-button", "category-status-control");
      SecondaryButtonModule.enableSecondaryButtonApi(categoryStatusControlBtn);
      switch (categoryObject.status) {
        case categoryStatuus.READY:
          changeCategoryStatusControlBtn([], ["start-category"], "play_arrow", "Kategorie starten");
          break;
        case categoryStatuus.ACTIVE:
          changeCategoryStatusControlBtn([], ["finish-category", "accent-2"], "check_circle", "Kategorie abschließen");
          SecondaryButtonModule.disableSecondaryButtonApi(categoryStatusControlBtn);
          break;
        case categoryStatuus.DONE:
          changeCategoryStatusControlBtn([], ["finish-category", "accent-2"], "check_circle", "Kategorie abschließen");
          break;
        case categoryStatuus.TERMINATED:
          changeCategoryStatusControlBtn([], ["restart-category", "accent-1"], "replay", "Kategorie neustarten");
          break;
      }
    }

    function registerControlButtons() {
      if (!previousCategoryName) {
        previousCategoryBtn.classList.add("disabled");
      }
      if (!nextCategoryName) {
        nextCategoryBtn.classList.add("disabled");
      }
    }

    function getCategoryInformation(categoryName) {
      // TODO: get category information and create category object and persons objects and also disable category control buttons
    }

    previousCategoryBtn.addEventListener("click", switchToPreviousCategory);

    function switchToPreviousCategory() {
      if (previousCategoryName) {
        fillInCategoryModal(previousCategoryName);
      }
    }

    nextCategoryBtn.addEventListener("click", switchToNextCategory);

    function switchToNextCategory() {
      if (nextCategoryName) {
        fillInCategoryModal(nextCategoryName);
      }
    }

    detailViewCloseBtn.addEventListener("click", leaveCategoryDetailedView);

    function leaveCategoryDetailedView() {
      previousCategoryBtn.removeEventListener("click", switchToPreviousCategory);
      nextCategoryBtn.removeEventListener("click", switchToNextCategory);
      detailViewCloseBtn.removeEventListener("click", leaveCategoryDetailedView);
      categoryDetailView.classList.remove("active");
    }

  }



})(window, document);
