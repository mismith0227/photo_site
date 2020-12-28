import Link from 'next/link'

export default function Profile() {
  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden rounded-full w-24 h-24">
        <img
          src="https://pbs.twimg.com/profile_images/1176903104442142720/UO3wHvoE_400x400.jpg"
          alt=""
        />
      </div>
      <p className="mt-4 tracking-wide">misumi_takuma</p>
      <p className="mt-4 text-center text-gray-400 tracking-wide text-sm">
        Web developer based in Osaka.
        <br />
        RX100 M6 / Rollei B35
      </p>

      <div className="flex mt-4  text-sm">
        <Link href={`https://www.instagram.com/mismith0227/`}>
          <a
            target="_blank"
            className="mx-2 text-gray-400 hover:text-gray-600 duration-200"
            rel="noopener"
          >
            Instagram
          </a>
        </Link>
        <Link href={`https://500px.com/p/mismith2216?view=photos`}>
          <a
            target="_blank"
            className="mx-2 text-gray-400 hover:text-gray-600 duration-200"
            rel="noopener"
          >
            500px
          </a>
        </Link>
        <Link href={`https://twitter.com/misumi_takuma/`}>
          <a
            target="_blank"
            className="mx-2 text-gray-400 hover:text-gray-600 duration-200"
            rel="noopener"
          >
            Twitter
          </a>
        </Link>
      </div>
    </div>
  )
}
