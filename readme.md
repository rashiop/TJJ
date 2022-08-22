# Three.js Journey

## Camera
**Abstract class** (cant use directly), should always be inherited when building a new camera

### Array Camera
ArrayCamera render scene from multiple cameras on specific areas of the render

### Stereo Camera
render scene through 2 cam to mimic eyes (create a `parallax effect`), used with devices like VR, red/blue glasses/cardboard

### Cube Camera
6 cams (different PoV) that render to a WebGLCubeRenderTarget

### Orthographic Camera
Use Orthographic projection (Object size stays constant regardless of its distance from the camera). Useful for rendering 2D scenes and UI

We describe the screen shown on camera. Cam view look like rectangle

OrthographicCamera(left, right, top, bottom, near, far)
```js
// using aspectRatio so the cube wont look flat
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
```
### Perspective Camera
Use perspective projection. Mimic the way human eyes sees. Most common projection mode used for rendering 3D scene

PerspectiveCamera(**fov**: Number, **aspect**: Number, **near**: Number, **far**: Number)
- **foc** (field of view) -> `vertical vision` angle, in degrees. Bruno's recommendation 45..75
- **aspect** -> w/h
- **near** & **far** -> how close&far cam can see. Object closer than `near` & further than `far` not visible. 
Dont use extreme values like `0.0001` and `9999999` (too close)
```js
const camera = new THREE.PerspectiveCamera(
  140, // fov
  sizes.width / sizes.height, // aspect
  1, // near (opt)
  1000 // far (opt)
)

```

## Move the camera
Control camera position with mouse 
1. Use perspective camera
2. Move camera so it face the cube
```js
const tick = () => {
  /// Update camera
  // PI * 2 = 1 circle, sin = L/R, * 3 = more impact
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // PI * 2 = 1 circle, cos = T/B, * 3 = more impact
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  // cube is always centered
  camera.lookAt(mesh.position)

  /// Render
  renderer.render(scene, camera)

  /// Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
tick()
```

```
Isnt it too COMPLICATED for simple action?
Luckily, three.js provide a device ORIENTATION CONTROL yay XD
```

## Control
Choosing controls?
Every control have limitations. Make sure the control we use support all the features we need. If not we'll have to DIY
[examples](https://threejs.org/examples/?q=control)

### Device Orientation Controls
Auto retrieve device orientation if device/OS/browser allow to rotate cam. Useful for VR exp
Removed, due to permission request for iOS request

### Fly Controls
Moving cam like on spaceship. Rotate 3 axes forward backward

### Orbit Controls
1. import
```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```
2. Init
```js
const controls = new OrbitControls(camera, canvas)
```
3. Damping 
Smoothen animation by adding acceleration & friction
```js
controls.enableDamping = true
// ...
controls.update()

```

