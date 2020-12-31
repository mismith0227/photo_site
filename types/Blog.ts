export interface Blog {
  id: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
  title: string
  description?: string
  content: string
  thumbnail: { url: string }
  width: number
  height: number
}
