import { ClientStorageEngineInterface } from "../ClientStorageEngineInterface";

export class ClientStorageEngineCookie implements ClientStorageEngineInterface {
    currentValue: {};
    expireSeconds = 3600;
    path = '/';

    constructor() {
        this.currentValue = {};
    }

    get(keyName: string) {
        if ('undefined' === typeof (this.currentValue[keyName])) {
            let decoded_cookies = decodeURIComponent(document.cookie),
                cookie_array = decoded_cookies.split(';');

            for (let i = 0; i < cookie_array.length; i++) {
                let cookie = cookie_array[i];
                while (' ' === cookie.charAt(0)) {
                    cookie = cookie.substring(1);
                }
                if (0 === cookie.indexOf(keyName + '=')) {
                    this.currentValue[keyName] = JSON.parse(cookie.substring((keyName).length + 1, cookie.length));
                }
            }
        }

        return this.currentValue[keyName];
    }

    set(keyName: string, value: any) {
        this.currentValue[keyName] = value;

        return true;
    }

    delete(keyName: string) {
        delete this.currentValue[keyName];
        this.expireSeconds = -3600;
        this.save(keyName);

        return true;
    }

    save(keyName: string) {
        let cookie_value,
            expire_date = new Date();

        expire_date.setTime(expire_date.getTime() + (this.expireSeconds * 1000));

        cookie_value =
            keyName + "=" + JSON.stringify(this.currentValue[keyName]) +
            ';expires=' + expire_date.toUTCString() +
            ';path=' + this.path;

        document.cookie = cookie_value;

        return true;
    }
}
