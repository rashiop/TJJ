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
## Shadow Map optimisations
#### Render Size
#### Near and Far
#### Amplitude
#### Blur
#### Shadow map algorithm

## SpotLight
## PointLight
## Baking shadow
## Baking shadow alt
## Which technique to use?