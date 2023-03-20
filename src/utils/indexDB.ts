// TODO:使用ts重写
// @ts-nocheck
let dbName = 'EasyDB'
let version = 1
let inited = false
let DBOpenRequest = indexedDB.open(dbName, version)
let db = {}

const initDB = () => {
  if (!inited) {
    return new Promise((resolve, reject) => {
      DBOpenRequest.onsuccess = (event) => {
        db = DBOpenRequest.result;
        inited = true
        resolve(true)
      };

      DBOpenRequest.onupgradeneeded = (event) => {
        console.log('onupgradeneeded')
        var db = event.target.result;

        db.onerror = function (event) {
          throw new Error(`[EasyDB]: Open DB Error`)
        };

        var objectStore = db.createObjectStore(dbName, {
          keyPath: 'key',
          autoIncrement: false
        });
        objectStore.createIndex('key', 'key');
        objectStore.createIndex('value', 'value');
      };
    })
  } else {
    return Promise.resolve(true);
  }
}

const transaction = async () => {
  await initDB()
  return db.transaction(dbName, "readwrite").objectStore(dbName);
}

const set = async (key, value) => {
  const val = await get(key);
  if (!val) {
    return await _add(key, value);
  } else {
    return await _put(key, value);
  }
}

const get = (key) => {
  return operateDataBase("get", key);
}

const _put = (key, value) => {
  return operateDataBase("put", key, value);
}

const _add = (key, value) => {
  return operateDataBase("add", key, value);
}

const remove = (key) => {
  return operateDataBase("delete", key);
}

const clear = () => {
  return operateDataBase("clear");
}

const readAll = () => {
  return new Promise((resolve, reject) => {
    const t = transaction();
    let data = [];
    t.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        resolve(data);
      }
    };
  })
}

const dbCallback = (t, cb, type) => {
  t.onsuccess = (event) => {
    ["clear", "delete"].includes(type) ?
      cb(true) :
      cb(event.target.result);
  };
  t.onerror = (event) => {
    throw new Error(`${dbName} Error:${event.target.error}`);
  }
}

const operateDataBase = (type, key, value) => {
  const data = key && value !== undefined ? { key, value } : key;
  return new Promise((resolve, reject) => {
    transaction().then(res => {
      const tran = res[type](data);
      dbCallback(tran, (res) => {
        resolve(res);
      }, type);
    })
  })
}

initDB()

export default {
  set,
  get,
  remove,
  readAll,
  clear
}
