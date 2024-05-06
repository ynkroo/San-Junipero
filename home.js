document.addEventListener("DOMContentLoaded", function () {
  var angle = 0; // Initial angle
  var element = document.querySelector(".GlassCircle"); // Select the element

  // Function to update rotation
  function updateRotation() {
    angle = (angle + 120) % 360; // Increase angle by 120 degrees and loop back after 360
    element.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
  }

  setInterval(updateRotation, 2000); // Continuously rotate every 2 seconds
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

document.addEventListener("DOMContentLoaded", function () {
  const dragMeImage = document.getElementById("dragMeImage");

  document.addEventListener("mousemove", function (e) {
    dragMeImage.style.display = "block"; // Make the image visible
    // Subtract half the width and height to center the image on the cursor
    dragMeImage.style.left = e.pageX - 32 + "px"; // Assuming the image is 32px wide
    dragMeImage.style.top = e.pageY - 32 + "px"; // Assuming the image is 32px high
  });
});
