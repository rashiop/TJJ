import * as THREE from 'three'

import Experience from '../Experience'

import Environment from './Environment'
import Floor from './Floor'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Test Mesh
    const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial())
    this.scene.add(testMesh)

    this.resources = this.experience.resources
    // Wait for resources loaded
    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor()
      this.environment = new Environment()
    })
  }

  update() {}
}
