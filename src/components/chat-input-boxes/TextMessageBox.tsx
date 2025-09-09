import { FormEvent, useState } from "react"
import { FaArrowRight } from "react-icons/fa"



interface TextMessageBoxProps {
  onSend: (message: string) => void
  placeholder?: string
  disabledHelp?: boolean
}

const TextMessageBox = ({ onSend, placeholder }: TextMessageBoxProps) => {


  const [message, setMessage] = useState("")

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message.trim().length === 0) return

    onSend(message)
    setMessage("")

  }

  return (
    <form

      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-12 rounded-xl dark:bg-dark-100 bg-white w-full px-1">

      <div className="flex-grow ">

        <div className="relative w-full">

          <input type="text"
            autoComplete="off"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl dark:text-light-200 text-dark-300 focus:outline-none focus:ring-2 focus:ring-mint-900 focus:border-transparent pl-4 pr-12 h-10"
            placeholder="Nachricht/Frage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

        </div>

      </div>

      <div>
        <button type="submit" className="ml-2 bg-mint-600 hover:bg-mint-800 text-white font-bold py-2 px-4 rounded-xl cursor-pointer">
          <FaArrowRight />
        </button>
      </div>

    </form>
  )
}

export default TextMessageBox
