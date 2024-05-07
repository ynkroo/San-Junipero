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

// Get a reference to the audio element
const audioElement = document.getElementById("myAudio");

// Listen for keydown events
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the spacebar (key code 32)
  if (event.code === "Space") {
    // Prevent default spacebar behavior (scrolling)
    event.preventDefault();

    // Toggle between play and pause
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }
});
