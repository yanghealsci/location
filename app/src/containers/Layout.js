import Layout from 'components/Layout'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {rootPath} from 'config'

const navs = [{
  text: 'Track',
  path: `${rootPath}/track`
}]

const mapStateToProps = (state, ownProps) => {
  return {
    navs,
    selectedKeys: [ownProps.location.pathname]
  }
} 
export default withRouter(connect(mapStateToProps)(Layout))