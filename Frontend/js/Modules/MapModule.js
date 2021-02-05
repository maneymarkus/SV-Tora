/**
 * This Module contains code responsible for managing maps (sites where the user can scroll in all directions)
 */
var MapModule = (function (window, document, undefined) {

    /**
     * DEPENDENCIES
     */
    let dependencies = [];
    GeneralModule.checkDependenciesApi(dependencies);

    let maps = [];

    let Map = function(mapContainerElement) {

        let This = this;
        this.mapContainer = mapContainerElement;
        this.mapElement = this.mapContainer.querySelector(".map");
        this.mapControlElements = (this.mapElement.querySelector(".map-controls")) ? this.mapElement.querySelector(".map-controls") : undefined;

        this.drag = false;
        this.pos = {
            top: 0,
            left: 0,
            x: 0,
            y: 0,
        }

        this.mouseDownHandler = function(e) {
            This.pos = {
                // The current scroll
                left: This.mapContainer.scrollLeft,
                top: This.mapContainer.scrollTop,

                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };

            document.addEventListener("mousemove", This.mouseMoveHandler);
            document.addEventListener("mouseup", This.mouseUpHandler);
        };

        this.mouseMoveHandler = function(e) {
            // How far the mouse has been moved
            const dx = e.clientX - This.pos.x;
            const dy = e.clientY - This.pos.y;

            // Scroll the element
            This.mapContainer.scrollTop = This.pos.top - dy;
            This.mapContainer.scrollLeft = This.pos.left - dx;
        };

        this.mouseUpHandler = function() {
            This.mapElement.classList.remove("shifting");

            document.removeEventListener('mousemove', This.mouseMoveHandler);
            document.removeEventListener('mouseup', This.mouseUpHandler);
        };

        this.mapElement.addEventListener("mousedown", function (e) {
            if (!This.drag) {
                This.mapElement.classList.add("shifting");
                This.mouseDownHandler(e);
            }
        });

        if (this.mapControlElements) {
            this.mapControlElements.addEventListener("click", function (e) {
                let target = e.target;
                while (!target.classList.contains("primary-button") && !target.classList.contains("map-controls")) {
                    target = target.parentNode;
                }
                if (target.classList.contains("increase")) {
                    let fontSize = window.getComputedStyle(This.mapElement, null).getPropertyValue("font-size");
                    fontSize = parseInt(fontSize.replace("px", ""));
                    if (fontSize > 50) {
                        return;
                    }
                    fontSize += 5;
                    This.mapElement.style.fontSize = fontSize + "px";
                    return;
                }
                if (target.classList.contains("decrease")) {
                    let fontSize = window.getComputedStyle(This.mapElement, null).getPropertyValue("font-size");
                    fontSize = parseInt(fontSize.replace("px", ""));
                    if (fontSize < 10) {
                        return;
                    }
                    fontSize -= 5;
                    This.mapElement.style.fontSize = fontSize + "px";
                    console.log("decrease!");
                    return;
                }
                if (target.classList.contains("print")) {
                    alert("Drucken!");
                    return;
                }
            });
        }

    }

    /**
     * This block initializes static html table actions elements
     */
    let mapContainerElements = document.querySelectorAll(".map-container");
    mapContainerElements.forEach((m) => {
        maps.push(new Map(m));
    });

    /**
     * API:
     */
    return {

    }

})(window, document);