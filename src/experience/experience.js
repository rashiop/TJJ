import * as THREE from 'three'

import Debug from './utils/Debug'
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
    this.debug = new Debug()
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
    this.time.on('tick', (args) => {
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

  destroy() {
    /**
     * https://threejs.org/docs/index.html?q=dispose#manual/en/introduction/How-to-dispose-of-objects
     * What to dispose:
     * 1. Event listener
     * 2. Geometry & material
     * 3. Orbit controls
     * 4. WebGLRenderer
     */
    this.sizes.off('resize')
    this.time.off('tick')
    this.resources.off('ready')

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (typeof value === 'function' && value) {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()

    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
