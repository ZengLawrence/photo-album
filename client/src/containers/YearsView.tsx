import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { CompactPhotoCollectionRow } from "../components/CompactPhotoCollectionRow";
import { PhotoCollection, PhotosByDate, PhotosByYear } from "../models/Photo";

function photoSummary(photosByYear: PhotosByYear) : PhotoCollection {
  return {
    title: photosByYear.year,
    photos: sample(photosByYear.photosByDate),
  }
}

function sample(photosByDate: PhotosByDate[]) {
  return _.sampleSize(_.flatten(photosByDate.flatMap(pbd => pbd.photos)), 30);
}

export const YearsView = () => {
  const [photosByYear, setPhotosByYear] = useState([] as PhotosByYear[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    YearsAPI.fecthAll().then(data => {
      setPhotosByYear(data);
      setLoading(false);
    }
    );
  }, []);

  return (
    <div>
      {loading && <Spinner animation="border" variant="primary" />}
      {
        photosByYear.map(pby => {
          return (
            // Without the `key`, React will fire a key warning
            <CompactPhotoCollectionRow key={pby.year} photoCollection={photoSummary(pby)} />
          )
        })
      }
    </div>
  );
}