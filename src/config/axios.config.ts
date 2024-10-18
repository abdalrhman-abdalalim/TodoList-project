import axios from "axios";

const instance = axios.create({
  baseURL: "http://to-do-list-application.runasp.net/api",
  timeout: 1000,
});

export default instance;
