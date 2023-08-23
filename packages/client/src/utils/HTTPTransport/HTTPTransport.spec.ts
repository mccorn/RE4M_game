// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { expect, use } from 'chai';
// import * as sinonChai from 'sinon-chai';
// import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
// import { SinonStub, createSandbox } from 'sinon';
// import { HTTPTransport } from '.';
// import { XHR_METHODS_TYPES } from '../../const/types';

// describe('HTTPTransport history tests', () => {
//     use(sinonChai.default);
//     let xhr: SinonFakeXMLHttpRequestStatic,
//         requests: SinonFakeXMLHttpRequest[],
//         instance: HTTPTransport;

//     beforeEach(() => {
//         requests = [];

//         xhr = sinon.useFakeXMLHttpRequest();
//         xhr.onCreate = (req: SinonFakeXMLHttpRequest) => {
//             requests.push(req);
//         };

//         //@ts-expect-error
//         global.XMLHttpRequest = xhr;

//         instance = new HTTPTransport();
//     });

//     afterEach(() => {
//         xhr.restore();
//     });

//     it('Проверка единственности запроса', () => {
//         instance.get('/');

//         expect(requests.length).to.be.equal(1);
//     });
// });

// describe('HTTPTransport parameters of methods tests', () => {
//     const sandbox = createSandbox();

//     let request: SinonStub<any>, instance: HTTPTransport;

//     beforeEach(() => {
//         instance = new HTTPTransport();
//         request = sandbox
//             .stub(instance, 'request' as keyof typeof instance)
//             .callsFake(() => Promise.resolve());
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     it('Проверка передачи параметров get запроса', () => {
//         const url = '/get';
//         const data = { a: 1, b: 2 };
//         const method = XHR_METHODS_TYPES.GET;

//         instance.get(url, data);

//         expect(request).calledWithMatch(url, { ...data, method });
//     });

//     it('Проверка передачи параметров post запроса', () => {
//         const url = '/post';
//         const data = { a: 1, b: 2 };
//         const method = XHR_METHODS_TYPES.POST;

//         instance.post(url, data);

//         expect(request).calledWithMatch(url, { ...data, method });
//     });

//     it('Проверка передачи параметров put запроса', () => {
//         const url = '/put';
//         const data = { a: 1, b: 2 };
//         const method = XHR_METHODS_TYPES.PUT;

//         instance.put(url, data);

//         expect(request).calledWithMatch(url, { ...data, method });
//     });

//     it('Проверка передачи параметров delete запроса', () => {
//         const url = '/delete';
//         const data = { a: 1, b: 2 };
//         const method = XHR_METHODS_TYPES.DELETE;

//         instance.delete(url, data);

//         expect(request).calledWithMatch(url, { ...data, method });
//     });
// });
