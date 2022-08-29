# Geometries
## What is geometries
- Composed of vertices  & faces 
  - vertices: point coordinates in 3D spaces
  - faces: triangles that join those vertices to create a surface
- Can be used for meshes & particles
- Can store data other than position (UV coor, normals, colors/etc)
## Built-in geometries
All geometries are inherited from `BufferGeometry`, [sources](https://threejs.org/docs/index.html?q=geometr#api/en/core/BufferGeometry)
1. BoxGeometry
2. CapsuleG
3. CircleG
4. ConeG
5. CylinderG
6. DodecahedronG
7. EdgesG 
8. ExtrudeG
9. IcosahedronG
10. LatheG - cone, vases
11. OctahedronG - 8 faces
12. PlaneG - triangle based 2D like
13. PolyhedronG
14. RingG - hollow on center
15. ShapeG - based on curved (bezierCurve), DIY
16. SphereG - cool for creating planets
17. TetrahedronG
18. TorusG - like a ring
19. TorusKnotG - ring tied to each other, cool!
20. TubeG - tube that can follow the path
21. TextG
22. WireframeG

## Your custom geometries
How to store buffer geometry data?
1. Using Float32Array
  - typed array
  - only float
  - fixed len
  - easier to handle for computer
```js
const positionsArray = new Float32Array([
    // x, y, z
    0, 0, 0,
    0, 1, 0,
    1, 0, 0
])
```
2. Convert to BufferAttribute
```js
const positionsAttribute = new THREE.BufferAttribute(positionArray, 3)
```
3. Create a BufferGeometry using positionsAttribute
```js
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionsAttribute)
```

#### Example
Create a bunch of random triangle

```js
const geometry = new THREE.BufferGeometry()

// each triangle 3 vertices
// each vertices 3 values x,y,z
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count*3*3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
```