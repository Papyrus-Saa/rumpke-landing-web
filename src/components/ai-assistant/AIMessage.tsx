


interface Props {
  text: string
}



const AIMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-20 md:col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-400 flex-shrink-0 text-gray-950">
          RI
        </div>
        <div className="relative ml-3 text-sm dark:bg-dark-100 bg-light-100 bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default AIMessage
