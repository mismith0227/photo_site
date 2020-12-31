import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
SwiperCore.use([Navigation])

import { Props } from './types'

export default function ImageModal({
  onCloseModal,
  isOpen,
  initialSlide,
  photos,
}: Props) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#__next')
    setMounted(true)
  }, [])

  const renderModal = () => {
    if (initialSlide === null) {
      return
    }
    return (
      <div
        className={`fixed bg-black bg-opacity-90 w-full h-full top-0 left-0 flex items-center justify-center duration-200 cursor-zoom-out ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={onCloseModal}
      >
        <button className="w-6 h-6 text-white absolute top-4 right-4 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          className="w-full h-5/6 relative cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="button_prev w-6 h-6 text-white absolute inset-y-1/2 left-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="button_next w-6 h-6 text-white absolute inset-y-1/2 right-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={initialSlide}
            loop={true}
            className="h-full"
            navigation={{
              prevEl: '.button_prev',
              nextEl: '.button_next',
            }}
          >
            {photos.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex justify-center items-center flex-col px-4 rerelativela"
              >
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="max-h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  }

  return mounted ? createPortal(renderModal(), ref.current) : null
}
