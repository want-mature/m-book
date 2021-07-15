<template>
    <div class="info">
        <div class="content-left">
            <div v-if="info.bookUrl">
                <div>
                    <div class="magnifier">
                        <img :src="require('../assets'+info.bookUrl+'.jpg')" alt="">
                    </div>
                    <div class="top-right">
                        <p>{{info.bookName}}</p>
                        <div class="price">￥{{info.price}}</div>
                        <div class="au">作者：{{info.au}}</div>
                        <div class="au">出版社：{{info.pub}}</div>
                        <div class="au">出版时间：{{info.time}}</div>
                        <div class="au">类别：{{info.class}}</div>
                        <div class="au">读者评分：10分</div>
                        <div class="au">装帧: 精装</div>
                        <el-button type="danger" @click="addCart(info)">加入购物车</el-button>
                    </div>
                </div>
                <div class="p-title">内容简介</div>
                <p class="p-text">{{info.p1}}</p>
                <p class="p-text">{{info.p2}}</p>
                <p class="p-text">{{info.p3}}</p>
            </div>
            <div class="p-title">相关书籍</div>
            <div class="re-list">
                <ReItem :reItemList='reItemList'></ReItem>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- <div class="content-left">
            <div>
                <div class="magnifier"><img src="../assets/images/book/book99.jpg" alt=""></div>
                <div class="top-right">
                    <p>小王子</p>
                    <div class="price">￥32</div>
                    <div class="au">作者：安东尼·德·圣·埃克苏佩里</div>
                    <div class="au">出版社：万卷出版社</div>
                    <div class="au">出版时间：2014-04-01</div>
                    <div class="au">读者评分：10分</div>
                    <div class="au">装帧: 精装</div>
                    <el-button type="danger" @click="addCart">加入购物车</el-button>
                    <a href="#">点此登录</a>
                </div>
            </div>
            <div class="p-title">内容简介</div>
            <p class="p-text">
                小说叙述者是个飞行员，他在故事一开始告诉读者，他在大人世界找不到一个说话投机的人，因为大人都太讲实际了。</p>
            <p class="p-text">    接着，飞行员讲了六年前他因飞机故障迫降在撒哈拉沙漠遇见小王子的故事。神秘的小王子来自另一个星球。飞行员讲了小王子和他的玫瑰的故事。小王子为什么离开自己的星球，在抵达地球之前，他又访问过哪些星球。他转述论了小王子对六个星球的历险，他遇见了国王、爱虚荣的人、酒鬼、商人、点灯人、地理学家、蛇、三枚花瓣的沙漠花、玫瑰园、扳道工、商贩、狐狸以及我们的叙述者飞行员本人。</p>
            <p class="p-text">   飞行员和小王子在沙漠中共同拥有过一段极为珍贵的友谊。当小王子离开地球时，飞行员非常悲伤。他一直非常怀念他们共度的时光，。他为纪念小王子写了这部小说。</p>
            
            <div class="p-title">相关书籍</div>
            <div class="re-list">
                <ReItem :reItemList='reItemList'></ReItem>
            </div>
            <div class="clearfix"></div>
        </div> -->
        
        <div class="content-right">
            <FourCard @changeQuery='changeQuery'></FourCard>
        </div>
        <div class="clearfix"></div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import axios from 'axios'
import FourCard from '../components/FourCard.vue'
import ReItem from '../components/ReItem.vue'
import Bottom from '../components/Bottom.vue'

import { getTheBook, getRemBook } from '../apis/case.js'
export default {
    data() {
        return {
            query:'',
            magnifierList:[
                {list:[
                    {url:require('../assets/images/book/book99.jpg')}
                ]}
            ],
            reItemList:[
                // {id:103,url:require('../assets/images/book/book103.jpg'),name:'少年维特之烦恼',price:33,au:'[德国] 约翰·沃尔夫冈·冯·歌德',pub:'人民文学出版社',time:'1955-10',count:1,p1:'中国现代文学从来就是中外文化交汇撞击而催生成长的，翻译不仅对现代作家的文学创作产生了巨大的影响，对中国现代文学的发展有着推动作用，而且它也承担了思想启蒙和文化构建等时代赋予的使命，其历史价值不可低估。',p2:'为了全面展示中国现代文学家的翻译成就，也让读者了解作家的另一个侧面，以及他们思想储备的重要来源，我们编辑出版这套《天火丛书》，选取中国现代著名作家翻译的外国文学名著。在书目的选择上，我们兼顾了作品的文化价值、在当时的文学影响和作用以及当今读者的阅读要求与口味。',p3:'这些耳熟能详的曾经为几代作家提供滋养的名家名著或许你已经读过其他的译本，而这些现代作家的译笔也许生硬而拙朴，鲁迅便曾直言不讳自己的“硬译”，但他们绝不是简单的传声筒，这其中浸润的是执着和真诚，是移来他山之石的责任和使命。这些翻译著作是他们与外国作家心灵交流和对话的通道，是他们观察社会看取人生的窗...',text:'少年维特爱上了一个名叫绿蒂的姑娘，而姑娘已同别人订婚。爱情上的挫折使维特悲痛欲绝。之后，维特又因同封建社会格格不入，感到前途无望而自杀......'},
                // {id:104,url:require('../assets/images/book/book104.jpg'),name:'了不起的盖茨比',price:34,au:'[美] 菲茨杰拉德',pub:'人民文学出版社',time:'2004-06',count:'1',p1:'这种微笑是极为罕见的微笑，带有一种令人无比放心的感觉，也许你一辈子只可能碰上四五次。一瞬间这种微笑面对着——或者似乎面对着整个永恒的世界，然而又一瞬间，它凝聚到你身上，对你表现出一种不可抗拒的偏爱。他所表现出的对你理解的程度，恰恰是你想要被理解的程度。相信你如同你乐意相信你自己那样，并且让你相信他对你的印象不多不少正是你最得意时希望留给别人的印象。',p2:'盖茨比为了久久地抱着的一个梦而付出了很高的代价。他死后，尼克发觉是汤姆暗中挑拨威尔逊去杀死盖茨比。他感到东部鬼影幢幢，世态炎凉，便决定回中西部老家去。这是一个简单的故事，却有着极悲凉的人生况味。',p3:'当我坐在那里缅怀那个古老的、未知的世界时，我也想到了盖茨比第一次认出了黛西的码头尽头的那盏绿灯时所感到的惊奇。他经历了漫长的道路才来到这片蓝色的草坪上，他的梦一定就像是近在眼前，他几乎不可能抓不住的。',text:'一个偶然的机会，穷作家尼克闯入了挥金如土的大富翁盖茨比隐秘的世界，他惊讶地发现盖茨比内心的牵绊竟是河对岸那盏小小的绿灯--灯影婆娑中，住着心爱的黛西。然而黛西早已不是旧日的黛西，尽管他清楚地听出“他的声音充满了金钱”，却仍不改初衷，固执的追求旧梦重温。然而，冰冷地现实容不下飘渺地梦......'},
                // {id:105,url:require('../assets/images/book/book105.jpg'),name:'巴黎圣母院',price:25,au:'[法]雨果',pub:'人民文学出版社',time:'1982-6',count:1,p1:'《巴黎圣母院》是法国文豪维克多·雨果第一部引起轰动效应的浪漫派小说。小说以十五世纪路易十一统治下的法国为背景，通过一个纯洁无辜的波希米亚女郎惨遭迫害的故事，揭露了教士的阴险卑鄙，宗教法庭的野蛮残忍，贵族的荒淫无耻和国王的专横残暴。作品鲜明地体现了反封建、反教会的意识和对人民群众的赞颂。',p2:'其实，自开天辟古直至基督纪元十五世纪（包括十五世纪在内），建筑艺术向来就是人类最伟大的书，是人类在其力量或者才智发展的不同阶段的主要表达手段。随着最初的人感到记忆力负担过重，随着人类各种记忆的包袱变得太混杂、太沉重，以至于光凭直接和飘忽的言词就有可能在传递的途中丧失一部分的时候，人们就以最经久、最显现、最自然的方式，把各种记忆记载在地面上。',p3:'每种传统都凝结成为一座纪念物。早先的纪念物是一堆堆石头，就象摩西所说的，尚未被铁触及过。建筑艺术也像任何文字一样，先从字母开始：竖起一块石头，就成了一个字母；每个字母是个象形，每个象形承受一组意念，好象圆柱承受着柱头一般。原始部落在全世界地面上到处都同时这样做的。在亚洲的西伯利亚，在美洲的潘帕斯草原，都可见到凯尔特人的那种擎天石。而后造出一个个词。把石头垒石头，把花岗岩音节加以连结，进行言词某种组合的尝试。克尔特人的平石坟和独石垣，伊特鲁立亚人的古冢，希伯来人的墓穴，这些全都是词。',text:'她既衰老又年轻，既突兀又神秘；她是卡西莫多地摇篮和母亲，又是弗罗洛策划阴谋的巢穴；她是爱丝梅拉达的避难所，又是丐帮攻打的妖魔；她是万众敬畏的圣堂，又是揉脸万众命运的宫殿。她的灵魂是善是恶，总与芸芸众生息息相关...她是，无与伦比的，巴黎圣母院。'},
            ],
            info:{},
            isLogin: null,
            time:''
        }
    },
    components:{
        FourCard,
        ReItem,
        Bottom
    },
    created(){
        // 获取本页url的参数
        this.query=this.$route.query;
        this.getInfoList()
        this.getRemList()
    },
    mounted(){
        
    },
    methods:{
        // 加入购物车
        addCart(info){
            if(!JSON.parse(window.sessionStorage.getItem("user"))){
                this.$check()
            }else{
                // console.log(object);
                let url = '/api/info/add'
                let y = new Date().getFullYear()
                let m = new Date().getMonth()
                let d = new Date().getDate()
                let h = new Date().getHours()
                let min = new Date().getMinutes()
                let s = new Date().getSeconds()
                this.time = y+'-'+m+'-'+d+' '+h+':'+min+':'+s
                axios.post(url,{
                    phone: this.$store.state.user.phone,
                    bookId:info.bookId,
                    count:info.count,
                    time:this.time
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
            }
        },

        // 图书详情
        getInfoList(){
            getTheBook(this.query.id).then(res =>{
                if(res.data[0] != undefined){
                    this.info = res.data[0]
                }
            })
            console.log(this.info);
        },

        // 随机获取相关书籍
        getRemList(){
            getRemBook().then(res => {
                res.data.forEach(element => {
                    this.reItemList.push(element)
                });
            })
        },
        changeQuery(id){
            this.query.id = id
            this.getInfoList()
        }
    }
}
</script>

<style>
    .info{
        width: 80%;
        margin: 30px auto;
        z-index: 9999;
    }
    .content-left{
        width: 75%;
        float: left;
    }
    .content-left .magnifier{
        display: inline-block;
        width: 300px;
        height: 534px;
        vertical-align:top;
    }
    .content-left .magnifier img{
        width: 300px;
        height: 400px;
    }
    .content-left .top-right{
        display: inline-block;
        margin-left: 40px;
    }
    .content-left .top-right p{
        margin-top: 0;
        margin-bottom: 40px;
        color: #333333;
        font-size: 1.4em;
        text-transform: uppercase;
    }
    .content-left .top-right .price{
        margin-top: 2%;
        font-size: 1.8em;
        color: #ED1C24;
        line-height: 1.8em;
        text-shadow: 0 1px 0 #ffffff;
        letter-spacing: 1px;
    }
    .content-left .top-right .au{
        line-height: 1.8em;
        font-size: 1em;
        color: #555555;
        text-transform: uppercase;
        margin-bottom: 4%;
    }
    .content-left .top-right button{
        margin-top: 30px;
        background: red;
    }
    .content-left .top-right a{
        display: block;
        font-size: 0.8125em;
        color: #1a1515;
        text-transform: uppercase;
        text-decoration: underline;
    }
    .p-title{
        background: rgb(255,255,255);
        padding: 10px;
        color: #333;
        font-size: 1.2em;
        font-weight: bold;
    }
    .p-text{
        text-indent:2em;
        margin: 0;
        font-size: 14px;
        line-height: 1.42857143rem;
        color: #333;
        background: #e5e5e5;
    }
    .p-text:first-of-type{
        margin-top: 15px;
    }
    .p-text:last-of-type{
        margin-bottom: 15px;
    }
    .content-right{
        width: 23%;
        margin-left: 2%;
        float: right;
    }
    .clearfix{
        display: block;
        content: '';
        clear: both;
    }
</style>