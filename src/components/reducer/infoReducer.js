import { RETRIEVE_INFO, RETRIEVE_USERS } from '../actions/infoType'

const initialState = {
  info: {},
  emp: [],
}
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case RETRIEVE_INFO:
      console.log(payload)
      return { ...state, info: payload }
    case RETRIEVE_USERS:
      console.log(payload)
      return { ...state, emp: payload }
    default:
      return state
  }
}
