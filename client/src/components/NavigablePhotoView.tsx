import { Photo } from "../models/Photo";
import { PhotoImage } from "./PhotoCard/PhotoImage";

function PhotoNavBar(props: {albumName: string, photos: Photo[]}) {
  const { albumName, photos } = props;
  return (
      <div className="d-flex overflow-auto">
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <PhotoImage key={p.name} albumName={albumName} photo={p} maxSize={100}  className="mr-1" />
        ))}
      </div>      
  );
}

export const NavigablePhotoView = (props: {title: string, photos: Photo[]}) => {
  const { title, photos } = props;
  return (
    <div>
      <h1 className="text-center">{title}</h1>
      <PhotoNavBar albumName={title} photos={photos} />
    </div>
  )
}