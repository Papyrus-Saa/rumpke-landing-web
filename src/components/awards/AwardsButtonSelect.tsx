import React from 'react'
import { FiGift } from 'react-icons/fi'

const AwardsButtonSelect = () => {


 const handleClick = () => {
    const el = document.getElementById('product-showcase-slider');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (

    <button onClick={handleClick}>
      <FiGift className="w-6 h-6 text-gray-300 bg-dark-300 flex items-center justify-center  rounded cursor-pointer hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 p-1" />
    </button>

  )
}

export default AwardsButtonSelect
