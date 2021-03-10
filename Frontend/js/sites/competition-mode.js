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

  let fightPlaceOverviewPage = document.querySelector("div.fight-place-overview");
  let fightPlaceSelectElement = fightPlaceOverviewPage.querySelector("div.select-input-container");
  let fightPlaceSelect = MaterialInputsModule.getInputObjectApi(fightPlaceSelectElement);
  let fightPlaceContainerElement = fightPlaceOverviewPage.querySelector("div.fight-place-container");

  fightPlaceSelectElement.addEventListener("change", function () {
    console.log(fightPlaceSelect.getValue());
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
  let categoryPrintBtn = categoryModal.querySelector(".print");
  let categoryFightingSystemBtn = categoryModal.querySelector(".execute-fighting-system");
  let categoryPositioningBtn = categoryModal.querySelector(".positioning");

  /**
   * This function represents the scope of the detailed category view and is being initiated when clicking on a time-block in the schedule
   */
  function enterCategoryDetailedView(categoryName) {
    categoryDetailView.classList.add("active");
    let categoryObject = undefined;
    let nextCategoryName = undefined;
    let previousCategoryName = undefined;
    previousCategoryBtn.classList.remove("disabled");
    nextCategoryBtn.classList.remove("disabled");

    function fillInCategoryModal(categoryName) {
      // TODO: handle returned data from backend correctly
      let categoryInformation = getCategoryInformation(categoryName);
      categoryNameElement.innerHTML = categoryName;
      registerControlButtons();
    }

    fillInCategoryModal(categoryName);

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
