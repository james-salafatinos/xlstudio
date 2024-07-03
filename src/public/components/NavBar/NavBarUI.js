class NavBarUI {
    constructor(parentElement, onButtonClick, onSave, onLoad, onAutosaveToggle) {
      this.parentElement = parentElement;
      this.onButtonClick = onButtonClick;
      this.onSave = onSave;
      this.onLoad = onLoad;
      this.onAutosaveToggle = onAutosaveToggle;
      this.init();
    }
  
    init() {
      const navBar = document.createElement("div");
      Object.assign(navBar.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#1976D2",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 20px",
        boxSizing: "border-box",
        zIndex: "1000",
        flexWrap: "wrap",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
      });
  
      const navItemContainer = document.createElement("div");
      Object.assign(navItemContainer.style, {
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px", // Adds spacing between nav items
      });
  
      const navItems = ["Node", "Link"];
  
      navItems.forEach((item) => {
        const button = document.createElement("button");
        button.innerText = item;
        Object.assign(button.style, {
          padding: "10px 15px",
          margin: "0 5px",
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "2px solid transparent",
          outline: "none",
          color: "white",
          borderRadius: "5px",
          transition: "background-color 0.3s, border-color 0.3s",
        });
  
        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          button.style.borderColor = "rgba(255, 255, 255, 0.5)";
        });
  
        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "transparent";
          button.style.borderColor = "transparent";
        });
  
        button.addEventListener("click", () => this.onButtonClick(item));
        navItemContainer.appendChild(button);
      });
  
      navBar.appendChild(navItemContainer);
  
      const inputContainer = document.createElement("div");
      Object.assign(inputContainer.style, {
        display: "flex",
        flexGrow: "0",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "10px", // Adds spacing between elements
      });
  
      const projectNameInput = document.createElement("input");
      Object.assign(projectNameInput.style, {
        margin: "0 10px",
        flex: "1",
        padding: "5px",
        borderRadius: "3px",
        border: "1px solid #ccc",
      });
      projectNameInput.id = "projectName";
      projectNameInput.placeholder = "Enter Project Name";
  
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      Object.assign(saveButton.style, {
        padding: "8px 12px",
        border: "none",
        borderRadius: "3px",
        backgroundColor: "#4CAF50",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.3s",
      });
      saveButton.onmouseover = () => {
        saveButton.style.backgroundColor = "#45a049";
      };
      saveButton.onmouseleave = () => {
        saveButton.style.backgroundColor = "#4CAF50";
      };
      saveButton.onclick = this.onSave;
  
      const loadButton = document.createElement("button");
      loadButton.textContent = "Load";
      Object.assign(loadButton.style, {
        padding: "8px 12px",
        border: "none",
        borderRadius: "3px",
        backgroundColor: "#2196F3",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.3s",
      });
      loadButton.onmouseover = () => {
        loadButton.style.backgroundColor = "#0b7dda";
      };
      loadButton.onmouseleave = () => {
        loadButton.style.backgroundColor = "#2196F3";
      };
      loadButton.onclick = this.onLoad;
  
      const autosaveContainer = document.createElement("div");
      Object.assign(autosaveContainer.style, {
        display: "flex",
        alignItems: "center",
        gap: "5px",
      });
  
      const autosaveCheckbox = document.createElement("input");
      autosaveCheckbox.type = "checkbox";
      Object.assign(autosaveCheckbox.style, {
        margin: "0 5px",
        cursor: "pointer",
        width: "16px",
        height: "16px",
      });
  
      const autosaveLabel = document.createElement("label");
      autosaveLabel.textContent = "Autosave";
      Object.assign(autosaveLabel.style, {
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        cursor: "pointer",
      });
      autosaveLabel.appendChild(autosaveCheckbox);
  
      autosaveCheckbox.addEventListener("change", () =>
        this.onAutosaveToggle(autosaveCheckbox.checked)
      );
  
      autosaveContainer.appendChild(autosaveCheckbox);
      autosaveContainer.appendChild(autosaveLabel);
  
      inputContainer.appendChild(autosaveContainer);
      inputContainer.appendChild(projectNameInput);
      inputContainer.appendChild(loadButton);
      inputContainer.appendChild(saveButton);
  
      navBar.appendChild(inputContainer);
      this.parentElement.appendChild(navBar);
    }
  }
  
  export { NavBarUI };