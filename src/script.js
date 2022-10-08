import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
  materialColor: '#ffeded',
}

gui.addColor(parameters, 'materialColor').onChange(() => {
  material.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** Light */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/** Texture */
const textureLoader = new THREE.TextureLoader()

const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter

/** Material */
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
})

/**
 * Objects
 */
const torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material)
const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material)
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material)
const objects = [torus, cone, torusKnot]

const objectsDistance = 4
torus.position.y = -objectsDistance * 0
cone.position.y = -objectsDistance * 1
torusKnot.position.y = -objectsDistance * 2

torus.position.x = 2
cone.position.x = -2
torusKnot.position.x = 2

torus.scale.set(0.5, 0.5, 0.5)
torusKnot.scale.set(0.5, 0.5, 0.5)

scene.add(torus, cone, torusKnot)

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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Scroll
 */
let scrollY = window.scrollY
window.addEventListener('scroll', () => {
  scrollY = window.scrollY
})

/**
 * Mouse
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (evt) => {
  cursor.x = evt.clientX / sizes.width - 0.5
  cursor.y = evt.clientX / sizes.height - 0.5
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setClearAlpha(0.5)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Render
  for (const mesh of objects) {
    mesh.rotation.x = elapsedTime * 0.1
    mesh.rotation.y = elapsedTime * 0.12
  }

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance

  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
