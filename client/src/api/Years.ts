import axios from "axios";
import { PhotosByDate } from "../models/Photo";

export async function fecthAll() : Promise<PhotosByDate[]> {
  const res = await axios.get('/api/years');
  const data = res.data;
  return data.years;
}