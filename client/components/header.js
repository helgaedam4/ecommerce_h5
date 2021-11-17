import React from 'react'
import { Link } from 'react-router-dom'

import Currency from './currency'
import Sort from './sort'

const Header = () => {
  return (
    <nav className="bg-pink-900 p-2 flex flex-col">
      <div
        className="flex flex-row 11 w-1/2 float-right justify-between">
        <div
          id="brand-name"
          className="text-white hover:text-white hover:border-white justify-between"
        >
          <Link to="/logs">logs</Link>
        </div>
        <div id="brand-name" className="text-white hover:text-white hover:border-white  font-bold ">
          <Link to="/">Just E-shop</Link>
        </div>
      </div>
      <div className="flex flex-row justify-between w-ful ">
        <Currency />
        <Sort />
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default Header
