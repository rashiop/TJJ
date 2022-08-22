import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

let time = Date.now()

/// Clock, start at 0
const clock = new THREE.Clock()
/// Animations
const tick = () => {
  // to make the rotation based on time
  const elapsedTime = clock.getElapsedTime()

  /// Update objects
  //   mesh.rotation.y = elapsedTime
  // 1 rotation per second
  // mesh.rotation.y = elapsedTime * Math.PI * 2
  // circle
  camera.position.y = Math.sin(elapsedTime) // naik turun
  camera.position.x = Math.cos(elapsedTime) // kiri kanan
  camera.lookAt(mesh.position)
  /// Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()