/** A row of photo thumbnails with title */
import {PhotoCollection} from '../models/Photo';
import { PhotoImage } from './PhotoCard/PhotoImage';

export const CompactPhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <h1>{title}</h1>
      <div className="d-flex overflow-auto">
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <PhotoImage key={p.name} albumName={title} photo={p} maxSize={100} />
        ))}
      </div>      
    </div>
  );
}
