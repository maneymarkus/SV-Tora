/*
    Encapsulate (not anywhere else needed) code in anonymous function
 */
(function (window, document, undefined) {

    let dependencies = ["PrimaryButtonModule", "SecondaryButtonModule", "ModalModule", "FormModule", "TranslationModule", "MaterialInputsModule", "ContextMenuModule"];
    App.GeneralModule.checkDependencies(dependencies);

    /**
     * Instructions for fight tree
     * @type {NodeListOf<Element>}
     */

    let fightTrees = document.querySelectorAll("div.tree");
    fightTrees.forEach((tree) => {

        let fighterSpans = tree.querySelectorAll("span.fighter-name");

        App.ContextMenuModule.registerNewContextMenu(tree, {"Hat gewonnen": hasWon, "Rückgängig machen": madeMistake}, "span.fighter-name.filled");

        function hasWon(fighterSpan) {
            console.log(fighterSpan + " has won");
        }

        function madeMistake(fighterSpan) {
            console.log("Here has been made a mistake: " + fighterSpan);
        }


        tree.addEventListener("click", function (e) {

            /*
            let target = e.target;
            if (target.classList.contains("winner") || target.classList.contains("loser") || target.classList.contains("last")) {
              return;
            }
            if (target.classList.contains("fighter-name")) {
              if (target.innerHTML === "") {
                return;
              }
              target.classList.add("winner");
              let winnerName = target.innerHTML.trim();
              let loser = target.parentNode.querySelector("span.fighter-name:not(.winner)");
              loser.classList.add("loser");
              let place = 0;
              let additionalPlace = 1;
              if (target.previousElementSibling) {
                additionalPlace = 2;
              }
              while (!target.classList.contains("fight")) {
                target = target.parentNode;
              }
              while (target.previousElementSibling) {
                target = target.previousElementSibling;
                place++;
              }
              place *= 2;
              place += additionalPlace;
              while (!target.classList.contains("column") && !target.nodeName !== "BODY") {
                target = target.parentNode;
              }
              if (target.classList.contains("column")) {
                let nextCol = target.nextElementSibling;
                let nextPlace = Math.ceil(place / 4);
                let firstFighter = false;
                let detailPlace = (place / 4) % 1;
                if (detailPlace > 0 && detailPlace <= 0.5) {
                  firstFighter = true;
                }
                let nextFight = nextCol.querySelector("div.fight:nth-child(" + nextPlace + ")");
                if (firstFighter) {
                  nextFight.querySelector("span.fighter-name:nth-child(1)").innerHTML = winnerName;
                } else {
                  nextFight.querySelector("span.fighter-name:nth-child(2)").innerHTML = winnerName;
                }
              }
            }
             */
        });
        tree.addEventListener("mousedown", function (e) {
            //drag = true;
            console.log("mousedown");
        });
    });

    /*
      END Fight Tree
     */

})(window, document);
