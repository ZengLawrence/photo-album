import { RefObject, useRef, useState } from "react";
import { Align, FixedSizeGrid, FixedSizeList, VariableSizeGrid, VariableSizeList } from 'react-window';

type ListType = FixedSizeList | VariableSizeList | FixedSizeGrid | VariableSizeGrid;

export function useFirstScroll<T extends ListType>(index: number, align?: Align): [RefObject<T>, () => void] {
  const [firstRender, setFirstRender] = useState(true);
  const listRef = useRef() as RefObject<T>;
  const firstScroll = () => {
    if (firstRender) {
      setFirstRender(false);
      listRef.current?.scrollToItem(index, align);
    }
  };
  return [listRef, firstScroll];
}
