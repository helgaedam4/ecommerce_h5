import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import HandSvg from './svg/hand'
import RemoveSvg from './svg/remove'

import { removeCard, getTotalAmountBasket} from '../redux/reducers/basket'
import { setLogs } from '../redux/reducers/logsall'

const Basket = () => {
  const dispatch = useDispatch()
  const basket = useSelector((s) => s.basket.cards)
  const currencyName = useSelector((s) => s.products.currency.name)
  const currencyRate = useSelector((s) => s.products.currency.rate)
  const totalAmountBasket = useSelector((s) => s.basket.totalAmountBasket)
  const totalOrderCountBasket = useSelector((s) => s.basket.totalOrderCountBasket)

  useEffect(() => {
    dispatch(getTotalAmountBasket())
    dispatch(setLogs(`navigate to "/basket" page`, +new Date()))
  }, [basket, currencyRate])

  return (
    <div>
      <Header />
      {basket.length === 0 ? (
        <div className="flex flex-row text-pink-900 font-bolt p-1 m-2 justify-center h_auto w-auto">
          Basket is empty
          <HandSvg />
        </div>
      ) : (
        <table className="table-fixed  my-5 mx-auto w-3/4">
          <thead>
            <tr>
              <th>№</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price </th>
              <th>Amount</th>
              <th>Total_price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((it, index) => {
              return (
                <tr key={it.id}>
                  <td className=" text-center">{index + 1}</td>
                  <td className="w-15 p-2 product__image  text-center">
                    <img className="object-cover" src={it.image} alt={it.title} />
                  </td>
                  <td className="product__title  text-center">{it.title}</td>
                  <td className="product__price  text-center">
                    {(it.price * currencyRate).toFixed(2)} {currencyName}
                  </td>
                  <td className="product__amount  text-center">{it.amount}</td>
                  <td className="product__total_price  text-center">
                    {(it.amount * it.price * currencyRate).toFixed(2)} {currencyName}
                  </td>
                  <td className="product__remove  text-center">
                    <button
                      type="button"
                      id="remove-name"
                      title="remove"
                      className=" bg-pink-700 p-1 m-2 border rounded text-white"
                      onClick={() =>
                        dispatch(
                          removeCard(it.id),
                          getTotalAmountBasket(),
                          dispatch(setLogs(`remove ${it.title} from the basket`, +new Date()))
                        )
                      }
                    >
                      <RemoveSvg />
                    </button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>
                <div id="total-amount" className="text-pink-900 font-bolt p-1 m-2">
                  Total count: {totalOrderCountBasket}
                </div>
              </td>
              <td className=" ">
                <div id="total-amount" className="text-pink-900 font-bolt p-1 m-2">
                  Total cost: {totalAmountBasket.toFixed(2)} {currencyName}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

Basket.propTypes = {}

export default Basket
