import * as THREE from 'three'

import Experience from '../experience'

import Environment from './environment'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Test Mesh
    const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ wireframe: true }))
    this.scene.add(testMesh)

    // Setup
    this.environment = new Environment()
  }

  update() {}
}
