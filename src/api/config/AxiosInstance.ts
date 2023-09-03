import axios, { AxiosInstance } from 'axios';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const instance: AxiosInstance = axios.create();

instance.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

instance.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === 'development') {
    await sleep(500);
  }

  return response;
});

export default instance;
