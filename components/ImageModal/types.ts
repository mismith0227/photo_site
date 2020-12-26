import * as React from 'react'
import { Photo } from '../../types/Photo'

export interface ExternalProps {
  readonly children?: React.ReactNode
  readonly isOpen: boolean
  readonly onCloseModal: () => void
  readonly photo: Photo
}

export type Props = ExternalProps
