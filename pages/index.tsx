import React, { useEffect, useRef, useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import ImageModal from '../components/ImageModal'
import Profile from '../components/Profile'

import { Photo } from '../types/Photo'

interface Props {
  blog: Photo[]
}

const Home: NextPage<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>(null)
  const blog = props.blog

  const openModal = (blog) => {
    setSelectedPhoto(blog)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    setIsModalOpen(false)
  }

  return (
    <div className="pb-20">
      <Profile />
      <div className="px-4">
        <h2 className="my-28 text-center">Gallery</h2>
        <ul className="md:column-count-2 lg:column-count-3 gap-4">
          {blog.map((blog) => (
            <li
              key={blog.id}
              className="break-inside mb-4 cursor-pointer"
              onClick={() => openModal(blog)}
            >
              <img src={blog.photo.url} />
            </li>
          ))}
        </ul>
      </div>
      <ImageModal
        onCloseModal={closeModal}
        isOpen={isModalOpen}
        photo={selectedPhoto}
      />
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch('https://mismith.microcms.io/api/v1/blog', key)
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      blog: data.contents,
    },
  }
}
