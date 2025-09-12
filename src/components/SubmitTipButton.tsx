'use client'




export const SubmitTipButton = () => {

const handleClick = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

    return (
      <div className="text-center ">
        <button
        onClick={handleClick}
        className="
        text-white py-2 px-4 rounded-b-xl rounded-t-2xl bg-red-700 font-bold cursor-pointer
          shadow-md transition-all duration-200
          hover:shadow-lg hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2
          lg:mt-6
        "
      >
        Tipp abgeben
      </button>
    </div>
  )
}
