import { IMTNRequestBody } from '../exceptions/mtn';
export default class Http {
    static mtnAxios: import("axios").AxiosInstance;
    static oltranzAxios: import("axios").AxiosInstance;
    static requestToken: () => Promise<import("axios").AxiosResponse<any, any>>;
    static requestPayment: (referenceId: string, payload: IMTNRequestBody) => Promise<import("axios").AxiosResponse<any, any>>;
    static transactionStatus: (referenceId: string) => Promise<import("axios").AxiosResponse<any, any>>;
}
