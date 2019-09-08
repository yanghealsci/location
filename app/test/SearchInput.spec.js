import SearchInput from '../src/components/SearchInput'
import {Select} from 'antd'

const {Option} = Select

describe('SearchInput', () => {
  describe('On init', () => {
    const wrapper = shallow(<SearchInput
      value={''}
    />)
    it('Should render a <Select />', () => {
      expect(wrapper.find(Select)).to.have.lengthOf(1)
    })
    it('Should has value state as givin value props', () => {
      expect(wrapper.state('value')).to.equal('')
    })
  })

  describe('On data passed in', () => {
    const mockData = [{
      value: '1',
      text: 'driver1'
    }, {
      value: '2',
      text: 'driver2'
    }]
    const wrapper = shallow(<SearchInput data={mockData} />)
    it(`Should render ${mockData.length} <Option />`, () => {
      expect(wrapper.find(Option)).to.have.lengthOf(mockData.length)
    })
  })

  describe('On change (search mode)', () => {
    const mockSearchHandler = sinon.spy()
    const wrapper = mount(<SearchInput searchMode onSearch={mockSearchHandler}/>)
    const input = wrapper.find('input')
    input.simulate('change')
    it(`Should invole onSearch when input change and search mode is ON`, () => {
      //TODO: simulate events of antd components
      // expect(mockSearchHandler.called).to.be.true
    })
  })

  describe('On change (input mode)', () => {
    const mockSelectHandler = sinon.spy()
    const mockSearchHandler = sinon.spy()
    const wrapper = mount(<SearchInput searchMode={false} onSelect={mockSelectHandler} onSearch={mockSearchHandler}/>)
    
    const input = wrapper.find(Select)
    input.simulate('change')
    wrapper.update()
    it(`Should invole onSelect when input is changed and search mode is OFF`, () => {
      //TODO: simulate events of antd components
      // expect(mockSelectHandler.called).to.be.true
    })
    it(`Should NOT invole onSearch when search mode is is OFF`, () => {
      expect(mockSearchHandler.called).to.be.false
    })
  })
})