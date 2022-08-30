# Material
What
- used to put a color on each pixel of geometries
- algorithm written on shaders
- good news? just use built-in material :D

## Material 101
```js
// reuseable
const material = new THREE.MeshBasicMaterial({
  map: texture,
  color: <<color>>,
  transparent: true,
  opacity: 0.5,
}) 
```

## Common Properties
- map - apply texture on a geo surface
- color - apply a uniform color on geo surface
- wireframe - show triangles that compose our geo
- opacity (pre: transparent = true)
- alphaMap - control transparency with a texture (pre: transparent = true)
- side - decide which side visible
    - `THREE.FrontSide` - default
    - `THREE.BackSide`
    - `THREE.DoubleSide` - heavy
      - twice triangle to render 
      - show plane geo's back & front side
```js
// map - apply texture
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture
})
// or
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture

// color - apply color
material.color = new THREE.Color('#ff0000')

// wireframe
material.wireframe = true

// opacity need transparent = true
material.transparent = true
material.opacity = 0.5

// alphaMap need transparent = true, apply transparent with texture
material.alphaMap = doorAlphaTexture

// which side is visible
material.side = THREE.DoubleSide
```
## Material Type
Can exist without light
- MeshBasicMaterial
  - applies a uniform color / texture on geo
  - not affected by light
- MeshMatcapM
  - using normal as reference
  - to pick right color on texture that look like sphere
  - vs `MeshNormalM`? use color while `MeshNormalM` only rgb
  - PROS: simulate light w.o light on screen
  - find more on [source](https://github.com/nidorx/matcaps)
- MeshNormalM
  - map normal vectors to RGB colors
  - normals
    - info encoded in each vertex that contains the direction of the outside of the face
    - if displayed as arrows, you would get straight lines comings out of each vertex that composes your geometry
    - USAGE? calc on objects illumination or reflect|refract on geo surface
  - flatShading - flatten faces, normals wont be interpolated between the vertices
  ```js
    material.flatShading = true
  ```

Need light to be seen
- [MeshLambertM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshLambertMaterial)
  - FOR: non-shiny surfaces, wo specular highlights
  - usage: untreated wood / stone - if need reflection use MeshPhongM instead
  - PROS: great perf - simple reflectance & illumination model
  - CONS: shows weird line pattern
- [MeshPhongM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshPhongMaterial)
  - FOR: shiny surface w/ specular highlights
  - PROS: bye weird line pattern, light reflection  :D :bulb:
  - CONS: performance
  - usage: varnished wood, pearl, plastic ornament
  - props
  ```js
   // more shinyyy
    material.shininess = 100
    // set the light reflection color
    material.specular = new THREE.Color(0xff0000)
  ```
- MeshDepthM
  - show depth based on camera near & far plane, monochrome
  - white near
  - black far
- [MeshDistanceM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshDistanceMaterial)
  - implementing shadow mapping w/ PointLights
- MeshPhysicalM
- MeshStandardM
- MeshToonM
- PointsM
- RawShaderM
- ShaderM
- ShadowM
- SpriteM
### Adding light
```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
```
Create a PointLight and add it to the scene:
```js
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
```
