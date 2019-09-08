import { Select, Radio, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SearchInput from 'components/SearchInput'
import Table from 'components/Table'
import MapView from 'components/MapView'
import { MAPKEY } from 'config'
import { getDriversRequest, getTripsRequest } from 'actions'

const {Group: RadioGroup} = Radio

const SEARCH_TYPES = [{
  text: 'Driver',
  value: 'driver',
  searchGuide: 'Enter driver name, eg "Tom Bird"'
}, {
  text: 'Vehicle',
  value: 'vehicle',
  searchGuide: 'Enter vehicle reg number'
}]

const DEFAULT_MAP_CENTER = { lat: -37.8094, lng: 144.9682 }
class Track extends React.Component {
  state = {
    searchType: 'driver',
    searchValue: ''
  }
  handleSearchTypeChange = (e) => {
    this.setState({searchType: e.target.value, searchValue: ''})
  }
  handleAutoComplete = (v) => {
    v && this.props.getDrivers(v)
  }
  handleSearch = (val) => {
    const { searchType } = this.state
    this.props.searchTrips(searchType, val)
    this.setState({
      searchValue: val
    })
  }
  renderTable () {
    const {trips, tripsLoading} = this.props
    const columns = [{
      key: 'no',
      dataIndex: 'no',
      title: 'No.',
      render: (text, record, index) => index + 1
    }, {
      key: 'start_on',
      dataIndex: 'start_on',
      title: 'Start Time',
      render: text => text && text.slice(0, 16)
    }, {
      key: 'end_on',
      dataIndex: 'start_on',
      title: 'End Time',
      render: text => text && text.slice(0, 16)
    }, {
      key: 'driver',
      dataIndex: 'driver',
      title: 'Driver',
      render: (text, record) => <div>
        <div>{record.driver_name}</div>
        <div style={{fontSize: 12}}>{record.driver_mobile}</div>
      </div>
    }, {
      key: 'vehicle',
      dataIndex: 'vehicle',
      title: 'Vehicle',
      render: (text, record) => <div>
        <div>{record.vehicle_num}</div>
        <div style={{ fontSize: 12 }}>{record.vehicle_type}</div>
      </div>
    }, {
      key: 'status',
      dataIndex: 'status',
      title: 'Status'
    }]
    return <Table
            dataSource={trips}
            columns={columns}
           />
  }
  render () {
    const { searchType, searchValue } = this.state
    const {drivers, driversLoading, trips} = this.props
    const searchCfg = SEARCH_TYPES.filter(d => d.value === searchType)
    return <div>
      <Row style={{marginBottom: 20}}>
        <label>Search By: </label>
        <RadioGroup onChange={this.handleSearchTypeChange} value={searchType}>
          {
            SEARCH_TYPES.map((type, i) => <Radio key={i} value={type.value}>{type.text}</Radio>)
          }
        </RadioGroup>
        <SearchInput
          value={searchValue}
          data={searchType === 'driver' ? drivers: []}
          searchMode={searchType === 'driver'}
          placeholder={searchCfg.placeholder}
          onSearch={_.throttle(this.handleAutoComplete, 500).bind(this)}
          onSelect={this.handleSearch}
          style={{width: 300}}
          />
      </Row>
      <Row gutter={50}>
        <Col span={14}>
          <MapView
            defaultCenter={DEFAULT_MAP_CENTER}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPKEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: 600 }} />}
            containerElement={<div style={{ height: 600 }} />}
            mapElement={<div style={{ height: 600 }} />}
            lines={_.map(trips, t => _.map(t.geo_points, p => ({lat: p[0], lng: p[1]})))}
            markers={_.map(trips, (t, i) => ([
              {
                pos: { ...t.start_loc },
                text: `${i + 1}`
              }, {
                pos: { ...t.end_loc },
                text: `${i + 1}`,
                inProgress: t.status === 'start' || t.status === 'pending'
              }
            ]))}
          />
        </Col>
        <Col span={10}>
          {this.renderTable()}
        </Col>
      </Row>
    </div>
  }
}

const TrackerContainer = connect(
  state => ({
    drivers: _.map(state.drivers.list, d => ({
      text: `${d.firstname} ${d.lastname} ${d.mobile}`,
      value: d.id
    })),
    driversLoading: state.drivers.loading,
    trips: state.trips.list,
    tripsLoading: state.trips.loading,
  }),
  dispatch => {
    return {
      getDrivers(name) {
        dispatch(getDriversRequest(name))
      },
      searchTrips (type, val) {
        dispatch(getTripsRequest(type, val))
      }
    }
  }
)(Track)

export default withRouter(TrackerContainer)