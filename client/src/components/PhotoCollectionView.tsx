import { Fragment } from "react";
import { PhotoCollection } from "../models";
import { ThumbnailCollageCard } from "./ThumbnailCollageCard";

export const PhotoCollectionView = (props: { photoCollections: PhotoCollection[] }) => {
  const { photoCollections } = props;
  return (
    <Fragment>
      {
        photoCollections.map(pc => {
          return (
            // Without the `key`, React will fire a key warning
            <ThumbnailCollageCard key={pc.title} photoCollection={pc} />
          )
        })
      }
    </Fragment>
  );
}