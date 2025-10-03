import { titleFonts } from "@/config/fonts"




const Footer = () => {
  return (
    <div className="py-6 w-full mx-auto">
      <p className={"text-xs text-center border-r-2 border-l-2 w-fit mx-auto px-6 border-white"}>© {new Date().getFullYear()} Ich schenke dir was</p>
    </div>
  )
}

export default Footer
