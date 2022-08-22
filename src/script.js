import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (event) => {
  // -0.5 inorder to make cursor -0.5..+0.5
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 5, 5, 5), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
scene.add(mesh)

// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

/// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  /// Update objects
  //   mesh.rotation.y = elapsedTime

  /// Update camera
  // PI * 2 = 1 circle, sin = L/R, * 3 = more impact
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // PI * 2 = 1 circle, cos = T/B, * 3 = more impact
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  //   camera.position.y = cursor.y * 5
  // cube is always centered
  //   camera.lookAt(mesh.position)

  // Update controls
  controls.update()

  /// Render
  renderer.render(scene, camera)

  /// Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
