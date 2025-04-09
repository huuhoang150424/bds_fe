import { urlLocal } from '@/constant/baseUrl';
import queryString from 'query-string';
import axios from 'axios';
import { store } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { updateToken } from '@/redux/authReducer';

export const axiosClient = axios.create({
  baseURL: urlLocal,
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});
// config interceptors
const updateAccessToken = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/refreshToken',{}, {
      withCredentials: true,
    });
    
    return res.data;
  } catch (err: any) {
    console.log(err);
  }
};

axiosClient.interceptors.request.use(
  async (config: any) => {
    const state = store.getState();
    let accessToken = state.auth.token;
    
    if (accessToken) {
      try {
        const user: any = jwtDecode(accessToken);
        const { exp } = user;
        if (Date.now() / 1000 >= exp - 10) {
          const data = await updateAccessToken();
          if (data && data.data && data.data.accessToken) {
            accessToken = data.data.accessToken;
            store.dispatch(updateToken({ token: accessToken }));
          }
        }
        config.headers.authorization = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("Error processing token:", error);
        const data = await updateAccessToken();
        if (data && data.data && data.data.accessToken) {
          accessToken = data.data.accessToken;
          store.dispatch(updateToken({ token: accessToken }));
        }
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    config.headers.Accept = `application/json`;
    return config;
  },
  (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
