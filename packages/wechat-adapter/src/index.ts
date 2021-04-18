/**
 * Wechat SystemInfo
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html
 */
export const systemInfo = wx.getSystemInfoSync();

/**
 * window polyfill
 */
let window = typeof GameGlobal === 'object' ? GameGlobal.window : {};

/**
 * global object `performance` polyfill
 */
export const performance = window.performance ?? Date;

/**
 * Wechat has no global class `WebGLRenderingContext` or `WebGL2RenderingContext`,
 * this polyfill use canvas context object to simulate WebGL class constructor
 */
let _canvas = null;
export let WebGLRenderingContext = {};
export let WebGL2RenderingContext = WebGLRenderingContext;
export function __setGlobalCanvas(canvas, gl) {
  _canvas = canvas;
  WebGLRenderingContext = WebGL2RenderingContext = gl;
}

/**
 * rAF & cAF polyfill
 */
export function requestAnimationFrame(callback) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback)
  }
  return _canvas.requestAnimationFrame(callback);
}

export function cancelAnimationFrame(id) {
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id)
  }
  return _canvas.cancelAnimationFrame(id);
}

/**
 * global Image function polyfill
 */
export const Image = function() {
  return _canvas.createImage ? _canvas.createImage() : wx.createImage();
}