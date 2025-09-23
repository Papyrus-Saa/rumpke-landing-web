import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="duration-500 h-[60vh] w-full flex flex-col justify-center items-center bg-white dark:bg-dark-300">
      <h1 className="text-2xl font-extrabold dark:text-light-300 text-dark-200 tracking-widest">404</h1>
      <div className="px-2 py-4 text-sm rounded">
        Hoppla, etwas ist schief gelaufen...
      </div>
      <Link
        href="/"
        className="relative inline-block text-sm font-medium text-[#b80404dc] group active:text-[#a10101dc] focus:outline-none focus:ring mt-5"
      >
        <span
          className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#db0000] group-hover:translate-y-0 group-hover:translate-x-0 rounded"
        ></span>
        <span className="relative block px-8 py-3 bg-[#4e0000] text-red-500 border border-current rounded">
          Zurück zur Startseite
        </span>
      </Link>
    </main>
  )
}
