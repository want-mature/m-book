<template>
    <div class="four-card">
        <div class="right-one bg">
            <h2>索引目录</h2>
            <div class="contents-item">
                <span>小说</span>
                <div class="block"></div>
                <img src="../assets/images/plus.png" alt="">
            </div>
            <div class="contents-item">
                <span>散文</span>
                <div class="block"></div>
                <img src="../assets/images/plus.png" alt="">
            </div>
            <div class="contents-item">
                <span>文学</span>
                <div class="block"></div>
                <img src="../assets/images/plus.png" alt="">
            </div>
            <div class="contents-item">
                <span>启蒙</span>
                <div class="block"></div>
                <img src="../assets/images/plus.png" alt="">
            </div>
        </div>
        <div class="right-two bg">
            <h2>限时特惠</h2>
            <div class="special-book-item" v-for="item in specialList" :key="item.id" @click="toInfo(item.id)">
                <div class="special-img"><img :src="item.url" alt=""></div>
                <div class="special-text">
                    <div class="special-name">{{item.name}}</div>
                    <div class="special-old">￥{{item.oldPrice}}</div>
                    <div class="special-new">￥{{item.newPrice}}</div>
                </div>
            </div>
        </div>
        <div class="right-three bg">
            <h2>标签</h2>
            <div class="label">
                <div class="label-item" @click="toShop(item)" v-for="(item,index) in labelList" :key="index">{{item}}</div>
            </div>
        </div>
        <div class="right-four bg">
            <h2>畅销榜</h2>
            <div class="swiper">
                <div class="swiper-item" v-for="item in swiperList" :key="item.id">
                    <img :src="item.url" />
                    <div class="swiper-name">{{item.name}}</div>
                    <div class="swiper-info">{{item.info}}</div>
                    <button>更多内容</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            specialList:[
                {id:8,url:require('../assets/images/book/book8.jpg'),name:'思维风暴',oldPrice:56,newPrice:40},
                {id:22,url:require('../assets/images/book/book22.jpg'),name:'繁星·春水',oldPrice:45,newPrice:33},
                {id:23,url:require('../assets/images/book/book23.jpg'),name:'我喜欢你,在时光里',oldPrice:76,newPrice:50},
            ],
            labelList:['小说','散文','文学','心理学','文集','启蒙','随笔','政治','经济','文化','绘画','历史','艺术','音乐','摄影','美食','书法','医学','旅游','教材'],
            swiperList:[
                {id:24,url:require('../assets/images/book/book24.jpg'),name:'听听那冷雨',info:'前尘隔海，古屋不再。'},
                // {id:14,url:require('../assets/images/book/book14.jpg'),name:'月亮与六便士',info:'落地都是六便士，他却抬头看见了月亮。'},
                // {id:21,url:require('../assets/images/book/book21.jpg'),name:'云边有个小卖部',info:'在多数人心中，自己的故乡后来会成为一个点，如同亘古不变得孤岛。'},
                // {id:13,url:require('../assets/images/book/book13.jpg'),name:'毕业',info:'看似亲密的关系，都有着自己不得不做的立场。'},
            ]
        }
    },
    methods: {
        toInfo(id){
            this.$router.replace({name:"Info",query:{id:id}})
            this.$emit('changeQuery',id)
        },
        toShop(item){
            this.$router.replace({name:"Shop",query:{class:item}})
            this.$emit('load',item)
        }
    },
}
</script>

<style>
    .four-card{
        width: 100%;
    }
    .bg{
        margin-bottom: 20px;
        /* background: rgb(248, 248, 248); */
        background: white;
        box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
        border-radius: 4px;
        border: 1px solid rgb(232,232,232);
    }
    .four-card .right-one{
        width: 100%;
        height: 197px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .bg h2{
        font-size: 1.3em;
        font-weight: 800;
        padding-left: 16px;
        text-transform: uppercase;
        color: #000000;
        margin: 0;
        padding: 10px;
        border-bottom: 1px solid rgb(232,232,232);
    }
    .contents-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .contents-item span{
        display: block;
        text-align: left;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 18px;
        padding-left: 16px;
        padding-right: 16px;
        font-weight: 800;
        color: #555555;
    }
    .contents-item img{
        padding-right: 16px;
        padding-left: 16px;
    }
    .block{
        flex: 1;
        display: block;
        background: rgb(192, 190, 190);
        border: 1px solid rgb(192, 190, 190);
    }

    .right-two{
        width: 100%;
        height: 411px;
    }
    .special-book-item{
        padding: 10px 10px 5px 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
    }
    .special-img{
        width: 104px;
        height: 104px;
    }
    .special-img img{
        width: 100%;
        height: 100%;
    }
    .special-text{
        margin-left: 15px;
    }
    .special-text .special-name{
        font-size: 1em;
        font-weight: 600;
        text-transform: uppercase;
        color: #000000;
    }
    .special-text .special-old{
        color: #6a6a6a;
        font-size: .9rem;
        font-weight: 600;
        margin-top: 15px;
    }
    .special-text .special-new{
        color: #ed1c24;
        font-size: 1.1rem;
        font-weight: 600;
    }
    .right-three{
        width: 100%;
    }
    .right-three .label{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
    .right-three .label .label-item{
        width: 25%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #6a6a6a;
        font-weight: 600;
        cursor: pointer;
    }
    .right-three .label .label-item:hover{
        color: #ed1c24;
    }
    .right-four{
        width: 100%;
        overflow: hidden;
    }
    .right-four .swiper{
        width: 600%;
        padding: 15px 0;
        box-sizing: border-box;
    }
    .right-four .swiper::after{
        display: block;
        clear: both;
        content: '';
    }
    .right-four .swiper .swiper-item{
        width: 284px;
        text-align: center;
        float: left;
    }
    .right-four .swiper .swiper-item img{
        width: 231px;
        height: 231px;
    }
    .swiper-item .swiper-name{
        font-size: 1em;
        font-weight: 600;
        text-transform: uppercase;
        color: #000000;
    }
    .swiper-item .swiper-info{
        font-size: 1.1em;
        font-weight: 300;
        color: #000000;
    }
    .swiper-item button{
        width: 150px;
        height: 40px;
        color: #fff;
        background: #ed1c24;
        text-align: center;
        line-height: 40px;
        margin-top: 10px;
        border: none;
        outline: none;
        border-radius: 5px;
    }
    .swiper-item button:hover{
        background: rgb(143, 188, 143);
    }
</style>