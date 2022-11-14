/**
 * Centralized asset loading
 * - init all loader needed
 * - loop array of assets & load em
 * - trigger evt when assets load => extends evt emitter
 * asset[] => { name, type (loader), path }[]
 */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import EventEmitter from './EventEmitter'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    // options
    this.sources = sources

    // setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()

    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') this.loadGltf(source)
      else if (source.type === 'texture') this.loadTexture(source)
      else if (source.type === 'cubeTexture') this.loadCubeTexture(source)
    }
  }

  loadGltf(source) {
    this.loaders.gltfLoader.load(source.path, (file) => {
      this.sourceLoaded(source, file)
    })
  }

  loadTexture(source) {
    this.loaders.textureLoader.load(source.path, (file) => this.sourceLoaded(source, file))
  }

  loadCubeTexture(source) {
    this.loaders.cubeTextureLoader.load(source.path, (file) => this.sourceLoaded(source, file))
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++
    if (this.toLoad == this.loaded) {
      this.trigger('ready')
    }
  }
}
