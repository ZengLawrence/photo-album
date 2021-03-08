import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Photo } from "../models/Photo";
import { PhotoCard } from "./PhotoCard";
import { PhotoNavBar } from "./PhotoNavBar";

function findFocusedPhoto(photos: Photo[], focusOnPhotoName?: string) {
  if (photos.length > 1 && focusOnPhotoName) {
    return photos.filter(p => p.name === focusOnPhotoName).shift();
  } else {
    return undefined;
  }
}

export const NavigablePhotoView = (props: { title: string, photos: Photo[], focusOnPhotoName?: string, onPhotoUpdated: (photo: Photo)=>void}) => {
  const { title, photos } = props;
  const [ focusOnPhotoName, setFocusOnPhotoName ] = useState(props.focusOnPhotoName);
  const [ focusedPhoto, setFocusedPhoto ] = useState(findFocusedPhoto(photos, focusOnPhotoName));
  
  useEffect(() => {
    setFocusedPhoto(findFocusedPhoto(photos, focusOnPhotoName));
  }, [photos, focusOnPhotoName]);

  return (
    <div>
      <Row className="justify-content-center">
        <h1>{title}</h1>        
      </Row>
      <Row className="justify-content-center">
        <PhotoNavBar albumName={title} photos={photos} selectedPhotoName={focusOnPhotoName} onSelectPhoto={setFocusOnPhotoName} />
      </Row>
      {focusedPhoto && 
            <Row className="justify-content-center">
              <PhotoCard albumName={title} photo={focusedPhoto} maxSize={600} onPhotoUpdated={props.onPhotoUpdated}/>
            </Row>      
        }
    </div>
  )
}