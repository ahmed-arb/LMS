import axios from "axios";

const httpIntercept = (props) => {
  axios.interceptors.request.use(
    (request) => {
      if (request.url.includes(process.env.REACT_APP_BACKEND_URL)) {
        request.headers.Authorization =
          "JWT " + localStorage.getItem("authToken");
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
