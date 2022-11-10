import { IDBPDatabase, openDB } from 'idb';
import { SearchDBInterface, SearchInterface } from 'types/api';
import { EXPIRE_TIME } from 'types/enum';

let db: IDBPDatabase;

const create = async () => {
  db = await openDB('SearchDB', 1, {
    upgrade(db) {
      const store = db.createObjectStore('search', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('id', 'id');
    },
  });
};

create();

export const get = async (
  value: IDBValidKey
): Promise<SearchInterface[] | null> => {
  const store = db.transaction('search').objectStore('search');
  const result = await store.get(value);

  if (result) {
    if (result.expireTime <= Date.now()) {
      db.delete('search', value);
      return null;
    }
    return result.data;
  }
  return null;
};

export const add = async <T>(value: IDBValidKey, data: T) => {
  await db.add('search', {
    id: value,
    data,
    expireTime: new Date().getTime() + EXPIRE_TIME,
  });
};
