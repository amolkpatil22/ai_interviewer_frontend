export const openDatabaseInIndexDb = (dbName: string, version: number): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains("media")) {
        db.createObjectStore("media", { keyPath: "question_id" });
      }
    };
  });
};

export const addDataToIndexDb = async (dbName: string, data: { question_id: string; blob: Blob }) => {
  const db = await openDatabaseInIndexDb(dbName, 1);
  const transaction = db.transaction("media", "readwrite");
  const store = transaction.objectStore("media");

  store.put(data);

  transaction.oncomplete = () => {
    console.log("Data added successfully");
  };
  transaction.onerror = (event) => {
    console.error("Transaction failed", event.target);
  };
};

export const getDataFromIndexDb = async (dbName: string, question_id: string): Promise<Blob | undefined> => {
  const db = await openDatabaseInIndexDb(dbName, 1);
  const transaction = db.transaction("media", "readonly");
  const store = transaction.objectStore("media");

  const request = store.get(question_id);

  return new Promise<Blob | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result?.blob);
    request.onerror = () => reject("Error fetching data");
  });
};

export const getAllDataFromIndexDb = async (dbName: string): Promise<{ question_id: string; blob: Blob }[]> => {
  const db = await openDatabaseInIndexDb(dbName, 1);
  const transaction = db.transaction("media", "readonly");
  const store = transaction.objectStore("media");

  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching all data");
  });
};
