import React, { useEffect, useState } from "react";
import { CompactPhotoCollectionRow } from "../components/CompactPhotoCollectionRow";
import { PhotosByDate, PhotosByYear } from "../models/Photo";
import * as YearsAPI from "../api/Years";

function photoCollection(photosByDate: PhotosByDate) {
  return {title: photosByDate.date, photos: photosByDate.photos};
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
        photosByYear.map(pby => (
          // Without the `key`, React will fire a key warning
          <div>
            <h1>{pby.year}</h1>
            {pby.photosByDate.map(pbd => {
              return (
                // Without the `key`, React will fire a key warning
                <CompactPhotoCollectionRow key={pbd.date} photoCollection={photoCollection(pbd)} linkUrlRoot="/years" />
              )
            })}
          </div>
        ))
      }
    </div>
  );
}