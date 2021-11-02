import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './header'
import HandSvg from './svg/hand'

import { getLogs } from '../redux/reducers/logsall'

const Logs = () => {
  const dispatch = useDispatch()
  const logs = useSelector((s) => s.logsall.logs)

  useEffect(() => {
    dispatch(getLogs())
    // return () => {}
  }, [])

  console.log('LOGS COMPOTENT =', logs)

  return (
    <div>
      <Header />
      {logs.length === 0 ? (
        <div className="flex flex-row text-pink-900 font-bolt p-1 m-2 justify-center h_auto w-auto">
          Logs is empty
          <HandSvg />
        </div>
      ) : (
        <table className="table-fixed  my-5 mx-auto w-3/4">
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((it) => {
              return (
                <tr key={it.title}>
                  <td className="text-center">{it.title}</td>
                  <td className="text-center">{it.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

Logs.propTypes = {}

export default Logs
