import * as expt from '../exceptions'
import {getPool} from '../pool'

const Driver = {
  /**
   * Search drivers by name
   * @param {object} req
   * @param {object} res
   * @returns {Array} driver objects
   */
  async getDriversByName (req, res, next) {
    if (!req.query.name) {
      return res.status(200).json({
        data: []
      })
    }

    const names = req.query.name
                    .toUpperCase()
                    .split(' ')
    
    const fname = names[0] || ''
    const lname = names[1] || ''

    const pool = getPool()
    try {
      const queryRes = await pool.query({
        name: 'query-driver-by-name',
        text: `SELECT id, firstname, lastname, mobile, profile_uri
               FROM driver
               WHERE UPPER(firstname) LIKE $1 AND UPPER(lastname) LIKE $2`,
        values: [`${fname}%`, `${lname}%`]
      })

      return res.status(200).json({
        data: queryRes.rows
      })
    } catch (e) {
      console.error(e)
      next(new expt.DBError(e))
    }
  }
}

export default Driver