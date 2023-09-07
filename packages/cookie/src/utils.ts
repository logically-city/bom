import { ICookieConfig } from './types';

export const computePrefix = (name: string, prefix: ICookieConfig['prefix']): string => {
  if (typeof prefix === 'function') {
    return prefix(name);
  }
  return prefix ? `${prefix}_${name}` : name;
};
