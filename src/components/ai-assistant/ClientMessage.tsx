interface ClientMessageProps {
  text: string
}

const ClientMessage = ({ text }: ClientMessageProps) => {
  return (
    <div className=" col-start-1 col-end-13 p-3 rounded-lg ">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex-none w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white">
          D
        </div>
        <div className="duration-100 relative mr-3 text-sm dark:bg-dark-100 bg-light-300 bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default ClientMessage
