// 导入模块
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const userApi = require('./userApi')
const user = require('./user/index')


let app = express()
let server = http.createServer(app)

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use('/api',userApi)
app.use('/api',user)

server.listen(8088,()=>{
    console.log('server is running...')
})