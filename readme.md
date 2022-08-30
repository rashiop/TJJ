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
