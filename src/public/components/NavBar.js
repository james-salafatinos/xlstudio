import { NavBarUI } from "./NavBar/NavBarUI.js";
import { NavBarLogic } from "./NavBar/NavBarLogic.js";

class NavBar {
  constructor(parentElement, eventBus) {
    this.navBarLogic = new NavBarLogic(eventBus);

    this.navBarUI = new NavBarUI(
      parentElement,
      (item) => this.navBarLogic.handleButtonClick(item),
      () => this.navBarLogic.handleSave(),
      () => this.navBarLogic.handleLoad(),
      (isChecked) => this.navBarLogic.handleAutosaveToggle(isChecked)
    );
  }
}

export { NavBar }