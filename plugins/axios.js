import axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = 'http://binlive.cn:3080'
}

export default axios.create(options)
