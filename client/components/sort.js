import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSort } from '../redux/reducers/products'
import { setSortBasket } from '../redux/reducers/basket'

const Sort = () => {
  const [togglePrice, setTogglePrice] = useState(false)
  const [toggleTitle, setToggleTitle] = useState(false)
  const [directionPrice, setDirectionPrice] = useState(1)
  const [directionTitle, setDirectionTitle] = useState(1)
  const dispatch = useDispatch()

  const onClickSort = (e) => {
    if (e.target.name === 'price') {
      setDirectionPrice(togglePrice ? 1 : 2)

      dispatch(setSortBasket(e.target.name, directionPrice))
      dispatch(setSort(e.target.name, directionPrice))
    }
    if (e.target.name === 'title') {
      setDirectionTitle(toggleTitle ? 1 : 2)

      dispatch(setSortBasket(e.target.name, directionTitle))
      dispatch(setSort(e.target.name, directionTitle))
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
    </div>
  )
}

Sort.propTypes = {}

export default Sort
