# Raycaster

cast a ray in specific direction & test what objects intersect with it
![Screenshot 2022-10-06 at 18 35 45](https://user-images.githubusercontent.com/31156788/194302652-166ef798-4f51-4796-8a80-63fac9c65c79.png)

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
  
  ![Screenshot 2022-10-06 at 18 36 16](https://user-images.githubusercontent.com/31156788/194302761-68570bcb-e814-45d8-8879-e50490d9d4c5.png)
  
4. Result of intersection
  - always array cos 1 O can be passed >1 (eg torus)
  
  ![Screenshot 2022-10-06 at 18 36 43](https://user-images.githubusercontent.com/31156788/194302880-f9e48315-7d43-4e6c-8400-c0caa9cc55c5.png)

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
  
