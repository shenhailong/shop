import axios from 'axios';
import { Notification } from 'element-ui'
import { TOKEN } from '@/constants/key'
import { getToken, removeUser, removeToken } from '@/utils/common'

let cancel = null;
let promiseMap = {};
const CancelToken = axios.CancelToken;

// const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
// console.log(VUE_APP_BASE_URL)
// const TOKEN_KEY = process.env.TOKEN_KEY
// const APP_ID = process.env.APP_ID
if(process.env.NODE_ENV !== 'development'){
  // axios.defaults.baseURL = 'http://39.100.227.252:888/'
}
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  function(config) {
    promiseMap[config.url] = cancel;
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {};
      }
      config.params._ = new Date().getTime();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 防止重复的错误提示
let showError = true
axios.interceptors.response.use(
  function(response) {
    if (response.data.code !== 0 && response.data.code !== 9900) {
      Notification({
        type: 'error',
        title: '错误',
        message: response.data.msg
      })
    } else if (response.data.code === 9900) {
      if(showError){
        showError = false
        removeToken()
        removeUser()
        Notification({
          type: 'error',
          title: '请重新登录',
          message: response.data.msg,
          onClose: () => {
            showError = true
          }
        })
      }
      window.location.href = '#/login'
    }
    return response;
  },
  function(error) {
    if (axios.isCancel(error)) {
      console.log(error);
    } else {
      if (
        error.code === 'ECONNABORTED' &&
        error.message.indexOf('timeout') !== -1
      ) {
        console.log('请求超时');
      } else if (error && error.response) {
        let str = '网络不给力哦，请检查网络状态';
        switch (error.response.status) {
        case 404:
          str = '访问地址不存在';
          break;
        case 500:
          str = '访问地址出现异常';
          break;
        case 502:
        case 504:
          str = '服务器不在服务区';
          break;
        default:
          break;
        }
        console.log(str);
      } else {
        console.log('出现网络错误,请重试');
      }
    }

    return Promise.reject(error);
  }
);

// 默认导出这个对象
export default {
  get(url, params) {
    let token = getToken()
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: '/cnas/v1',
        params,
        headers: {
          'api-action': url,
          [TOKEN]: token ? token : ''
        },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res.data);
      });
    });
  },
  post(url, data) {
    let token = getToken()
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: '/cnas/v1',
        data,
        headers: {
          'api-action': url,
          [TOKEN]: token ? token : ''
        },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res.data);
      });
    });
  }
};
