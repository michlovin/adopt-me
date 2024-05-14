import axios from "axios";
import { SurrenderedPet } from "../models/SurrenderedPet";

const apiURL = process.env.REACT_APP_API_URL + "intake" || "";

export const postIntake = async (
  intakeValues: SurrenderedPet
): Promise<any> => {
  const response = await axios.post(`${apiURL}`, intakeValues);
  return response.data;
};
