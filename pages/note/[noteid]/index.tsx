import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import moment from 'moment'
import Head from '../../../components/Head'
import Image from 'next/image'

import { Blog } from '../../../types/Blog'

interface Props {
  blog: Blog
}

const NoteDetail: NextPage<Props> = (props) => {
  const blog = props.blog
  return (
    <>
      <Head
        title={blog.title}
        description={blog.description ? blog.description : ''}
        keyword={'写真,ポートフォリオ'}
        image={blog.thumbnail.url}
        url={`https://photo.mismith.me/note/${blog.id}`}
      />
      <div className="max-w-screen-md mx-auto my-20 px-4">
        <p className="text-xs text-center text-gray-400">
          {moment(blog.publishedAt).format('YYYY-MM-DD')}
        </p>
        <h2 className="text-lg text-center mt-8 text-center">{blog.title}</h2>

        <div className="mt-8">
          <Image
            src={blog.thumbnail.url}
            alt={`${blog.title}のサムネイル`}
            width={blog.width}
            height={blog.height}
          />
        </div>

        <div
          className="mt-8 blog-content"
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />

        <div className="text-center mt-20 text-gray-400">
          <Link href={`/note`}>
            <a className="border border-current p-2 text-sm">一覧へ</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NoteDetail

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch('https://mismith.microcms.io/api/v1/blog', key)
    .then((res) => res.json())
    .catch(() => null)
  const paths = data.contents.map((content) => `/note/${content.id}`)
  console.log(paths)
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const id = context.params.noteid
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch('https://mismith.microcms.io/api/v1/blog/' + id, key)
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      blog: data,
    },
  }
}
