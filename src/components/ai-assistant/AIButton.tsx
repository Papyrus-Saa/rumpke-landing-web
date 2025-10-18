
import { FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import BetaBadge from './BetaBadge'

interface AIButtonProps {
  visible: boolean;
  toggleChat: () => void;
  showBadge?: boolean;
}

const AIButton: React.FC<AIButtonProps> = ({ visible, toggleChat, showBadge = true }) => {
  const buttonClass = visible
    ? ""
    : "fixed bottom-10 right-2 md:bottom-6 2xl:right-42";

  return (
    <div className={`${buttonClass} z-[600] flex flex-col items-center`}>
      <div className="flex flex-col justify-center items-center">
        {showBadge && <BetaBadge className="mb-1" />}
        <button
          type="button"
          title="KI-Assistent öffnen/schließen"
          className={`z-[600] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-shadow duration-100 focus:outline-none ${visible ? 'bg-gradient-to-tr from-cyan-900 via-mint-600 to-purple-900 shadow-lg border-2 border-mint-600' : 'text-white bg-mint-600 hover:bg-mint-800 shadow-md hover:shadow-lg'}`}
          style={visible ? { position: 'relative', overflow: 'hidden' } : {}}
          onClick={toggleChat}
        >
          <span className="loader-wrapper">
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
          </span>
        </button>
      </div>
    </div>
  );
};



export default AIButton;
