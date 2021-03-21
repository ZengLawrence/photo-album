import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import * as YearsAPI from "../api/Years";
import { PhotosByYearView } from "../components/PhotosByYearView";
import { PhotosByYear } from "../models/Photo";

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
            <PhotosByYearView key={pby.year} photosByYear={pby} />
          )
        })
      }
    </div>
  );
}