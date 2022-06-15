/**
 * DEPENDENCIES
 */

import * as GeneralModule from "./GeneralModule";
import * as ModalModule from "./ModalModule";
import {createInput, getInputObject} from "./MaterialInputsModule";
import { checkInput } from "./FormModule";
import { createPrimaryButton } from "./PrimaryButtonModule";

/**
 * This Module contains code responsible for managing all the different fighting systems and specific behaviour
 */

let fightingSystemTypes = GeneralModule.generalVariables.fightingSystemTypes;

function translateToJson(html) {
    let jsonData = {};
    if (html.querySelector("div.dog-eat-dog")) {
        jsonData["fightingOrder"] = [];
        html.querySelectorAll("div.fight").forEach(fightElement => {
            let fight = {};
            fight["fighter1"] = fightElement.querySelector("span.fighter:first-child").getAttribute("data-fighter-id");
            fight["fighter2"] = fightElement.querySelector("span.fighter:last-child").getAttribute("data-fighter-id");
            fight["fightNumber"] = fightElement.querySelector("span.number").textContent;
            jsonData["fightingOrder"].push(fight);
        });
    }
    if (html.querySelector(".range-input-container")) {
        let rangeInputContainer = html.querySelector(".range-input-container");
        let rangeObject = App.MaterialInputsModule.getInputObject(rangeInputContainer);
        jsonData["numberReferees"] = rangeObject.getValue();
    }
    if (html.querySelector(".tree")) {
        jsonData["fightingTree"] = [];
        html.querySelectorAll(".column").forEach(column => {
            let fights = [];
            column.querySelectorAll("div.fight").forEach(fightElement => {
                let fight = {};
                fight["fighter1"] = fightElement.querySelector("span.fighter:first-child").getAttribute("data-fighter-id");
                fight["fighter2"] = fightElement.querySelector("span.fighter:last-child").getAttribute("data-fighter-id");
                fight["fightNumber"] = fightElement.getAttribute("data-fight-number");
                fights.push(fight);
            });
            jsonData["fightingTree"].push(fights);
        });
    }
    return jsonData;
}

function applyDragAndDrop(dragParent) {

    const body = document.querySelector("body");
    let draggableElement = undefined;
    let dragOrigin = undefined;
    let then = 0;
    let isTree = false;

    dragParent.addEventListener("mousedown", function (e) {
        let target = e.target;
        while (target !== dragParent && !target.classList.contains("draggable")) {
            target = target.parentElement;
        }
        if (dragParent.querySelector(".tree")) {
            isTree = true;
        }

        if (target.classList.contains("draggable")) {
            e.preventDefault();
            draggableElement = target;
            dragOrigin = draggableElement.parentElement;
            handleMouseDownOnDraggable(e);
        }
    });

    let dragProperties = {
        xMouseGlobalPos : 0,
        yMouseGlobalPos : 0,
        xMouseRelativePos : 0,
        yMouseRelativePos : 0,
    }

    function handleMouseDownOnDraggable(e) {
        then = new Date();
        dragProperties.xMouseGlobalPos = e.pageX;
        dragProperties.yMouseGlobalPos = e.pageY;
        let targetRect = draggableElement.getBoundingClientRect();
        dragProperties.xMouseRelativePos = Math.round((e.clientX - targetRect.left) * 100) / 100;
        dragProperties.yMouseRelativePos = Math.round((e.clientY - targetRect.top) * 100) / 100;
        draggableElement.style.left = dragProperties.xMouseGlobalPos;
        draggableElement.style.top = dragProperties.yMouseGlobalPos;
        draggableElement.style.width = draggableElement.offsetWidth + "px";
        draggableElement.style.height = draggableElement.offsetHeight + "px";
        draggableElement.classList.add("dragging");
        body.appendChild(draggableElement);
        window.addEventListener("mousemove", handleMouseMoveOnDraggable);
        window.addEventListener("mouseup", handleMouseUpOnDraggable);
        window.addEventListener("wheel", handleScroll);
    }

    function handleMouseMoveOnDraggable(e) {
        e.preventDefault();
        dragProperties.xMouseGlobalPos = e.pageX;
        dragProperties.yMouseGlobalPos = e.pageY;
        draggableElement.style.left = dragProperties.xMouseGlobalPos - dragProperties.xMouseRelativePos + "px";
        draggableElement.style.top = dragProperties.yMouseGlobalPos - dragProperties.yMouseRelativePos + "px";
    }

    function handleMouseUpOnDraggable(e) {
        draggableElement.hidden = true;
        let dropTarget = document.elementFromPoint(e.clientX, e.clientY);
        draggableElement.hidden = false;
        while (dropTarget.nodeName !== "BODY" && !dropTarget.classList.contains("droppable") && !dropTarget.classList.contains("draggable")) {
            dropTarget = dropTarget.parentElement;
        }
        if (isTree) {
            if (dropTarget.classList.contains("draggable")) {
                dropTarget.parentElement.appendChild(draggableElement);
                dragOrigin.appendChild(dropTarget);
            } else {
                dragOrigin.appendChild(draggableElement);
            }
        } else {
            if (dropTarget.classList.contains("droppable")) {
                dropTarget.appendChild(draggableElement);
            } else if (dropTarget.classList.contains("draggable")) {
                dropTarget.parentElement.insertBefore(draggableElement, dropTarget);
            } else {
                dragOrigin.appendChild(draggableElement);
            }
        }

        draggableElement.classList.remove("dragging");
        draggableElement.style.removeProperty("top");
        draggableElement.style.removeProperty("left");
        draggableElement.style.removeProperty("width");
        draggableElement.style.removeProperty("height");
        draggableElement = undefined;
        dragOrigin = undefined;
        isTree = false;
        window.removeEventListener("mousemove", handleMouseMoveOnDraggable);
        window.removeEventListener("mouseup", handleMouseUpOnDraggable);
        window.removeEventListener("wheel", handleScroll);
    }

    function handleScroll(e) {
        draggableElement.hidden = true;
        let scrollTarget = document.elementFromPoint(e.clientX, e.clientY);
        draggableElement.hidden = false;
        while (scrollTarget.nodeName !== "BODY" && !scrollTarget.classList.contains("mw-body")) {
            scrollTarget = scrollTarget.parentElement;
        }

        if (scrollTarget.classList.contains("mw-body")) {
            if (e.deltaY > 0) {
                scrollTarget.scrollBy(0, 40);
            }
            if (e.deltaY < 0) {
                scrollTarget.scrollBy(0, -40);
            }
        }
    }

}

/**
 * API:
 */
export {
    translateToJson,
    applyDragAndDrop,
}
