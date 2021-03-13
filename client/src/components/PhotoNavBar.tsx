import VisibilitySensor from  'react-visibility-sensor';
import { Photo } from "../models/Photo";
import { PhotoThumbnail } from "./PhotoThumbnail";

const NORMAL = "";
const SELECTED = "border border-primary";

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; selectedPhotoName?: string; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, selectedPhotoName, onSelectPhoto } = props;
  return (
    <div className="d-flex overflow-auto">
      {photos.map(p => (
        // Without the `key`, React will fire a key warning
        <VisibilitySensor key={p.name}>
          {({ isVisible }) =>
            <PhotoThumbnail
              albumName={albumName}
              photo={p}
              maxSize={100}
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
