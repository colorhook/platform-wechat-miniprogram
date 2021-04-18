import {
  systemInfo
} from '@oasis-engine/wechat-adapter';
/**
 * System info.
 */
 export class SystemInfo {
  /**
   * The pixel ratio of the device.
   */
  static get devicePixelRatio(): number {
    return systemInfo.devicePixelRatio;
  }

  /**
   * @internal
   */
  static _isIos(): boolean {
    return systemInfo.platform === 'ios'
  }
}
