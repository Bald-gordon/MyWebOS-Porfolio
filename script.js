let selectedIcon = null;
let biggestIndex = 1;
let topBar = document.querySelector("#top");

var certificates = [
];

// Steam status tracking
async function updateSteamStatus() {
  try {
    const response = await fetch('http://localhost:3002/api/steam-status');
    const data = await response.json();
    const steamElement = document.getElementById('steamStatus');
    
    if (data.error) {
      steamElement.textContent = '⚙️ SebOS Portfolio';
      console.warn('Steam API error:', data.error);
      return;
    }
    
    let statusText = '';
    
    if (data.status === 'offline') {
      statusText = '🔴 Offline';
    } else if (data.status === 'online') {
      if (data.game) {
        statusText = `🎮 Playing ${data.game}`;
      } else {
        statusText = '🟢 Online';
      }
    } else if (data.status === 'away') {
      statusText = '🟡 Away';
    } else if (data.status === 'busy') {
      statusText = '🔴 Busy';
    } else {
      statusText = '⚙️ SebOS Portfolio';
    }
    
    steamElement.textContent = statusText;
  } catch (error) {
    console.error('Failed to fetch Steam status:', error);
    document.getElementById('steamStatus').textContent = '⚙️ SebOS Portfolio';
  }
}

// Update Steam status every 30 seconds
updateSteamStatus();
setInterval(updateSteamStatus, 30000);

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

function displayCertificate(index) {
  const certItem = certificates[index];
  const viewer = document.querySelector("#certificateViewer");
  const topbarNote = document.querySelector(".topbar-note");
  
  if (topbarNote) {
    topbarNote.textContent = `📜 ${certItem.title}`;
  }
  
  // Display image in viewer
  viewer.innerHTML = `
    <img src="./gnome-certificate.png" style="width: 100%; height: 100%; object-fit: contain; padding: 10px; box-sizing: border-box;">
  `;
}

function addCertificateToList(index) {
  const listDiv = document.querySelector("#certificatesList");
  const cert = certificates[index];
  const certDiv = document.createElement("div");
  
  certDiv.style.padding = "12px";
  certDiv.style.borderRadius = "8px";
  certDiv.style.backgroundColor = "#fff";
  certDiv.style.border = "1px solid #ddd";
  certDiv.style.cursor = "pointer";
  certDiv.style.transition = "background-color 0.2s";
  
  certDiv.innerHTML = `
    <p style="font-size: 11px; margin: 0px 0px 4px 0px; color: #666;">
      ${cert.issuer}
    </p>
    <p style="font-size: 10px; margin: 0px; color: #999;">
      ${cert.date}
    </p>
  `;
  
  certDiv.addEventListener("mouseover", function() {
    certDiv.style.backgroundColor = "#efefef";
  });
  
  certDiv.addEventListener("mouseout", function() {
    certDiv.style.backgroundColor = "#fff";
  });
  
  certDiv.addEventListener("click", function() {
    displayCertificate(index);
  });
  
  listDiv.appendChild(certDiv);
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
  const certificatesScreen = document.getElementById("certificates");
  const infoScreen = document.getElementById("info");
  const certificatesIcon = document.getElementById("certificatesIcon");
  const infoIcon = document.getElementById("infoIcon");
  const aboutMeIcon = document.getElementById("aboutMeIcon");
  const slackIcon = document.getElementById("slackIcon");

  // Initialize windows
  initializeWindow("welcome");
  initializeWindow("certificates");
  initializeWindow("info");

  // About Me icon - opens welcome window
  if (aboutMeIcon) {
    aboutMeIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(aboutMeIcon);
      openWindow(welcomeScreen);
    });
  }

  // Info icon - opens info window
  if (infoIcon) {
    infoIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(infoIcon);
      openWindow(infoScreen);
    });
  }

  // Certificates icon - opens certificates window
  if (certificatesIcon) {
    certificatesIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(certificatesIcon);
      openWindow(certificatesScreen);
    });
  }

  // Slack icon - redirect to Slack profile
  if (slackIcon) {
    slackIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectIcon(slackIcon);
      window.open("https://hackclub.enterprise.slack.com/team/U0B6S010H2B", "_blank");
    });
  }

  // Populate certificates list and set initial content
  for (let i = 0; i < certificates.length; i++) {
    addCertificateToList(i);
  }
  if (certificates.length > 0) {
    displayCertificate(0);
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

  // Info auto-save functionality
  const infoContent = document.getElementById("infoContent");
  
  // Load saved content from localStorage
  const savedInfo = localStorage.getItem("infoContent");
  if (savedInfo) {
    infoContent.innerHTML = savedInfo;
  }
  
  // Auto-save on input
  infoContent.addEventListener("blur", function() {
    localStorage.setItem("infoContent", infoContent.innerHTML);
  });
  
  infoContent.addEventListener("keyup", function() {
    localStorage.setItem("infoContent", infoContent.innerHTML);
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
