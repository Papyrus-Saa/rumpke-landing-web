import { useState } from "react";


interface CloseChat {
  visible: boolean;
}



const useChatWrapper = () => {

  const [closeChat, setCloseChat] = useState<CloseChat>({ visible: false });

  const toggleChat = () => {
    setCloseChat((prev) => ({ visible: !prev.visible }));
  };

  return {
    closeChat,
    setCloseChat,
    toggleChat
  }


}

export default useChatWrapper


