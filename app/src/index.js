import { AppContainer } from 'react-hot-loader'
// import '../src/styles/bootstrap.scss'
import store from 'store'
import Routes from 'routes'
import { Provider } from 'react-redux'
import { rootPath } from 'config'

function App (props) {
  return (
    <Provider {...{ store }}>
      <Routes />
    </Provider>
  )
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(App, () => {
    render(App)
  })
}