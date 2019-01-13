import axios from "axios";


let options = {}
if (process.server) {
  options.baseURL = 'http://localhost:5000'// http://localhost:5000
}

let http=axios.create(options);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    debugger
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          this.$router.push({ path: `/login` })

      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

export default http;


