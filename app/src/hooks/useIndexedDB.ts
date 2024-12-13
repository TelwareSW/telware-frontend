import { IDBPDatabase, openDB } from "idb";
import { useState, useEffect, useCallback } from "react";

function useIndexedDB(dbName: string, storeName: string) {
  const [db, setDb] = useState<IDBPDatabase<unknown> | null>(null);

  useEffect(() => {
    const initDB = async () => {
      const dbInstance = await openDB(dbName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        },
      });
      setDb(dbInstance);
    };

    initDB();
  }, [dbName, storeName]);

  const getItem = useCallback(
    async (key: string) => {
      if (!db) return null;
      return await db.get(storeName, key);
    },
    [db, storeName],
  );

  interface SetItemFunction {
    (key: string, value: unknown): Promise<void>;
  }

  const setItem: SetItemFunction = useCallback(
    async (key: string, value: unknown) => {
      if (!db) return;
      await db.put(storeName, value, key);
    },
    [db, storeName],
  );

  return { getItem, setItem };
}

export default useIndexedDB;
