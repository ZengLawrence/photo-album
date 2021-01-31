/** Photo thumbnails in chronological order */
import React from 'react';
import { PhotoCollectionRow } from './PhotoCollectionRow';
import { Photo, PhotoCollection } from '../models/Photo';

export const TimelineView = (props: { photosByYears: PhotoCollection[] }) => {
  const { photosByYears } = props;
  return (
    <div>
      {
        photosByYears.map(pby => (
          // Without the `key`, React will fire a key warning
          <PhotoCollectionRow key={pby.title} photoCollection={pby} />
        ))
      }
    </div>
  );
}