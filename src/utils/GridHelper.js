import * as THREE from "/modules/three.module.js";




class GridHelper {

  constructor(scene) {
    this.scene = scene;
    this.gridHelper;
    this.create();
  }

  create() {  //add grid helper

    this.gridHelper = new THREE.GridHelper(10, 10, 0x30303);
    this.gridHelper.material.opacity = 0.8;
    this.gridHelper.material.transparent = true;
    this.scene.add(this.gridHelper);
  }

  
  update() {
  
  }

}

export { GridHelper };
