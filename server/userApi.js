// 加载express模块
const express = require('express')

const router = express.Router()

// 导入sqlHelp
const connection = require('./db')

// 导入sqlMap
const sqlMap = require('./sqlMap')

function routerFunc (url,sql){
    router.post(url, (req,res) => {
        let params = req.body
        let arr = []
        for(let i in params){
            if(params[i] == undefined || params[i] == ''){
                arr.push(null)
            }else{
                arr.push(params[i])
            }
        }
        if(url === '/shop' && arr[0] == '全部'){
            sql = sqlMap.user.selectAll
        }else if(url === '/shop' && arr[0] !== '全部'){
            sql = sqlMap.user.select
        }else {
            sql = sql
        }
        connection.query(sql,arr,(err,result) =>{
            if(err){
                res.json({
                    status: 0,
                    data: [],
                    message: err
                })
                console.log(err);
            }else{
                res.json({
                    status: 1,
                    data: result,
                    message: '数据返回成功'
                })
                console.log(result);
            }
        })
    })
}


// 随机请求数据
routerFunc('/home/RandomCase',sqlMap.goods.random)

// 商品页数据
routerFunc('/shop',sqlMap.goods.selectgoods)

// 详情页数据
routerFunc('/info',sqlMap.goods.info)

// 相关书籍
routerFunc('/info/rem',sqlMap.goods.inforem)

// 往购物车添加数据
routerFunc('/info/add',sqlMap.cart.addcart)

// 拿取购物车数据
routerFunc('/cart',sqlMap.cart.getcart)

// 删除购物车数据
routerFunc('/cart/del',sqlMap.cart.delCart)

// 更新购物车数据
routerFunc('/cart/update',sqlMap.cart.updateCart)

// 添加建议
routerFunc('/contact',sqlMap.suggest.addsuggests)

// 加载建议列表
routerFunc('/suggest',sqlMap.suggest.getsu)

// 将 router 导出
module.exports = router;
