// 案例页相关接口
import http from "../../request/index.js"


// 获取首页图书案例
export const getCase = (num) => http.post("/api/home/RandomCase",{
	"num": num
})

// 获取商品页图书案例
export const getShopCase = (bookClass) => http.post("/api/shop",{
	"bookClass": bookClass
})

// 获取图书详情
export const getTheBook = (id) => http.post("/api/info",{
	"id": id
})

// 获取图书详情页相关书籍
export const getRemBook = () => http.post("/api/info/rem",{})


// 添加购物车
export const addCart = (cid,url,name,price,count,phone,cartId) => http.post("/api/info/add",{
	cid:cid,
	url:url,
	name:name,
	price:price,
	count:count,
	phone:phone,
	cartId:cartId
})

// 查询购物车数据
export const getMyCart = (phone) => http.post("/api/cart",{
	phone: phone
})

// 更新购物车的数据
export const updateCart = (count,cartId,phone) => http.post("/api/cart/update",{
	count: count,
	cartId: cartId,
	phone: phone
})

// 提交建议
export const addSuggest = (name,suggests,time) => http.post("/api/contact",{
	name:name,
	suggests:suggests,
	time:time
})

// 查询建议数据
export const getSuggest = () => http.post("/api/suggest",{})