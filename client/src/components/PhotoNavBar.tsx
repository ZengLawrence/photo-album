import { RefObject, useEffect, useRef } from 'react';
import VisibilitySensor from  'react-visibility-sensor';
import { Photo } from "../models/Photo";
import { PhotoThumbnail } from "./PhotoThumbnail";

const NORMAL = "";
const SELECTED = "PA-Border border-primary";
const THUMBNAIL_SIZE = 100;

function selectedPhotoLeft(photos: Photo[], selectedPhotoName?: string) {
  const i = photos.findIndex(p => p.name === selectedPhotoName);
  return THUMBNAIL_SIZE * i;
}

function useSetInitialScrollPosition(scrollDivRef: RefObject<HTMLDivElement> | null, selectedPhotoLeft: ()=> number) {
  useEffect(()=> {
    if (scrollDivRef && scrollDivRef.current) {
      const {
        scrollLeft,
        clientWidth
      } = scrollDivRef.current;

      if (scrollLeft === 0) {
        const newScrollLeft = selectedPhotoLeft();
        if (newScrollLeft > scrollLeft + clientWidth) {
          scrollDivRef.current.scrollLeft = newScrollLeft - (THUMBNAIL_SIZE * 5);
        }
      }
    }
  });

}

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; selectedPhotoName?: string; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, selectedPhotoName, onSelectPhoto } = props;

  const scrollDivRef: RefObject<HTMLDivElement> = useRef(null);
  useSetInitialScrollPosition(scrollDivRef, ()=>selectedPhotoLeft(photos, selectedPhotoName));

  return (
    <div ref={scrollDivRef} className="d-flex overflow-auto">
      {photos.map(p => (
        // Without the `key`, React will fire a key warning
        <VisibilitySensor key={p.name}>
          {({ isVisible }) =>
            <PhotoThumbnail
              albumName={albumName}
              photoName={p.name}
              maxSize={THUMBNAIL_SIZE}
              onClick={() => onSelectPhoto(p.name)}
              className={p.name === selectedPhotoName ? SELECTED : NORMAL}
              visible={isVisible}
            />
          }
        </VisibilitySensor>
      ))}
    </div>
  );
}
