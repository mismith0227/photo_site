import { profile } from 'console'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Profile from '../components/Profile'

export interface Blogs {
  id: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
  title: string
  photo: { url: string }
}

interface Props {
  blog: Blogs[]
}

const Home: NextPage<Props> = (props) => {
  const blog = props.blog
  return (
    <div className="pb-20">
      <Profile />
      <div className="px-4">
        <h2 className="my-28 text-center">Gallery</h2>
        <ul className="md:column-count-2 lg:column-count-3 gap-4">
          {blog.map((blog) => (
            <li key={blog.id} className="break-inside mb-4">
              {/* <Link href={`/`}>
            <a>{blog.title}</a>
          </Link> */}
              <img src={blog.photo.url} />
            </li>
          ))}
        </ul>
      </div>
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
