import axios from "axios";
import { Pet } from "../models/pet";

const apiURL = process.env.REACT_APP_API_URL || "";

export const getPets = async (searchTerm?: string): Promise<Pet[]> => {
  let response;
  if (searchTerm) {
    response = await axios.get(`${apiURL}?q=${searchTerm}`);
  } else {
    response = await axios.get(apiURL);
  }
  return response.data as Pet[];
};
