/**
 * LocalStorage 基础选项
 */
export interface ILocalStorageBaseOptions {
  /**
   * 时效
   */
  expire?: number;
  /**
   * 版本
   */
  version?: string;
}

/**
 * LocalStorage 数据
 */
export interface ILocalStorageData<T> extends ILocalStorageBaseOptions {
  /**
   * 值
   */
  value: T;
}

/**
 * LocalStorage 选项
 */
export interface ILocalStorageOptions<T> extends ILocalStorageBaseOptions {
  /**
   * 时效到期
   * @param storageData 存储数据
   * @returns `undefined` 将视为无需修改，否则将视为修改数据
   */
  onExpired?: (storageData: Omit<ILocalStorageData<T>, 'version'>) => Omit<ILocalStorageData<T>, 'version'> | undefined;
  /**
   * 版本不匹配
   * @param storageData 存储数据
   * @param currentVersion 当前版本
   * @returns `undefined` 将视为无需修改，否则将视为修改数据
   */
  onVersionMismatch?: (
    storageData: Omit<ILocalStorageData<T>, 'expire'>,
    currentVersion?: string
  ) => Omit<ILocalStorageData<T>, 'expire'> | undefined;
}

/**
 * LocalStorage 配置
 */
export interface ILocalStorageConfig<T> extends ILocalStorageOptions<T> {
  /**
   * 前缀
   */
  prefix?: string | ((name: string) => string);
}
