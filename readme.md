# Debug UI

## Possible solution?
- DIY
- [dat.GUI](https://github.com/dataarts/dat.gui)
  control of:
    - camera
    - postprocess
    - world (sounds, floor)
    - physics
  Vulnerabilities? Inactive
- [lil-gui](https://github.com/georgealways/lil-gui)
  Drop-in replacement for dat.gui in most project, can be used the same way as dat.gui
- control-panel
- ControlKit
- Guify
- Oui

## Sample
[bruno's](https://bruno-simon.com/#debug)

## Lil-gui
```js
import * as dat from 'lil-gui'

/**
 * Debug
 */
// if we want default setting
const gui = new dat.GUI({ width: x })

```

Results in empty panel on top right, tweaks to be added:
- range - min max val
- color
- text
- checkbox
- select
- button
- folder

How to add elements?
```js
gui.add(<<object>>, <<property to tweak>>)
```

```js
// add elements
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation') // label

// or 
gui.add(mesh.position, 'y', min, max, step)
```

```js
// change the params that object has
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// add colors
const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}
gui
  .addColor(parameters, 'color')
  .onChange(() => {
    material.color.set(parameters.color)
  })

gui.add(parameters, 'spin')

```

Hide gui
```js
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'h') {
    if (gui._hidden) gui.show()
    else gui.hide()
  }
})
```