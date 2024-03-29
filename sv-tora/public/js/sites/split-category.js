/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "ModalModule"];
    App.GeneralModule.checkDependencies(dependencies);

    if (document.querySelector("h1 span.old-category-name")) {

        let body = document.querySelector("body");
        let divisionCommands = document.querySelector(".assigning-commands");
        let toLeftBtn = divisionCommands.querySelector("a.to-left");
        let toRightBtn = divisionCommands.querySelector("a.to-right");
        let leftCategoryContainer = document.querySelector("div.left-category");
        let rightCategoryContainer = document.querySelector("div.right-category");
        let splitBtn = document.querySelector("a.split");
        let cancelBtn = document.querySelector("a.cancel");

        App.PrimaryButtonModule.disablePrimaryButton(splitBtn);
        App.ModalModule.appendOverlay();

        let allCards = [];
        let unassignedCards =  [];

        /**
         * This function defines a card object based on the given dom element
         * @param card DOM element of the respective card
         */
        let Card = function(card) {
            let This = this;
            this.cardElement = card;
            this.current = false;
            this.category = "";
            this.categoryContainer = undefined;
            this.fighterName = this.cardElement.querySelector("h2.fighter-name").innerText;
            this.age = parseInt(this.cardElement.querySelector("span.age").innerText.replace(" Jahre", ""));
            this.sex = (this.cardElement.querySelector("span.sex").innerText.toLowerCase() === "Männlich") ? "m" : "w";
            this.graduation = this.cardElement.querySelector("span.graduation").innerText;
            this.club = this.cardElement.querySelector("span.club").innerText;

            this.assignToCategory = function (left) {
                This.current = false;
                unassignedCards.splice(unassignedCards.indexOf(This), 1);
                This.cardElement.removeEventListener("mousedown", This.startSwipe);
                if (left) {
                    This.cardElement.style.left = "-50%";
                    This.cardElement.style.transform = "rotate(-30deg)";
                } else {
                    This.cardElement.style.left = "110%";
                    This.cardElement.style.transform = "rotate(30deg)";
                }
                window.setTimeout(function () {
                    This.cardElement.classList.remove("current");
                    This.cardElement.style.removeProperty("left");
                    This.cardElement.style.removeProperty("transform");
                    if (left) {
                        leftCategoryContainer.appendChild(This.cardElement);
                        This.categoryContainer = leftCategoryContainer;
                        This.category = "left";
                    } else {
                        rightCategoryContainer.appendChild(This.cardElement);
                        This.categoryContainer = rightCategoryContainer;
                        This.category = "right";
                    }
                    This.cardElement.addEventListener("click", This.unassignCard);
                }, 500);
            }

            this.unassignCard = function() {
                // let next card(s) slide smoothly into place
                let height = This.cardElement.offsetHeight;
                let margin = window.getComputedStyle(This.cardElement).marginBottom;
                margin = parseInt(margin.replace("px", ""));
                let nextCard = This.cardElement.nextElementSibling;
                if (nextCard) {
                    nextCard.style.transition = "none";
                    nextCard.style.marginTop = height + margin + "px";
                    window.setTimeout(function () {
                        nextCard.style.removeProperty("transition");
                        nextCard.style.removeProperty("margin-top");
                    }, 10);
                }

                unassignCard(This);
            }

            this.becomesCurrentCard = function () {
                This.current = true;
                This.cardElement.classList.add("current");
                body.appendChild(This.cardElement);
                This.cardElement.addEventListener("mousedown", This.startSwipe);
            }

            this.swipeProperties = {
                mouseX : 0,
                mouseY : 0,
                cardX : 0,
                cardY : 0,
                maxRotation : 20,
                halfWindowWidth : 0,
            }

            this.startSwipe = function (e) {
                e.preventDefault();
                This.cardElement.classList.add("drag");
                let cardRect = This.cardElement.getBoundingClientRect();
                This.swipeProperties.cardX = cardRect.left;
                This.swipeProperties.cardY = cardRect.top;
                This.swipeProperties.mouseX = e.pageX;
                This.swipeProperties.mouseY = e.pageY;
                This.swipeProperties.halfWindowWidth = Math.max(
                    document.documentElement["clientWidth"],
                    document.body["scrollWidth"],
                    document.documentElement["scrollWidth"],
                    document.body["offsetWidth"],
                    document.documentElement["offsetWidth"]
                ) / 2;
                document.addEventListener("mouseup", This.endSwipe);
                document.addEventListener("mousemove", This.handleSwipe);
            }

            this.handleSwipe = function (e) {
                let distX = e.pageX - This.swipeProperties.mouseX;
                let distY = (e.pageY - This.swipeProperties.mouseY) / 3;
                let posX = This.swipeProperties.cardX + distX;
                let posY = This.swipeProperties.cardY + document.documentElement.scrollTop + distY;
                let rotationRatio = distX / This.swipeProperties.halfWindowWidth;
                let rotation = Math.round(rotationRatio * This.swipeProperties.maxRotation);
                This.cardElement.style.left = posX + "px";
                This.cardElement.style.top = posY + "px";
                This.cardElement.style.transform = "rotate(" + rotation + "deg)";
            }

            this.endSwipe = function (e) {
                This.cardElement.classList.remove("drag");
                This.cardElement.style.removeProperty("left");
                This.cardElement.style.removeProperty("top");
                This.cardElement.style.removeProperty("transform");
                document.removeEventListener("mouseup", This.endSwipe);
                document.removeEventListener("mousemove", This.handleSwipe);
                if (e.pageX  - This.swipeProperties.mouseX < -200) {
                    assignCard(true);
                    return;
                }
                if (e.pageX - This.swipeProperties.mouseX > 200) {
                    assignCard(false);
                    return;
                }
            }

        }

        let cards = document.querySelectorAll("div.fighter-card");

        cards.forEach((card) => {
            let newCard = new Card(card);
            allCards.push(newCard);
            unassignedCards.push(newCard);
        });

        if (unassignedCards[0]) {
            console.log(unassignedCards);
            activateAssigning();
        } else {
            App.ModalModule.infoModal("Keine Kämpfer vorhanden", "In dieser Kategorie sind (noch) keine Kämpfer. Füge erst Kämpfer hinzu, um die Kategorie dann zu teilen.", function () {
                window.location.href = cancelBtn.getAttribute("href");
            });
        }

        function assignCard(left) {
            unassignedCards.forEach((card) => {
                if (card.current) {
                    card.assignToCategory(left);
                }
            });
            if (unassignedCards.length > 0) {
                window.setTimeout(function () {
                    unassignedCards[0].becomesCurrentCard();
                }, 400);
            } else {
                deactivateAssigning();
            }
        }

        function unassignCard(cardObject) {
            unassignedCards.push(cardObject);
            cardObject.categoryContainer = undefined;
            cardObject.category = "";
            body.appendChild(cardObject.cardElement);
            cardObject.cardElement.removeEventListener("click", cardObject.unassignCard);
            if (getCurrentCard() === undefined) {
                activateAssigning();
            }
        }

        function getCurrentCard() {
            let cardObject = undefined;
            unassignedCards.forEach((card) => {
                if (card.current) {
                    cardObject = card;
                }
            });
            return cardObject;
        }

        function activateAssigning() {
            App.ModalModule.appendOverlay();
            unassignedCards[0].becomesCurrentCard();
            divisionCommands.classList.add("active");
            App.PrimaryButtonModule.disablePrimaryButton(splitBtn);
        }

        function deactivateAssigning() {
            App.ModalModule.removeOverlay();
            divisionCommands.classList.remove("active");
            App.PrimaryButtonModule.enablePrimaryButton(splitBtn);
        }

        function getCategoriesMembers(categoryContainer) {
            if (categoryContainer.classList.contains("category-container")) {
                let categoryMembers = [];
                let fighterCards = categoryContainer.querySelectorAll("div.fighter-card");
                fighterCards.forEach((fighterCard) => {
                    let member = {
                        "id" : fighterCard.querySelector(".member-id").innerText,
                    }
                    categoryMembers.push(member);
                });
                return categoryMembers;
            } else {
                return false;
            }
        }

        toLeftBtn.addEventListener("click", function () {
            assignCard(true);
        });

        toRightBtn.addEventListener("click", function () {
            assignCard(false);
        });

        splitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (unassignedCards.length > 0) {
                App.ModalModule.infoModal("Kategorie teilen nicht möglich", "Da noch nicht alle Kämpfer aufgeteilt wurden, kannst du aktuell die Kategorie noch nicht teilen. Bitte ordne erst alle Kämpfer einer Kategorie zu und teile die alte Kategorie dann.");
                return;
            }
            let url = splitBtn.getAttribute("href");
            let leftCategoryName = leftCategoryContainer.querySelector(".category-name").innerText;
            let rightCategoryName = rightCategoryContainer.querySelector(".category-name").innerText;
            let data = {
                "categories": [
                    {
                        categoryName: leftCategoryName,
                        members: getCategoriesMembers(leftCategoryContainer)
                    },
                    {
                        categoryName: rightCategoryName,
                        members: getCategoriesMembers(rightCategoryContainer),
                    }
                ]
            };
            App.SendRequestModule.sendRequest(App.GeneralModule.generalVariables.requests.POST, url, () => {
                window.setTimeout(function () {
                    window.location.href = cancelBtn.getAttribute("href");
                }, 5000);
            }, data, true);
        });

        cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let url = cancelBtn.getAttribute("href");
            if (allCards.length === unassignedCards.length) {
                window.location.href = url;
            } else {
                App.ModalModule.confirmModal("Seite verlassen", "Willst du die Seite wirklich verlassen?", function () {
                    window.location.href = url;
                });
            }
        });

    }

})(window, document);
