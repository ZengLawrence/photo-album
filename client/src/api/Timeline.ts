import axios from "axios";
import { Photo, PhotoCollection } from "../models/Photo";

export async function fecthAll(): Promise<PhotoCollection[]> {
  const res = await axios.get('/api/timeline');
  const data = res.data;
  const byYears = data.years;
  return byYears.map(
    (photosByYear: { year: string; photos: Photo[]; }) => {
      return {
        title: photosByYear.year,
        photos: photosByYear.photos
      };
    }
  );
}