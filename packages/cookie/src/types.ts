/**
 * Cookie 选项
 */
export interface ICookieOptions {
  /**
   * 时效
   */
  expire?: number;
  /**
   * 路径
   */
  path?: string;
  /**
   * 安全的
   */
  secure?: boolean;
  /**
   * 域
   */
  domain?: string;
}

/**
 * Cookie 配置
 */
export interface ICookieConfig extends ICookieOptions {
  /**
   * 前缀
   */
  prefix?: string | ((name: string) => string);
}
