import axios from "axios";

const httpIntercept = (props) => {
  axios.interceptors.request.use(
    (request) => {
      const authToken = localStorage.getItem("authToken");
      if (
        request.url.includes(process.env.REACT_APP_BACKEND_URL) &&
        authToken
      ) {
        request.headers.Authorization =
          "JWT " + authToken;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // Edit response config
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default httpIntercept;
