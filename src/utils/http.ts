import axios, { AxiosInstance } from 'axios';
import Keys from '@/utils/constants/keys';
import Config from './config';

class Http {
  static axios = axios.create({
    baseURL: Keys.DEFAULT_API,
    headers: Config.HTTP_HEADERS,
  });

  instance: AxiosInstance;

  constructor(baseURL: string, headers: any) {
    this.instance = axios.create({ baseURL, headers });
  }
}
export default Http;
