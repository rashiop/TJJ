# Fullscreen and Resizing

## Fit in the viewport
As simple as window.<innerSize> below? But there is margin top left due to browser default setting :)
```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
```
add some css, cause we might need to use `controls.enabled = false` and mac trackpad managed to scroll :(
```css
html, body {
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```
## Handle Resize
There is no autoresize, we need to be aware there is a resize event.
Steps:
1. listen to the window size change
2. update the camera size
3. update the renderer aka canvas size
```js
window.addEventListener('resize', () => {
  // update the sizes -> wont show result
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth


  // update the camera -> cube is being stretched because the camera aspect updated, but canvas size still the same
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update the renderer, update the canvas size
  renderer.setSize(sizes.width, sizes.height)
})
```
## Handle Pixel Ratio
## Handle Fullscreen