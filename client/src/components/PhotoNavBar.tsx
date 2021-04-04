import _ from "lodash";
import { RefObject, useRef, useState } from "react";
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
  
  const [firstRender, setFirstRender] = useState(true);
  const listRef = useRef() as RefObject<List>;
  const focusedPhotoIndex = _.findIndex(photos, p => p.name === selectedPhotoName);
  const firstScroll = () => {
    if (firstRender) {
      setFirstRender(false)
      listRef.current?.scrollToItem(focusedPhotoIndex, "center");
    }
  };

  return (
    <div className="w-100">
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            ref={listRef}
            height={THUMBNAIL_SIZE}
            width={width}
            itemCount={_.size(photos)}
            itemSize={THUMBNAIL_SIZE}
            itemData={photos}
            layout="horizontal"
            useIsScrolling
            onItemsRendered={firstScroll}
          >
            {({ data, index, style, isScrolling }) => (
              <PhotoThumbnail
                albumName={albumName}
                photoName={photoName(data[index])}
                maxSize={THUMBNAIL_SIZE}
                onClick={() => onSelectPhoto(photoName(data[index]))}
                className={photoName(data[index]) === selectedPhotoName ? SELECTED : NORMAL}
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
