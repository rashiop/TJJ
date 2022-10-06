# Galaxy Generator 

## New
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
3. Create a galaxy?
- define the radius
- define the branches (division)

![Screenshot 2022-10-06 at 14 00 07](https://user-images.githubusercontent.com/31156788/194235514-83876365-a8ec-4fa5-8c96-3a66d284483b.png)

- define the branchesAngle (the more y the more far in x) - PI*2 = 1 rotation circle

![Screenshot 2022-10-06 at 14 09 17](https://user-images.githubusercontent.com/31156788/194237756-c20b4d23-f4c1-4b89-b26b-d4c3c61741f2.png)

- define the randomness so the stars wont stick together

![Screenshot 2022-10-06 at 14 21 39](https://user-images.githubusercontent.com/31156788/194242969-45dff610-0cb3-4718-a051-89b9d3b4a6c7.png)


![Screenshot 2022-10-06 at 14 23 22](https://user-images.githubusercontent.com/31156788/194243266-2b8142b5-efd4-4ccb-b2b6-c47ea58bca41.png)

- define the color
```js
  // r,g,b
  const colors = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)
  
    // clone to avoid colorInside updated by lerp
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)
    colors[i3] = mixedColor.r // R
    colors[i3 + 1] = mixedColor.g // G
    colors[i3 + 2] = mixedColor.b // B
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    materials = new THREE.PointsMaterial({
        ...
        vertexColors: true,
      })

```
