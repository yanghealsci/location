import fetch from '../utils/myfetch'
import { createAction } from 'redux-action'
import * as types from '../constants/actions'
import { HOST, apiPrefix} from '../config'

async function getDriversApi (name) {
  const resp = await fetch({
    url: `${HOST}${apiPrefix}/drivers?name=${name}`
  })
  return resp && resp.data
}

async function getTripsByDriverApi (id) {
  const resp = await fetch({
    url: `${HOST}${apiPrefix}/trips/driver?id=${id}`
  })
  return resp && resp.data
}

async function getTripsByVehicleApi(reg) {
  const resp = await fetch({
    url: `${HOST}${apiPrefix}/trips/vehicle?reg=${reg}`
  })
  return resp && resp.data
}

export function getDriversRequest (name) {
  return {
    types: [
      types.GET_DRIVERS_REQUEST,
      types.GET_DRIVERS_SUCCESS,
      types.GET_DRIVERS_ERORR
    ],
    callAPI: async store => {
      const resp = await getDriversApi(name)
      return resp
    }
  }
}

export function getTripsRequest(type, val) {
  return {
    types: [
      types.GET_TRIPS_REQUEST,
      types.GET_TRIPS_SUCCESS,
      types.GET_TRIPS_ERROR
    ],
    callAPI: async store => {
      const resp = type === 'driver'
                    ? await getTripsByDriverApi(val)
                    : await getTripsByVehicleApi(val)
      return resp
    }
  }
}