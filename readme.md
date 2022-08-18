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

#### Group
Do multiple action
```js
const group = new THREE.Group()
scene.add(group)
// Add object to group
group.add(cube1)
group.add(cube2)
// Do something
group.rotate.x = 1
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

// Centering the look on object
camera.lookAt(mesh.position)
```

#### Renderer
We will simply ask the renderer to render our scene from the camera point of view, and the result will be drawn into a canvas. You can create the canvas by yourself, or let the renderer generate it and then add it to your page. For this exercise, we will add the canvas to the html and send it to the renderer.

## Transform Objects
All classes that inherits object 3D, has common properties to transform __ that will be compiled in matrices

Positioning becomes hard?
- X is red
- Y is green
- Z is blue
```js
// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
```
#### Position
```js
mesh.position.x = xPos
// or
mesh.position.set(xPos, yPos, zPos)
// or set distance to camera to 1
mesh.position.normalize()
```
#### Scale
```js
mesh.scale.x = 2
// or 
mesh.scale.set(xScale, yScale, zScale)
```
#### Rotation
Rotation also has x,y,z however it is an EULER.. Direction changes when you rotate that. Beware of gimbal lock (rotation is not what we expect since there is more than 1 angle that is rotation), we reorder the rotation to ensure the order is right
```js
// rotate y -> rotate x -> rotate z
mesh.rotation.reorder('YXZ')

// Will be reorder to above order
mesh.rotation.y = 3.14 // half a rotation
mesh.rotation.z = 3.14 * 0.25
```
#### Quarternion
Euler is easy to understand but the axis order can be problematic. That is why most engine & 3D Software use Quarternion instead.