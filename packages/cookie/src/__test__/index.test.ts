import { Cookie } from '..';
import { ICookieConfig } from '../types';

describe('Cookie class', () => {
  afterEach(() => {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  describe('Static methods', () => {
    it('should set a cookie', () => {
      Cookie.set('test', 'value');
      expect(document.cookie).toContain('test=value');
    });

    it('should get a cookie', () => {
      Cookie.set('test', 'value');
      const result = Cookie.get('test');
      expect(result).toBe('value');
    });

    it('should remove a cookie', () => {
      Cookie.set('test', 'value');
      Cookie.remove('test');
      expect(document.cookie).not.toContain('test=value');
    });
  });

  describe('Instance methods', () => {
    it('should set default values in constructor', () => {
      const cookieInstance = new Cookie('test', 'defaultValue');
      expect(cookieInstance.get()).toBe('defaultValue');
    });

    it('should set and get a cookie via instance', () => {
      const cookieInstance = new Cookie('test');
      cookieInstance.set('value');
      console.log('should set and get a cookie via instance', document.cookie);

      expect(cookieInstance.get()).toBe('value');
    });

    it('should remove a cookie via instance', () => {
      const cookieInstance = new Cookie('test', 'defaultValue');
      cookieInstance.set('value');
      cookieInstance.remove();
      expect(cookieInstance.get()).toBe('defaultValue');
    });
  });

  describe('Parameter handling', () => {
    it('should use default globalConfig', () => {
      expect(Cookie.globalDefaultConfig).toEqual({
        prefix: '',
        path: '/',
        secure: false
      });
    });

    it('should handle custom config in constructor', () => {
      const customConfig: ICookieConfig = {
        prefix: 'custom_',
        path: '/',
        secure: false
      };
      const cookieInstance = new Cookie('test', 'defaultValue', customConfig);
      cookieInstance.set('value');
      expect(cookieInstance.get()).toBe('value');
    });
  });
});
