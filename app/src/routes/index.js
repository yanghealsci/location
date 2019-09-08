import { browserHistory, Router, Route, IndexRedirect, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Layout from 'containers/Layout'
import { connect } from 'react-redux'
import store from 'store'
import { rootPath } from 'config'

const history = syncHistoryWithStore(browserHistory, store)

export default function Routes (props) {
    return (
      <Router history={history}>
        <Route path={'/'}>
          <IndexRedirect to={`${rootPath}`} />
          <Route path={`${rootPath}`} component={Layout} >
            <IndexRedirect to={`${rootPath}/track`} />
            <Route path='track' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: 'powersearch' */ 'containers/TrackPage')
                .then(module => cb(null, module.default))
                .catch(e => console.error(e))
            }} />
          </Route>
        </Route>
      </Router>
    )
}