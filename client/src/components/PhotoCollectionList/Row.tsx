import { CSSProperties } from "react";
import { Photo } from "../../models/Photo";
import { PhotoThumbnail } from "../PhotoThumbnail";
import { ListItemData } from "./ListItemData";

export function keyValue(photo: Photo) {
  return photo.albumName + "/" + photo.name;
}

export interface RowProps {
  data: ListItemData[];
  index: number;
  style: CSSProperties;
  isScrolling?: boolean;
  onSelect?: (key: string) => void;
}

export const Row = (props: RowProps) => {
  const { data, index, style, isScrolling, onSelect } = props;
  const rowData = data[index];
  const handleOnClick = () => onSelect && onSelect(rowData.key);

  if (rowData.title) {
    return (
      <h1 style={style} onClick={handleOnClick}>{rowData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex" onClick={handleOnClick}>
        {rowData.photos &&
          rowData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail
              key={keyValue(p)}
              albumName={p.albumName || ""}
              photoName={p.name}
              maxSize={100}
              visible={!isScrolling} />
          ))}
      </div>
    );
  }
};
