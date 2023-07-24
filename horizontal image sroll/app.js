const track = document.getElementById("image-track");                                       // Selecting the image-track element from the HTML file

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;                            // Select the data-mouse-down-at attribute from the image-track element and set it to the X position of the mouse
const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;                                              // If the mouse is not down, return from the function and do nothing
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,                      // Calculate the difference between the X position of the mouse when it was pressed down and the X position of the mouse now
        maxDelta = window.innerWidth / 2;                                                    // Calculate the maximum distance the mouse can move before the image stops moving
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, // Calculate the next percentage the image should be at
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);           // Constrain the next percentage to be between 0 and -100

  track.dataset.percentage = nextPercentage;                                                 // Set the data-percentage attribute of the image-track element to the next percentage
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`                                         // Animate the image-track element to the next percentage
  }, { duration: 1200, fill: "forwards" });                                                  // The animation should last 1200ms and should stay at the end of the animation
  
  for(const image of track.getElementsByClassName("image")) {                                 // For each image in the image-track element
    image.animate({                                                                           // Animate the image
      objectPosition: `${100 + nextPercentage}% center`                                       // The image should be positioned 100% + the next percentage to the right
    }, { duration: 1200, fill: "forwards" });                                                 // The animation should last 1200ms and should stay at the end of the animation
  }
}
/*
   apply the defined functions to the mouse and touch events
*/
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);