import { Photo } from '../../models/Photo';
import { PhotoImage } from './PhotoImage';

export const PhotoCard = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  return (
    <PhotoImage albumName={albumName} photo={photo} />
  )
}