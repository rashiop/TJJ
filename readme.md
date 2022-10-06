# Galaxy Generator 

## Steps
1. lil-gui
- `onFinishChange` - callback to after value change on gui
```js
gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
```
2. destroy old one
- after re-add to screen
- need to remove manually
```js
    if(points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

```