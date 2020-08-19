import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (data) => {
  return await axios
    .post(`${BASE_URL}/signin`, data)
    .then(handleResponse)
    .catch(handleError);
};
