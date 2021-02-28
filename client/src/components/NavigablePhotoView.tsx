import { Photo } from "../models/Photo";

export const NavigablePhotoView = (props: {title: string}) => {
  const { title } = props;
  return (
    <div>
      <h1 className="text-center">{title}</h1>
    </div>
  )
}