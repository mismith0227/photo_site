import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ blog }) {
  console.log(blog.title);
  return (
    <div>
      {blog.map((blog) => (
        <ul key={blog.id}>
          <li>
            <Link href={`/`}>
              <a>{blog.title}</a>
            </Link>
            <img src={blog.photo.url} />
          </li>
        </ul>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch("https://mismith.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  };
};
