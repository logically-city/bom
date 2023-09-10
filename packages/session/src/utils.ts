import { ISessionStorageConfig } from './types';

export const computePrefix = (name: string, prefix: ISessionStorageConfig['prefix']): string => {
  if (typeof prefix === 'function') {
    return prefix(name);
  }
  return prefix ? `${prefix}_${name}` : name;
};
