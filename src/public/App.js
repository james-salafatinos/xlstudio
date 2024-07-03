// src/public/App.js

import * as THREE from '/modules/three.module.js';
let prevTime = performance.now();

import { CSS2DRenderer } from '/modules/CSS2DRenderer.js';
import { createScene, createLights, createRenderer, createCamera, createStars } from "/utils/threeUtils.js";
import { Game } from "./Game.js";

let camera, scene, renderer, cssRenderer, lights, stars, game;

init();
animate();

function init() {
  camera = createCamera();
  renderer = createRenderer(window, camera, document);
  cssRenderer = new CSS2DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = 0;
  document.body.appendChild(cssRenderer.domElement);

  scene = createScene();
  
  lights = createLights(scene);
  stars = createStars(scene);
  
  game = new Game(scene);
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now();

  game.update();

  renderer.render(scene, camera);
  cssRenderer.render(game.cssScene, camera); // Use game.cssScene here
  prevTime = time;
}
