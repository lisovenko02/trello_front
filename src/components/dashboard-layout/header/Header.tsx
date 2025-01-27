import React from 'react'
import GlobalLoader from './profile/GlobalLoader'
import Profile from './profile/Profile'

const Header = () => {
  return (
    <header>
      <GlobalLoader />
      <Profile />
    </header>
  )
}

export default Header
