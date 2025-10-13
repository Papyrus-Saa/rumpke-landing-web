import { FormEvent, useState } from "react"
import { FaArrowRight } from "react-icons/fa"



interface TextMessageBoxProps {
  onSend: (message: string) => void
  disabledHelp?: boolean
}

const TextMessageBox = ({ onSend }: TextMessageBoxProps) => {


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
      className="flex flex-row items-center h-12 rounded-xl duration-100 dark:bg-dark-100 bg-light-200  w-full">

      <div className="flex-grow ">

        <div className="relative w-full">

          <input type="text" inputMode="text"
            autoComplete="off"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl dark:text-light-100 text-dark-300 focus:outline-none focus:ring-2 focus:ring-mint-600 focus:border-transparent pl-4 pr-12 h-10"
            placeholder="Stell deine Frage..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

        </div>

      </div>

      <div>
        <button type="submit" className="m-1 bg-mint-600 hover:bg-mint-800 text-white font-bold py-2 px-2 rounded-xl cursor-pointer">
          <FaArrowRight />
        </button>
      </div>

    </form>
  )
}

export default TextMessageBox
