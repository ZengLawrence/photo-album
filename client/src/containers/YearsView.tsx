import React, { useEffect, useState } from "react";
import { PhotosByYear } from "../models/Photo";
import * as YearsAPI from "../api/Years";
import { PhotosByYearView } from "../components/PhotosByYearView";

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