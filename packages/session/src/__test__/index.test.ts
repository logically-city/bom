import { SessionStorage } from '..';

describe('SessionStorage class', () => {
  // 每次测试之前清空sessionStorage以确保测试的一致性
  beforeEach(() => {
    window.sessionStorage.clear();
    SessionStorage.globalDefaultConfig.prefix = ''; // 重置全局默认前缀
  });

  // 测试静态方法
  describe('Static methods', () => {
    test('should set and get data correctly', () => {
      SessionStorage.set('testKey', 'testValue');
      expect(SessionStorage.get('testKey')).toBe('testValue');
    });

    test('should handle non-string data types', () => {
      const testData = [1, '2', { key: 'value' }, true];
      SessionStorage.set('testKey', testData);
      expect(SessionStorage.get('testKey')).toEqual(testData);
    });

    test('should return undefined for non-existing keys', () => {
      expect(SessionStorage.get('nonExistingKey')).toBeUndefined();
    });

    test('should remove data correctly', () => {
      SessionStorage.set('testKey', 'testValue');
      SessionStorage.remove('testKey');
      expect(SessionStorage.get('testKey')).toBeUndefined();
    });

    test('should clear all data', () => {
      SessionStorage.set('testKey1', 'testValue1');
      SessionStorage.set('testKey2', 'testValue2');
      SessionStorage.clear();
      expect(SessionStorage.get('testKey1')).toBeUndefined();
      expect(SessionStorage.get('testKey2')).toBeUndefined();
    });

    test('should return the correct size', () => {
      SessionStorage.set('testKey', 'testValue');
      expect(SessionStorage.size()).toBeGreaterThan(0);
    });
  });

  // 测试实例方法
  describe('Instance methods', () => {
    test('should handle default values correctly', () => {
      const storageInstance = new SessionStorage('defaultKey', 'defaultValue');
      expect(storageInstance.get()).toBe('defaultValue');
    });

    test('should set and get instance data correctly', () => {
      const storageInstance = new SessionStorage('instanceKey');
      storageInstance.set('instanceValue');
      expect(storageInstance.get()).toBe('instanceValue');
    });

    test('should remove instance data correctly', () => {
      const storageInstance = new SessionStorage('instanceKey');
      storageInstance.set('instanceValue');
      storageInstance.remove();
      expect(storageInstance.get()).toBeUndefined();
    });
  });

  // 测试全局配置
  describe('Global configuration', () => {
    test('should handle global prefix correctly', () => {
      SessionStorage.globalDefaultConfig.prefix = 'globalPrefix';
      const storageInstance = new SessionStorage('keyWithGlobalPrefix');
      storageInstance.set('value');
      expect(window.sessionStorage.getItem('globalPrefix_keyWithGlobalPrefix')).toBeTruthy();
    });
  });
});
