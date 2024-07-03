import { WindowUI } from "./Window/WindowUI.js";
import { WindowLogic } from "./Window/WindowLogic.js";

class Window {
  constructor(parentElement, title, eventBus) {
    this.windowLogic = new WindowLogic(eventBus);
    this.windowUI = new WindowUI(
      parentElement,
      title,
      () => this.closeWindow()
    );

    // Example content
    const content = this.windowLogic.openWindow("This is window content");
    this.windowUI.setContent(content);
  }

  getCSS2DObject() {
    return this.windowUI.getCSS2DObject();

  }

  closeWindow() {
    this.windowUI.remove();
  }
}

export { Window };