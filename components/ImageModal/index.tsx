import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Props } from './types'

export default function ImageModal({
  children,
  onCloseModal,
  isOpen,
  photo,
}: Props) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#__next')
    setMounted(true)
  }, [])

  const renderModal = () => {
    return (
      <div
        className={`fixed bg-black bg-opacity-50 w-full h-full top-0 left-0 flex items-center justify-center duration-200 ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={onCloseModal}
      >
        <div className="w-4/5 h-5/6" onClick={(e) => e.stopPropagation()}>
          モーダル
        </div>
      </div>
    )
  }

  return mounted ? createPortal(renderModal(), ref.current) : null
}
