/** A row of photo thumbnails with title */
import {Photo, PhotoCollection} from '../models/Photo';
import { PhotoImage } from './PhotoCard/PhotoImage';

function href(albumName: string, photo: Photo) {
  return "/albums/" + albumName + "/photos/" + photo.name;
}

export const CompactPhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <h1>{title}</h1>
      <div className="d-flex overflow-auto">
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <a key={p.name} href={href(title, p)} className="mr-1">
            <PhotoImage albumName={title} photo={p} maxSize={100} />
          </a>
        ))}
      </div>      
    </div>
  );
}
