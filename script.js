let selectedIcon = null;
let biggestIndex = 1;
let topBar = document.querySelector("#top");

var content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `<p>Welcome to my <strong>Notes App</strong></p>
      <p>This is my first app built for SebOS!</p>
      <p>I can edit this content and create more notes.</p>`
  },
  {
    title: "My Projects",
    date: "06/29/2023",
    content: `<p><strong>Current Projects:</strong></p>
      <p>• Learning Unity</p>
      <p>• Building JavaScript apps</p>
      <p>• Creating webOS portfolio</p>`
  }
];

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function initializeWindow(windowId) {
  const window = document.getElementById(windowId);
  const closeButton = document.getElementById(windowId + "close");
  
  if (window) {
    dragElement(window);
    window.addEventListener("mousedown", function() {
      handleWindowTap(window);
    });
  }
  
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      window.style.display = "none";
    });
  }
}

function setNotesContent(index) {
  const contentDiv = document.querySelector("#notesContent");
  const note = content[index];
  contentDiv.innerHTML = note.content;
  
  // Challenge #2: Update topbar based on current note
  const topbarNote = document.querySelector(".topbar-note");
  if (topbarNote) {
    topbarNote.textContent = `📓 ${note.title}`;
  }
}

function addToSideBar(index) {
  const sidebar = document.querySelector("#sidebar");
  const note = content[index];
  const newDiv = document.createElement("div");
  
  newDiv.style.padding = "12px";
  newDiv.style.marginBottom = "8px";
  newDiv.style.borderRadius = "8px";
  newDiv.style.backgroundColor = "#fff";
  newDiv.style.cursor = "pointer";
  newDiv.style.border = "1px solid #ddd";
  
  newDiv.innerHTML = `
    <p style="margin: 0px; font-weight: bold; font-size: 14px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px; color: #888;">
      ${note.date}
    </p>
  `;
  
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  
  sidebar.appendChild(newDiv);
}

document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome");
  const notesScreen = document.getElementById("notes");
  const notesIcon = document.getElementById("notesIcon");
  const infoIcon = document.getElementById("infoIcon");
  const aboutMeIcon = document.getElementById("aboutMeIcon");

  // Initialize windows
  initializeWindow("welcome");
  initializeWindow("notes");

  // About Me icon - opens welcome window
  if (aboutMeIcon) {
    aboutMeIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(aboutMeIcon);
      openWindow(welcomeScreen);
    });
  }

  // Info icon - also opens welcome window
  if (infoIcon) {
    infoIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(infoIcon);
      openWindow(welcomeScreen);
    });
  }

  // Notes icon - opens notes window
  if (notesIcon) {
    notesIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(notesIcon);
      openWindow(notesScreen);
    });
  }

  // Populate sidebar and set initial content
  for (let i = 0; i < content.length; i++) {
    addToSideBar(i);
  }
  if (content.length > 0) {
    setNotesContent(0);
  }

  document.querySelectorAll(".desktop-icon").forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      // Note: icon selection is handled by individual click handlers above
    });
  });

  // Clicking empty desktop space deselects the current icon.
  document.addEventListener("click", function () {
    if (selectedIcon) {
      selectedIcon.classList.remove("selected");
      selectedIcon = null;
    }
  });
});

function selectIcon(element) {
  if (selectedIcon) {
    selectedIcon.classList.remove("selected");
  }
  element.classList.add("selected");
  selectedIcon = element;
}

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
