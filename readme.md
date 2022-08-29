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