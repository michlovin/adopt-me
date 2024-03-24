import axios from "axios";
import { IntakeForm } from "../models/IntakeForm";

const apiURL = process.env.REACT_APP_API_URL + "intake" || "";

export const postIntake = async (intakeValues: IntakeForm): Promise<any> => {
  const response = await axios.post(`${apiURL}`, intakeValues);
  return response.data;
};
