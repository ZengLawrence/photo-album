import { Photo } from '../../models';
import { Description } from './Description';
import { PhotoImage } from './PhotoImage';
import * as photoApi from '../../api/Photos';

export const PhotoCard = (props: {albumName: string, photo: Photo, maxSize?: number, onPhotoUpdated: (photo: Photo)=>void }) => {
  const {albumName, photo, maxSize} = props;

  const saveDescription = (description?: string) => {
    photoApi.saveDescription(albumName, photo, description);
    props.onPhotoUpdated && props.onPhotoUpdated({...photo, description});
  }

  return (
    <div className="d-flex flex-row justify-content-center w-100 my-2 mx-1 p-1" style={{height: maxSize}} >
      <div style={{width: "200px"}}/>
      <PhotoImage albumName={albumName} photo={photo} maxSize={maxSize} className="border rounded border-light" />
      <Description description={photo.description} handleSave={saveDescription}/>
    </div>
  )
}
