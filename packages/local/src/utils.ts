import { ILocalStorageConfig } from './types';

export const computePrefix = (name: string, prefix: ILocalStorageConfig<void>['prefix']): string => {
  if (typeof prefix === 'function') {
    return prefix(name);
  }
  return prefix ? `${prefix}_${name}` : name;
};
