import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Head from '../components/Head'
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
    <>
      <Head
        title={'写真のポートフォリオサイト'}
        description={'趣味で写真を撮ってる人のポートフォリオサイトです'}
        keyword={'写真,ポートフォリオ'}
        image={
          'https://pbs.twimg.com/profile_images/1176903104442142720/UO3wHvoE_400x400.jpg'
        }
        url={'https://photo.mismith.me/'}
      />
      <div className="pt-20 pb-20">
        <Profile />
        <div className="px-4">
          <h2 className="my-20 md:my-28 text-center">Gallery</h2>
          <ul className="md:column-count-2 lg:column-count-3 gap-4">
            {gallery.map((photo, index) => (
              <li
                key={photo.id}
                className="break-inside mb-4 cursor-zoom-in"
                onClick={() => openModal(index)}
              >
                <Image
                  src={photo.image.url}
                  alt={photo.title}
                  width={photo.width}
                  height={photo.height}
                />
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
    </>
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
