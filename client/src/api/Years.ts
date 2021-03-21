import axios from "axios";
import { PhotosByYear } from "../models/Photo";

export async function fecthAll() : Promise<PhotosByYear[]> {
  const res = await axios.get('/api/years');
  const data = res.data;
  return data.years;
}