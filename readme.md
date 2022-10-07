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
  - Prereq:
    - coordinate of mouse
      X JS coord -> pixel
      need value from `-1` to `1` in horizontal & vertical ax
    - create a mouse
      ```js
        /**
         * Mouse
        */
        const mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) => {
          // normalize the value 0..1
          mouse.x = event.clientX / sizes.width * 2 - 1
          // normalize the value 1..0
          mouse.y = - (event.clientY / sizes.height) * 2 + 1

          console.log(mouse)
        })
      ```
    - create a witness
    - create the event
      - mouseenter
        1 object intersecting
      - mouseleave
        prev: intersect
        now: no intersect
    - HOW  save currently intersecting
  - Handle Hovering
    - WHY not `mousemove` evt?
      might triggered > frame rate for some browser
    - PROBLEM?
      orientation
      handled by? `setFromCamera`
    ```js
    const tick = () => {
      /// orient the ray in the right direction
      raycaster.setFromCamera(mouse, camera)
      
      const objectsToTest = [object1, object2, object3]
      const intersects = raycaster.intersectObjects(objectsToTest)
      
      for(const intersect of intersects) {
        intersect.object.material.color.set('#0000ff')
      }

      for(const object of objectsToTest) {
        if(!intersects.find(intersect => intersect.object === object)) {
          object.material.color.set('#ff0000')
        }
      }
    }
    ```
  - Handle Mouse enter and leave evt
    - WHY not `mouseenter` `mouseleave` etc
      unsupported -> just DIY it :D
  ```js
    let currentIntersect = null
    const tick = () => {
      raycaster.setFromCamera(mouse, camera)
      const objectsToTest = [object1, object2, object3]
      const intersects = raycaster.intersectObjects(objectsToTest)

      if (intersects.length) {
        if (!currentIntersect) {
          console.log('mouse enter')
        }

        currentIntersect = intersects[0]
      } else {
        if (currentIntersect) {
          console.log('mouse leave')
        }

        currentIntersect = null
      }
    }
  ```
  - MouseClick evt
    - just listen to `click` 
    - prereq mouseintersect
      ```js
      
      window.addEventListener('click', () => {
        if (currentIntersect) {
          switch (currentIntersect.object) {
            case object1:
              console.log('click on object 1')
              break

            case object2:
              console.log('click on object 2')
              break

            case object3:
              console.log('click on object 3')
              break
          }
        }
      })
      ```

