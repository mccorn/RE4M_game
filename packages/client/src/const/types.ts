export type someObject = { [key: string]: any };
export type someFunction = (...args: any) => unknown;

export type TResponse = {
    response: unknown | string;
    status: number;
    readyState: number;
};

export const ERRORS_TYPES = {
    JSON_parse: 'JSON_parse__error_type',
};

export const REDIRECT_URI = 'http://localhost:3000';

export enum XHR_METHODS_TYPES {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}
