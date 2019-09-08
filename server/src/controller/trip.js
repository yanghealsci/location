import * as expt from '../exceptions'
import { getPool } from '../pool'
import _ from 'lodash'
import {getParamPlaceHolders} from '../utils'

const tripShowFields = 'id, start_on, end_on, driver_id, vehicle_id, status, start_loc, end_loc'


async function getRelatedItems(tableName, showFields, keyVals, keyName = 'id') {
  const pool = getPool()
  const hasFields = showFields && showFields != []

  const data = await pool.query({
    text: `SELECT ${hasFields ? showFields.join(',') : '*'}
           FROM ${tableName}
           WHERE ${keyName} IN (${getParamPlaceHolders(keyVals.length, 1)})`,
    values: keyVals
  })

  return _.keyBy(data.rows, keyName)
}

async function getGeoPoints(tripIds) {
  const pool = getPool()
  const geoPointsData = await pool.query({
    text: `
        SELECT id, trip_id, lat, lng, time
        FROM geo_point
        WHERE trip_id IN (${getParamPlaceHolders(tripIds.length)})`,
    values: tripIds
  })

  const geoPoints = _.chain(geoPointsData.rows)
                      .sortBy('time')
                      .groupBy(d => d.trip_id)
                      .value()

  const res = {}
  _.forEach(geoPoints, (points, key) => {
    res[key] = _.map(points, p => [p.lat, p.lng])
  })

  return res
}

const Trip = {
  /**
   * Search trips by driver
   * @param {object} req
   * @param {object} res
   * @returns {Array} trip objects
   */
  getTripsByDriver: async (req, res, next) => {
    if (!req.query.id) {
      return res.status(200).json({
        data: []
      })
    }

    const pool = getPool()
    // const query_trips = 
    try {
      const trips = await pool.query({
        text: `SELECT ${tripShowFields}
               FROM trip
               WHERE driver_id = $1`,
        values: [req.query.id]
      })

      if (trips.rowCount === 0) {
        return res.status(200).json({data: []})
      }

      const drivers = await pool.query({
        text: `SELECT id, firstname, lastname, mobile, profile_uri
                FROM driver
                WHERE id = $1`,
        values: [req.query.id]
      })
      const driver = drivers.rows[0] || {}

      const vecIds = [...new Set(trips.rows.map(t => parseInt(t.vehicle_id)))]
      console.log('vecIds:', vecIds)
      const vecs = await getRelatedItems('vehicle', ['id', 'reg_num', 'type'], vecIds)
      
      const tripIds = trips.rows.map(t => t.id)
      
      const geoPoints = await getGeoPoints(tripIds)
      
      return res.status(200).json({
        data: trips.rows.map(t => {
          const vecId = t.vehicle_id
          return {
            ...t,
            driver_name: `${driver.firstname} ${driver.lastname}`,
            driver_mobile: driver.mobile,
            vehicle_num: vecs[vecId] && vecs[vecId].reg_num,
            vehicle_type: vecs[vecId] && vecs[vecId].type,
            geo_points: geoPoints[t.id]
          }
        })
      })
    } catch (e) {
      console.error(e)
      next(new expt.DBError(e))
    }
  },
  /**
   * Search trips by vehicle
   * @param {object} req
   * @param {object} res
   * @returns {Array} trip objects
   */
  getTripsByVehicle: async (req, res, next) => {
    if (!req.query.reg) {
      return res.status(200).json({
        data: []
      })
    }

    const pool = getPool()

    try {
      const vehicleData = await pool.query({
        text: `
        SELECT id, reg_num, type
        FROM vehicle
        WHERE reg_num = $1::text
      `,
        values: [req.query.reg]
      })

      if (vehicleData.rowCount === 0) {
        return res.status(200).json({
          data: []
        })
      }
      const vehicle = vehicleData.rows[0] || {}
      
      const trips = await pool.query({
        text: `SELECT ${tripShowFields}
               FROM trip
               WHERE vehicle_id = $1`,
        values: [vehicle.id]
      })

      if (trips.rowCount === 0) {
        return res.status(200).json({ data: [] })
      }

      const driverIds = [...new Set(trips.rows.map(t => t.driver_id))]
      console.log(driverIds)
      const drivers = await getRelatedItems('driver', ['id', 'firstname', 'lastname', 'mobile', 'profile_uri'], driverIds)

      console.log('drivers:', drivers)
      const tripIds = trips.rows.map(t => t.id)
      const geoPoints = await getGeoPoints(tripIds)

      return res.status(200).json({
        data: trips.rows.map(t => {
          const driver = drivers[t.id] || {}
          return {
            ...t,
            driver_name: `${driver.firstname} ${driver.lastname}`,
            driver_mobile: driver.mobile,
            vehicle_num: vehicle.reg_num,
            vehicle_type: vehicle.type,
            geo_points: geoPoints[t.id]
          }
        })
      })
    } catch (e) {
      console.error(e)
      next(new expt.DBError(e))
    }
  }
}

export default Trip