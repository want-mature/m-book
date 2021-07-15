<template>
<div>
    <div class="all">
        <div class="title">新书上架</div>
        <div class="book">
            <div class="book-item" v-for="aitem in newbook" @click="toDetails(aitem)" :key="aitem.bookId">
                <img :src="require('../assets'+aitem.bookUrl+'.jpg')" alt="">
                <div class="book-name">{{aitem.bookName}}</div>
                <div class="book-price">￥ {{aitem.price}}</div>
            </div>
        </div>
    </div>
    <div class="all">
        <div class="title">本周精选</div>
        <div class="book">
            <div class="book-item" v-for="aitem in Selectionbook" @click="toDetails(aitem)" :key="aitem.bookId">
                <img :src="require('../assets'+aitem.bookUrl+'.jpg')" alt="">
                <div class="book-name">{{aitem.bookName}}</div>
                <div class="book-price">￥ {{aitem.price}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        newbook:{
            type:Array,
            default:[]
        },
        Selectionbook:{
            type:Array,
            default:[]
        }
    },
    mounted(){
        // console.log(this.newbook);
    },
    methods: {
        toDetails(item){
            this.$router.push({path:'/info',query:{id:item.bookId}})
        }
    },
}
</script>

<style>
    .all{
        width: 100%;
        /* padding-bottom: 10px; */
        box-sizing: border-box;
        margin-top: 30px;
    }
    .all .title{
        color: #000000;
        text-transform: uppercase;
        padding: 10px;
        font-size: 25px;
        font-weight: 900;
        margin-bottom: 20px;
    }
    .all .book{
        width: 100%;
        border-top: 1px solid #000000;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .book-item{
        width: 274px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* background: #FFFFFF; */
    }
    .book-item img{
        width: 233px;
        height: 248px;
    }
    .book-item .book-name{
        font-weight: 800;
        padding-top: 10px;
        font-size: 1.3em;
        color: #393939;
        margin-top: 10px;
    }
    .book-item .book-price{
        font-weight: 800;
        font-size: 1.4em;
        color: #ed1c24;
        margin-top: 10px;
    }
</style>