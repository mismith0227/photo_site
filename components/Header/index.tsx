import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex justify-end p-4 text-sm">
          <li>
            <Link href={`/`}>
              <a className="mx-2 text-gray-400 hover:text-gray-600 duration-200">
                top
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/note`}>
              <a className="mx-2 text-gray-400 hover:text-gray-600 duration-200">
                note
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
