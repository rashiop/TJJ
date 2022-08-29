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
## Handle Pixel Ratio
## Handle Fullscreen