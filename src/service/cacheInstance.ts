interface CacheInstanceInterface<K, V> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
}

export class CacheInstance<K, V> implements CacheInstanceInterface<K, V> {
  private instance;

  constructor() {
    this.instance = new Map<K, V>();
  }

  get(key: K) {
    return this.instance.get(key);
  }

  set(key: K, value: V) {
    this.instance.set(key, value);
  }

  delete(key: K) {
    this.instance.delete(key);
  }
}
