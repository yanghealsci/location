import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as actionTypes from '../constants/actions'
import { createLoadingReducer, createDataReducer } from './helper'

export const drivers = combineReducers({
  list: createDataReducer(
    actionTypes.GET_DRIVERS_REQUEST,
    actionTypes.GET_DRIVERS_SUCCESS,
    actionTypes.GET_DRIVERS_REQUEST,
    []
  ),
  loading: createLoadingReducer(
    actionTypes.GET_DRIVERS_REQUEST,
    actionTypes.GET_DRIVERS_SUCCESS,
    actionTypes.GET_DRIVERS_REQUEST,
    false
  )
})

export const trips = combineReducers({
  list: createDataReducer(
    actionTypes.GET_TRIPS_REQUEST,
    actionTypes.GET_TRIPS_SUCCESS,
    actionTypes.GET_TRIPS_ERROR,
    []
  ),
  loading: createLoadingReducer(
    actionTypes.GET_TRIPS_REQUEST,
    actionTypes.GET_TRIPS_SUCCESS,
    actionTypes.GET_TRIPS_ERROR,
    false
  )
})


const rootReducer = combineReducers({
  routing: routerReducer,
  drivers,
  trips
})

export default rootReducer