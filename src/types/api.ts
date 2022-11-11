export interface SearchInterface {
  sickCd: string;
  sickNm: string;
}

export interface SearchDBInterface {
  id: string;
  data: SearchInterface[] | null;
  expireTime: number;
}
