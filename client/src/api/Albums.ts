import axios from "axios";
import urljoin from 'url-join';
import { Album, Photo } from "../models";

export async function fecthAll(): Promise<Album[]> {
  const res = await axios.get('/api/albums');
  const data = res.data;
  return data.albums;
}

export async function fetch(albumName: string): Promise<Photo[]> {
  const urlPath = urljoin('/api/albums', albumName);
  const res = await axios.get(urlPath);
  const data = res.data;
  return data.photos;
}
