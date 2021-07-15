<template>
    <div>
        <div class="item" v-for="item in reItemList" :key="item.bookId">
            <div class="left">
                <img :src="require('../assets'+item.bookUrl+'.jpg')" alt="">
            </div>
            <div class="middle">
                <div class="item-title">{{item.bookName}}</div>
                <p class="item-text">{{item.info1}}</p>
            </div>
            <div class="right">
                <div class="price">￥{{item.price}}</div>
                <div class="btn" @click="addCart(item)">加入购物车</div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    props:{
        reItemList:{
            type: Array,
            default:[]
        }
    },
    data() {
        return {
            time:''
        }
    },
    methods:{
        addCart(info){
            // this.$store.commit("addCart",info)
            let y = new Date().getFullYear()
            let m = new Date().getMonth()
            let d = new Date().getDate()
            let h = new Date().getHours()
            let min = new Date().getMinutes()
            let s = new Date().getSeconds()
            this.time = y+'-'+m+'-'+d+' '+h+':'+min+':'+s
            let url = '/api/info/add'
            axios.post(url,{
                bookId:info.bookId,
                phone: this.$store.state.user.phone,
                addTime:this.time,
                count:info.count
            })
            .then(res => {
                console.log(res)
                if(res.data==1062){
                    this.$message({
                        title: '警告',
                        message: '购物车已存在该图书',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        title: '成功',
                        message: '加入购物车成功',
                        type: 'success'
                    });
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
    }
}
</script>

<style>
    .item{
        width: 100%;
        margin-top: 25px;
        display: flex;
        flex-direction: row;
        background: #FFFFFF;
    }
    .item .left{
        width: 150px;
        height: 150px;
    }
    .item .left img{
        width: 100%;
        height: 100%;
    }
    .item .middle{
        flex: 1;
        padding-left: 10px;
        padding-right: 10px;
    }
    .item .middle .item-title{
        color: #555;
        font-size: 20px;
    }
    .item .middle .item-text{
        text-indent: 2rem;
        color: #555;
        font-size: 0.89em;
        line-height: 1.5em;
    }
    .item .right{
        width: 130px;
        padding-left: 15px;
        border-left: 1px solid #DDD;
        vertical-align: middle;
    }
    .item .right .price{
        color: #ED1C24;
        font-size: 1.2em;
    }
    .item .right .btn{
        width: 95px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        color: #FFFFFF;
        background: #ED1C24;
        text-align: center;
        border-radius: 4px;
        outline: none;
        border: 0;
        margin-top: 30px;
    }
</style>