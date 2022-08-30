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

- MeshBasicMaterial
  - applies a uniform color / texture on geo
  - not affected by light
- MeshDepthM
  - show depth based on camera near & far plane, monochrome
  - white near
  - black far
- [MeshDistanceM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshDistanceMaterial)
  - implmeneting shadow mapping w/ PointLights
- [MeshLambertM](https://threejs.org/docs/index.html?q=material#api/en/materials/MeshLambertMaterial)
  - FOR: non-shiny surfaces, wo specular highlights
- MeshMatcapM
- MeshNormalM
  - map normal vectors to RGB colors
  
- MeshPhongM
- MeshPhysicalM
- MeshStandardM
- MeshToonM
- PointsM
- RawShaderM
- ShaderM
- ShadowM
- SpriteM
