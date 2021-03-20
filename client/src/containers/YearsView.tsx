import React, { useEffect, useState } from "react";
import { CompactPhotoCollectionRow } from "../components/CompactPhotoCollectionRow";
import { PhotoCollection } from "../models/Photo";
import * as YearsAPI from "../api/Years";

export const YearsView = () => {
  const [photosByYear, setPhotosByYear] = useState([] as PhotoCollection[]);

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
          <CompactPhotoCollectionRow key={pby.title} photoCollection={pby} />
        ))
      }
    </div>
  );
}