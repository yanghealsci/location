import sinon from 'sinon'
import { expect } from 'chai'
import { mount, render, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import _ from 'lodash'
import config from '../env/config-dev'


configure({ adapter: new Adapter() })

global.expect = expect

global.sinon = sinon

global.mount = mount
global.render = render
global.shallow = shallow

global.React = React

global.globalConfig = { default: config }