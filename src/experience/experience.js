import * as THREE from 'three'

import Sizes from './utils/Sizes'
import Time from './utils/Time'

import Camera from './Camera'
import Renderer from './Renderer'
import World from './world/World'
import Resources from './utils/Resources'

import sources from './sources'

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
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Resize event
    this.sizes.on('resize', () => {
      this.resize()
    })
    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }
}
