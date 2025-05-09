import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly text-lg'>
      <NavLink
      to="/"
      >
         Home
      </NavLink>

      <NavLink
      to="/pastes"
      >
        All Paste
      </NavLink>
    </div>
  )
}

export default Navbar

