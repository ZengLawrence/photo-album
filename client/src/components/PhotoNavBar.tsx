import _ from "lodash";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';
import { Photo } from "../models";
import { PhotoThumbnail } from "./PhotoThumbnail";

const NORMAL = "";
const SELECTED = "PA-Border border-primary";
const THUMBNAIL_SIZE = 100;

function photoName(photo: Photo) {
  return photo.name;
}

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; selectedPhotoName?: string; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, selectedPhotoName, onSelectPhoto } = props;

  const selected = (photo: Photo) => photo.name === selectedPhotoName;
  const focusedPhotoIndex = _.findIndex(photos, selected);
  const initialScrollOffset = focusedPhotoIndex * THUMBNAIL_SIZE;

  return (
    <div className="w-100">
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            height={THUMBNAIL_SIZE}
            width={width}
            itemCount={_.size(photos)}
            itemSize={THUMBNAIL_SIZE}
            itemData={photos}
            layout="horizontal"
            useIsScrolling
            initialScrollOffset={initialScrollOffset}
          >
            {({ data, index, style, isScrolling }) => (
              <PhotoThumbnail
                albumName={albumName}
                photoName={photoName(data[index])}
                maxSize={THUMBNAIL_SIZE}
                onClick={() => onSelectPhoto(photoName(data[index]))}
                className={selected(data[index]) ? SELECTED : NORMAL}
                visible={!isScrolling}
                style={style}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
