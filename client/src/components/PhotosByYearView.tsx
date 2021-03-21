import React, { Fragment } from "react";
import { PhotosByDate, PhotosByYear } from "../models/Photo";
import { Card } from "react-bootstrap";
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
    <Card>
      <Card.Header>{photosByYear.year}</Card.Header>
      <Card.Body>
        <PhotosByDateView photosByDate={photosByYear.photosByDate} />
      </Card.Body>
    </Card>
  );

};
