import http from '../ui/baseUrl'

class DataService {
  getEmployee(id) {
    return http.get(``)
  }
}

export default new DataService()
