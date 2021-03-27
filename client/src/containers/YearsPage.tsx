import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { PhotoCollectionView } from "../components/PhotoCollectionView";
import { PhotoCollection, PhotosByDate } from "../models/Photo";

function year(photosByDate: PhotosByDate) {
  return photosByDate.date.substring(0, 4);
}

function photoCollection(photosByDate: PhotosByDate[], year: string) : PhotoCollection {
  return {
    title: year,
    photos: _.flatMap(photosByDate, 'photos'),
  }
}

function yearView(photosByDate: PhotosByDate[]) : PhotoCollection[] {
  const groupByYear = _.groupBy(photosByDate, year);
  return _.map(groupByYear, photoCollection);
}

function yearSummary(photosByDate: PhotosByDate[]) : PhotoCollection[] {
  return _.map(yearView(photosByDate), sample);
}

function sample(photoCollection: PhotoCollection) : PhotoCollection {
  const { title, photos} = photoCollection;
  return {
    title,
    photos: _.sampleSize(_.flatten(photos), 30)
  };
}

export const YearsPage = () => {
  const [photoCollections, setPhotoCollections] = useState([] as PhotoCollection[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    YearsAPI.fecthAll().then(data => {
      setPhotoCollections(yearSummary(data));
      setLoading(false);
    }
    );
  }, []);

  return (
    <div>
      {loading && <Spinner animation="border" variant="primary" />}
      <PhotoCollectionView photoCollections={photoCollections} />
    </div>
  );
}