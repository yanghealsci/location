import { getPool } from '../src/pool'
import { expect } from 'chai'

describe("db connection pool", () => {
  it("should return a singleton pool when getPool is called", () => {
    const pool1 = getPool()
    const pool2 = getPool()
    expect(pool1).to.equal(pool2)
  })
})