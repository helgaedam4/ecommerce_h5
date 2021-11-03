import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../redux/reducers/products'
import { setSortBasket } from '../redux/reducers/basket'
import { setLogs } from '../redux/reducers/logsall'

const Sort = () => {
  const [togglePrice, setTogglePrice] = useState(false)
  const [toggleTitle, setToggleTitle] = useState(false)
  const [directionPrice, setDirectionPrice] = useState(1)
  const [directionTitle, setDirectionTitle] = useState(1)

  const totalOrderCountBasket = useSelector((s) => s.basket.totalOrderCountBasket)

  const dispatch = useDispatch()

  const onClickSort = (e) => {
    if (e.target.name === 'price') {
      setDirectionPrice(togglePrice ? 1 : 2)

      dispatch(setSortBasket(e.target.name, directionPrice))
      dispatch(setSort(e.target.name, directionPrice))
      dispatch(setLogs(`sort by ${e.target.name}`, +new Date()))
    }
    if (e.target.name === 'title') {
      setDirectionTitle(toggleTitle ? 1 : 2)

      dispatch(setSortBasket(e.target.name, directionTitle))
      dispatch(setSort(e.target.name, directionTitle))
      dispatch(setLogs(`sort by ${e.target.name}`, +new Date()))
    }
    setTogglePrice(!togglePrice)
    setToggleTitle(!toggleTitle)
  }

  return (
    <div className="flex flex-row">
      <div className="flex justify-between  full text-white">
        <div className="font-bolt p-1 m-2">sorted by</div>
        <div>
          <button
            name="price"
            type="button"
            id="sort-price"
            title="&#8593;&#8595; "
            className="bg-pink-900 p-1 m-2 border rounded"
            onClick={onClickSort}
          >
            price
          </button>
        </div>
        <div>
          <button
            name="title"
            type="button"
            id="sort-name"
            title="a-z   z-a"
            className="bg-pink-900 p-1 m-2 border rounded"
            onClick={onClickSort}
          >
            name
          </button>
        </div>
      </div>
      <div
        id="order-count"
        className="text-white hover:text-white hover:border-white flex flex-row"
      >
        <Link to="/basket" title="Basket of products">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10  p-1 m-2 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>
        {totalOrderCountBasket !== 0 ? totalOrderCountBasket : null}
      </div>
    </div>
  )
}

Sort.propTypes = {}

export default Sort
