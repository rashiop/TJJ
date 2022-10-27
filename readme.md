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
  - [Cannon.js](https://schteppe.github.io/cannon.js/) [docs](http://schteppe.github.io/cannon.js/docs/)
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
  - define material
  - define ContactMaterial (wat if 2 type collides) & add to world
  - used the material in body 
  - we can use 1 default material
3. Opt - create a body for ground (plane infinite size) 
4. Update physic world
  - fixed time step 1/60 (60fps)
  - time passed after last step 
  - no of iteration world can apply to catch up w/ potential delay
5. Set position of threejs world to physic body position


```js
// World
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0) // we are using earth gravity

// Material
const plasticMaterial = new CANNON.Material('plastic')
const concreteMaterial = new CANNON.Material('concrete')
const concretePlasticContactMaterial = new CANNON.ContactMaterial(plasticMaterial, concreteMaterial, {
  friction: 0.1, // slow it down
  restitution: 0.7, // how bouncy it will
})
world.addContactMaterial(concretePlasticContactMaterial)

// Body
// Sphere
const sphereShape = new CANNON.Sphere(0.5)
const sphereBody = new CANNON.Body({
  mass: 1, // the heavier the greater impact
  position: new CANNON.Vec3(0, 3, 0), // we want to make it fall :))
  shape: sphereShape,
  material: plasticMaterial,
})
world.addBody(sphereBody)

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body({
  mass: 0, // static
  shape: floorShape,
  material: concreteMaterial,
})
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody)
...

const tick = () => {
  // update physic world
  world.step()
}

```
