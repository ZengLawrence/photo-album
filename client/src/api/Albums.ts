import axios from "axios";
import urljoin from 'url-join';
import { Photo, PhotoCollection } from "../models";

function url(basePath: string, queryParams: {pageSize: number, skip: number}) {
  const { pageSize, skip } = queryParams;
  var urlParts = [basePath];
  urlParts.push('?pageSize=' + pageSize);
  urlParts.push('?skip=' + skip);
  return urljoin(urlParts);
}

export async function fecthAll(options: {pageSize: number, skip: number}): Promise<PhotoCollection[]> {
  const urlPath = url('/api/albums', options);
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

export async function fetch(albumName: string): Promise<Photo[]> {
  const urlPath = urljoin('/api/albums', albumName);
  const res = await axios.get(urlPath);
  const data = res.data;
  return data.photos;
}
