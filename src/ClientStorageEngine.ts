import {ClientStorageEngineCookie} from "./storageEngines/ClientStorageEngineCookie";

export class ClientStorageEngine {
    engine: any;

    constructor(engineName: string) {
        switch (engineName.toLowerCase()) {
            case "cookie": {
                console.debug('starting cookie engine');
                
                this.engine = new ClientStorageEngineCookie();
                break;
            }
        }

        return this;
    }
}
