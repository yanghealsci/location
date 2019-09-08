import Table from '../src/components/Table'

describe('Table', () => {
  describe('On init', () => {
    const columns = [{
        key: 'no',
        title: 'No.',
        render: (text, record, index) => index + 1
    }, {
      key: 'start_on',
      title: 'Start Time',
      render: text => text && text.slice(0, 16)
    }]
    const wrapper = shallow(<Table columns={columns}/>)
    it('Should render a <table />', () => {
      expect(wrapper.find('table')).to.have.lengthOf(1)
    })
    it('Should render table header according to given columns props', () => {
      expect(wrapper.find('th')).to.have.lengthOf(columns.length)
    })
  })

  describe('On data passed in', () => {
    const columns = [{
      key: 'no',
      title: 'No.',
      render: (text, record, index) => index + 1
    }, {
      key: 'start_on',
      title: 'Start Time',
      render: text => text && text.slice(0, 16)
    }]
    
    it('Should render No Data when dataSource is empty', () => {
      const wrapper = shallow(<Table columns={columns} dataSource={[]}/>)
      expect(wrapper.find('td')).to.have.lengthOf(1)
      expect(wrapper.find('td').text()).to.equal('No Data')
    })
    it('Should render rows according to given dataSource props', () => {
      const mockData = [{
        no: '1',
        start_on: '13:00'
      }]
      const wrapper = shallow(<Table columns={columns} dataSource={mockData} />)
      expect(wrapper.find('tr')).to.have.lengthOf(mockData.length + 1)
    })
  })

  // describe('On data passed in', () => {
  //   const mockData = [{
  //     value: '1',
  //     text: 'driver1'
  //   }, {
  //     value: '2',
  //     text: 'driver2'
  //   }]
  //   const wrapper = shallow(<SearchInput data={mockData} />)
  //   it(`Should render ${mockData.length} <Option />`, () => {
  //     expect(wrapper.find(Option)).to.have.lengthOf(mockData.length)
  //   })
  // })

  // describe('On change (search mode)', () => {
  //   const mockSearchHandler = sinon.spy()
  //   const wrapper = mount(<SearchInput searchMode onSearch={mockSearchHandler} />)
  //   const input = wrapper.find('input')
  //   input.simulate('change')
  //   it(`Should invole onSearch when input change and search mode is ON`, () => {
  //     //TODO: simulate events of antd components
  //     // expect(mockSearchHandler.called).to.be.true
  //   })
  // })

  // describe('On change (input mode)', () => {
  //   const mockSelectHandler = sinon.spy()
  //   const mockSearchHandler = sinon.spy()
  //   const wrapper = mount(<SearchInput searchMode={false} onSelect={mockSelectHandler} onSearch={mockSearchHandler} />)

  //   const input = wrapper.find(Select)
  //   input.simulate('change')
  //   wrapper.update()
  //   it(`Should invole onSelect when input is changed and search mode is OFF`, () => {
  //     //TODO: simulate events of antd components
  //     // expect(mockSelectHandler.called).to.be.true
  //   })
  //   it(`Should NOT invole onSearch when search mode is is OFF`, () => {
  //     expect(mockSearchHandler.called).to.be.false
  //   })
  // })
})