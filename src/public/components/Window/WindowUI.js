import { CSS2DObject } from '/modules/CSS2DRenderer.js';

class WindowUI {
  constructor(parentElement, title, onClose) {
    this.parentElement = parentElement;
    this.title = title;
    this.onClose = onClose;
    this.init();
  }

  init() {
    // Create window container
    this.windowElement = document.createElement("div");
    Object.assign(this.windowElement.style, {
      position: "absolute",
      top: "100px",
      left: "100px",
      width: "400px",
      height: "300px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      zIndex: "1001",
      overflow: "auto",
    });

    // Create window header
    const header = document.createElement("div");
    Object.assign(header.style, {
      backgroundColor: "#1976D2",
      color: "#fff",
      padding: "10px",
      cursor: "move",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    });

    const title = document.createElement("span");
    title.textContent = this.title;

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    Object.assign(closeButton.style, {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "18px",
      cursor: "pointer",
    });

    closeButton.onclick = this.onClose;

    header.appendChild(title);
    header.appendChild(closeButton);

    // Create content area
    this.contentArea = document.createElement("div");
    Object.assign(this.contentArea.style, {
      flex: "1",
      padding: "10px",
      overflow: "auto",
    });

    this.windowElement.appendChild(header);
    this.windowElement.appendChild(this.contentArea);

    this.makeDraggable(header, this.windowElement);
    this.makeResizable(this.windowElement);

    // Create CSS2DObject
    this.windowObject = new CSS2DObject(this.windowElement);
  }

  makeDraggable(header, windowElement) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = windowElement.offsetLeft;
      initialY = windowElement.offsetTop;
      header.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        windowElement.style.left = `${initialX + dx}px`;
        windowElement.style.top = `${initialY + dy}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      header.style.cursor = "move";
    });
  }

  makeResizable(windowElement) {
    const resizer = document.createElement("div");
    Object.assign(resizer.style, {
      width: "10px",
      height: "10px",
      background: "#ccc",
      position: "absolute",
      right: "0",
      bottom: "0",
      cursor: "se-resize",
      zIndex: "1002",
    });
  
    windowElement.appendChild(resizer);
  
    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const initialWidth = windowElement.offsetWidth;
      const initialHeight = windowElement.offsetHeight;
      const startX = e.clientX;
      const startY = e.clientY;
      const initialLeft = windowElement.offsetLeft;
      const initialTop = windowElement.offsetTop;
  
      const onMouseMove = (e) => {
        const newWidth = initialWidth + (e.clientX - startX);
        const newHeight = initialHeight + (e.clientY - startY);
        const widthChange = newWidth - initialWidth;
        const heightChange = newHeight - initialHeight;
  
        windowElement.style.width = `${newWidth}px`;
        windowElement.style.height = `${newHeight}px`;
        windowElement.style.left = `${initialLeft + widthChange / 2}px`;
        windowElement.style.top = `${initialTop + heightChange / 2}px`;
      };
  
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  setContent(content) {
    this.contentArea.innerHTML = "";
    this.contentArea.appendChild(content);
  }

  getCSS2DObject() {
    return this.windowObject;
  }

  remove() {
    if (this.parentElement.contains(this.windowElement)) {
      this.parentElement.removeChild(this.windowElement);
    } else {
      console.warn("Attempted to remove a node that is not a child of the parent.");
    }
  }
}

export { WindowUI };
