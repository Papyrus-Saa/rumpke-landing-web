

interface CookieButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

const CookieButton = ({ className, onClick, title }: CookieButtonProps) => {
  return (
    <button
      className={`rounded  px-4 py-2 font-semibold text-white focus:outline-none focus:ring-2  focus:ring-offset-2 cursor-pointer transition-all hover:bg-secondary-d ${className}`}
      onClick={onClick}
      type="button"
    >
      {title}
    </button>
  )
}

export default CookieButton
