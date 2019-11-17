import { ClientStorageEngineCookie } from "./storageEngines/ClientStorageEngineCookie";

export class ClientStorageEngine {
    engine: any;

    constructor(engineName: string) {
        switch (engineName.toLowerCase()) {
            case "cookie": {
                this.engine = new ClientStorageEngineCookie();
                break;
            }
        }

        return this;
    }
}
