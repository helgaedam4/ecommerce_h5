import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_SORT = 'SET_SORT'

const InitialState = {
  productList: [],
  currency: {
    name: 'USD',
    rate: 1
  },
  sort: {
    nameSort: '',
    direction: ''
  }
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        productList: action.data
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: {
          name: action.name,
          rate: action.rate
        }
      }
    }
    case SET_SORT: {
      return {
        ...state,
        productList: action.productSortedList,
        nameSort: action.nameSort,
        direction: action.direction
      }
    }
    default:
      return state
  }
}

export function updateCountProducts(id, operator) {
  return (dispatch, getState) => {
    const state = getState().products
    const productList = [...state.productList]
    console.log('updateCountProducts = ', productList)
    const data = productList.map((it) => {
      console.log('updateCountProducts it.id= ', it.id)
      console.log('updateCountProducts id= ', id)
      const count = it?.count ? it?.count : 0
      if (it.id === id) {
        return operator === '+' ? { ...it, count: count + 1 } : { ...it, count: count - 1 }
      }
      return { ...it }

      // return it.id === id ? { ...it, count: count + 1 } : { ...it }
    })
    console.log('updateCountProducts = ', data)
    dispatch({ type: GET_PRODUCTS, data })
  }
}

export function getProducts() {
  return (dispatch, getState) => {
    const state = getState().products
    const productList = [...state.productList]
    if (productList.length === 0) {
      axios('api/v1/products').then(({ data }) => {
        dispatch({ type: GET_PRODUCTS, data })
      })
    }
    dispatch({ type: GET_PRODUCTS, data: productList })
  }
}

export function setCurrency(nameCurrency) {
  return (dispatch) => {
    const url = `api/v1/currency/${nameCurrency}`
    axios(url)
      .then(({ data }) => {
        dispatch({ type: SET_CURRENCY, name: nameCurrency, rate: data })
      })
      .catch((err) => err)
  }
}

export function setSort(nameSort, direction) {
  return (dispatch, getState) => {
    const state = getState().products
    const productSortedList = [...state.productList].sort((a, b) => {
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
    dispatch({ type: SET_SORT, productSortedList })
  }
}
