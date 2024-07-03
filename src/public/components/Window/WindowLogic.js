class WindowLogic {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  openWindow(content) {
    // Add logic to handle window content
    const contentElement = document.createElement("div");
    contentElement.textContent = content;
    return contentElement;
  }
}

export { WindowLogic };