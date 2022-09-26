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

/**
 * House
 */

const wall = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0x7f5748 }))
wall.position.y = 1.5

/// Roof
const roof = new THREE.Mesh(new THREE.ConeGeometry(3, 1.5, 4), new THREE.MeshBasicMaterial({ color: 0x753e2a }))
roof.position.y = 3.5
roof.rotateY(0.8)

const roofFolder = gui.addFolder('Roof')
const roofPositionFolder = roofFolder.addFolder('Position')
roofPositionFolder.add(roof.position, 'y').min(-5).max(5).step(0.001)
const roofRotationFolder = roofFolder.addFolder('Rotation')
roofRotationFolder.add(roof.rotation, 'x').min(-5).max(5).step(0.001)
roofRotationFolder.add(roof.rotation, 'y').min(-5).max(5).step(0.001)
roofRotationFolder.add(roof.rotation, 'z').min(-5).max(5).step(0.001)

/// Door
const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2, 0.2), new THREE.MeshBasicMaterial({ color: 0x4c2719 }))
door.position.z = 1.5
door.position.y = 1

const doorFolder = gui.addFolder('Door')
const doorPositionFolder = doorFolder.addFolder('Position')
doorPositionFolder.add(door.position, 'x').min(-5).max(5).step(0.001)
doorPositionFolder.add(door.position, 'y').min(-5).max(5).step(0.001)
doorPositionFolder.add(door.position, 'z').min(-5).max(5).step(0.001)

/// Bush
const bushGeometry = new THREE.SphereGeometry(0.4, 32, 15)
const bushMaterial = new THREE.MeshBasicMaterial({ color: 0x308230 })
const bush = new THREE.Mesh(bushGeometry, bushMaterial)
bush.position.x = 1.074
bush.position.y = 0.027
bush.position.z = 1.6
bush.scale.y = 0.9

const bushFolder = gui.addFolder('Bush')
const bushScaleFolder = bushFolder.addFolder('Scale')
bushScaleFolder.add(bush.scale, 'x').min(-5).max(5).step(0.001)
bushScaleFolder.add(bush.scale, 'y').min(-5).max(5).step(0.001)
bushScaleFolder.add(bush.scale, 'z').min(-5).max(5).step(0.001)
const bushPositionFolder = bushFolder.addFolder('Position')
bushPositionFolder.add(bush.position, 'x').min(-5).max(5).step(0.001)
bushPositionFolder.add(bush.position, 'y').min(-5).max(5).step(0.001)
bushPositionFolder.add(bush.position, 'z').min(-5).max(5).step(0.001)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.position.z = 1.728
bush2.position.x = 0.681
bush2.position.y = 0.04
bush2.scale.x = 0.3
bush2.scale.y = 0.3
bush2.scale.z = 0.3

const bush2Folder = gui.addFolder('Bush 2')
const bush2ScaleFolder = bush2Folder.addFolder('Scale')
bush2ScaleFolder.add(bush2.scale, 'x').min(-5).max(5).step(0.001)
bush2ScaleFolder.add(bush2.scale, 'y').min(-5).max(5).step(0.001)
bush2ScaleFolder.add(bush2.scale, 'z').min(-5).max(5).step(0.001)
const bush2PositionFolder = bush2Folder.addFolder('Position')
bush2PositionFolder.add(bush2.position, 'x').min(-5).max(5).step(0.001)
bush2PositionFolder.add(bush2.position, 'y').min(-5).max(5).step(0.001)
bush2PositionFolder.add(bush2.position, 'z').min(-5).max(5).step(0.001)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.position.z = 1.728
bush3.position.x = -0.838
bush3.position.y = 0.112
bush3.scale.x = 1.47
bush3.scale.y = 1.063
bush3.scale.z = 0.927

const bush3Folder = gui.addFolder('Bush 3')
const bush3ScaleFolder = bush3Folder.addFolder('Scale')
bush3ScaleFolder.add(bush3.scale, 'x').min(-5).max(5).step(0.001)
bush3ScaleFolder.add(bush3.scale, 'y').min(-5).max(5).step(0.001)
bush3ScaleFolder.add(bush3.scale, 'z').min(-5).max(5).step(0.001)
const bush3PositionFolder = bush3Folder.addFolder('Position')
bush3PositionFolder.add(bush3.position, 'x').min(-5).max(5).step(0.001)
bush3PositionFolder.add(bush3.position, 'y').min(-5).max(5).step(0.001)
bush3PositionFolder.add(bush3.position, 'z').min(-5).max(5).step(0.001)

/// Group - House
const house = new THREE.Group()
scene.add(house)
house.add(wall, roof, door, bush, bush2, bush3)

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: '#a9c388' }))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Graves
 */
const graveGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.2)
const graveMaterial = new THREE.MeshBasicMaterial({ color: 0x0b3c49 })

const graves = new THREE.Group()
for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.set((Math.random() - 0.5) * 15, 0.1, (Math.random() - 0.5) * 15)
  grave.rotation.set(
    (Math.random() - 0.5) * Math.PI * 0.5,
    (Math.random() - 0.5) * Math.PI * 0.7,
    (Math.random() - 0.5) * Math.PI * 0.2
  )

  graves.add(grave)
}

scene.add(graves)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('0xb9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('0x0B3C49', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

// Point Light
const doorLight = new THREE.PointLight('0xff7d46', 1, 7)
doorLight.position.set(0, 2.2, 1.7)
house.add(doorLight)

const doorLightFolder = gui.addFolder('Door Light')
doorLightFolder.add(doorLight, 'intensity').min(0).max(1).step(0.001)
const doorLightPositionFolder = doorLightFolder.addFolder('Position')
doorLightPositionFolder.add(doorLight.position, 'x').min(-5).max(5).step(0.001)
doorLightPositionFolder.add(doorLight.position, 'y').min(-5).max(5).step(0.001)
doorLightPositionFolder.add(doorLight.position, 'z').min(-5).max(5).step(0.001)

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1.7, 15)
scene.fog = fog

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
