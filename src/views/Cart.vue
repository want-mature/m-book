<template>
    <div class="cart">
        <div class="head-top">我的购物车</div>

        <h2 v-if="bookList.length == 0">购物车为空</h2>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="ch" v-for="(item,index) in bookList" :label="item" :key="item.bookId">
                <div class="item">
                    <div class="img">
                        <img :src="require('../assets'+item.bookUrl+'.jpg')" alt="">
                        <div class="text">
                            <div class="text-title">{{item.bookName}}</div>
                            <div class="text-text">月销售125 累计评分</div>
                        </div>
                    </div>
                    <div class="one-price">￥{{item.price}}</div>
                    <div class="count">
                        <button @click="less(item)" class="le abtn" :disabled="item.count === 1">-</button>
                        <span class="d">{{item.count}}</span>
                        <button @click="plus(item)" class="pl abtn">+</button>
                        <div class="price">￥{{item.count*item.price}}</div>
                    </div>
                    <el-button type="danger" size="mini" @click="del(index,item.cartId)">删除</el-button>
                </div>
            </el-checkbox>
        </el-checkbox-group>
        <div class="bottom" v-if="bookList.length != 0">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div class="pay">
                <span class="p">合计：</span>
                <span class="s">{{sum()}}</span>
                <button>结算</button>
            </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import Bottom from '../components/Bottom.vue'

import {getMyCart, updateCart} from '../apis/case.js'

import axios from 'axios'
export default {
    data() {
        return {
            bookList:[],
            checkedCities:[],
            checkAll:false,
            amount:1,
            isIndeterminate:true,
            oneallprice:0,
            allprice:0,
            price:32,
            user: null
        }
    },
    components:{
        Bottom
    },
    computed:{
        calc(){
            return this.price*this.amount
        }
    },
    created(){
        // this.bookList = this.$store.state.cartList
    },
    mounted(){
        this.$check()
        this.user = this.$store.state.user
        this.getCart()
    },
    methods: {
        // 数据重复添加时，图书的count累加，而不是出现多条数据


        // 加载数据
        getCart(){
            getMyCart(this.user.phone).then(res => {
                res.data.forEach(item => {
                    this.bookList.push(item)
                })
            })
        },

        handleCheckAllChange(val) {
            this.checkedCities = val ? this.bookList : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            console.log(value);
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.bookList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.bookList.length;
        },
        // 总价格
        sum(){
            var total = 0
            this.checkedCities.forEach(item => {
                total += item.count*item.price
            })
            return total
        },

        less(item){
            updateCart(--item.count,item.cartId,this.user.phone).then(res => {
                if(res.status == 1){
                    console.log(res.message);
                }
            })
        },
        plus(item){
            updateCart(++item.count,item.cartId,this.user.phone).then(res => {
                if(res.status == 1){
                    console.log(res.message);
                }
            })
        },

        // 删除
        del(index,delId){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 删除选中的数组
                this.checkedCities = this.checkedCities.filter(item => item.cartId !== delId)
                // 删除购物车数据
                axios.post('/api/cart/del',{
                    cartId:delId
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
                // 删除原数组
                this.bookList.splice(index,1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style>
    .cart{
        width: 80%;
        margin: 0 auto;
    }
    .head-top{
        margin-top: 50px;
        margin-bottom: 30px;
        text-transform: uppercase;
        color: #777777;
        font-size: 1em;
    }
    .ch{
        width: 100%;
        height: auto;
        border: 1px solid #ccc;
        background: #fcfcfc;
        margin: 15px 0;
        border-radius: 5px;
    }
    .el-checkbox__label{
        width: 100%;
        height: 100%;
    }
    .item{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .item .img{
        width: 95px;
        height: 95px;
        display: flex;
        flex-direction: row;
        flex: 1;
    }
    .item .img img{
        width: 95px;
        height: 95px;
    }
    .item .img .text{
        margin-left: 15px;
    }
    .item .img .text .text-title{
        color: #555;
        font-size: 1.2rem;
    }
    .item .img .text .text-text{
        font-size: 0.89rem;
        color: #555;
        margin-top: 20px;
    }
    .item .one-price{
        flex: 2;
        text-align: center;
        color: #3c3c3c;
        font-weight: 700;
        font-family: Verdana,Tahoma,arial;
    }
    .item .count{
        flex: 2;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .item .count .price{
        color: #f40;
        font-weight: 700;
        font-family: Verdana,Tahoma,arial;
        margin-left: 10px;
    }
    .el-checkbox{
        display: flex;
        flex-direction: row;
        align-items: center;
        /* margin-left: 10px; */
        padding-left: 10px;
        box-sizing: border-box;
    }
    .bottom{
        height: 50px;
        background: rgb(229, 229, 229);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    /* .bottom .pay{
        margin-right: 15px;

    } */
    .bottom .pay .p{
        font-size: 16px;
        color: #3c3c3c;
    }
    .bottom .pay .s{
        font-weight: 700;
        font-size: 22px;
        color: #f40;
        margin-right: 15px;
    }
    .bottom .pay button{
        height: 50px;
        background: #f40;
        color: #fff;
        border-left: 1px solid #e7e7e7;
        width: 119px;
        outline: none;
        border: none;
        margin: 0;
    }
    .d{
        color: #3c3c3c;
        font-weight: 700;
        font-family: Verdana,Tahoma,arial;
    }
    .abtn{
        width: 15px;
        height: 15px;
        margin: 0;
        padding: 0;
    }
    .le{
        margin-right: 5px;
        text-align: center;
        line-height: 15px;
        
    }
    .pl{
        margin-left: 5px;
    }
</style>