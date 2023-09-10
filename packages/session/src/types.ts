/**
 * SessionStorage 数据
 */
export interface ISessionStorageData<T> {
  /**
   * 值
   */
  value: T;
}

/**
 * SessionStorage 配置
 */
export interface ISessionStorageConfig {
  /**
   * 前缀
   */
  prefix?: string | ((name: string) => string);
}
