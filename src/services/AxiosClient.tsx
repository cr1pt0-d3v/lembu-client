import axios, { AxiosInstance } from 'axios';

const baseAxiosConfig = {
  timeout: 60000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
};

class AxiosClient {
  client: AxiosInstance;
  //  url: string = "https://localhost:5050/api/";
  url: string = `${import.meta.env.VITE_SERVER_URL}`;
  token: string;
  constructor() {
    this.client = axios.create(baseAxiosConfig);
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          return { status: 401 };
        }
        return error;
      },
    );

    this.token = '';
  }

  get = async (endpoint: string) => {
    try {
      const result = this.client.get(this.url + endpoint, {
        headers: {
          'x-lembu-token': this.token,
        },
      });
      if (!result) {
        throw new Error('failed to get result from API');
      }
      return result;
    } catch (error) {
      return false;
    }
  };
  getWithTokenAsParam = async (endpoint: string, token: string) => {
    try {
      const result = this.client.get(this.url + endpoint, {
        headers: {
          'x-lembu-token': token,
        },
      });
      if (!result) {
        throw new Error('failed to get result from API');
      }
      return result;
    } catch (error) {
      return false;
    }
  };
  post = async (endpoint: string, request: any) => {
    try {
      const result = await this.client.post(this.url + endpoint, request, {
        headers: {
          'x-lembu-token': this.token,
        },
      });
      if (!result) {
        throw new Error('failed to get result from API');
      }
      return result;
    } catch (error) {
      return false;
    }
  };
  setToken = (token: string) => {
    this.token = token;
  };
}

export const axiosClient = new AxiosClient();
