interface ClientMessageProps {
  text: string
}

const ClientMessage = ({ text }: ClientMessageProps) => {
  return (
    <div className="md:col-start-6 col-start-20 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-700 flex-shrink-0 text-white">
          Du
        </div>
        <div className="relative mr-3 text-sm dark:bg-dark-300 bg-light-300 bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          {text}
        </div>
      </div>
    </div>
  )
}

export default ClientMessage
