import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as YearsAPI from "../api/Years";
import { ThumbnailCollageCard } from "../components/ThumbnailCollageCard";
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

export const YearsPage = () => {
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
            <Link key={pby.year} to={{pathname:"/years/" + pby.year, state: pby}}>
              <ThumbnailCollageCard photoCollection={photoSummary(pby)} />
            </Link>
          )
        })
      }
    </div>
  );
}