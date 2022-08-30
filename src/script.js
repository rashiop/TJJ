import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
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
const textureLoader = new THREE.TextureLoader()
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const alphaTexture = textureLoader.load('textures/door/alpha.jpg')
const heightTexture = textureLoader.load('textures/door/height.jpg')
const colorTexture = textureLoader.load('textures/door/color.jpg')
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const normalTexture = textureLoader.load('textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg')
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
//// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({
//   map: doorNormalTexture,
//   //   color: 0xff0000,
// })

// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.FrontSide

//// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//// MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//// MeshLambertMaterial - like unfurnished wood / stone
// const material = new THREE.MeshLambertMaterial()

//// MeshPhongMaterial - like shiny furnished wood
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('red')

//// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

//// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial()
material.map = colorTexture
material.metalness = 0.25
material.roughness = 0.7

/**
 * Debug
 */
const gui = new dat.GUI()

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

window.addEventListener('keydown', (ev) => {
  if (ev.key === 'h') {
    if (gui._hidden) gui.show()
    else gui.hide()
  }
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

  sphere.rotation.x = elapsedTime * 0.15
  plane.rotation.x = elapsedTime * 0.15
  torus.rotation.x = elapsedTime * 0.15

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
