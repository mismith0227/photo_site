import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import lodash from 'lodash'
import moment from 'moment'
import Head from '../../components/Head'
import Image from 'next/image'

import { Blog } from '../../types/Blog'

interface Props {
  blog: Blog[]
}

const Note: NextPage<Props> = (props) => {
  const blog = props.blog
  const [postsNew, setPosts] = React.useState(blog)
  const [pageNumber, setPageNumber] = React.useState(1)

  React.useEffect(() => {
    getPost()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pageNumber])

  const handleScroll = lodash.throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return
    }
    setPageNumber(pageNumber + 1)
  }, 200)

  // 続きの記事を取得して配列に結合
  const getPost = async () => {
    if (pageNumber === 1) {
      return
    }

    // 続きの記事を取得
    const limit = 10
    const key = {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
    }
    const res = await fetch(
      `https://mismith.microcms.io/api/v1/blog?limit=${limit}&offset=${
        (pageNumber - 1) * limit
      }`,
      key
    )
    const data = await res.json()
    const postsNext = postsNew.concat(data.contents)
    setPosts(postsNext)
  }

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
            {postsNew.map((item) => (
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
    headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
  }
  const limit = 10

  const data = await fetch(
    `https://mismith.microcms.io/api/v1/blog?limit=${limit}`,
    key
  )
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      blog: data.contents,
    },
  }
}
