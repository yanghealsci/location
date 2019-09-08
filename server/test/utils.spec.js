import { getParamPlaceHolders } from '../src/utils'
import { expect } from 'chai'

describe("getParamPlaceHolders", () => {
  it("should return pg param place holders for given param length", () => {
    expect(getParamPlaceHolders(2)).to.equal('$1,$2')
    expect(getParamPlaceHolders(2, 2)).to.equal('$2,$3')
  })
  it("should throw error with input <= 0", () => {
    expect(getParamPlaceHolders.bind(null, 0)).to.throw(Error, 'length of params should > 0')
    expect(getParamPlaceHolders.bind(null, -1)).to.throw(Error, 'length of params should > 0')
  })
})