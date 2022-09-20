import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

//// Ambient Lights
// Equal
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
gui.add(ambientLight, 'intensity', 0, 1, 0.01).name('Ambient Intensity')

//// Directional Light
const directionalLight = new THREE.DirectionalLight()
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
gui.add(directionalLight, 'intensity', 0, 1, 0.01).name('Directional Intensity')

//// HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
gui.add(directionalLight, 'intensity', 0, 1, 0.01).name('Hemisphere Intensity')

//// PointLight
const pointLight = new THREE.PointLight(0xff9000, 0.5, 1)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)
gui.add(directionalLight, 'intensity', 0, 1, 0.01).name('Point Intensity')

//// RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)
rectAreaLight.position.set(-1.5, 0, 1.5)
// vector3 = 0,0,0
rectAreaLight.lookAt(new THREE.Vector3())

//// Spotlight
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 0.01)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
// rotating
spotLight.target.position.x = -0.75
// spotLight target still not working
// WHY? That is due to our target not being in the scene
// SO? Simply add the target to the scene
scene.add(spotLight.target)

/**
 * Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

// For the SpotLightHelper, there is no size parameter.
// Also, after moving the target, you need to call the update(...) method but on the next frame:

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() => {
  spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
