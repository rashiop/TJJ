## What 
Vanilla threejs without any extension
## Elements
#### Scene
Container to place objects, models, particles, light etc. Three.js will render the scene.
[source](https://threejs.org/docs/index.html#api/en/scenes/Scene)
```js
  const scene = new THREE.Scene()
```

Properties
- autoUpdate: Boolean
- background: Object
- environment: Texture
- fog: Fog
- isScene: Boolean - Read-only
- overrideMaterial: Material (default null)

Method
- toJSON

#### Objects
Can be many things from primitive geometries, imported models, particles, lights, and so on. Need to be added to scene to be seen.

```js
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// Add to scene
scene.add(mesh)
```
#### Camera
Point of view when the scene is rendered. We can use multiple camera to switch PoV.

We use PerspectiveCamera as sample
- Field of View: how large is our vision
- Aspect Ratio: canvas width/height

```js
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```

#### Renderer
We will simply ask the renderer to render our scene from the camera point of view, and the result will be drawn into a canvas. You can create the canvas by yourself, or let the renderer generate it and then add it to your page. For this exercise, we will add the canvas to the html and send it to the renderer.
