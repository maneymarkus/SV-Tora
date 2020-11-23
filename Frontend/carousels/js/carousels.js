function init(window, document, undefined) {
  const carouselContainers = document.querySelectorAll("div.carousel-container");
  carouselContainers.forEach((cc) => {

    let Carousel = function() {
      const This = this;
      this.carouselElement = cc;
      this.slideWrapper = cc.querySelector("div.page-wrapper");
      this.slides = cc.querySelectorAll("div.page");
      this.slideCount = this.slides.length;
      this.angleDistance = 360 / this.slideCount;

      this.options = {
        distanceZ : 300,
      }

      this.properties = {
        rotationSpeed : 1,
        xStart : 0,
        startAngle : 0,
        currentAngle : 0,
        lastAngle : 0,
      }

      this.rotateSlide = function(rotation) {
        let counter = 0;
        This.slides.forEach((slide) => {
          let rotate = This.angleDistance * counter + rotation;
          slide.style.transform = "rotateY(" + rotate + "deg) translateZ(" + This.options.distanceZ + "px) rotateY(" + rotate * -1 + "deg)";
          if (Math.abs(rotate % 360) < 110 || Math.abs(rotate % 360) > 250) {
            slide.style.opacity = 1;
          } else {
            slide.style.opacity = 0;
          }
          counter++;
        });
      }

      this.rotateCarousel = function(rotation) {
        This.slideWrapper.style.transform = "translateZ(-" + This.options.distanceZ + "px) rotateY(" + rotation + "deg)";
      }

      this.init = function() {
        This.slideWrapper.style.transform = "translateZ(-" + This.options.distanceZ + "px)";
        This.rotateSlide(0);
      }
      this.init();

      This.carouselElement.addEventListener("mousedown", (e) => {
        This.downHandler(e);
      });
      This.carouselElement.addEventListener("touchstart", (e) => {
        This.downHandler(e);
      });

      this.downHandler = function (e) {
        e.preventDefault();
        window.cancelAnimationFrame(fadeAnimation);
        if (e.touches) {
          This.properties.xStart = e.touches[0].pageX;
        } else {
          This.properties.xStart = e.pageX;
        }

        document.addEventListener("mousemove", This.moveHandler);
        document.addEventListener("touchmove", This.moveHandler);
        document.addEventListener("mouseup", This.upHandler);
        document.addEventListener("touchend", This.upHandler);
      }

      let then;

      this.moveHandler = function (e) {
        if (then === undefined) {
          then = Date.now();
        }
        e.preventDefault();
        let xCoords;
        if (e.touches) {
          xCoords = e.touches[0].pageX;
        } else {
          xCoords = e.pageX;
        }
        let xDist = xCoords - This.properties.xStart;
        let angle = This.calculateAngle(xDist);
        let rotation = This.properties.startAngle + angle;

        This.rotateSlide(rotation);

        This.properties.currentAngle = rotation;
        let now = Date.now();
        This.calculateRPS(now, then);
        This.properties.lastAngle = rotation;
        then = now;
      }

      let fadeAnimation;

      this.upHandler = function (e) {
        document.removeEventListener("mousemove", This.moveHandler);
        document.removeEventListener("touchmove", This.moveHandler);
        document.removeEventListener("mouseup", This.upHandler);
        document.removeEventListener("touchend", This.upHandler);
        This.properties.startAngle = This.properties.lastAngle;
        fadeAnimation = window.requestAnimationFrame(() => {
          This.turnCarousel();
        });
      }

      this.calculateAngle = function (xDist) {
        let oppositeLeg = xDist;
        let adjacentLeg = This.options.distanceZ;
        let tanAlpha = oppositeLeg / adjacentLeg;
        let radians = Math.atan(tanAlpha);
        let alpha = radians * (180/Math.PI);
        let factor = 1.25;
        return alpha * factor;
      }

      this.calculateRPS = function(then, now) {
        let time = then - now;
        let distance = This.properties.currentAngle - This.properties.lastAngle;
        let speed = distance / time;
        This.properties.rotationSpeed = speed * 10;
      }

      this.turnCarousel = function () {
        let rotation = This.properties.startAngle + This.properties.rotationSpeed;
        This.rotateSlide(rotation);
        This.properties.startAngle = rotation;
        let relativeRotation = This.properties.startAngle % 360;
        let position = Math.round(relativeRotation / This.angleDistance);
        let wantedAngle = position * This.angleDistance;
        /*if (Math.abs(relativeRotation - wantedAngle) < 10) {
          This.properties.rotationSpeed *= 0.85;
        } else {
          This.properties.rotationSpeed *= 0.95;
        }
        */
        This.properties.rotationSpeed *= 0.95;
        //console.log(wantedAngle);
        if (Math.abs(This.properties.rotationSpeed) < 0.05 || isNaN(This.properties.rotationSpeed)) {
          window.cancelAnimationFrame(fadeAnimation);
        } else {
          fadeAnimation = window.requestAnimationFrame(() => {
            This.turnCarousel();
          });
        }
      }

    }

    const carousel = new Carousel();

  });

}

window.addEventListener("DOMContentLoaded", function() {
  init(window, document);
});
