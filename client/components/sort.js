import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../redux/reducers/products'
import { setSortBasket } from '../redux/reducers/basket'
import { setLogs } from '../redux/reducers/logsall'

import BasketSvg from './svg/basketSvg'

const Sort = () => {
  const [togglePrice, setTogglePrice] = useState(false)
  const [toggleTitle, setToggleTitle] = useState(false)
  const [directionPrice, setDirectionPrice] = useState(1)
  const [directionTitle, setDirectionTitle] = useState(1)

  const totalOrderCountBasket = useSelector((s) => s.basket.totalOrderCountBasket)

  const dispatch = useDispatch()

  const onClickSort = useCallback(
    (e) => {
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
    },
    [togglePrice, directionPrice, toggleTitle, directionTitle]
  )

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
          <BasketSvg />
        </Link>
        {totalOrderCountBasket !== 0 ? totalOrderCountBasket : null}
      </div>
    </div>
  )
}

Sort.propTypes = {}

export default Sort
