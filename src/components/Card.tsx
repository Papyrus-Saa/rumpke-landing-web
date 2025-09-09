import { titleFonts } from "@/config/fonts";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;

  button?: React.ReactNode;
}

const Card = ({ title, icon, className }: CardProps) => {
  return (
    <>
      <div className="flex items-start space-x-4 px-2 dark:bg-dark-300">
        <span className={`text-gray-500 p-1 rounded-sm mb-1 ${className ?? ''}`}>{icon}</span>
        <p className={`${titleFonts.className} break-words`}>{title}</p>
      </div>
    </>


  )
}

export default Card
