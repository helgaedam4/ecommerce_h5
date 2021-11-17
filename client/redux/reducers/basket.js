const SET_CARD = 'SET_CARD'
const REMOVE_CARD = 'REMOVE_CARD'
const GET_TOTAL_AMOUNT_BASKET = 'GET_TOTAL_AMOUNT_BASKET'
const SET_SORT_BASKET = 'SET_SORT_BASKET'

const InitialState = {
  cards: [],
  totalAmountBasket: 0,
  totalOrderCountBasket: 0
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_CARD: {
      return {
        ...state,
        cards: action.cards
      }
    }
    case REMOVE_CARD: {
      return {
        ...state,
        cards: action.cards
      }
    }
    case GET_TOTAL_AMOUNT_BASKET: {
      return {
        ...state,
        totalAmountBasket: action.totalAmountBasket,
        totalOrderCountBasket: action.totalOrderCountBasket
      }
    }
    case SET_SORT_BASKET: {
      return {
        ...state,
        cards: action.cards
      }
    }
    default:
      return state
  }
}

export function setSortBasket(nameSort, direction) {
  return (dispatch, getState) => {
    const state = getState().basket

    const cards = [...state.cards].sort((a, b) => {
      if (nameSort === 'title') {
        if (direction === 1) {
          return a[`${nameSort}`].localeCompare(b[`${nameSort}`])
        }
        return b[`${nameSort}`].localeCompare(a[`${nameSort}`])
      }
      if (direction === 1) {
        return a[`${nameSort}`] - b[`${nameSort}`]
      }
      return b[`${nameSort}`] - a[`${nameSort}`]
    })
    dispatch({ type: SET_SORT_BASKET, cards })
  }
}

export function setCards(id, image, title, price, amount) {
  return (dispatch, getState) => {
    const state = getState().basket
    const oldCards = state?.cards ? [...state.cards] : []

    if (oldCards.length !== 0) {
      let notFindSameId = true
      let newCards = oldCards.map((card) => {
        if (card.id === id) {
          notFindSameId = false
          return { ...card, amount: card.amount + 1 }
        }
        return { ...card }
      })
      if (notFindSameId) {
        newCards = [...newCards, { id, image, title, price, amount }]
      }
      dispatch({ type: SET_CARD, cards: newCards })
    } else {
      const cards = [...oldCards, { id, image, title, price, amount }]
      dispatch({ type: SET_CARD, cards })
    }
  }
}

export function removeCard(id) {
  return (dispatch, getState) => {
    const state = getState().basket
    const oldCards = state?.cards ? [...state.cards] : []

    if (oldCards.length !== 0) {
      const newCards = oldCards
        .map((card) => {
          if (card.id === id) {
            return card.amount > 1 ? { ...card, amount: card.amount - 1 } : {}
          }
          return { ...card }
        })
        .filter((it) => it.amount >= 1)
      dispatch({ type: REMOVE_CARD, cards: newCards })
    } else {
      dispatch({ type: REMOVE_CARD, cards: oldCards })
    }
  }
}

export function getTotalAmountBasket() {
  return (dispatch, getState) => {
    const state = getState().basket
    const stateCurrencyRate = getState().products.currency.rate
    const oldCards = state?.cards ? [...state.cards] : []

    let totalAmountBasket = 0
    let totalOrderCountBasket = 0
    
    if (oldCards.length !== 0) {
      totalAmountBasket = oldCards.reduce((acc, card) => {
        return acc + card.price * card.amount * stateCurrencyRate
      }, 0)

      totalOrderCountBasket = oldCards.reduce((acc, card) => {
        return acc + card.amount
      }, 0)
    }
    totalAmountBasket.toFixed(2)
    dispatch({ type: GET_TOTAL_AMOUNT_BASKET, totalAmountBasket, totalOrderCountBasket })
  }
}