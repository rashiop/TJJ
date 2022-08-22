# Three.js Journey

## Camera
**Abstract class** (cant use directly), should always be inherited when building a new camera

## Array Camera
ArrayCamera render scene from multiple cameras on specific areas of the render

## Stereo Camera
render scene through 2 cam to mimic eyes (create a `parallax effect`), used with devices like VR, red/blue glasses/cardboard

## Cube Camera
6 cams (different PoV) that render to a WebGLCubeRenderTarget

## Orthographic Camera
Use Orthographic projection (Object size stays constant regardless of its distance from the camera). Useful for rendering 2D scenes and UI

We describe the screen shown on camera. Cam view look like rectangle

OrthographicCamera(left, right, top, bottom, near, far)
```js
// using aspectRatio so the cube wont look flat
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
```
## Perspective Camera
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