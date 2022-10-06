# Raycaster

cast a ray in specific direction & test what objects intersect with it

Usage:
- detect wall in front of player
- check if laser gun hit something
- test if something currently under the mouse to simulate mouse evt


Step
1. Init a raycaster
2. Change direction & position
3. Cast a ray
  - `intersectObject(...)`
  - `intersectObjects(...)`
4. Result
  - always array cos 1 O can be passed >1 (eg torus)
  - return
    - distance - origin vs collision point
    - face - face of geo hit by ray
    - faceIndex - idx of face
    - object - o concerned by collision
    - point - `vector3` of exact position in 3D space of the collision 
    - uv - UV coordinates in geometry
  - sample
    - test `distance` to check whether there is a wall
    - change O color by update O material
    - show explosion on impact point on `point` posiiton
5. Test on each frame
  
```js
/// 1. Initiate
const raycaster = new THREE.Raycaster()

// 2. Change direction & position
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(1, 0, 0)
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)

// 3. Cast a ray
const intersect = raycaster.intersectObject(object2)
console.log(intersect)

const intersects = raycaster.intersectObjects([object1, object2, object3])
console.log(intersects)

for(const intersect of intersects) {
    intersect.object.material.color.set('#0000ff')
}
```

6. Usage with mouse
  - if O behind mouse / hovering
  - Handle Hovering
  - Hanlde Mouse enter and leave evt
  