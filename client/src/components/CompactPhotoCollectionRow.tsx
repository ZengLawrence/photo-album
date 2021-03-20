/** A row of photo thumbnails with title */
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import VisibilitySensor from  'react-visibility-sensor';
import {Photo, PhotoCollection} from '../models/Photo';
import { PhotoThumbnail } from './PhotoThumbnail';

function href(albumName: string, photo: Photo) {
  return urljoin("/albums/", albumName, "?focusOn=" + photo.name);
}

export const CompactPhotoCollectionRow = (props: {photoCollection: PhotoCollection, overflow?: boolean}) => {
  const {overflow} = props;
  const className = overflow ? "d-flex overflow-auto" : "d-flex flex-wrap";
  const {title, photos} = props.photoCollection;
  return (
    <div>
      <h1>{title}</h1>
      <div className={className}>
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <Link key={p.name} to={href(title, p)} >
            <VisibilitySensor>
              {({isVisible}) =>
                  <PhotoThumbnail albumName={p.albumName ? p.albumName : title} photoName={p.name} maxSize={100} visible={isVisible} />
              }
            </VisibilitySensor>
          </Link>
        ))}
      </div>      
    </div>
  );
}
