document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome");
  const welcomeScreenClose = document.getElementById("welcomeclose");
  const welcomeScreenOpen = document.getElementById("welcomeopen");

  if (welcomeScreen) {
    dragElement(welcomeScreen);
  }

  if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", function () {
      welcomeScreen.style.display = "none";
    });
  }

  if (welcomeScreenOpen) {
    welcomeScreenOpen.addEventListener("click", function () {
      if (welcomeScreen) {
        welcomeScreen.style.display = "flex";
      }
    });
  }
});

function dragElement(element) {
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  const header = document.getElementById(element.id + "header");
  const dragTarget = header || element;
  dragTarget.onmousedown = startDragging;

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = element.offsetTop - currentY + "px";
    element.style.left = element.offsetLeft - currentX + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
