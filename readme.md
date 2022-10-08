# Scroll based animation
- [ ] Use three.js as background of HTML page
- [ ] Make camera translate to follow the scroll
- [ ] Discover some tricks to make it more immersive
- [ ] Add a parallax animation based on the cursor position
- [ ] Trigger some animations when arriving at the corresponding section


Steps
1. css - set webgl position to fixed
2. css - set section position relative & h 100vh
3. fix elastic scroll issue
```js
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })
  renderer.setClearAlpha(0.5)
```
4. Add necessary code
  - light
  - texture
  - object
  - detect resize evt
5. Move the camera with scroll
  - add scroll evt listener
  - update camera per tick
  ```js
  let scrollY = window.scrollY
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    console.log(scrollY)
  })

  const tick = () => {
    // too sensitive due to unit difference
    camera.position.y = -scrollY
    
    // going down 1 unit for each section scrolled
    camera.position.y = - scrollY / sizes.height

    // object has 4 distance
    camera.position.y = - scrollY / sizes.height * objectsDistance
  }
  ```
6. Prettify with parallax effect
  - add mouse
  ```js
    const cursor = {}
    cursor.x = 0
    cursor.y = 0

    window.addEventListener('mousemove', (evt) => {
      cursor.x = evt.clientX / sizes.width - 0.5
      cursor.y = evt.clientX / sizes.height - 0.5
    })


    const tick = () =>{
        // ...

        // Animate camera
        camera.position.y = - scrollY / sizes.height * objectsDistance

        const parallaxX = cursor.x * 0.5
        // y up = +, down = -
        const parallaxY = -cursor.y * 0.5
        // smoothing move 
        cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
        cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

        // ...
    }
  ```
  - 