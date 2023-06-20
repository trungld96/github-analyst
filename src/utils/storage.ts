class AppStorage {
  private readonly storage: Storage;
  private inMemoryStorage: { [key: string]: string } = {};
  private readonly isSupported: boolean;

  constructor(storage: Storage) {
  	this.storage = storage || window.localStorage || window.sessionStorage;
  	this.isSupported = this._isSupported();
  	if (!this.isSupported) {
  		console.warn('Storage is not supported by browser!');
  	}
  }

  /**
   * @description clear storage
   * */
  clear(): void {
  	if (this.isSupported) {
  		this.storage.clear();
  	} else {
  		this.inMemoryStorage = {};
  	}
  }

  /**
   * @description get value of current storage key
   * @returns {string | null}
   * */
  getItem(name: string, defaultValue = null): string | null {
      if (this.isSupported) {
          const val = this.storage.getItem(name);
          return val
          //   if (val) {
          //       return JSON.parse(val);
          //   }
      }
      if (Object.prototype.hasOwnProperty.call(this.inMemoryStorage, name)) {
          const val = this.inMemoryStorage[name];
          if (val) {
              return JSON.parse(val);
          }
      }
      return defaultValue;
  }

  /**
   * @description get value of current storage index
   * @returns {string | null}
   * */
  key(index: number, defaultValue = null): string | null {
  	if (this.isSupported) {
  		const key = this.storage.key(index);
  		if (key) {
  			const val = this.storage.getItem(key);
  			if (val) {
  				return JSON.parse(val);
  			}
  		}
  	} else {
  		const val = Object.keys(this.inMemoryStorage)[index];
  		if (val) {
  			return JSON.parse(val);
  		}
  	}
  	return defaultValue;
  }

  /**
   * @description remove the key and its value in storage
   * */
  removeItem(name: string): void {
  	if (this.isSupported) {
  		this.storage.removeItem(name);
  		return;
  	}
  	delete this.inMemoryStorage[name];
  }

  /**
   * @description add or update the storage key with given value
   * */
  setItem(name: string, value: any): void {
  	const strValue = JSON.stringify(value);
  	if (this.isSupported) {
  		try {
  			this.storage.setItem(name, strValue);
  		} catch (e) {
  			this.inMemoryStorage[name] = strValue;
  		}
  	} else {
  		this.inMemoryStorage[name] = strValue;
  	}
  }

  /**
   * @description get the current number of key/value pairs.
   * @returns {number}
   * */
  length(): number {
  	if (this.isSupported) {
  		return this.storage.length;
  	} else {
  		return Object.keys(this.inMemoryStorage).length;
  	}
  }

  /**
   * @description Check for storage support
   * @returns {boolean} supported
   * */
  _isSupported(): boolean {
  	if (!this.storage) {
  		return false;
  	}

  	try {
  		const testKey = 'DEMO';
  		this.storage.setItem(testKey, testKey);
  		this.storage.removeItem(testKey);
  		return true;
  	} catch (e) {
  		return false;
  	}
  }
}

export const LStorage = new AppStorage(localStorage);
export const SStorage = new AppStorage(sessionStorage);
