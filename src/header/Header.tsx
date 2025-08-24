import Logo from '@/components/Logo'
import React from 'react'
import ThemeSwitch from '@/components/ThemeSwitch';

const Header = () => {
  return (
    <div className='flex justify-between items-center' >
      <Logo />
      <ThemeSwitch />
    </div>
  )
}

export default Header
