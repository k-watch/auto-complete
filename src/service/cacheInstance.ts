import { CacheInterface } from 'types/api';
import { EXPIRE_TIME } from 'types/enum';

interface CacheInstanceInterface<K, V> {
  get: (key: K) => V | null;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
}

export class CacheInstance<K, V> implements CacheInstanceInterface<K, V> {
  private instance;

  constructor() {
    this.instance = new Map<K, CacheInterface<V>>();
  }

  get(key: K) {
    const value = this.instance.get(key) as CacheInterface<V>;

    if (value) {
      // 만료시간 체크 후 지났으면 삭제
      if (value.expireTime <= Date.now()) {
        this.delete(key);
        return null;
      }
      return value.data;
    }
    return null;
  }

  set(key: K, value: V) {
    const cacheData = {
      data: value,
      expireTime: new Date().getTime() + EXPIRE_TIME,
    } as CacheInterface<V>;

    this.instance.set(key, cacheData);
  }

  delete(key: K) {
    this.instance.delete(key);
  }
}
