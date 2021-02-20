import axios from "axios";
import { Photo } from "../models/Photo";

function descriptionUrl(albumName: string, photo: Photo){
  return '/api/albums/' + albumName + '/photos/' + photo.name + "/description";
}

export function saveDescription(albumName: string, photo: Photo, description?: string) {
  return axios.put(descriptionUrl(albumName, photo), description);
}