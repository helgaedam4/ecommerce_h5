import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCards, getTotalAmountBasket } from '../redux/reducers/basket'
import { setLogs } from '../redux/reducers/logsall'
import { updateCountProducts } from '../redux/reducers/products'

const Card = ({ carddata }) => {
  const currencyName = useSelector((s) => s.products.currency.name)
  const currencyRate = useSelector((s) => s.products.currency.rate)
  const dispatch = useDispatch()

  return (
    <div className="card1 flex flex-col">
      <div className=" w-50 rounded relative">
        {/* <div> */}
        <img
          className="card__image object-cover h-40 w-full rounded"
          // className="card__image  h-40 w-50"
          src={carddata.image}
          alt={carddata.title}
        />
        {/* </div> */}
        <div className="bg-pink-700 text-white text-center p-1 m-5 w-50 rounded">
          <button
            type="button"
            id="add-name"
            title="Add"
            // className="bg-pink-700 text-white w-50"
            onClick={() => {
              dispatch(setCards(carddata.id, carddata.image, carddata.title, carddata.price, 1))
              dispatch(getTotalAmountBasket())

              dispatch(updateCountProducts(carddata.id, '+'))
              dispatch(setLogs(`add ${carddata.title} to basket`, +new Date()))
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="card__title">{carddata.title}</div>
      <div className="card__price">
        price: {(carddata.price * currencyRate).toFixed(2)} {currencyName}{' '}
      </div>
      <div className="card__product-amount">
        count: {carddata?.count && carddata.count !== 0 ? carddata.count : null}
      </div>
    </div>
  )
}

Card.propTypes = {}

export default Card
