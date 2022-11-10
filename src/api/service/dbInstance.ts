import { IDBPDatabase, openDB } from 'idb';

const DB_INFO = {
  DB_NAME: 'SearchDB',
  SCHEMA_NAME: 'search',
  KEY_PATH: 'id',
} as const;

export class DbInstance {
  private db: IDBPDatabase | null;
  private schemaName: string;

  constructor(schemaName: string) {
    this.schemaName = schemaName;
    this.db = null;
    this.create();
  }

  private create = async () => {
    const data = await openDB(DB_INFO.DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(DB_INFO.SCHEMA_NAME, {
          keyPath: DB_INFO.SCHEMA_NAME,
          autoIncrement: true,
        });
        store.createIndex(DB_INFO.SCHEMA_NAME, DB_INFO.SCHEMA_NAME);
      },
    });

    this.db = data;
  };

  get = async (value: IDBValidKey) => {
    if (this.db) {
      const store = this.db
        .transaction(this.schemaName)
        .objectStore(this.schemaName);
      const result = await store.get(value);

      if (result) {
        if (result.expireTime <= Date.now()) {
          this.db.delete(this.schemaName, value);
          return null;
        }
        return result.data;
      }
      return null;
    }
  };

  add = async <T>(data: T) => {
    if (this.db) {
      await this.db.add(this.schemaName, { ...data });
    }
  };
}

export const dbInstance = new DbInstance(DB_INFO.SCHEMA_NAME);
