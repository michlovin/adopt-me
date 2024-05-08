import axios from "axios";
import { AdminForm } from "../models/AdminForm";

const apiURL = process.env.REACT_APP_API_URL + "adminintake" || "";

export const postAdopteeAdminService = async (
  formValues: AdminForm
): Promise<any> => {
  const response = await axios.post(`${apiURL}`, formValues);
  return response.data;
};
