import React, { Fragment } from "react";
import { PhotosByDate, PhotosByYear } from "../models/Photo";
import { CompactPhotoCollectionRow } from "./CompactPhotoCollectionRow";

function photoCollection(photosByDate: PhotosByDate) {
  return { title: photosByDate.date, photos: photosByDate.photos };
}

const PhotosByDateView = (props: { photosByDate: PhotosByDate[] }) => {
  const { photosByDate } = props;
  return (
    <Fragment>
      {
        photosByDate.map(byDate => {
          return (
            // Without the `key`, React will fire a key warning
            <CompactPhotoCollectionRow key={byDate.date} photoCollection={photoCollection(byDate)} linkUrlRoot="/years" />
          )
        })
      }
    </Fragment>

  );
}

export const PhotosByYearView = (props: { photosByYear: PhotosByYear; }) => {
  const { photosByYear } = props;
  return (
    <div>
      <h1 className="bg-primary text-white mt-2">{photosByYear.year}</h1>
      <PhotosByDateView photosByDate={photosByYear.photosByDate} />
    </div>
  );

};
