## 3D Text

TODO: recreate [ilithya's portfolio](https://www.ilithya.rocks/)

we will use [TextGeometry](https://threejs.org/docs/?q=textge#examples/en/geometries/TextGeometry)but we need a `font format` called typeface

1. Get the typeface
    - Convert font with [converters](https://gero3.github.io/facetype.js/)
    - Three.js's font
      - import from node_modules `three/examples/fonts/...`
        ```js
        import typefaceFont from '/fonts/helvetiker_regular.typeface.json'
        ```
      - load the font using FontLoader
2. Load the font
  ```js
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font) => {
          console.log('loaded')
      }
    )
  ```
3. Create the geometry
4. Center the text
5. Add a matcap material
6. Add objects
7. Optimize
8. More info