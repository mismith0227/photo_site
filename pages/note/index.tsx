import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import moment from 'moment'
import Head from '../../components/Head'
import Image from 'next/image'

import { Blog } from '../../types/Blog'

interface Props {
  blog: Blog[]
}

const Note: NextPage<Props> = (props) => {
  const blog = props.blog
  return (
    <>
      <Head
        title={'note一覧/写真のポートフォリオサイト'}
        description={'note/趣味で写真を撮ってる人のポートフォリオサイトです'}
        keyword={'写真,ポートフォリオ'}
        image={
          'https://pbs.twimg.com/profile_images/1176903104442142720/UO3wHvoE_400x400.jpg'
        }
        url={'https://photo.mismith.me/note'}
      />
      <div className="max-w-screen-md mx-auto my-20 px-4">
        <h2 className="text-center text-lg">note</h2>
        <div className="mt-20">
          <ul>
            {blog.map((item) => (
              <li key={item.id} className="mt-20">
                <Link href={`/note/${item.id}`}>
                  <a>
                    <p className="text-xs text-center text-gray-400">
                      {moment(item.publishedAt).format('YYYY-MM-DD')}
                    </p>
                    <h3 className="text-lg text-center mt-4 hover:text-gray-400 duration-200">
                      {item.title}
                    </h3>

                    <div className="mt-8">
                      <Image
                        src={item.thumbnail.url}
                        alt={`${item.title}のサムネイル`}
                        width={item.width}
                        height={item.height}
                      />
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Note

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
