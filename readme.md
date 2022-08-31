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
      const textGeometry = new TextGeometry(
        <<Text>>,
        {
          font
        }
      )
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

  const textGeometry = new TextGeometry()
  ```
4. Center the text
5. Add a matcap material
6. Add objects
7. Optimize
8. More info