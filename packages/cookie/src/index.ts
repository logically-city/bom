import { ICookieOptions, ICookieConfig } from './types';
import { computePrefix } from './utils';

export class Cookie {
  /**
   * 设置
   * @param name 名称
   * @param value 值
   * @param options 选项
   */
  static set(name: string, value: string, options: ICookieOptions = {}): void {
    let cookieString = `${name}=${value}`;

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
   * @param name 名称
   * @returns 获取到的值
   */
  static get(name: string): string {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }

    return '';
  }

  /**
   * 删除
   * @param name 名称
   */
  static remove(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
   * 名称
   */
  name: string;

  /**
   * 前缀名称
   */
  prefixedName: string;

  constructor(name: string, private defaultValue = '', config: ICookieConfig = {}) {
    const { prefix, ..._config } = { ...Cookie.globalDefaultConfig, ...config };
    this.options = _config;

    this.name = name;
    this.prefixedName = computePrefix(name, prefix);
  }

  /**
   * 获取
   * @returns 获取到的值
   */
  get(): string {
    return Cookie.get(this.prefixedName) || this.defaultValue;
  }

  /**
   * 设置
   * @param value 值
   */
  set(value: string): void {
    return Cookie.set(this.prefixedName, value, this.options);
  }

  /**
   * 删除
   */
  remove(): void {
    return Cookie.remove(this.prefixedName);
  }
}
