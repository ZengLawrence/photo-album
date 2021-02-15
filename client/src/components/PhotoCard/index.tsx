import { faEdit, faFileAlt, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Photo } from '../../models/Photo';
import { PhotoImage } from './PhotoImage';

export const PhotoCard = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  return (
    <div>
      <PhotoImage albumName={albumName} photo={photo} />
      <Icons />
    </div>
  )
}

const Icons = () => {
  return (
    <div className="text-end">
      <FontAwesomeIcon icon={faEdit} />
      <FontAwesomeIcon icon={faFileAlt} />
      <FontAwesomeIcon icon={faHeart} />
      <FontAwesomeIcon icon={faHeartSolid} color="red"/>
    </div>
  )
}