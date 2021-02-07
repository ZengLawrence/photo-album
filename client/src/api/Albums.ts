import axios from "axios";
import { PhotoCollection } from "../models/Photo";

export async function fecthAll(): Promise<PhotoCollection[]> {
  const res = await axios.get('/api/albums');
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
