# Code Structuring
```
.
├── src                   
| └─ experience
|   ├── utils
|   |   ├── Debug             # Save active status, the debug function will be on each file
|   |   ├── EventEmitter      # Trigger & listen to event
|   |   ├── Sizes             # Handle sizes & aspect ratio & resize evt
|   |   ├── Time              # Handle request animation frame & update tick based on delta time
|   |   └── Resources         # Load all source file & save loaders
|   └── world                  
|       ├── Environment
|       ├── ... Geometries
|       └── World              # Listen to resource load & construct ...geometries & environment
|   ├── Camera                 # Camera & Controls
|   ├── Experience             # Main class, handle resize, time tick, update, destroy
|   ├── Renderer               # WebGLRenderer
|   └── sources                # {name, type, path}[] for all resources
├── statics                    # for public asset
└── README.md
```


## Sources
- [Destroy](https://threejs.org/docs/index.html?q=dispose#manual/en/introduction/How-to-dispose-of-objects)