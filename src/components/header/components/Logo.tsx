import Image from "next/image"
import Link from "next/link"


const Logo = () => {
  return (
    <Link href="/" className="">
      <Image
        src="/logo-rumpke.png"
        alt="Rumpke Logo"
        width={150}
        height={150}
        className="w-22 sm:w-28 md:w-32 xl:w-36 2xl:w-42"
        priority
      />
    </Link>
  )
}

export default Logo
