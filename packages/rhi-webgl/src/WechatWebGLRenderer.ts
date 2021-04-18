import {
  Canvas,
} from "@oasis-engine/core";
import { GLCapability } from "./GLCapability";
import { GLExtensions } from "./GLExtensions";
import { GLRenderStates } from "./GLRenderStates";
import { WebGLExtension } from "./type";
import { WebCanvas } from "./WebCanvas";

import {
  __setGlobalCanvas
} from "@oasis-engine/wechat-adapter";

import { WebGLRenderer as OriginWebGLRenderer } from './WebGLRenderer';

export {
  WebGLMode,
  WebGLRendererOptions,
} from './WebGLRenderer';

export class WebGLRenderer extends OriginWebGLRenderer {
  init(canvas: Canvas) {
    const option = this.options;
    const webCanvas = (canvas as WebCanvas)._webCanvas;
    
    let gl: (WebGLRenderingContext & WebGLExtension) | WebGL2RenderingContext;

    this._isWebGL2 = false;
    gl = <WebGLRenderingContext & WebGLExtension>webCanvas.getContext("webgl", option);
    if (!gl) {
      throw new Error("Get GL Context FAILED.");
    }

    this._gl = gl;
    this._renderStates = new GLRenderStates(gl);
    this._extensions = new GLExtensions(this);
    this._capability = new GLCapability(this);
    this._options = null;

    // used to some global functions polyfill, such as Image, rAF, cAF...
    this._activedTextureID = gl.TEXTURE0;
    __setGlobalCanvas(webCanvas, gl);
  }
}