import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrency } from '../redux/reducers/products'
import { getTotalAmountBasket } from '../redux/reducers/basket'
// import { setLogs } from '../redux/reducers/logsall'

const Currency = () => {
  const dispatch = useDispatch()
  const basket = useSelector((s) => s.basket.cards)
  const totalOrderCountBasket = useSelector((s) => s.basket.totalOrderCountBasket)
  // const currencyName = useSelector((s) => s.products.currency.name)

  useEffect(() => {
    dispatch(getTotalAmountBasket())
  }, [basket])

  const onClickCurrency = (e) => {

    dispatch(setCurrency(e.target.name))
    // dispatch(setLogs(`change currency from ${currencyName} to ${e.target.name}`, +new Date()))
  }

  return (
    <div>
      <div className="flex justify-between w-1/3 text-white">
        <div
          id="order-count"
          className="text-white hover:text-white hover:border-white flex flex-row"
        >
          <button
            name="USD"
            type="button"
            id="usd"
            className="bg-pink-900 p-1 m-2 border rounded"
            onClick={onClickCurrency}
          >
            USD
          </button>
        </div>
        <div className="text-white hover:text-white hover:border-white flex flex-row">
          <button
            name="EUR"
            type="button"
            id="eur"
            className="bg-pink-900 p-1 m-2 border rounded"
            onClick={onClickCurrency}
          >
            EUR
          </button>
        </div>
        <div className="text-white hover:text-white hover:border-white flex flex-row">
          <button
            name="CAD"
            type="button"
            id="cad"
            className="bg-pink-900 p-1 m-2 border rounded"
            onClick={onClickCurrency}
          >
            CAD
          </button>
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
    </div>
  )
}

Currency.propTypes = {}

export default Currency
