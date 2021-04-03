export interface Photo {
  name: string,
  albumName?: string,
  description?: string,
}

export interface PhotoCollection {
  title: string,
  photos: Photo[]
}

export interface PhotosByDate {
  date: string,
  photos: Photo[],
}
