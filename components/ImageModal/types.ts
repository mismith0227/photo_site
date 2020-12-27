import { Photo } from '../../types/Photo'

export interface ExternalProps {
  readonly isOpen: boolean
  readonly onCloseModal: () => void
  readonly initialSlide: number
  readonly photos: Photo[]
}

export type Props = ExternalProps
