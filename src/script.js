import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
/// transform object
/// 1. position
// mesh.position.x = 1
// mesh.position.y = 0
// mesh.position.z = -1
mesh.position.set(1, 0, -1)
// bikin jarak 1 dari camera
// mesh.position.normalize()
/// 2. scale
mesh.scale.x = 1.5
/// 3. rotate
mesh.rotation.y = Math.PI // half a rotation
/// 4 .quarternion
scene.add(mesh)

// Camera
const sizes = {
  width: 800,
  height: 600,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1

scene.add(camera)

camera.lookAt(mesh.position)

// Changes after this wont be added
// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
