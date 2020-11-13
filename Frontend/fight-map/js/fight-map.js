function init(window, document, undefined) {
  const map = document.documentElement;

  map.style.cursor = "grab";

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  let mouseDownHandler = function(e) {
    pos = {
      // The current scroll
      left: map.scrollLeft,
      top: map.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  let mouseMoveHandler = function(e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    map.scrollTop = pos.top - dy;
    map.scrollLeft = pos.left - dx;
  };

  let mouseUpHandler = function() {
    map.style.cursor = "grab";
    map.style.removeProperty("user-select");

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  map.addEventListener("mousedown", function (e) {
    map.style.cursor = "grabbing";
    map.style.userSelect = "none";
    mouseDownHandler(e);
  });

  let tiltOptions = {maxTilt: 15, scale: 1.15};
  const primaryButtonTilt = $(".primary-button").tilt(tiltOptions);

  $('.primary-button').click(function (e){
    e.preventDefault();
  });

  let fightMap = document.getElementsByClassName("fight-map")[0];

  $(".map-controls").click(function (e) {
    e.preventDefault();
    let target = e.target;
    while (!target.classList.contains("primary-button") && !target.classList.contains("map-controls")) {
      target = target.parentNode;
    }
    if (target.classList.contains("map-controls")) {
      return;
    }
    if (target.classList.contains("increase")) {
      let fontSize = window.getComputedStyle(fightMap, null).getPropertyValue("font-size");
      fontSize = parseInt(fontSize.replace("px", ""));
      if (fontSize > 50) {
        return;
      }
      fontSize += 5;
      fightMap.style.fontSize = fontSize + "px";
      return;
    }
    if (target.classList.contains("decrease")) {
      let fontSize = window.getComputedStyle(fightMap, null).getPropertyValue("font-size");
      fontSize = parseInt(fontSize.replace("px", ""));
      if (fontSize < 10) {
        return;
      }
      fontSize -= 5;
      fightMap.style.fontSize = fontSize + "px";
      return;
    }
    if (target.classList.contains("print")) {
      alert("Drucken!");
    }
  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
