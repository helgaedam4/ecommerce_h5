import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import products from './products'
import basket from './basket'
import logsall from './logsall'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    basket,
    logsall
  })

export default createRootReducer
