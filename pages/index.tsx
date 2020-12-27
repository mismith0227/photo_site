import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import ImageModal from '../components/ImageModal'
import Profile from '../components/Profile'

import { Photo } from '../types/Photo'

interface Props {
  gallery: Photo[]
}

const Home: NextPage<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPhoto, setSelectedPhoto] = useState<number>(null)
  const gallery = props.gallery

  const openModal = (index) => {
    setSelectedPhoto(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    setIsModalOpen(false)
  }

  return (
    <div className="pt-20 pb-20">
      <Profile />
      <div className="px-4">
        <h2 className="my-28 text-center">Gallery</h2>
        <ul className="md:column-count-2 lg:column-count-3 gap-4">
          {gallery.map((photo, index) => (
            <li
              key={photo.id}
              className="break-inside mb-4 cursor-zoom-in"
              onClick={() => openModal(index)}
            >
              <img src={photo.image.url} />
            </li>
          ))}
        </ul>
      </div>
      <ImageModal
        onCloseModal={closeModal}
        isOpen={isModalOpen}
        initialSlide={selectedPhoto}
        photos={gallery}
      />
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch(
    'https://mismith.microcms.io/api/v1/gallery?limit=30',
    key
  )
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      gallery: data.contents,
    },
  }
}
