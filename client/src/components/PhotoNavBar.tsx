import _ from "lodash";
import { RefObject, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Align, FixedSizeList as List } from 'react-window';
import { Photo } from "../models";
import { PhotoThumbnail } from "./PhotoThumbnail";

const NORMAL = "";
const SELECTED = "PA-Border border-primary";
const THUMBNAIL_SIZE = 100;

function photoName(photo: Photo) {
  return photo.name;
}

function useFirstScroll(index: number, align?: Align) : [RefObject<List>, () => void]{
  const [firstRender, setFirstRender] = useState(true);
  const listRef = useRef() as RefObject<List>;
  const firstScroll = () => {
    if (firstRender) {
      setFirstRender(false)
      listRef.current?.scrollToItem(index, align);
    }
  };
  return [listRef, firstScroll];
}

export function PhotoNavBar(props: { albumName: string; photos: Photo[]; selectedPhotoName?: string; onSelectPhoto: (photoName: string) => void; }) {
  const { albumName, photos, selectedPhotoName, onSelectPhoto } = props;

  const selected = (photo: Photo) => photo.name === selectedPhotoName;
  const focusedPhotoIndex = _.findIndex(photos, selected);
  const [listRef, firstScroll] = useFirstScroll(focusedPhotoIndex, "center");

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
