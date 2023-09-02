import axios, { AxiosInstance } from 'axios';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const instance: AxiosInstance = axios.create();

instance.defaults.baseURL = 'https://api.github.com';

instance.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === 'development') {
    await sleep(500);
  }

  return response;
});

export default instance;
