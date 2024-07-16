import axios from "axios";

const ping = () => {
  return axios.get("/api/v1/ping");
};

export { ping };
