import { titleFonts } from "@/config/fonts"




const Footer = () => {
  return (
    <div className="  py-6 w-full mx-auto">
      <p className={`${titleFonts.className} text-xs text-center border-r-3 border-l-3 w-fit mx-auto px-6 border-mint-600`}>© {new Date().getFullYear()} Ich schenk dir was</p>
    </div>
  )
}

export default Footer
