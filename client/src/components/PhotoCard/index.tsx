import { Photo } from '../../models/Photo';
import { Description } from './Description';
import { PhotoImage } from './PhotoImage';

export const PhotoCard = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;
  return (
    <div>
      <PhotoImage albumName={albumName} photo={photo} />
      <Description />
    </div>
  )
}
