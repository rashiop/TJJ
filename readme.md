# Imported Model
- Blender is easier on complex model :))
- [Formats](https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics), popular:
  - OBJ
  - FBX
  - STL
  - PLY
  - COLLADA
  - 3DS
  - GLTF

## GLTF
- GL Transmission Format
- by Khronos Group (team behind OpenGL, WebGL, Vulkan, Collada and with many members like AMD / ATI, Nvidia, Apple, id Software, Google, Nintendo, etc)
- It supports very different sets of data. You can obviously have data like the geometries and the materials but you can also have data like cameras, lights, scene graph, animations, skeletons, morphing and even multiple scene.
- STD 4 real-time => supported on most sw, engine, lib
- Use it everywhere?
    - NO!
    - heavy
    - simple geometry just use OBJ, FBX, STL, or PLY
- Free sample [model](https://github.com/KhronosGroup/glTF-Sample-Models)
- formats:
  - [default] glTF
    - we only load .gltf -> reference to __
      - `glTF` = JSON w/ camera, lights, scenes, materials, object transformations, but not geo/textures
      - `.bin` has UV coord, normals, vertex colors
      - `.png` as texture
  - glTF-Binary
    - 1 file
    - binary file
    - PROS: lighter
    - CONS: cant altered ezly
  - glTF-Draco
    - like default
    - but buffer data 
      - compressed using Draco algo
        - dracocompression is not exclusive to gltf
        - algo created by google
      - Need `DRACOLoader` to load
    - lighter
  - glTF-Embedded
    - 1 file
    - but JSON
    - PROS: ezly editable
  - sometimes hidden by the OS !!?
- I choose youuuu GLTF format
  - how asset handled
  - Alter textures / coords of the lights after exporting -> glTF-default
    - presents the adv of loading the diff files separately
    - load speed improv
  - 1 file only & wont modify -> glTF-Binary.
  - Both case, decide whether Draco or not
    - draco lightweight
    - more time to decode
    - if small model, might not need the Draco


### Use draco loader
The decoder is available in native JavaScript but also Web Assembly (wasm), and it can run in a worker (another thread as we saw at the end of the Physics lesson). Those two features significantly improve performances, but they imply having a wholly separated code.

Three.js already provided this seperated code. To find it, we must browse into the Three.js dependency and copy the Draco decoder folder into our /static/ folder.

This Draco folder is located in `/node_modules/three/examples/js/libs/`. Take the whole `/draco/` folder and copy it into your `/static/` folder. We can now provide the path to this folder to our dracoLoader:


```js
// cheap import
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const dracoLoader = new DRACOLoader()
// copy /node_modules/three/examples/js/libs/draco to /static/draco
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
let mixer = null
gltfLoader.load('/models/Fox/glTF-Draco/Fox.gltf', (gltf) => {
  // scaling the model
  gltf.scene.scale.set(0.03, 0.03, 0.03)
  scene.add(gltf?.scene)

  // animate model
  mixer = new THREE.AnimationMixer(gltf.scene)
  const action = mixer.clipAction(gltf.animations[0])
  action.play()
},
(progress) => {},
(error) => {}
)

// if using draco loader
gltfLoader.setDRACOLoader(dracoLoader)


// update animation on tick
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Update animations
  if (mixer) {
    mixer.update(deltaTime)
  }

  // ...
}

```