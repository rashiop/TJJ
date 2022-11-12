import * as THREE from 'three'

import Sizes from './utils/sizes'
import Time from './utils/time'

import Camera from './camera'

// create a singleton
let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance
    }
    instance = this

    // global access
    window.experience = this

    // options
    this.canvas = canvas

    // setup
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.time = new Time()
    this.camera = new Camera()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
  }

  update() {
    this.camera.update()
  }
}
