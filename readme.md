# Particles

Used on stars, smoke, rain, dust, fire, etc
PROS: We can have hundreds of thousands of particles on screen with reasonable frame rate (flyweight)
CONS: every particle composed of a plane (2 triangles) alwys facing the cam

What we need:
1. `PointsMaterial` - handle particle
2. `Points` - instead of mesh
3. `BufferGeometry`

## Geometry
- any of basic geometries OK
- but preferable using `BufferGeometries`
- each vertex of the geo become a particle
```js
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
```
## PointsMaterial
- `size` - control all particles size
- `sizeAttenuation` - specify if distant particles should be smaller than close one
```js
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})

// or

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.02
particlesMaterial.sizeAttenuation = true
```
## Points
```js
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```
CustomGeometry
```js
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
```
## Color, map, alpha map
[particle pack](https://www.kenney.nl/assets/particle-pack)
```js
particlesMaterial.color = new THREE.Color('#ff88cc')

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')
particlesMaterial.map = particleTexture
```
Alphamap
- PROBLEM with MAP: the front particles are hiding the back particles
- Solution
    - replace map to alphamap
    - activate transparent
```js
// particlesMaterial.map = particleTexture

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
```

alphaTest
-  between 0 and 1 
- enables the WebGL to know when not to render the pixel according to that pixel's transparency
    - Default = 0 = the pixel will be rendered anyway
    - Small value such as 0.001 => the pixel won't be rendered if the alpha is 0


depthTest
- When drawing
- the WebGL tests if what's being drawn is closer than what's already drawn
- That is called depth testing and can be deactivated (you can comment the alphaTest)
- deactivating the depth testing might create bugs
    - IF other particles with different colors
    - Other particles might be drawn as if they were above 


```js
// particlesMaterial.alphaTest = 0.001
particlesMaterial.depthTest = false
```

depthWrite
- WebGL is testing if what's being drawn is closer than what's already drawn
- The depth of what's being drawn is stored in what we call a `depth buffer`
- Instead of not testing if the particle is closer than what's in this depth buffer
- we can tell the WebGL not to write particles in that depth buffer (you can comment the depthTest)
```js
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
```
In our case, this solution will fix the problem with almost no drawback. Sometimes, other objects might be drawn behind or in front of the particles depending on many factors like the transparency, in which order you added the objects to your scene, etc.


We saw multiple techniques, and there is no perfect solution. You'll have to adapt and find the best combination according to the project.



## Blending
Currently, the WebGL draws the pixels one on top of the other.

By changing the blending property, we can tell the WebGL not only to draw the pixel, but also to add the color of that pixel to the color of the pixel already drawn. That will have a saturation effect that can look amazing.

To test that, simply change the blending property to `THREE.AdditiveBlending` (keep the depthWrite property)

CONS: performance
```js
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
```

#### Different Colors
We can have a different color for each particle. We first need to add a new attribute named color as we did for the position. A color is composed of red, green, and blue (3 values), so the code will be very similar to the position attribute. We can actually use the same loop for these two attributes:
```js
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
```

To activate those vertex colors, simply change the vertexColors property to true:

```js
particlesMaterial.vertexColors = true
```
The main color of the material still affects these vertex colors. Feel free to change that color or even comment it.
```js
// particlesMaterial.color = new THREE.Color('#ff88cc')
```


## Animate
Ways to animating particles
1. Using points as an object
Because the Points class inherits from the Object3D class, you can move, rotate and scale the points as you wish.
Rotate the particles in the tick function....
While this is already cool, we want more control over each particle.
    ```js
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update particles
        particles.rotation.y = elapsedTime * 0.2

        // ...
    }
    ```
2. Changing attributes
    Another solution would be to update each vertex position separately. This way, vertices can have different trajectories. We are going to animate the particles as if they were floating on waves but first, let's see how we can update the vertices.

    Start by commenting the previous rotation we did on the whole particles:

    To update each vertex, we have to update the right part in the position attribute because all the vertices are stored in this one dimension array where the first 3 values correspond to the x, y and z coordinates of the first vertex, then the next 3 values correspond to the x, y and z of the second vertex, etc.

    We only want the vertices to move up and down, meaning that we are going to update the y axis only. Because the position attribute is a one dimension array, we have to go through it 3 by 3 and only update the second value which is the y coordinate.

    Let's start by going through each vertices:

      ```js
        const tick = () =>
        {
            for(let i = 0; i < count; i++)
            {
                const i3 = i * 3

                particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
            }
            particlesGeometry.attributes.position.needsUpdate = true 

        }
      ```

      All the particles should be moving up and down like a plane.

      That's a good start and we are almost there. All we need to do now is apply an offset to the sinus between the particles so that we get that wave shape.

      To do that, we can use the x coordinate. And to get this value we can use the same technique that we used for the y coordinate but instead of i3 + 1, it's just i3:

      ```js
      const tick = () =>
      {
          // ...

          for(let i = 0; i < count; i++)
          {
              let i3 = i * 3

              const x = particlesGeometry.attributes.position.array[i3]
              particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
          }
          particlesGeometry.attributes.position.needsUpdate = true

          // ...
      }
      ```
      You should get beautiful waves of particles. Unfortunately, you should avoid this technique. If we have 20000 particles, we are going through each one, calculating a new position, and updating the whole attribute on each frame. That can work with a small number of particles, but we want millions of particles.
3. Custom shader
To update these millions of particles on each frame with a good framerate, we need to create our own material with our own shaders. But shaders are for a later lesson.

