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
6. Apply Forces
  -  ways
      - applyForce - apply force to body from a specified point in space 
      - [applyLocalForce](https://schteppe.github.io/cannon.js/docs/classes/Body.html#method_applyLocalForce) - same w/ AF
          - but coordinates local to the body
          - 0,0,0 would be center of the body
      - applyImpulse
         - instead of adding force to change velocity (AF)
         - applies directly to velocity
      - applyLocalImpulse - same w/ AI, but coordinates are local to the body

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

#### Handle multiple object
```js
const objectsToUpdate = []
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
  envMap: environmentMapTexture,
  metalness: 0.3,
  roughness: 0.4,
})
const createSphere = (radius, position) => {
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  mesh.scale.set(radius, radius, radius)
  mesh.castShadow = true
  mesh.position.copy(position)
  scene.add(mesh)

  // cannon.js body
  const body = new CANNON.Body({
    mass: 1,
    position: position,
    shape: new CANNON.Sphere(radius),
    material: defaultMaterial,
  })
  world.addBody(body)

  // save to objectsToUpdate
  objectsToUpdate.push({ mesh, body })
}
createSphere(0.5, { x: 0, y: 3, z: 0 })


const tick = () => {
  ...

    // Update physic worlds
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position)
    object.mesh.quarternion.copy(object.body.quarternion)
  }
  // elapsed time, how much the time has passed, how many iteration for the threejs to catchup
  world.step(1 / 60, deltaTime, 3)
}
```
#### Performance Opt
1. Broadphase

When testing the collisions between objects, a naive approach is testing every Body against every other Body. While this is easy to do, it's costly in terms of performance.

That is where broadphase comes up. The broadphase is doing a rough sorting of the Bodies before testing them. Imagine having two piles of boxes far from each other. Why would you test the boxes from one pile against the boxes in the other pile? They are too far to be colliding.

There are 3 broadphase algorithms available in Cannon.js:

NaiveBroadphase: Tests every Bodies against every other Bodies
GridBroadphase: Quadrilles the world and only tests Bodies against other Bodies in the same grid box or the neighbors' grid boxes.
SAPBroadphase (Sweep and prune broadphase): Tests Bodies on arbitrary axes during multiples steps.
The default broadphase is NaiveBroadphase, and I recommend you to switch to SAPBroadphase. Using this broadphase can eventually generate bugs where a collision doesn't occur, but it's rare, and it involves doing things like moving Bodies very fast.

To switch to SAPBroadphase, simply instantiate it in the world.broadphase property and also use this same world as parameter:

```js
world.broadphase = new CANNON.SAPBroadphase(world)
```

2. Sleep
- When the body stop moving
- Broadphasing alg is no longer needed
- happened per body... the body that still moving not sleeping, vice versa
```js
world.allowSleep = true
```

#### Go further
1. Constraint
  - HingeConstraint: acts like a door hinge
  - DistanceConstraint: forces the bodies to keep a distance between each other
  - LockConstraint: merge the bodies like if they were 1 piece
  - PointToPointConstraint: glues the bodies to a specific point
2. Classes, methods, properties, events
3. Workers
  - physiscs simulation takes time
  - three & cannon, logic in the same thread in our CPU 🫣
  - quickly overload if too much => frame rate drop
  - SOOOO....
    - spread the load in a diff thread
    - perf improvement
 4. Cannon-es
  - cannon.js hasnt updated for years
  - ver maintained of cannon
