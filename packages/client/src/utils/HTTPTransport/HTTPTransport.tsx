import { XHR_METHODS_TYPES, someObject } from '../../const/types';

const METHODS = XHR_METHODS_TYPES;

function queryStringify(data: someObject) {
    let result = '';

    Object.keys(data).forEach((key: string | number) => {
        result += `${result ? '&' : '?'}${key}=${data[key]}`;
    });

    return result;
}

type HTTPMethod = (url: string, options?: someObject) => Promise<unknown>;

export class HTTPTransport {
    get: HTTPMethod = (url, options = {}) =>
        this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET });

    put: HTTPMethod = (url, options = {}) =>
        this.request(url, {
            ...options,
            method: METHODS.PUT,
        });

    post: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.POST });

    delete: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.DELETE });

    // eslint-disable-next-line class-methods-use-this
    request = (url: string, options: someObject = { method: METHODS.GET }) => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key: string) => xhr.setRequestHeader(key, headers[key]));

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export function fetchWithRetry(url: string, options: someObject) {
    let { retries = 1 } = options;

    let response = null;
    const xhr = new HTTPTransport();

    while (retries > 0 && !response) {
        retries -= 1;
        response = xhr.request(url, options);
    }

    return response;
}
