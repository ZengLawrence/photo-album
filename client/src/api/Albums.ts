import axios from "axios";
import urljoin from 'url-join';
import { Photo, PhotoCollection } from "../models/Photo";

function url(basePath: string, queryParams: {limit?: number, skip?: number}) {
  const { limit, skip } = queryParams;
  var urlParts = [basePath];
  if (limit != undefined) urlParts.push('?limit=' + limit);
  if (skip != undefined) urlParts.push('?skip=' + skip);
  return urljoin(urlParts);
}

export async function fecthAll(options: {limit?: number, skip?: number}): Promise<PhotoCollection[]> {
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
