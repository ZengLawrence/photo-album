import { useEffect, useState } from "react";
import { Photo } from "../models/Photo";
import { PhotoCard } from "./PhotoCard";
import { PhotoImage } from "./PhotoCard/PhotoImage";

function PhotoNavBar(props: { albumName: string, photos: Photo[] }) {
  const { albumName, photos } = props;
  return (
    <div className="d-flex overflow-auto">
      {photos.map(p => (
        // Without the `key`, React will fire a key warning
        <PhotoImage key={p.name} albumName={albumName} photo={p} maxSize={100} className="mr-1" />
      ))}
    </div>
  );
}

function findFocusedPhoto(photos: Photo[], focusOnPhotoName?: string) {
  if (photos.length > 1 && focusOnPhotoName) {
    return photos.filter(p => p.name == focusOnPhotoName).shift();
  } else {
    return undefined;
  }
}

export const NavigablePhotoView = (props: { title: string, photos: Photo[], focusOnPhotoName?: string}) => {
  const { title, photos, focusOnPhotoName } = props;
  const [ focusedPhoto, setFocusedPhoto ] = useState(findFocusedPhoto(photos, focusOnPhotoName));
  
  useEffect(() => {
    setFocusedPhoto(findFocusedPhoto(photos, focusOnPhotoName));
  }, [photos, focusOnPhotoName]);

  return (
    <div>
      <h1 className="text-center">{title}</h1>
      {focusedPhoto && 
        <PhotoCard albumName={title} photo={focusedPhoto} maxSize={300} />
        }
      <PhotoNavBar albumName={title} photos={photos} />
    </div>
  )
}