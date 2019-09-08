import React from 'react'
import { Select } from 'antd'
const { Option } = Select

export default class SearchInput extends React.Component {
  state = {
    value: this.props.value || ''
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }
  render () {
    const { placeholder, onSearch, onSelect, style, data = [], searchMode } = this.props
    const defaultStyle = {
      width: 200
    }
    const {value} = this.state

    const options = data.map(d => <Option key={d.value}>{d.text}</Option>)
    
    return (
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        onSearch={(val) => {
          searchMode && onSearch(val)
        }}
        onChange={value => {
          this.setState({ value })
          onSelect(value)
        }}
        onInputKeyDown={e => {
          if (searchMode) return
          const charCode = e.which || e.charCode
          if (charCode === 13) {
            onSelect(e.target.value)
          }
        }}
        style={{...defaultStyle, ...style}}
        showArrow={false}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        filterOption={false}>
      {options}
      </Select>
    )
  }
}