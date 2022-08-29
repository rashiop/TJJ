# Texture 
Images that will cover our geometries surface.
Famous texture by [Joao Paulo](https://3dtextures.me/2019/04/16/door-wood-001/):
1. Color (or albedo) - take pixels of texture & applied to geometry
2. Alpha - grayscale image where white visible, black wont
3. Height - grayscale image
    - V move vertices
    - PURPOSE: create some relief
    - to see? add subdivision
4. Normal - add small details
    - X move vertices
    - V lure the light into thinking that face is oriented differently
    - PERF: great, no need to subdivide geo
5. Ambient occlusion - grayscale img
    - fake shadow in the surface's crevices
    - not physically accurate
    - PURPOSE: create contrast
6. Metalness - grayscale image
    - specify which is metallic (white)
    - specify which is non-metallic (black)
    - PURPOSE: create reflection
7. Roughness: grayscale img that come with metalness
    - specify which is rough (white)
    - which is smooth (black)
    - PURPOSE: dissipate the light
    - e.g: rugged carpet no light reflection, water's surface so smooth and we can see the light reflecting on it, wood is uniform due to a clear coat on it
8. PBR - Physically Based Rendering
    - regroup many tech for realistic results
    - standard for realis
    - [source1](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/), [source2](https://marmoset.co/posts/physically-based-rendering-and-you-can-too/)

## Load a Textures
### 0. Getting the image URL
1. [ALT] put it on static folder
2. Use native JS
Image need to be convert to texture to be used, needsUpdate told texture to rerender
```js
  /**
   * Textures
  */
  const image = new Image()
  const texture = new THREE.Texture(image)

  image.onload = () => {
    texture.needsUpdate = true
  }
  image.src = '/textures/door/color.jpg'
```

Apply it to material
```js
const material = new THREE.MeshBasicMaterial({ map: texture })

```
### 2. Use TextureLoader
### 3. Use LoadingManager
### 4. UV unwrapping
### 5. Transforming the texture
- repeat
- offset
- rotation
### 6. Filtering and Mipmapping
- minification filter
- magnification filter
### 7. Texture format & optimisation
- size
- data

### Extra: Where to find the textures
- [poliiigon.com](http://poliigon.com/)
- [3dtextures.me](https://3dtextures.me/)
- [arroway-textures.ch](https://www.arroway-textures.ch/)
