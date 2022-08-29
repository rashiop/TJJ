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

  // update pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})
```
## Handle Pixel Ratio
We might see blurry render & stair effect on the edges due to pixel ratio on computer > 1. **Pixel ratio** shows `how many pixels we have on screen for 1 pixel unit` on software parts.

As the time goes, manufacturer increase the pixel ratio.
2 => split 1 pixel 2 times (4)
3 => split 1 pixel 3 times (9)
Highest fixel ratio is mobile (5)

check it
```js
window.devicePixelRatio
```

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```
## Handle Fullscreen