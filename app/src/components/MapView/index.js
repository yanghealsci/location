import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
 } from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

class MapView extends React.Component {
  state = {
    center: this.props.defaultCenter
  }
  componentWillReceiveProps (nextProps) {
    if (!this.map) return
    if (nextProps.lines !== this.props.lines && !_.isEmpty(nextProps.lines)) {
      this.setState({
        center: nextProps.lines[0][0]
      })
    }
  }
  renderLines = () => {
    const { lines } = this.props
    return _.map(lines, (line, i) => _.isEmpty(line)
          ? null
          : <Polyline path={line} key={i} />)
  }
  renderMarkers = () => {
    const { markers } = this.props
    if (_.isEmpty(markers)) return null

    return _.map(markers, (marker, i) => {
      return <MarkerClusterer key={i}>
        <MarkerWithLabel position={marker[0].pos} labelAnchor={{ x: 0, y: 0 }} labelStyle={{ backgroundColor: "yellow", fontSize: "15px", padding: "5px" }}>
          <div>{marker[0].text}</div>
        </MarkerWithLabel>
        {
          marker[1].inProgress
          ? null
          : <Marker position={marker[1].pos} />
        }
      </MarkerClusterer>
    })
  }
  render () {
    const { center } = this.state
    return <GoogleMap
      ref={ele => this.map = ele}
      defaultZoom={14}
      center={center}>
      {this.renderLines()}
      {this.renderMarkers()}
    </GoogleMap>
  }
}

// export default MapView

export default withScriptjs(withGoogleMap(MapView))