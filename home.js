document.addEventListener("DOMContentLoaded", function () {
  var angle = 0; // Initial angle
  var element = document.querySelector(".GlassCircle"); // Select the element

  element.addEventListener("click", function () {
    angle += 120; // Increase angle by 90 degrees on each click
    element.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
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

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    const heroImage = document.querySelector(".HeroImage");

    // Force reflow/repaint
    heroImage.style.animation = "none";
    void heroImage.offsetWidth; // This line is crucial, as it forces a reflow

    // Re-apply the animation
    heroImage.style.animation = "";
    setTimeout(() => {
      heroImage.style.animation =
        "fadeinLoad 10s ease 1s, fadeUp 5s ease-out 0.5s";
    }, 50); // A small delay to ensure the styles are applied
  }
});
