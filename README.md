# platform-wechat-miniprogram

Adaptation layer of WeChat miniprogram platform.

## Usage

```typescript
const engine = new WebGLEngine(canvas_element);
const canvas = engine.canvas;
const rootEntity = engine.sceneManager.activeScene.createRootEntity("Root");
canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;

// Create light.
const lightEntity = rootEntity.createChild("Light");
const ambient = lightEntity.addComponent(AmbientLight);
const directLight = lightEntity.addComponent(DirectLight);
ambient.color = new Color(0.5, 0.5, 0.5);
directLight.color = new Color(0.3, 0.4, 0.4);

// Create camera.
const cameraEntity = rootEntity.createChild("Camera");
cameraEntity.transform.setPosition(0, 6, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));
cameraEntity.addComponent(Camera);

// Create cube.
const cubeEntity = rootEntity.createChild("Cube");
const cubeRenderer = cubeEntity.addComponent(MeshRenderer);
const material = new BlinnPhongMaterial(engine);
cubeEntity.transform.rotate(0, 60, 0);
cubeRenderer.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
cubeRenderer.setMaterial(material);

// Run engine.
engine.run();
```

## Build

If you don't already have Node.js and NPM, go install them. Then, in the folder where you have cloned the repository, install the build dependencies using npm:

```sh
npm run bootstrap
```

Then, to build the source for wechat miniprogram or minigame, using npm:

```sh
npm run b:wechat
```

All the build details are in `rollup.wechat.config.js`, there are several adaptation manner:

### API Polyfill 

create a adapter for standard API, just like Alipay Miniprogram adaptation skills

```js
const adapterArray = [
  "window",
  "WebGLRenderingContext",
  "WebGL2RenderingContext",
  "document",
  "Element",
  "Event",
  "EventTarget",
  "HTMLCanvasElement",
  "HTMLElement",
  "HTMLMediaElement",
  "HTMLVideoElement",
  "Image",
  "navigator",
  "Node",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "performance",
];
```

### Compiler Variable

Used for compile-time logic replacement

```js
if (process.env.WECHAT) {
  // logic in wechat platform
}
```

Related files:

* packages/loaders/src/BufferLoader.ts
* packages/loader/src/gltf/Util.ts
* packages/core/src/asset/request.ts

### Module Replaced

replace a module with another file, by custom rollup plugin

```js
const adapterRemap = {
  './OrbitControl': './WechatOrbitControl',
  './SystemInfo': './WechatSystemInfo',
  '../SystemInfo': '../WechatSystemInfo',
  './WebGLRenderer': './WechatWebGLRenderer',
}
```

Related files:

* packages/core/src/SystemInfo.ts
* packages/rhi-webgl/src/WebGLRenderer.ts
* packages/controls/src/OrbitControl.ts


## Links

- [Official Site](https://oasis-engine.github.io)
- [Playground](https://oasis-engine.github.io/0.3/playground)
- [Manual](https://oasis-engine.github.io/#/0.3/manual/zh-cn/README)
- [API References](https://oasis-engine.github.io/0.3/api/globals.html)

## License 

The Oasis Engine is released under the [MIT](https://opensource.org/licenses/MIT) license. See LICENSE file.
