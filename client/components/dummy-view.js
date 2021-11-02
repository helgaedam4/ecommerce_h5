import React from 'react'
import { Route } from 'react-router-dom'
import Main from './main'
import Basket from './basket'
import Logs from './logs'

const Dummy = () => {
  return (
    <div>
     <Route exact path="/" component={() => <Main />}/>
     <Route exact path="/basket" component={() => <Basket />}/>
     <Route exact path="/logs" component={() => <Logs />}/>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
