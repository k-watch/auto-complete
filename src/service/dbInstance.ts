import { IDBPDatabase, openDB } from 'idb';
import { SearchDBInterface } from 'types/api';

const DB_INFO = {
  DB_NAME: 'SearchDB',
  SCHEMA_NAME: 'search',
  KEY_PATH: 'id',
} as const;

interface DbInstanceInterface {
  get: (value: IDBValidKey) => Promise<SearchDBInterface | undefined | null>;
  add: <T>(data: T) => Promise<void>;
}

export class DbInstance implements DbInstanceInterface {
  private db: IDBPDatabase | null;

  constructor() {
    this.db = null;
    this.create();
  }

  private create = async () => {
    const data = await openDB(DB_INFO.DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(DB_INFO.SCHEMA_NAME, {
          keyPath: DB_INFO.KEY_PATH,
          autoIncrement: true,
        });
        store.createIndex(DB_INFO.KEY_PATH, DB_INFO.KEY_PATH);
      },
    });

    this.db = data;
  };

  get = async (
    value: IDBValidKey
  ): Promise<SearchDBInterface | undefined | null> => {
    const store = this.db!.transaction(DB_INFO.SCHEMA_NAME).objectStore(
      DB_INFO.SCHEMA_NAME
    );
    const result = await store.get(value);

    if (result) {
      if (result.expireTime <= Date.now()) {
        this.db!.delete(DB_INFO.SCHEMA_NAME, value);
        return null;
      }
      return result.data;
    }
    return null;
  };

  add = async <T>(data: T) => {
    await this.db!.add(DB_INFO.SCHEMA_NAME, { ...data });
  };
}

export const dbInstance = new DbInstance();
