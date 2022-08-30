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
/**
 * Common Props
*/
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

// alphaMap need transparent = true
// apply transparent with texture
material.alphaMap = doorAlphaTexture

// which side is visible
material.side = THREE.DoubleSide

/** 
 * Specialized props
**/
// 1. MeshNormalM
material.flatShading = true

// 2. MeshPhongM
material.shininess = 100
// set the light reflection color
material.specular = new THREE.Color(0xff0000)

// 3. MeshToonM -> add coloration
// if cartoon effect removed, it caused by mipmapping
material.gradientMap = gradientTexture
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

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
  - props `shininess` and `specular` (light reflection color)
- MeshToonM
  - similar to MeshLambertM but cartoonist
  - add  `gradientMap` to add coloration 
    - if `gradientMap` remove the cartoon effect, it could caused by [mipmapping](https://github.com/rashiop/TJJ_chapter_1/tree/09_texture#6-filtering-and-mipmapping)
    - solution: add filter `minFilter` or and `magFilter` to gradientTexture
- [MeshStandardM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshStandardMaterial)
  - [PBR](https://github.com/rashiop/TJJ_chapter_1/blob/09_texture/readme.md#texture) based material
  - like MLambert & MPhong
    - supports lights
    - more realistic algo & params (`roughness`, `metalness`)

- MeshDepthM
  - show depth based on camera near & far plane, monochrome
  - white near
  - black far
- [MeshDistanceM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshDistanceMaterial)
  - implementing shadow mapping w/ PointLights
- MeshPhysicalM
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
