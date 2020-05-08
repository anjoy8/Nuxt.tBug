import axios from "axios";


let options = {}
if (process.server) {
  options.baseURL = 'http://apk.neters.club'
}

let http=axios.create(options);

http.interceptors.request.use(function (config) {
  if(!process.server){
    config.headers['Authorization'] ="lz"
    config.headers['city-id'] ="110"
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

http.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {

  return Promise.reject(error)
})



export default http;


