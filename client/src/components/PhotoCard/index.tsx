import { Photo } from '../../models/Photo';
import { Description } from './Description';
import { PhotoImage } from './PhotoImage';
import * as photoApi from '../../api/Photos';

export const PhotoCard = (props: {albumName: string, photo: Photo}) => {
  const {albumName, photo} = props;

  const saveDescription = (description?: string) => {
    photoApi.saveDescription(albumName, photo, description);
  }

  return (
    <div>
      <PhotoImage albumName={albumName} photo={photo} />
      <Description description={photo.description} handleSave={saveDescription}/>
    </div>
  )
}
