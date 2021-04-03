import { PhotoCollection } from '../../models';


export type KeyedPhotoCollection = (PhotoCollection & { key: string; });
