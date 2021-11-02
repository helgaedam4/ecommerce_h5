import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_SORT = 'SET_SORT'
const SET_LOGS = 'SET_LOGS'

const InitialState = {
  productList: [],
  currency: {
    name: 'USD',
    rate: 1
  },
  sort: {
    nameSort: '',
    direction: ''
  },
  logs: []
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
      console.log('SET_CURRENCY=', action.name)
      console.log(action.rate)
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
    case SET_LOGS: {
      return {
        ...state,
        logs: action.data
      }
    }
    default:
      return state
  }
}

export function getProducts() {
  return (dispatch) => {
    axios('api/v1/products').then(({ data }) => {
      console.log('productList reducers = ', data)
      dispatch({ type: GET_PRODUCTS, data })
    })
  }
}

export function setCurrency(nameCurrency) {
  console.log('reducers nameCurrency', nameCurrency)
  return (dispatch, getState) => {
    const currencyOld = getState().products.currency.name
    const url = `api/v1/currency/${nameCurrency}`
    axios(url)
      .then(({ data }) => {
        console.log('ffffffffff', data)
        dispatch({ type: SET_CURRENCY, name: nameCurrency, rate: data })
      })
      .catch((err) => err)

      axios({
        method: 'post',
        url: 'api/v1/logs',
        data: {
          date: +new Date(),
          title: `change currency from ${currencyOld} to ${nameCurrency}`
        }
      })
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
