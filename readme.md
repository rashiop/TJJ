# [Practice] Realistic Render

## Steps
1. Add directional light + set up gui
To change Three.js lights for more realistic values, switch the physicallyCorrectLights property of the WebGLRenderer instance (the renderer) to true:
```js
renderer.physicallyCorrectLights = true
```
2. Add model ((gltf -> flighthelmet)) + setup gui eg scene rotation
3. Apply env map on background scene
```js
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

scene.background = environmentMapTexutre
```
4. Apply env map to model
5. rerender
- output encoding
- texture encoding
- tone mapping
- antialiasing
6. shadows
