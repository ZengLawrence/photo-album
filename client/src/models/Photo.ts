export interface Photo {
  name: string,
  description?: string,
}

export interface PhotoCollection {
  title: string,
  photos: Photo[]
}