import { createStore, applyMiddleware, compose } from 'redux'
import { middlewares as mw } from 'config'
import rootReducer from 'reducers'

const createStoreWithMiddlewares = compose(applyMiddleware(...mw))(createStore)
const store = createStoreWithMiddlewares(rootReducer)

export default store