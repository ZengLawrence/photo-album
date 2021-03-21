/** A row of photo thumbnails with title */
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import VisibilitySensor from  'react-visibility-sensor';
import {Photo, PhotoCollection} from '../models/Photo';
import { PhotoThumbnail } from './PhotoThumbnail';
import { Card } from 'react-bootstrap';

function href(urlRoot: string, albumName: string, photo: Photo) {
  return urljoin(urlRoot, albumName, "?focusOn=" + photo.name);
}

export const CompactPhotoCollectionRow = (props: {photoCollection: PhotoCollection, overflow?: boolean, linkUrlRoot?: string}) => {
  const {overflow} = props;
  const className = overflow ? "d-flex overflow-auto" : "d-flex flex-wrap";
  const {title, photos} = props.photoCollection;
  const linkUrlRoot = props.linkUrlRoot ? props.linkUrlRoot : "/albums/";

  return (
    <Card>
      <Card.Header><h2>{title}</h2></Card.Header>
      <Card.Body className={className}>
        {photos.map(p => (
          // Without the `key`, React will fire a key warning
          <Link key={p.name} to={href(linkUrlRoot, title, p)} >
            <VisibilitySensor>
              {({isVisible}) =>
                  <PhotoThumbnail albumName={p.albumName ? p.albumName : title} photoName={p.name} maxSize={100} visible={isVisible} />
              }
            </VisibilitySensor>
          </Link>
        ))}
      </Card.Body>      
    </Card>
  );
}
