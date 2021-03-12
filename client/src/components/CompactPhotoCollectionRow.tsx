/** A row of photo thumbnails with title */
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import {Photo, PhotoCollection} from '../models/Photo';
import { PhotoThumbnail } from './PhotoThumbnail';

function href(albumName: string, photo: Photo) {
  return urljoin("/albums/", albumName, "?focusOn=" + photo.name);
}

export const CompactPhotoCollectionRow = (props: {photoCollection: PhotoCollection}) => {
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <h1>{title}</h1>
      <div className="d-flex overflow-auto">
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <Link key={p.name} to={href(title, p)} className="mr-1">
            <PhotoThumbnail albumName={title} photo={p} maxSize={100} />
          </Link>
        ))}
      </div>      
    </div>
  );
}
