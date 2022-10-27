# Physics
## What
- Why not mathematics and solutions like Raycaster
  - lack of tension, friction, bouncing, constraints, pivots, etc
  - hard on 3D
- Better use lib

## Theory
- create a Three.js mesh
- we also create a ver of that mesh inside the physics world
- Then, on each frame, before rendering anything
    - we tell the physics world to update itself
    - we take the coordinates (position and rotation) of the physics objects & apply them to the corresponding Three.js mesh
<img width="805" alt="Screenshot 2022-10-27 at 17 59 58" src="https://user-images.githubusercontent.com/31156788/198267360-52b2dc16-f70a-4a56-82f8-bb7e983f2db0.png">

## Libraries
- 2D vs 3D
  - 2D more perf
  - 2D sometimes enough, [examples](http://letsplay.ouigo.com/)
- 3D
  - [Ammo.js](http://schteppe.github.io/ammo.js-demos/) -- most common
  - [Cannon.js](https://schteppe.github.io/cannon.js/)
  - [Oimo.js](https://lo-th.github.io/Oimo.js/#basic)
- 2D
  - similar with 3D, but diff axes to update
  - [Matter.js](https://brm.io/matter-js/)
  - [P2.js](https://schteppe.github.io/p2.js/)
  - [Plank.js](https://piqnt.com/planck.js/)
  - [Box2D.js](https://kripken.github.io/box2d.js/demo/webgl/box2d.html)
- [Physijs](https://chandlerprall.github.io/Physijs/)

## Cannon.js
1. Create a world (like sphere)
2. Create a body (like mesh)
```js
// World
const world = new CANNON.world()
world.gravity.set(0, -9.82, 0) // we are using earth gravity

// Body
const sphereShape = new CANNON.Sphere(0.5)
const sphereBody = new CANNON.Body({
  mass: 1, // the heavier the greater impact
  position: new CANNON.Vec3(0, 3, 0), // we want to make it fall :))
  shape: sphereShape,
})
world.addBody(sphereBody)

```
