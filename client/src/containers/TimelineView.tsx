import React, { useEffect, useState } from "react";
import { CompactPhotoCollectionRow } from "../components/CompactPhotoCollectionRow";
import { PhotoCollection } from "../models/Photo";
import * as TimelineAPI from "../api/Timeline";

export const TimelineView = () => {
  const [photosByYear, setPhotosByYear] = useState([] as PhotoCollection[]);

  useEffect(() => {
    TimelineAPI.fecthAll().then(data => {
      setPhotosByYear(data);
    }
    );
  }, []);

  return (
    <div>
      <h1 className="text-center">Timeline</h1>
      <div>
        {
          photosByYear.map(pby => (
            // Without the `key`, React will fire a key warning
            <CompactPhotoCollectionRow key={pby.title} photoCollection={pby} />
          ))
        }
      </div>
    </div>
  );
}