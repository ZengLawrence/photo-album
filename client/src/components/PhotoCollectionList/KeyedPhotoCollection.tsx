import { PhotoCollection } from '../../models/Photo';


export type KeyedPhotoCollection = (PhotoCollection & { key: string; });
