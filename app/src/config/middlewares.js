import thunk from 'redux-thunk'
import {logger, request} from '../middlewares'
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'


// console.log(globalConfig)
// const { ENV } = globalConfig.default

const mws = [
  routerMiddleware(browserHistory),
  thunk,
  request,
  logger
]

// if (ENV !== 'prod') {
//   mws.push(logger)
// }

export default mws
