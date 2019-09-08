export function createLoadingReducer(reqType, succType, errorType, initState) {
  return function (state = initState, action) {
    switch (action.type) {
      case reqType:
        return true
      case succType:
      case errorType:
        return false
      default:
        return state
    }
  }
}

export function createDataReducer(reqType, succType, errorType, initState) {
  return function (state = initState, action) {
    switch (action.type) {
      case succType:
        return action.payload || initState
      case errorType:
        return initState
      default:
        return state
    }
  }
}