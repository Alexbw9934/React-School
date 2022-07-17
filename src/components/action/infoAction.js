import { INFO_POST, RETRIEVE_INFO, INFO_UPDATE, RETRIEVE_USERS } from './infoType'
import DataService from '../services/api.services'

const user = JSON.parse(localStorage.getItem('user'))
export const retrieveInfo = () => async (dispatch) => {
  try {
    const res = await DataService.getInfo()
    // console.log(user.email, 'information');
    const value = res.data.filter((data) => user.email === data.empCode)
    // console.log(value, 'information');
    dispatch({
      type: RETRIEVE_INFO,
      payload: value[0],
    })
  } catch (err) {
    console.log(err)
  }
}
