import { ICookieOptions, ICookieConfig } from './types';
import { computePrefix } from './utils';

export class Cookie {
  /**
   * 设置
   * @param key 键
   * @param value 值
   * @param options 选项
   */
  static set(key: string, value: string, options: ICookieOptions = {}): void {
    let cookieString = `${key}=${value}`;

    if (options.expire) {
      const date = new Date();
      date.setTime(date.getTime() + options.expire);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.secure) {
      cookieString += `; secure`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    document.cookie = cookieString;
  }

  /**
   * 获取
   * @param key 键
   * @returns 获取到的值
   */
  static get(key: string): string {
    const nameEQ = `${key}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }

    return '';
  }

  /**
   * 删除
   * @param key 键
   */
  static remove(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * 全局默认配置
   */
  static globalDefaultConfig: ICookieConfig = {
    prefix: '',
    path: '/',
    secure: false
  };

  /**
   * 选项
   */
  private options: ICookieOptions;

  /**
   * 键
   */
  key: string;

  /**
   * 前缀键
   */
  prefixedKey: string;

  constructor(key: string, private defaultValue = '', config: ICookieConfig = {}) {
    const { prefix, ..._config } = { ...Cookie.globalDefaultConfig, ...config };
    this.options = _config;

    this.key = key;
    this.prefixedKey = computePrefix(key, prefix);
  }

  /**
   * 获取
   * @returns 获取到的值
   */
  get(): string {
    return Cookie.get(this.prefixedKey) || this.defaultValue;
  }

  /**
   * 设置
   * @param value 值
   */
  set(value: string): void {
    return Cookie.set(this.prefixedKey, value, this.options);
  }

  /**
   * 删除
   */
  remove(): void {
    return Cookie.remove(this.prefixedKey);
  }
}
