// src/public/Game.js

import * as THREE from '/modules/three.module.js';
import { NavBar } from "./components/NavBar.js";
import { ContextMenu } from "./components/ContextMenu.js";
import { EventBus } from "./EventBus.js";
import { Window } from "./components/Window.js";

class Game {
  constructor(scene) {
    this.scene = scene;
    this.appEventBus = new EventBus();
    this.cssScene = new THREE.Scene(); // Ensure cssScene is created here
    this.create();
  }

  create() {
    document.addEventListener("DOMContentLoaded", () => {
      this.navbar = new NavBar(document.body, this.appEventBus); // Attaches the navigation bar to the body of the document
      this.contextMenu = new ContextMenu(document.body, this.appEventBus); // Initialize the context menu

      this.appEventBus.on("addWindow", () => {
        console.log("Received addWindow event");
        const newWindow = new Window(document.body, "New Window", this.appEventBus);
        this.cssScene.add(newWindow.getCSS2DObject());
        console.log("Window added to scene");
      });
    });
  }

  update() {
    // Update logic for the game, if necessary
  }
}

export { Game };
