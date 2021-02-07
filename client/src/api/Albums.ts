import axios from "axios";
import { PhotoCollection } from "../models/Photo";

export async function fecthAll(limit?: number): Promise<PhotoCollection[]> {
  const urlPath = (limit ? '/api/albums?limit=' + limit : '/api/albums');
  const res = await axios.get(urlPath);
  const data = res.data;
  const albums = data.albums;
  return albums.map(
    (albm: { albumName: string; photoNames: string[]; }) => {
      return {
        title: albm.albumName,
        photos: albm.photoNames.map(name => { return { name }; })
      };
    }
  );
}
