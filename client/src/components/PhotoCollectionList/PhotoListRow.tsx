import { CSSProperties } from "react";
import { Photo } from "../../models";
import { PhotoThumbnail } from "../PhotoThumbnail";
import { ListItemData } from "./ListItemData";

function keyValue(photo: Photo) {
  return photo.albumName + "/" + photo.name;
}

interface RowProps {
  data: ListItemData[];
  index: number;
  style: CSSProperties;
  isScrolling?: boolean;
  onSelect?: (key: string) => void;
  onSelectPhoto?: (albumName: string, photoName: string) => void;
}

export const PhotoListRow = (props: RowProps) => {
  const { data, index, style, isScrolling, onSelect, onSelectPhoto } = props;
  const rowData = data[index];
  const handleOnClick = () => onSelect && onSelect(rowData.key);
  const handleOnClickPhotoRow = onSelectPhoto ? undefined : handleOnClick;

  if (rowData.title) {
    return (
      <h1 style={style} onClick={handleOnClick}>{rowData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex" onClick={handleOnClickPhotoRow}>
        {rowData.photos &&
          rowData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail
              key={keyValue(p)}
              albumName={p.albumName || ""}
              photoName={p.name}
              maxSize={100}
              visible={!isScrolling}
              onClick={() => onSelectPhoto && onSelectPhoto(p.albumName || "", p.name)}
            />
          ))}
      </div>
    );
  }
};
