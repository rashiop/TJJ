import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Texture
 */
const doorNormalTexture = new THREE.TextureLoader().load('/textures/door/normal.jpg')
const material = new THREE.MeshBasicMaterial({
  map: doorNormalTexture,
  color: 0xff0000,
})

/**
 * Objects
 */

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.set(-1.5, 0, 0)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 10, 50), material)
torus.position.set(1.5, 0, 0)

scene.add(sphere, plane, torus)

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
  // Update rotation
  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.1
  plane.rotation.x = elapsedTime * 0.1
  torus.rotation.x = elapsedTime * 0.1

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
