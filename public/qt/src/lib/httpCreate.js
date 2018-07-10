import axios from 'axios'
import UserService from './userService'
import {message} from 'antd'

class Http {
    static create =  (options) => {
      let service = axios.create(options)
      service.interceptors.request.use(config => {
            // 判断localStorage中是否存在api_token
            const token = UserService.token
            if (token !== '') {
                //  存在将token写入 request header
                config.headers.common['x-access-token'] = token
            }
            return config;
        }, err => {
            message.error('请求超时...');
            return Promise.reject(err);
        }
      );
      service.interceptors.response.use((response) => {
            // 对响应数据做点什么
            return response;
        }, (err) => {
            console.log(err.response.status)
            let errMessage = ''
            if (err && err.response) {
                switch (err.response.status) {
                    case 400: errMessage = '请求错误(400)' ; break;
                    case 401: errMessage = '未授权，请重新登录(401)'; break;
                    case 403: errMessage = '拒绝访问(403)'; break;
                    case 404: errMessage = '请求出错(404)'; break;
                    case 408: errMessage = '请求超时(408)'; break;
                    case 500: errMessage = '服务器错误(500)'; break;
                    case 501: errMessage = '服务未实现(501)'; break;
                    case 502: errMessage = '网络错误(502)'; break;
                    case 503: errMessage = '服务不可用(503)'; break;
                    case 504: errMessage = '网络超时(504)'; break;
                    case 505: errMessage = 'HTTP版本不受支持(505)'; break;
                    default: errMessage = `连接出错(${err.response.status})!`;
                }
            }else{
                errMessage = '连接服务器失败!'
            }
            if (err.response.status === 401) {
                message.error(errMessage, 2);
                setTimeout(() => window.location.reload(), 2000)
            } else {
                message.error(errMessage, 4);
            }
            return Promise.resolve(err);
        });
      return service
    } 
}

export default Http