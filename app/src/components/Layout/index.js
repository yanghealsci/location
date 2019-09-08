import { Layout, Menu, Row, Col } from 'antd'
import {Link} from 'react-router'
const { Header, Content } = Layout
const { Item: MenuItem } = Menu

export default function MainLayout (props) {
  const { navs = [], selectedKeys = [] } = props
  
  return <Layout style={{background: '#fff'}}>
    <Header style={{ padding: '0 10%' }}>
      <Row gutter={20}>
        <Col span={6} style={{color: '#fff', fontSize: 20}}>Location Service</Col>
        <Col span={18}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{ lineHeight: '64px' }}
          >
            {
              navs.map((nav, i) => <MenuItem key={nav.path}>
                <Link to={nav.path} key={i}>{nav.text}</Link>
              </MenuItem>
              )
            }
          </Menu>
        </Col>
      </Row>
    </Header>
    <Content style={{padding: '50px 10%'}}>{props.children}</Content>
  </Layout>
}