export interface Photo {
  id: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
  title: string
  image: { url: string }
  equipment?: string
  width: number
  height: number
}
