/**
 * ClientStorage.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ClientStorage.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ClientStorage.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link      https://www.taschus.com
 * @copyright (C) Axel Taschus 2019
 * @version   1.0.0
 * @author    Axel Taschus <axel.taschus@taschus.com>
 */

import { ClientStorageEngine } from './ClientStorageEngine';

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
