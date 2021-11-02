import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCards, getTotalAmountBasket } from '../redux/reducers/basket'

const Card = ({ carddata }) => {
  const currencyName = useSelector((s) => s.products.currency.name)
  const currencyRate = useSelector((s) => s.products.currency.rate)
  const dispatch = useDispatch()

  const onClickCard = () => {
    dispatch(
      setCards(carddata.id, carddata.image, carddata.title, carddata.price, 1),
      getTotalAmountBasket())
  }

  return (
    <div className="card1">
      <img
        className="card__image object-cover h-40 w-full"
        src={carddata.image}
        alt={carddata.title}
      />
      <div className="card__title">{carddata.title}</div>
      <div className="card__price">
        price: {(carddata.price * currencyRate).toFixed(2)} {currencyName}{' '}
      </div>
      <div className="card__product-amount">amount: </div>
      <div>
        <button
          type="button"
          id="add-name"
          title="Add"
          className="bg-pink-700 p-1 m-2 border rounded text-white"
          onClick={onClickCard}
        >
          Add
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {}

export default Card
