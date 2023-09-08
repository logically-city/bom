import { LocalStorage } from '..';

describe('LocalStorage Utility Class', () => {
  // Before each test, we'll clear the localStorage to ensure a clean environment.
  beforeEach(() => {
    localStorage.clear();
  });

  // Testing Static Methods
  describe('Static Methods', () => {
    test('set and get data', () => {
      LocalStorage.set('key1', 'value1');
      expect(LocalStorage.get('key1')).toBe('value1');
    });

    test('data expiration', () => {
      LocalStorage.set('keyExpire', 'valueExpire', { expire: -1 }); // already expired
      expect(LocalStorage.get('keyExpire')).toBeUndefined();
    });

    test('version handling', () => {
      LocalStorage.set('keyVersion', 'valueVersion', { version: '1.0' });
      expect(LocalStorage.get('keyVersion', { version: '2.0' })).toBeUndefined();
    });

    test('remove data', () => {
      LocalStorage.set('key2', 'value2');
      LocalStorage.remove('key2');
      expect(LocalStorage.get('key2')).toBeUndefined();
    });

    test('size method', () => {
      LocalStorage.set('keySize', 'valueSize');
      expect(LocalStorage.size()).toBeGreaterThan(0);
    });
  });

  // Testing Instance Methods and Global Config
  describe('Instance Methods and Global Config', () => {
    test('use global config', () => {
      LocalStorage.globalDefaultConfig = {
        prefix: 'global',
        version: '1.0'
      };

      const instance = new LocalStorage('instanceKey', 'defaultValue');
      instance.set('valueInstance');
      expect(LocalStorage.get('global_instanceKey')).toBe('valueInstance');
    });

    test('default value handling', () => {
      const instance = new LocalStorage('instanceKeyDefault', 'defaultValue');
      expect(instance.get()).toBe('defaultValue');
    });

    test('instance set and get', () => {
      const instance = new LocalStorage('instanceKey2');
      instance.set('valueInstance2');
      expect(instance.get()).toBe('valueInstance2');
    });
  });
});
