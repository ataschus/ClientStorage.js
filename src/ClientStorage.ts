import {ClientStorageEngine} from './ClientStorageEngine';

class ClientStorage {
    keyName: string;
    expireSeconds: number;
    path: string;
    engine: string;
    storageEngine: ClientStorageEngine;

    constructor(keyName: string, engine?: string, expireSeconds?: number, path?: string) {
        this.keyName = keyName;
        this.expireSeconds = expireSeconds || 3600;
        this.path = path || '/';
        this.engine = engine || 'cookie';

        this.storageEngine = new ClientStorageEngine(this.engine);
    }

    get() {
        return this.storageEngine.engine.get(this.keyName);
    }

    set(value: any) {
        return this.storageEngine.engine.set(this.keyName, value);
    }

    delete() {
        return this.storageEngine.engine.delete(this.keyName);
    }

    save() {
        return this.storageEngine.engine.save(this.keyName);
    }
}
