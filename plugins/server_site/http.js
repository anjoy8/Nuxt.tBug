import axios from "axios";


let options = {}
if (process.server) {
  options.baseURL = 'http://localhost:5000'// http://localhost:5000
}

let http=axios.create(options);



export default http;


