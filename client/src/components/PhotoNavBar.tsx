import { Photo } from "../models/Photo";
import { PhotoImage } from "./PhotoCard/PhotoImage";

const NORMAL = "mr-1";
const SELECTED = "border border-primary mr-1 p-1";

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; selectedPhotoName?: string; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, selectedPhotoName, onSelectPhoto } = props;
  return (
    <div className="d-flex overflow-auto">
      {photos.map(p => (
        // Without the `key`, React will fire a key warning
        <PhotoImage 
          key={p.name} 
          albumName={albumName} 
          photo={p} 
          maxSize={100} 
          onClick={() => onSelectPhoto(p.name)} 
          className={p.name === selectedPhotoName ? SELECTED : NORMAL}
          />
      ))}
    </div>
  );
}
