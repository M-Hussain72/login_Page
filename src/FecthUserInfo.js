import axios from "axios";

const FetchUserInfo = async (url,accessToken,upToDateToken) => {
  const axiosApiInstance = axios.create();

  axiosApiInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  // Response interceptor for API calls
  axiosApiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await upToDateToken();
        // Retry the original request
        return axiosApiInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );


  return await axiosApiInstance.get(url);
};

export default FetchUserInfo;
