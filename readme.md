## 3D Text

TODO: recreate [ilithya's portfolio](https://www.ilithya.rocks/)

we will use [TextGeometry](https://threejs.org/docs/?q=textge#examples/en/geometries/TextGeometry)but we need a `font format` called typeface


Complete code
```js
  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

  fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
      const textGeometry = new TextGeometry(<<text>>, {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
      })

      const textMaterial = new THREE.MeshBasicMaterial()
      gui.add(textMaterial, 'wireframe')

      const text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)
    }
  )
```
1. Get the typeface
    - Convert font with [converters](https://gero3.github.io/facetype.js/)
    - Three.js's font
      - import from node_modules `three/examples/fonts/...`
        ```js
        import typefaceFont from '/fonts/helvetiker_regular.typeface.json'
        ```
      - copy to `static/fonts`
2. Load the font
  ```js
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font) => {
          
      }
    )
  ```
3. Create the geometry
  ```js
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

  const textGeometry = new TextGeometry('Pupu Sari', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  })

  const textMaterial = new THREE.MeshBasicMaterial()
  gui.add(textMaterial, 'wireframe')

  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)
  
  ```
  On wireframe view, there are a lot of triangles.
  Try to keep the geometry as low poly as possible by reducing
   - curveSegments 
   - bevelSegments


4. Center the text
- THE HARD WAY - Bounding
  - Geometry's information tells what space is taken by that geometry
  - box or square - default
  - invisible
  - decide where render the object or not depends on camera view position `frustum culling` good for performance
  - textGeometry.computeBoundingBox()
    - return Box3
    - min -> not 0 -> due to `bevelThickness` & `bevelSize`
    - max
  - move the geometry using box-bounding
    ```js
      textGeometry.translate(
        - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
        - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
        - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
      )
    ```
- Simpler - center
  ```js
    textGeometry.center()
  ```
5. Add a matcap material
6. Add objects
7. Optimize
8. More info