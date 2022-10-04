import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particle1Texture = textureLoader.load('/textures/particles/1.png')
const particle2Texture = textureLoader.load('/textures/particles/2.png')
const particle3Texture = textureLoader.load('/textures/particles/3.png')
const particle4Texture = textureLoader.load('/textures/particles/4.png')
const particle5Texture = textureLoader.load('/textures/particles/5.png')
const particle6Texture = textureLoader.load('/textures/particles/6.png')
const particle7Texture = textureLoader.load('/textures/particles/7.png')
const particle8Texture = textureLoader.load('/textures/particles/8.png')
const particle9Texture = textureLoader.load('/textures/particles/9.png')
const particle10Texture = textureLoader.load('/textures/particles/10.png')
const particle11Texture = textureLoader.load('/textures/particles/11.png')
const particle12Texture = textureLoader.load('/textures/particles/12.png')
const particle13Texture = textureLoader.load('/textures/particles/13.png')

/*
 * Particles
 */
// 1. Geometry
// radius, w subdiv, h subdiv
const particlesGeometry = new THREE.BufferGeometry(1, 1, 4, 8)

const count = 20000
const colors = new Float32Array(count * 3)
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
  // feels like in the middle
  positions[i] = (Math.random() - 0.5) * 10
  colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())
// scene.add(cube)

// 2. Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.06,
  sizeAttenuation: true, // use perspective?
  // color: '#ff88cc',
  alphaMap: particle2Texture,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})
particlesMaterial.transparent = true
particlesMaterial.vertexColors = true

// 3. Point
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

const point = gui.addFolder('Point')
point.add(particlesMaterial, 'sizeAttenuation')

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
camera.position.z = 3
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

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    // i3 xyz
    const x = particlesGeometry.attributes.position.array[i3]
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(x + elapsedTime)
  }
  particlesGeometry.attributes.position.needsUpdate = true

  // particles.rotation.y = elapsedTime * 0.02
  // go down
  // particles.position.y = -elapsedTime * 0.02

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
