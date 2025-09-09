import { MdCloseFullscreen } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

interface AIButtonProps {
  visible: boolean;
  toggleChat: () => void;
}

const AIButton: React.FC<AIButtonProps> = ({ visible, toggleChat }) => {
  const buttonClass = visible
    ? "fixed left-1 top-1"
    : "fixed bottom-4 right-1 md:bottom-6 md:right-8 2xl:right-42";

  return (

    <button
      className={`${buttonClass} z-40 w-6 h-6 flex items-center text-white justify-center rounded-full bg-gradient-to-tr from-purple-900 via-cyan-900 to-pink-900 shadow-orange-500 shadow-[0_0_10px_5px_rgba(0,0,0,0.2
      5)] hover:shadow-xl transition-shadow duration-300 focus:outline-none`}
      onClick={toggleChat}
    >

      <div className="loader-wrapper cursor-pointer">
        {visible ? (
          <span className="loader-letter"><MdCloseFullscreen /></span>
        ) : (
          <span className="loader-letter"><RiRobot2Line />
          </span>
        )}
        <div className="loader" />
      </div>
    </button>
  );
};



export default AIButton;
