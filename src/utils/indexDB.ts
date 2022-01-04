// TODO:使用ts重写
// @ts-nocheck
class EasyDB {
  constructor(options) {
    let { dbName = 'EasyDB', version = 1 } = options || {}
    let DBOpenRequest = {};
    this.inited = false;
    this.dbName = dbName;
    this.version = version;
    this.db = {};
    this.DBOpenRequest = indexedDB.open(dbName, version);
    this.inited = this.initDB();
  }

  initDB = () => {
    if (!this.inited) {
      let that = this;
      this.DBOpenRequest.onsuccess = (event) => {
        that.db = that.DBOpenRequest.result;
      };

      this.DBOpenRequest.onupgradeneeded = (event) => {
        var db = event.target.result;

        db.onerror = function (event) {
          throw new Error(`[EasyDB]: Open DB Error`)
        };

        var objectStore = db.createObjectStore(this.dbName, {
          keyPath: 'key',
          autoIncrement: false
        });
        objectStore.createIndex('key', 'key');
        objectStore.createIndex('value', 'value');
      };
      return true;
    }
  }

  transaction = () => {
    return this.db.transaction(this.dbName, "readwrite").objectStore(this.dbName);
  }

  set = async (key, value) => {
    const val = await this.get(key);
    if (!val) {
      return await this._add(key, value);
    } else {
      return await this.put(key, value);
    }
  }

  get = (key) => {
    return this.operateDataBase("get", key);
  }

  put = (key, value) => {
    return this.operateDataBase("put", key, value);
  }

  _add = (key, value) => {
    return this.operateDataBase("add", key, value);
  }

  delete = (key) => {
    return this.operateDataBase("delete", key);
  }

  clear = () => {
    return this.operateDataBase("clear");
  }

  readAll = () => {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction();
      let data = [];
      transaction.openCursor().onsuccess = function (event) {
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

  dbCallback = (transaction, cb, type) => {
    transaction.onsuccess = (event) => {
      ["clear", "delete"].includes(type) ?
        cb(true) :
        cb(event.target.result);
    };
    transaction.onerror = (event) => {
      throw new Error(`${this.dbName} Error:${event.target.error}`);
    }
  }

  operateDataBase = (type, key, value) => {
    const data = key && value !== undefined ? { key, value } : key;
    return new Promise((resolve, reject) => {
      const transaction = this.transaction()[type](data);
      this.dbCallback(transaction, (res) => {
        resolve(res);
      }, type);
    })
  }
}

let DB = null;
if (!DB) {
  DB = window.indexedDB ? new EasyDB() : {}
}
export default DB
