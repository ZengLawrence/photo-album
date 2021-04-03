import _ from "lodash";
import axios from "axios";
import urljoin from 'url-join';
import { Album, Photo } from "../models";

export async function fecthAll(): Promise<Album[]> {
  const res = await axios.get('/api/albums');
  const data = res.data;
  const albums = data.albums;
  return albums.map(
    (albm: { albumName: string; photos: Photo[]; }) => {
      return {
        name: albm.albumName,
        photoNames: _.map(albm.photos, "name")
      };
    }
  );
}

export async function fetch(albumName: string): Promise<Photo[]> {
  const urlPath = urljoin('/api/albums', albumName);
  const res = await axios.get(urlPath);
  const data = res.data;
  return data.photos;
}
