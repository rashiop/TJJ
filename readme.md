# Haunted House
Practice previous subjects:
- geometries
    - elementary house - House
        - walls
        - roof
        - door
        - bushes
    - grave
    - multicolor lights floating arround as ghost
- textures

## Tips for measurements
1 unit can be anything in three.js
imperial units need conversion

## Step
1. Create a House group
    - Use `MeshStandardMaterial` for realistic UI
    - Roof
        - need to be rotated
        - Math.PI = 1/2 rotation circle aka 180deg
        - so, we use Math.PI / 4
![Screenshot 2022-09-26 at 13 54 42](https://user-images.githubusercontent.com/31156788/192212091-882b6830-3eac-4b5c-aa12-39f34c492819.png)

2. Create a Graves group
    - Grave, must be
        - inside plane
        - outside house
    - set angle, circling the house
        ```js
        // 1 circle rotation
        const angle = Math.random() * Math.PI * 2
        // house width + randomness
        const radius = 3 + Math.random() * 6 // Random radius
        // position of sphere
        const x = Math.cos(angle) * radius // Get the x position using cosinus
        const z = Math.sin(angle) * radius // Get the z position using sinus
        
        
        // rotation
        // still on same direction
        // only -0.5 - 0.5
          grave.rotation.z = (Math.random() - 0.5) * 0.3
          grave.rotation.y = (Math.random() - 0.5) * 0.4
        ```
        
        ![Screenshot 2022-09-26 at 19 49 06](https://user-images.githubusercontent.com/31156788/192280637-37f6e5c7-dfb3-423c-88e0-fc67238a7826.png)
![Screenshot 2022-09-26 at 13 54 55](https://user-images.githubusercontent.com/31156788/192212126-149da62a-8990-47cc-b928-ff7a3e0cdc96.png)



3. Add lights
    - ambients
    - moon lights (directional)
    - point lights (house lights)
    ![Screenshot 2022-09-26 at 13 55 30](https://user-images.githubusercontent.com/31156788/192212234-b84b35e5-1fe7-42ae-81ac-7404befb4799.png)

4. Fog
    - near - how far from camera does the fog start
    - far - how far from the cam will the fog be fully opaque
    - Make background equal to fog color to hide the plane edge 
    ```js
    const fog = new THREE.Fog('#262837', 1, 15)
    scene.fog = fog
    // Make background equal to fog color
    renderer.setClearColor('#262837')
    ```
5. Textures
    - door
    ![Screenshot 2022-09-26 at 13 56 07](https://user-images.githubusercontent.com/31156788/192212345-04aaf496-9b8c-4850-a539-6c21a16a3813.png)
    - walls
    ![Screenshot 2022-09-26 at 13 56 26](https://user-images.githubusercontent.com/31156788/192212392-56ebb159-0414-46a2-8180-37161fa2ae12.png)
    - floor
    ![Screenshot 2022-09-26 at 13 57 02](https://user-images.githubusercontent.com/31156788/192212497-266e4229-9f5e-432b-ae91-863a8d5daa46.png)

6. Ghost
 
7. Add shadows for realism
![Screenshot 2022-09-26 at 13 57 56](https://user-images.githubusercontent.com/31156788/192212630-dbc96a82-3cf1-45a4-926e-f2a15fd74bb7.png)
