# Three.js Journey

## RequestAnimationFrame
WHAT: to call function provided on next frame
we are going to call the same function on each new frame

Usage
```js
const tick = () => {
  window.requestAnimationFrame(tick)
}
tick()
```

## Animating
0. Use timestamp
```js
const clock = new THREE.Clock()
const tick = () => {
  // to make the rotation based on time
  const elapsedTime = clock.getElapsedTime()

  // movement and render goes here (1-...)

  window.requestAnimationFrame(tick)
}
```
1. Move up and down?
```js
  mesh.position.y = Math.sin(elapsedTime)
```
2. Move left right
```js
  mesh.position.y = Math.sin(elapsedTime)
```
3. Move on circle
```js
  mesh.position.y = Math.sin(elapsedTime)
  mesh.position.y = Math.sin(elapsedTime)
```
4. Rotate per second
 ```js
  mesh.rotation.y = elapsedTime
 ```
5. One rotation per second
```js
  mesh.rotation.y = elapsedTime
```
6. Rotate the camera instead
```js
 // so the camera follow the mesh view
  camera.position.x = Math.cos(elapsedTime)
  camera.lookAt(mesh.position)
```
7. Update the render
```js
    renderer.render(scene, camera)
```
