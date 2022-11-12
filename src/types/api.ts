export interface SearchInterface {
  sickCd: string;
  sickNm: string[];
}

export interface CacheInterface<T> {
  data: T | null;
  expireTime: number;
}
