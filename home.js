document.addEventListener("DOMContentLoaded", function () {
  var angle = 0; // Initial angle
  var element = document.querySelector(".CircleHome"); // Select the element

  element.addEventListener("click", function () {
    angle += 120; // Increase angle by 90 degrees on each click
    element.style.transform = "rotate(" + angle + "deg)"; // Apply the rotation
  });
});
