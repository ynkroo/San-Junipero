document.addEventListener("DOMContentLoaded", function () {
  var angle = 0; // Initial angle
  var element = document.querySelector(".CircleHome"); // Select the element

  element.addEventListener("click", function () {
    angle += 120; // Increase angle by 90 degrees on each click
    element.style.transform = "rotate(" + angle + "deg)"; // Apply the rotation
  });
});

function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  // With a transition:
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
