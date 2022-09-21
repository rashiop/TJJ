# Shadow
After the light, comes shadow

Back of the objects are indeed in the dark, that's what we called `core shadow`
However we missed `drop-shadow` (where objects create shadows on another object)

### How it works
When you do one render, Three.js will first do a render for each light supposed to cast shadows. Those renders will simulate what the light sees as if it was a camera. During these lights renders, MeshDepthMaterial replaces all meshes materials.

The results are stored as textures and named shadow maps.

You won't see those shadow maps directly, but they are used on every material supposed to receive shadows and projected on the geometry.

Here's an excellent example of what the directional light and the spotlight see: https://threejs.org/examples/webgl_shadowmap_viewer.html

## Activate Shadow
Light that support shadows:
- PointLight [shadow](https://threejs.org/docs/index.html?q=shadow#api/en/lights/shadows/PointLightShadow)
- DirectionalLight [shadow](https://threejs.org/docs/index.html?q=shadow#api/en/lights/shadows/DirectionalLightShadow)
- SpotLight [shadow](https://threejs.org/docs/index.html?q=shadow#api/en/lights/shadows/SpotLightShadow)

Steps
- activate the shadow maps on the `renderer`
```js
  renderer.shadowMap.enabled = true
```
- check every Objects on scene, decide which
    - object can cast shadow? `castShadow` props
    - object can receive shadow? `receiveShadow` props
```js
  sphere.castShadow = true
  plane.receiveShadow = true
```
- try activate shadow on as few lights as possible
```js
  directionalLight.castShadow = true
```

## Shadow Map optimisations
1. Render Size
    - Default size `512x512`
    - But it can be flaky
    - we need power of 2 value for the mipmapping:
        ```js
        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024
        ```
2. Near and Far
    - default might looks fine
    - However, we want to avoid bugs __
        - we cant see the shadow
        - shadow appear suddenly cropped
          ```js
          // show helper
          const directionalLightCameraHelper = new THREE.CameraHelper(
            directionalLight.shadow.camera
          )
          scene.add(directionalLightCameraHelper)


          directionalLight.shadow.camera.near = 1
          directionalLight.shadow.camera.far = 6
          ```
3. Amplitude
    - smaller value = precise shadow
    - too small = cropped shadow
    ```js
    directionalLight.shadow.camera.top = 2
    directionalLight.shadow.camera.right = 2
    directionalLight.shadow.camera.bottom = - 2
    directionalLight.shadow.camera.left = - 2
    ```
4. Blur
    - doesn't use the proximity of the camera with the object
    - Just general & cheap blur.
    ```js
    directionalLight.shadow.radius = 10
    ```
5. Shadow map algorithm
    - Algorithms for shadow maps:
        - `THREE.BasicShadowMap`: Very performant but lousy quality
        - Default - `THREE.PCFShadowMap`: Less performant but smoother edges
        - `THREE.PCFSoftShadowMap`: Less performant but even softer edges
        - `THREE.VSMShadowMap`: Less performant, more constraints, can have unexpected results
    ```js
      // update
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    ```
## Shadow Implementation on:
#### SpotLight
since spotlight use perspectivecamera
- to change top, right, bottom, left
- use fov
  - try find smaller angle as possible
  - without having shadow cropped

```js
// ADD Shadow to spotlight
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)

spotLight.castShadow = true

spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)

//// IMPROVE shadow quality
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

//// Update direction with FOV
spotLight.shadow.camera.fov = 30

//// change near and far
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
```
#### PointLight
- TRY avoid too much PointLight with shadows enabled

````js
// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3)

pointLight.castShadow = true

pointLight.position.set(- 1, 1, 0)
scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)


//// Update properties
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
````
## Baking shadow
- Integrate shadow to texture
- use `MeshBasicMaterial` with `bakedShadow` as map
- but the shadow wont move with item

```js
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
        map: bakedShadow
    })
)
```
- ALT
    - use a more simple shadow under the sphere and slightly above the plane
      - A less realistic
      - but more dynamic solution 

```js
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)

//// UPDATE when ticking
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // Update the shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3
}

tick()

```


## Which technique to use?
Depends on project, perf, techniques we like
We can combine all
