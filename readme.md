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
    - Linear vs Gamma / sRGB
        - linear shows color from white to black (0-1)
        - but our eyes bad at perceived changes on 0.75 - 1 (near white)
        - instead of showing all
        - G/sRGB, focused on the value from 0.25-0.75
        
        <img width="250" alt="Screenshot 2022-11-12 at 18 26 55" src="https://user-images.githubusercontent.com/103398328/201471812-632cd78e-ceff-4471-a34f-9174977c9ca0.png">

  - the GLTFLoader auto implement the rule, all the textures loaded from it will have the right encoding automatically
- texture encoding
  - dont just update our model's encoding
  - update the env too
  ```js
  environmentMap.encoding = THREE.sRGBEncoding
  ```
- tone mapping
  - convert HDR (High Dynamic Range) -> LDR (Low DR)
  - HDR  = image where the color values can go beyond 1 (B -> W -> ??)
  - default THREE.NoToneMapping
  - THREE.LinearToneMapping
  - THREE.ReinhardToneMapping
  - THREE.CineonToneMapping
  - THREE.ACESFilmicToneMapping
- antialiasing
6. shadows
