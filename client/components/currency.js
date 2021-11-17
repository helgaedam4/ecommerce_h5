import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { setCurrency } from '../redux/reducers/products'
import { getTotalAmountBasket } from '../redux/reducers/basket'
import { setLogs } from '../redux/reducers/logsall'

const Currency = () => {
  const dispatch = useDispatch()
  const basket = useSelector((s) => s.basket.cards)
  const currencyName = useSelector((s) => s.products.currency.name)

  useEffect(() => {
    dispatch(getTotalAmountBasket())
  }, [basket])

  const onClickCurrency = useCallback(
    (e) => {
      dispatch(setCurrency(e.target.name))
      dispatch(setLogs(`change currency from ${currencyName} to ${e.target.name}`, +new Date()))
    },
    [currencyName]
  )

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
      </div>
    </div>
  )
}

Currency.propTypes = {}

export default Currency
