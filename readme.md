# Lights 
Material that reacts to lights
- MeshLambertMaterial
- MeshPhongMaterial
- MeshToonMaterial

## AmbientLight
- omnidirectional lightning on all geos of the scene
- has dimlight, that's why we can see the back
![Screenshot 2022-09-20 at 17 18 02](https://user-images.githubusercontent.com/31156788/191232794-816c50fd-a981-4df9-b64a-a4e08c2d38e9.png)


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

## DirectionalLight
- sun-like effect as if sun rays were travelling in parallel
- props color, intensity
- we cant see back parts

![Screenshot 2022-09-20 at 17 18 16](https://user-images.githubusercontent.com/31156788/191232847-65523048-1b50-406b-970d-8e1bb1e9a795.png)
```js
const directionalLight = new THREE.DirectionalLight()
// move direction x y z
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
```

## HemisphereLight
- similar to AL
- but more realistic
- has diff color from the sky than the color from the ground
- e.g: ground & sky
```js
// skyColor, groundColor, intensity
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
```
![Screenshot 2022-09-20 at 17 33 23](https://user-images.githubusercontent.com/31156788/191235962-86755cdd-5129-4b4d-8050-eb3ae32bd31f.png)


## PointLight
- like a lighter
- small
- light spreads uniformly in every dir
- can be moved
- decay = how fast light move
- distance = how far

By default, the light intensity doesn't fade. But you can control that fade distance and how fast it is fading using the distance and decay properties. You can set those in the parameters of the class as the third and fourth parameters, or in the properties of the instance:

![Screenshot 2022-09-20 at 17 47 59](https://user-images.githubusercontent.com/31156788/191238715-6f49a1ff-19d5-4ae4-bceb-f5837e5907bd.png)

```js
// color, intensity, (opt) distance, (opt) decay
const pointLight = new THREE.PointLight(0xff9000, 0.5,10, 2)
scene.add(pointLight)
pointLight.position.set(1, - 0.5, 1)
```

## RectAreaLight
- big rect lights, just like on photoshoot
- mix between directional light & diffuse light
- only works with `MeshStandardMaterial` & `MeshPhysicalMaterial`
- ease rotation using lookAt
- A Vector3 without any parameter will have its x, y, and z to 0 (the center of the scene)

![Screenshot 2022-09-20 at 19 13 01](https://user-images.githubusercontent.com/31156788/191254497-19dc90e5-5db9-4e83-b68b-c281961161da.png)

```js
// color, intensity, width, height
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)

// move the light & rotate it
// ease rotation using lookAt
rectAreaLight.position.set(- 1.5, 0, 1.5)
// vector3 = 0,0,0
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
  - penumbra: how diffused is the contour of the beam (sharp / diffused)
  - decay: how fast the light dims
- Rotating our SpotLight is a little harder. The instance has a property named target, which is an Object3D. The SpotLight is always looking at that target object. But if you try to change its position, the SpotLight won't budge:

![Screenshot 2022-09-20 at 19 14 18](https://user-images.githubusercontent.com/31156788/191254708-5fe4d05d-b47d-4596-a349-9dae82cc7d69.png)

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
To show camera position and orientation.
However, only the following helpers are supported:
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
  ```js
        // 1. Simply instantiate those classes
        // 2. Use the corresponding light as a parameter, and add them to the scene
        // The second parameter enables you to change the helper's size:

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
