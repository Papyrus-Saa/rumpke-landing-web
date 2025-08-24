import Image from "next/image"


const Logo = () => {
  return (
    <div className="">
      <Image
  src="/rumpke-logo-unified.png"
  alt="Rumpke Logo"
  width={250}
  height={200}
  className="w-38 sm:w-58 md:w-64 lg:w-80 h-auto"
  priority
/>

    </div>
  )
}

export default Logo
