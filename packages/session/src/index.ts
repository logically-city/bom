import { ISessionStorageConfig, ISessionStorageData } from './types';
import { computePrefix } from './utils';

export class SessionStorage<T> {
  /**
   * 确保 SessionStorage 存在
   * @returns SessionStorage 是否存在
   */
  static ensureSessionStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  /**
   * 设置
   * @param key 键
   * @param value 值
   */
  static set<T>(key: string, value: T): void {
    if (!SessionStorage.ensureSessionStorage()) return;

    const data: ISessionStorageData<T> = { value };

    return window.sessionStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * 获取
   * @param key 键
   * @returns 获取到的值
   */
  static get<T = any>(key: string): T | undefined {
    if (!SessionStorage.ensureSessionStorage()) return undefined;

    const storedData = window.sessionStorage.getItem(key);
    if (!storedData) return undefined;

    const data: ISessionStorageData<T> = JSON.parse(storedData);

    return data.value;
  }

  /**
   * 删除
   * @param key 键
   */
  static remove(key: string): void {
    if (!SessionStorage.ensureSessionStorage()) return;
    return window.sessionStorage.removeItem(key);
  }

  /**
   * 大小
   * @returns SessionStorage 大小
   */
  static size(): number {
    if (!SessionStorage.ensureSessionStorage()) return 0;
    return JSON.stringify(window.sessionStorage).length;
  }

  /**
   * 清除
   */
  static clear() {
    return window.sessionStorage.clear();
  }

  /**
   * 全局默认配置
   */
  static globalDefaultConfig: ISessionStorageConfig = {
    prefix: ''
  };

  /**
   * 键
   */
  key: string;

  /**
   * 前缀键
   */
  prefixedKey: string;

  constructor(key: string, private defaultValue: T | undefined = undefined, config: ISessionStorageConfig = {}) {
    const { prefix } = { ...SessionStorage.globalDefaultConfig, ...config };

    this.key = key;
    this.prefixedKey = computePrefix(key, prefix);
  }

  /**
   * 获取
   * @returns 获取到的值
   */
  get(): T | undefined {
    const data = SessionStorage.get<T>(this.prefixedKey);
    return data !== undefined ? data : this.defaultValue;
  }

  /**
   * 设置
   * @param value 值
   */
  set(value: T): void {
    return SessionStorage.set(this.prefixedKey, value);
  }

  /**
   * 删除
   */
  remove(): void {
    return SessionStorage.remove(this.prefixedKey);
  }
}
