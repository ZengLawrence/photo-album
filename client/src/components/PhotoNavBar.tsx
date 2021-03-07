import { Photo } from "../models/Photo";
import { PhotoImage } from "./PhotoCard/PhotoImage";

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, onSelectPhoto } = props;
  return (
    <div className="d-flex overflow-auto">
      {photos.map(p => (
        // Without the `key`, React will fire a key warning
        <PhotoImage key={p.name} albumName={albumName} photo={p} maxSize={100} onClick={() => onSelectPhoto(p.name)} className="mr-1" />
      ))}
    </div>
  );
}
