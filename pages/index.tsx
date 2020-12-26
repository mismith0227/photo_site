import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

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
    <div className="px-4">
      <ul className="column-count-3 gap-4">
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
