import axios from 'axios'
const sess = localStorage.getItem('access_token')
export default axios.create({
  baseURL: 'https://prometheus.verts.co.in/api',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    access_token: sess,
    uid: '2',
  },
})
