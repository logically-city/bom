import { ILocalStorageConfig, ILocalStorageBaseOptions, ILocalStorageData, ILocalStorageOptions } from './types';
import { computePrefix } from './utils';

export class LocalStorage<T> {
  /**
   * 确保 LocalStorage 存在
   * @returns LocalStorage 是否存在
   */
  static ensureLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  /**
   * 设置
   * @param key 键
   * @param value 值
   * @param options 选项
   */
  static set<T>(key: string, value: T, options: ILocalStorageBaseOptions = {}): void {
    if (!LocalStorage.ensureLocalStorage()) return;

    const data: ILocalStorageData<T> = { value: value };
    if (options.expire !== undefined) data.expire = Date.now() + options.expire;
    if (options.version !== undefined) data.version = options.version;

    return window.localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * 获取
   * @param key 键
   * @param options 选项
   * @returns 获取到的值
   */
  static get<T = any>(key: string, options: Omit<ILocalStorageOptions<T>, 'expire'> = {}): T | undefined {
    if (!LocalStorage.ensureLocalStorage()) return undefined;

    const storedData = window.localStorage.getItem(key);
    if (!storedData) return undefined;

    let data: ILocalStorageData<T> = JSON.parse(storedData);
    if (data.expire && Date.now() > data.expire) {
      if (options.onExpired) {
        const _data = options.onExpired(data);
        if (_data !== undefined) {
          data = { ...data, ..._data };
          LocalStorage.set(key, data.value, data);
          return data.value;
        } else {
          LocalStorage.remove(key);
          return undefined;
        }
      } else {
        LocalStorage.remove(key);
        return undefined;
      }
    }

    if (options.version && options.version !== data.version) {
      if (options.onVersionMismatch) {
        const _data = options.onVersionMismatch(data, options.version);
        if (_data !== undefined) {
          data = { ...data, ..._data };
          LocalStorage.set(key, data.value, data);
          return data.value;
        } else {
          LocalStorage.remove(key);
          return undefined;
        }
      } else {
        LocalStorage.remove(key);
        return undefined;
      }
    }

    return data.value;
  }

  /**
   * 删除
   * @param key 键
   */
  static remove(key: string): void {
    if (!LocalStorage.ensureLocalStorage()) return;
    return window.localStorage.removeItem(key);
  }

  /**
   * 大小
   * @returns LocalStorage 大小
   */
  static size(): number {
    if (!LocalStorage.ensureLocalStorage()) return 0;
    return JSON.stringify(window.localStorage).length;
  }

  /**
   * 清除
   */
  static clear() {
    return window.localStorage.clear();
  }

  /**
   * 全局默认配置
   */
  static globalDefaultConfig: ILocalStorageConfig<any> = {
    prefix: ''
  };

  /**
   * 选项
   */
  private options: ILocalStorageOptions<T>;

  /**
   * 键
   */
  key: string;

  /**
   * 前缀键
   */
  prefixedKey: string;

  constructor(key: string, private defaultValue: T | undefined = undefined, config: ILocalStorageOptions<T> = {}) {
    const { prefix, ..._config } = { ...LocalStorage.globalDefaultConfig, ...config };
    this.options = _config;

    this.key = key;
    this.prefixedKey = computePrefix(key, prefix);
  }

  /**
   * 获取
   * @returns 获取到的值
   */
  get(): T | undefined {
    const data = LocalStorage.get<T>(this.prefixedKey, this.options);
    return data !== undefined ? data : this.defaultValue;
  }

  /**
   * 设置
   * @param value 值
   */
  set(value: T): void {
    return LocalStorage.set(this.prefixedKey, value, this.options);
  }

  /**
   * 删除
   */
  remove(): void {
    return LocalStorage.remove(this.prefixedKey);
  }
}
