import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = "/";
axios.defaults.widthCredentials = true; //运行跨域过程携带资源凭证
axios.defaults.headers['Content-Type'] = 'application/json'; //'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);
axios.interceptors.request.use(config => {
    return config;
});
axios.interceptors.response.use(response => {
    return response
}, reason => {
    let response = reason.response;
    if (response) {
        switch (parseInt(response.status)) {
            case 400:

                break;
            case 401:
                break;
            case 403:
                break;
            case 404:
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            //断网处理
        }
    }
    return Promise.reject(reason);
});

export default axios;