import axios from 'axios'

const GET_LOGS = 'GET_LOGS'
// const SET_LOGS = 'SET_LOGS'

const InitialState = {
  logs: []
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        logs: action.data
      }
    }
    // case SET_LOGS: {
    //   return {
    //     ...state,
    //     logs: action.data
    //   }
    // }
    default:
      return state
  }
}

export function getLogs() {
  console.log('LOGS = ')
  return (dispatch) => {
    axios('api/v1/logs').then(({ data }) => {
      console.log('logs = ', data)
      dispatch({ type: GET_LOGS, data })
    })
  }
}

// export function setLogs(title, date) {
//   return () => {
//     axios({
//       method: 'post',
//       url: 'api/v1/logs',
//       data: {
//         date,
//         title
//       }
//     })
//   }
//   // return (dispatch, getState) => {
//   //   const state = getState().logsall

//   //   console.log('STATE ===',state)
//   //   const oldLogs = state?.logs ? [...state.logs] : []

//   //   const logs = [...oldLogs, { title, date}]
//   //   dispatch({ type: SET_LOGS, logs })
//   // }
// }
