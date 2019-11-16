export interface ClientStorageEngineInterface {
    get(keyName: string): any;
    set(keyName: string, value: any): boolean;
    delete(keyName: string): boolean;
    save(keyName: string): boolean;
}
