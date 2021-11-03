import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './header'
import Card from './card'
import { getProducts } from '../redux/reducers/products'
import { setLogs } from '../redux/reducers/logsall'

const Main = () => {
  const productList = useSelector((s) => s.products.productList.slice(0, 10))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(setLogs(`navigate to "/" page`, +new Date()))
    // return () => {}
  }, [])

  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-evenly w-full">
        {productList.map((it) => {
          return (
            <div key={it?.id} className="flex-auto max-w-xs m-2">
              <Card carddata={it}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
