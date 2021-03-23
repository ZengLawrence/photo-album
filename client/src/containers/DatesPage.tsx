import { ThumbnailCollageCard } from "../components/ThumbnailCollageCard";
import { PhotosByDate, PhotosByYear } from "../models/Photo"

function photoCollection(photosByDate: PhotosByDate) {
  const { date, photos } = photosByDate;
  return {
    title: date,
    photos
  }
}

export const DatesPage = (props: { photosByYear: PhotosByYear }) => {
  const { photosByDate } = props.photosByYear;
  return (
    <div>
      {
        photosByDate.map(pbd => {
          return (
            // Without the `key`, React will fire a key warning
            <ThumbnailCollageCard key={pbd.date} photoCollection={photoCollection(pbd)} />
          )
        })
      }
    </div>
  )
}