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
  - stair-like effect on the edge of geometrics
  - cos renderer choose whether geo is in the pixel or not
  <img width="293" alt="Screenshot 2022-11-12 at 18 55 17" src="https://user-images.githubusercontent.com/103398328/201472792-ac62d500-b2e8-4e07-9dc0-367197cda43d.png">
 
  - solve? 
    - increase render resolution to double
    - each pixel will avg from 4 px rendererd
    - SSAA (Super sampling) or FSAA (Fullscreen sampling), easy & efficient & not performance :((
    - MSAA (multi sampling) like SSAA & FSAA but only on geo edges -> better perf 
    <img width="83" alt="Screenshot 2022-11-12 at 18 58 59" src="https://user-images.githubusercontent.com/103398328/201472898-4f99c1df-9473-4693-b9e5-d5d49805cab2.png">
   
    ```js
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    ```
 - note
   - px ratio > 1 X need antialias
   - best solution px ratio == 1 & antialias
 
6. shadows
  - change to `THREE.PCFSoftShadowMap`
  
  ```js
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  ```
  - activate directional light
  ```js
  directionalLight.castShadow = true
  const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  scene.add(directionalLightCameraHelper)
  
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.mapSize.set(1024, 1024)
  ```
  - cast to all material
  ```js
    updateAllMaterials = () => {
      ...
      child.castShadow = true
      child.receiveShadow = true
      ...
    }
  ```
  
  
  7. Shadow acne
    - the burger cast shadow to itself
  <img width="490" alt="Screenshot 2022-11-12 at 19 18 16" src="https://user-images.githubusercontent.com/103398328/201473526-f0da8466-e78f-4eda-b481-0eb6602ff6aa.png">

    - fix
      - tweak bias & normalBias
      - bias -> for flat surface -> increase it until the acne disappears
      - normal bias -> for rounded surface -> increase it until the acne disappears
  
 
     ```js
      directionalLight.shadow.normalBias = 0.05
     ```
  
