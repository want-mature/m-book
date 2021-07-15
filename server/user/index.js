// 加载express模块
const express = require('express')

const router = express.Router()

// 导入sqlHelp
const connection = require('../db')

// 导入sqlMap
const sqlMap = require('../sqlMap')

// 加密token
const jwt = require("jsonwebtoken")

// 上传文件所需的模块
const multiparty = require('multiparty')

// 生成验证码所需模块
const svgCaptcha = require('svg-captcha');

// 注册
router.post('/regis/adduser',(req,res) => {
    let selsql = sqlMap.user.selectUser
    let sql = sqlMap.user.adduser
    let params = req.body
    let username = params.username
    let password = params.password
    let con = connection
    con.query(selsql,[params.phone],(err,result) => {
        if(err){
            res.json(err)
            console.log(err)
        }else{
            // res.json(result)
            console.log(result);
            let bookstore = 'I_Love_You'
            let token = jwt.sign({username,password},bookstore,{expiresIn:60*60*24})
            if(result.length == 0){
                con.query(sql,[params.username,params.phone,params.email,params.password,token,params.avatar],(err,result) =>{
                    if(err){
                        res.json(err)
                        console.log(err)
                    }else{
                        res.json({
                            msg:'注册成功',
                            token:token
                        })
                    }
                })
            }else{
                res.json('手机号已注册')
            }
        }
    })
})

// 登录
router.post('/login',(req,res) => {
    let sql = sqlMap.user.login
    let params = req.body
    let con = connection
    con.query(sql,[params.userphone],(err,result) =>{
        if(err){
            res.json(err)
            console.log(err)
        }else{
            if(result[0].password == params.userpassword){
                res.json(result)
            }else{
                res.json('密码错误')
            }
        }
    })
})

router.post('/user/upLoadAvatar',(req,res) => {
    // let sql = sqlMap.user.updateAvatar
    // let params = req.body
    // connection.query(sql,[params.img],(err,result) => {
    //     if(err){
    //         res.json(err)
    //         console.log(err)
    //     }else{
    //         res.json(result)
    //     }
    // })
    
    let form = new multiparty.Form({
        encoding:"utf-8",
        uploadDir:"../uploads",  //文件上传地址
        keepExtensions:true  //保留后缀
    })
    // console.log(form.parse);
    form.parse(req,(err,filds,files) => {
        // filds表示提交的表单数据对象，files表示提交的文件对象
        console.log('object');
    })
    res.json('req')
})

// 验证码
router.post('/user/code',(req,res) => {
    const codeConfig = {
        size: 4, // 验证码长度
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
        noise: 2, // 干扰线条的数量
        width: 160,
        height: 50,
        fontSize: 50,
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee',
    };
    const captcha = svgCaptcha.create(codeConfig);
    res.json({
        'svg':String(captcha.data),
        'svgText': captcha.text
    })
})

// 将router导出
module.exports = router