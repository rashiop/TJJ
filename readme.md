# Lights 
Material that reacts to lights
- MeshLambertMaterial
- MeshPhongMaterial
- MeshToonMaterial

## AmbientLight
- omnidirectional lightning on all geos of the scene
```js
// color, intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Equals
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
```

debug the material
```js
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
```

## HemisphereLight
- similar to AL, but:
    - has diff color from the sky than the color from the ground
```js
// skyColor, groundColor, intensity
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
```

## PointLight
- like a lighter
- small
- light spreads uniformly in every dir
- can be moved

By default, the light intensity doesn't fade. But you can control that fade distance and how fast it is fading using the distance and decay properties. You can set those in the parameters of the class as the third and fourth parameters, or in the properties of the instance:


```js
// color, intensity, (opt) distance, (opt) decay
const pointLight = new THREE.PointLight(0xff9000, 0.5,10, 2)
scene.add(pointLight)
pointLight.position.set(1, - 0.5, 1)
```

## RectAreaLight
- big rect lights
- mix between directional light & diffuse light
- only works with `MeshStandardMaterial` & `MeshPhysicalMaterial`
- ease rotation using lookAt
- A Vector3 without any parameter will have its x, y, and z to 0 (the center of the scene)

```js
// color, intensity, width, height
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)

// move the light & rotate it
// ease rotation using lookAt
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
```

## SpotLight
- flashlight
- cone of light starting at a point & oriented in a direction
- params:
  - color: the color
  - intensity: the strength
  - distance: the distance at which the intensity drops to 0
  - angle: how large is the beam
  - penumbra: how diffused is the contour of the beam
  - decay: how fast the light dims
- Rotating our SpotLight is a little harder. The instance has a property named target, which is an Object3D. The SpotLight is always looking at that target object. But if you try to change its position, the SpotLight won't budge:


```js
const spotLight = new THREE.SpotLight(
  0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1
)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

// rotating
spotLight.target.position.x = - 0.75
// spotLight target still not working
// WHY? That is due to our target not being in the scene
// SO? Simply add the target to the scene
scene.add(spotLight.target)
```

## Performance
Light cost a lot on performance
- GPU do lots of calculations
    - distance from face to light
    - how much that face is facing the light
    - if the face is in the spot light cone
    - etc
- Add as few lights as possible and try to use lights that cost less
- Minimal cost:
    - AmbientLight
    - HemisphereLight
- Moderate cost:
    - DirectionalLight
    - PointLight
- High cost:
    - SpotLight
    - RectAreaLight

## Baking
- techinique
- bake the light into texture
- using 3D software
- CONS: wont be able to move the lights, need a lot of textures

## Helpers
Positioning and orienting the lights is hard. To assist us, we can use helpers. Only the following helpers are supported:
- HemisphereLightHelper
- DirectionalLightHelper
- PointLightHelper
- RectAreaLightHelper -- harder to use
  ```js
    import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

    const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
    scene.add(rectAreaLightHelper)
  ```

- SpotLightHelper

To use them, simply instantiate those classes. Use the corresponding light as a parameter, and add them to the scene. The second parameter enables you to change the helper's size:

```js
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

// For the SpotLightHelper, there is no size parameter.
// Also, after moving the target, you need to call the update(...) method but on the next frame:

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})
```