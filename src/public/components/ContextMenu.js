// src/public/components/ContextMenu.js

class ContextMenu {
  constructor(parentElement, eventBus) {
    this.parentElement = parentElement;
    this.eventBus = eventBus;
    this.init();
  }

  init() {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.showContextMenu(event.clientX, event.clientY);
    });
  }

  showContextMenu(x, y) {
    const contextMenu = document.createElement("div");
    Object.assign(contextMenu.style, {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "4px",
      zIndex: 10000,
      padding: "10px",
      cursor: "pointer",
    });

    contextMenu.textContent = "Add Window";
    contextMenu.onclick = () => {
      console.log("Context menu clicked, emitting addWindow event");
      this.eventBus.emit("addWindow");
      this.parentElement.removeChild(contextMenu);
    };

    this.parentElement.appendChild(contextMenu);

    // Remove the context menu if clicked elsewhere
    document.addEventListener("click", () => {
      if (this.parentElement.contains(contextMenu)) {
        this.parentElement.removeChild(contextMenu);
      }
    }, { once: true });
  }
}

export { ContextMenu };
