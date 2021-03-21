import React, { Fragment, useEffect, useState } from "react";
import { CompactPhotoCollectionRow } from "../components/CompactPhotoCollectionRow";
import { PhotosByDate, PhotosByYear } from "../models/Photo";
import * as YearsAPI from "../api/Years";
import { Card } from "react-bootstrap";

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

const PhotosByYearView = (props: { photosByYear: PhotosByYear }) => {
  const { photosByYear } = props;
  return (
    <Card>
      <Card.Header>{photosByYear.year}</Card.Header>
      <Card.Body>
        <PhotosByDateView photosByDate={photosByYear.photosByDate} />
      </Card.Body>
    </Card>
  )

}

export const YearsView = () => {
  const [photosByYear, setPhotosByYear] = useState([] as PhotosByYear[]);

  useEffect(() => {
    YearsAPI.fecthAll().then(data => {
      setPhotosByYear(data);
    }
    );
  }, []);

  return (
    <div>
      {
        photosByYear.map(pby => {
          return (
            // Without the `key`, React will fire a key warning
            <PhotosByYearView key={pby.year} photosByYear={pby} />
          )
        })
      }
    </div>
  );
}