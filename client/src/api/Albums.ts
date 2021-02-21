import axios from "axios";
import { Photo, PhotoCollection } from "../models/Photo";

export async function fecthAll(limit?: number): Promise<PhotoCollection[]> {
  const urlPath = (limit ? '/api/albums?limit=' + limit : '/api/albums');
  const res = await axios.get(urlPath);
  const data = res.data;
  const albums = data.albums;
  return albums.map(
    (albm: { albumName: string; photos: Photo[]; }) => {
      return {
        title: albm.albumName,
        photos: albm.photos
      };
    }
  );
}
