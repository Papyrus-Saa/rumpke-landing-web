
import { FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

interface AIButtonProps {
  visible: boolean;
  toggleChat: () => void;
}

const AIButton: React.FC<AIButtonProps> = ({ visible, toggleChat }) => {
  const buttonClass = visible
    ? ""
    : "fixed bottom-10 right-2 md:bottom-6 2xl:right-42";

  return (
    <button
      title="KI-Assistent öffnen/schließen"
      className={`${buttonClass} z-50 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-shadow duration-100 focus:outline-none ${visible ? 'bg-gradient-to-tr from-cyan-900 via-mint-600 to-purple-900 shadow-lg border-2 border-mint-600' : 'text-white bg-gradient-to-tr from-purple-900 via-cyan-900 to-pink-900 shadow-orange-500 shadow-[0_0_5px_2px_rgba(0,0,0,0.65)] hover:shadow-xl'}`}
      style={visible ? { position: 'relative', overflow: 'hidden' } : {}}
      onClick={toggleChat}
    >
      <div className="loader-wrapper">
        {visible ? (
          <span className="loader-letter">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-x-svg">
              <rect x="6" y="10" width="10" height="2" rx="1" transform="rotate(45 11 11)" fill="url(#ai-x-grad)" />
              <rect x="6" y="10" width="10" height="2" rx="1" transform="rotate(-45 11 11)" fill="url(#ai-x-grad)" />
              <defs>
                <linearGradient id="ai-x-grad" x1="6" y1="11" x2="16" y2="11" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00e6c3" />
                  <stop offset="1" stopColor="#a07be6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        ) : (
          <span className="loader-letter"><RiRobot2Line /></span>
        )}
        <div className="loader" />
      </div>
    </button>
  );
};



export default AIButton;
