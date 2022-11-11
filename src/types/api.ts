export interface SearchInterface {
  sickCd: string;
  sickNm: string;
}

export interface CacheInterface {
  data: SearchInterface[] | null;
  expireTime: number;
}
