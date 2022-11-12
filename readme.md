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
  - default: THREE.LinearEncoding
  - we want: THREE.sRGBEncoding
    ```js
    renderer.outputEncoding = THREE.sRGBEncoding
    ```
  - other: THREE.GammaEncoding
    - optz brightness & darkness stored according to hooman eye sensitivity
    - sRGBEncoding = GammaEncoding 2.2
    - [source 1](https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/) [source 2](https://medium.com/game-dev-daily/the-srgb-learning-curve-773b7f68cf7a)
  - the GLTFLoader auto implement the rule, all the textures loaded from it will have the right encoding automatically
- texture encoding
  - dont just update our model's encoding
  - update the env too
  ```js
  environmentMap.encoding = THREE.sRGBEncoding
  ```
- tone mapping
- antialiasing
6. shadows
