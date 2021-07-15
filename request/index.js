import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000
})

// 请求拦截
http.interceptors.request.use(config => {
    // Do something before request is sent
    // 可以在这里进行登录验证的操作，将token写入请求中
    _requestLog(config,'成功通过')
    // return是返回给前台的数据，看不到，但是可以在这之前输出config，在浏览器的控制台可以查看
    return config;
},error => {
    // Do something with request error
    console.log('请求拦截失败',error);
    return Promise.reject(error);
});


// 响应拦截
http.interceptors.response.use(response => {
    // Do something before response is sent
    const statusCode = response.status
    // 成功
    if(statusCode >= 200 && statusCode < 300){
        _responseLog(response,"response 200-300 响应成功")
        return response.data;
    }else if(statusCode === 500){
        _responseLog(response,"response 500")
        return {
            msg: "服务器错误",
            res: response
        }
    }else{
        _responseLog(response,"response 300-499")
        return {
            msg: "提示信息",
            res: response
        }
    }
},error => {
    // Do something with response error
    console.log('响应拦截失败',error);
    return Promise.reject(error);
});

// 请求日志打印
function _requestLog (req,describe=null){
    console.log("地址："+ req.url);
    console.log("描述："+ describe);
}

// 响应日志打印
function _responseLog(res,describe=null) {
    console.log("地址："+ res.config.url);
    console.log("描述："+ describe);
    // console.log("结果："+ JSON.stringify(res.data.data));
}

export default http