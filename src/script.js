import './style.css'

import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Materials
 */
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * FontLoader
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Poppy Sari', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  })
  const material = new THREE.MeshMatcapMaterial()
  material.matcap = matcapTexture

  //   const textMaterial = new THREE.MeshBasicMaterial()
  //   gui.add(textMaterial, 'wireframe')

  const text = new THREE.Mesh(textGeometry, material)
  textGeometry.center()

  scene.add(text)

  /**
   * Object
   */
  console.time('donuts')
  const donutGeometry = new THREE.TorusBufferGeometry(0.03, 0.01, 10, 20)

  for (let i = 0; i < 300; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)
    donut.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
    donut.rotation.set(
      (Math.random() - 0.5) * Math.PI,
      (Math.random() - 0.5) * Math.PI,
      (Math.random() - 0.5) * Math.PI
    )

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
  console.timeEnd('donuts')
})

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(ambientLight)
scene.add(pointLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
