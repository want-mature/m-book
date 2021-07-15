<template>
    <div class="home">
        <div class="banner">
            <div class="banner-container">
                <h1>藏书网上书城</h1>
                <p>您的到来</p>
                <p>为书城增添魅力</p>
                <button @click="toShop">更多精彩</button>
            </div>
        </div>

        <div class="home-content">
            <div class="two-card">
                <div class="one-card" v-for="item in twoCard" :key="item.id" :style="{background:'url('+item.url+')'}">
                    <div class="one-card-text">
                        <p class="title">{{item.name}}</p>
                        <p class="p1">{{item.p1}}</p>
                        <p class="p1">{{item.p2}}</p>
                        <p class="price">￥{{item.price}}</p>
                        <button @click="toShop">更多内容</button>
                    </div>
                </div>
            </div>

            <div class="home-bottom-content">
                <div class="bottom-left">
                    <HomeBottomSwiper :newbook='newbook' :Selectionbook='Selectionbook'></HomeBottomSwiper>
                </div>
                <div class="bottom-right">
                    <FourCard></FourCard>
                </div>
            </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import HomeBottomSwiper from '../components/HomeBottomSwiper.vue'
import FourCard from '../components/FourCard.vue'
import Bottom from '../components/Bottom.vue'

import {getCase} from '../apis/case.js'

export default {
    name:'Home',
    data() {
        return {
            twoCard:[
                {id:75,url:require("../assets/images/book/book75.jpg"),name:'《人间词话》',p1:'自是思量渠不成',p2:'人间总被思量误',price:'25'},
                {id:74,url:require("../assets/images/book/book74.jpg"),name:'《浮生六记》',p1:'情深不寿',p2:'寿则多辱',price:'25'},
            ],
            bookList:[
                {
                    title:'新书上架',
                    book:[
                        // {id:'1',url:require('../assets/images/book/book1.jpg'),name:'飞花令里的读书词',price:28,au:'琬如',pub:'南京出版社',time:'2014-02-21',count:1,p1:'近代国学大师王国维说：“唐之诗，宋之词，元之曲，皆所谓一代之文学，而后世莫能继焉者也。”',p2:'不读诗词，不足以知春秋历史；不读诗词，不足以品文化精粹；不读诗词，不足以感天地草木之灵；不读诗词，不足以见流彩华章之美。中国是一个“诗歌的国度”，古典诗词是中国传统文化的奇葩，是中华民族文化遗产中极为珍贵的一部分。',p3:'早在3000多年前，我们的祖先就创作出了以“诗三百”为代表的很好诗篇，此后每个历史时期，诗歌创作都结出了丰硕的成果，其中不少名篇佳句脍炙人口，传诵至今。'},
                        // {id:'2',url:require('../assets/images/book/book2.jpg'),name:'亲密关系',price:49,au:'(加拿大)克里斯多福·孟',pub:'山西经济出版社',time:'2011-03-01',count:1,p1:'在爱与被爱的过程中，我们都曾经历过痛苦、恐惧，也体验过狂喜与极乐，我们渴望建立永恒真挚的亲密关系，却又害怕再度受伤。',p2:'我们对一个人产生好感是因为这个人身上或多或少有我们需求的点，但是永远不可能有一个集合所有优点的人。这才是合理认知。于是我们妄图改变对方。进行权力斗争来控制对方。我们因为儿时未被满足的需求在对方身上能得到慰藉走到一起，而又因为儿时受过的伤害又在对方身上重现而开始拒对方于千里之外，最后发现一切幻灭。',p3:'我们每个人寻找配偶的动力都是源于孩提时代未被满足的归属感和重要性的需求。而每个人求偶的过程中都会假装自己有对方需求的点，双方都伪装自己，于是埋下幻灭的根源。'},
                        // {id:'3',url:require('../assets/images/book/book3.jpg'),name:'人性的弱点',price:30,au:'戴尔·卡耐基',pub:"北京联合出版社",time:'2015-06',count:1,p1:'一个人在事业上的成功，有15％归结于他的专业知识，另外85％归结于他表达思想、领导他人和唤起他人热情的能力',p2:'千万莫逞口舌之能，据理力争偶然或许能让你得到一些胜利的快慰，但你永远得不到对方的好感；如果固执已见，甚至自己错了而不勇于认错的话，要想改变他人可能会事倍功半。如果能够避免发挥自己的“弱点”，而对别人“投其所好”往往能事半功倍。',p3:'犯错的人永远只会怪罪于他人，而绝不可能反躬自省、承认错误。”如果无视人性的这一特点， 如果只会对犯错误的人恶语批评，结果只能引起他对自己的辩护，结果仍然于事无补。每个人都以得到他人的重视而自得，卡耐基强调，与人相处的最大秘密乃是给予他人由衷的认可和毫不吝惜的赞美。因为“人性深处最大的欲望，莫过于受到外界的认可与赞扬'},
                    ],
                    id:0
                },
                {
                    title:'本周精选',
                    book:[
                        // {id:'6',url:require('../assets/images/book/book6.jpg'),name:'围城',price:50,au:'钱钟书',pub:'人民文学出版社',time:'1991-02',count:1,p1:'围城故事发生于1920到1940年代。主角方鸿渐是个从中国南方乡绅家庭走出的青年人，迫于家庭压力与同乡周家女子订亲。但在其上大学期间，周氏患病早亡。准岳父周先生被方所写的唁电感动，资助他出国求学。',p2:'方鸿渐在欧洲游学期间，不理学业。为了给家人一个交待，方于毕业前购买了虚构的“克莱登大学”的博士学位证书，并随海外学成的学生回国。在船上与留学生鲍小姐相识并热恋，但被鲍小姐欺骗感情。同时也遇见了大学同学苏文纨。到达上海后，在已故未婚妻父亲周先生开办的银行任职。此时，方获得了同学苏文纨的青睐，又与苏的表妹唐晓芙一见钟情，整日周旋于苏、唐二人之间，期间并结识了追求苏文纨的赵辛楣。方最终与苏、唐二人感情终结，苏嫁与诗人曹元朗，而赵也明白方并非其情敌，从此与方惺惺相惜。方鸿渐逐渐与周家不和。',p3:'抗战开始，方家逃难至上海的租界。在赵辛楣的引荐下，与赵辛楣、孙柔嘉、顾尔谦、李梅亭几人同赴位于内地的三闾大学任教。由于方鸿渐性格等方面的弱点，陷入了复杂的人际纠纷当中。后与孙柔嘉订婚，并离开三闾大学回到上海。在赵辛楣的帮助下，方鸿渐在一家报馆任职，与孙柔嘉结婚。婚后，方鸿渐夫妇与方家、孙柔嘉姑母家的矛盾暴露并激化。方鸿渐辞职并与孙柔嘉吵翻，逐渐失去了生活的希望。'},
                        // {id:'11',url:require('../assets/images/book/book11.jpg'),name:'第七天',price:55,au:'余华',pub:' 新经典文化',time:'2013-06',count:1,p1:'“浓雾弥漫之时，我走出了出租屋，在空虚混沌的城市里孑孓而行。我要去的地方名叫殡仪馆，这是它现在的名字，它过去的名字叫火葬场。我得到一个通知，让我早晨九点之前赶到殡仪馆，我的火化时间预约在九点半。”',p2:'这是余华最新长篇小说《第七天》的开篇，给读者留下了足够大的悬念，一个走向殡仪馆、将被火化的人，在死亡之后还能留给读者什么呢？这次余华用荒诞的笔触和意象讲述了一个比《活着》更绝望、比《兄弟》更荒诞的故事，让读者体会到一种寒冬腊月被囚禁于积年冰川里的寒冷，一种剧烈拉锯式切肤的疼痛和虐心，一种茫茫荒野身心俱疲后无着无落的绝望。',p3:'《第七天》是一个值得精细阅读的文本，绝不是网传那样简单的新闻堆砌和记录。'},
                        // {id:'5',url:require('../assets/images/book/book5.jpg'),name:'诗经之美',price:42,au:'吴峰',pub:'北京联合出版社',time:'2016-10-01',count:1,p1:'《诗经之美》一书是“美丽国学”中的一种，本书是一部对古典诗歌的典范之作《诗经》进行注译解读、图文并茂的大众国学读物。',p2:'全书以朱熹的《诗经注》为底本，在保持原有风雅颂的结构的基础上对《诗经》一书进行遴选注释翻译和解读，书中插配了近200张与历代画家绘制的《诗经》图片和山水人物绘画，提高了该书的可读性和艺术性。',p3:'全书的主要内容是《诗经》一书原貌的的全景再现，集中反映了《诗经》一书的文学价值、艺术价值和思想价值。全书注译清楚通俗，解读流畅严谨，图文相得益彰，是一部适合大众阅读的国学经典读物。'},
                        // {id:'1',url:require('../assets/images/book/book1.jpg'),name:'飞花令里的读书词',price:28,au:'琬如',pub:'南京出版社',time:'2014-02-21',count:1,p1:'近代国学大师王国维说：“唐之诗，宋之词，元之曲，皆所谓一代之文学，而后世莫能继焉者也。”',p2:'不读诗词，不足以知春秋历史；不读诗词，不足以品文化精粹；不读诗词，不足以感天地草木之灵；不读诗词，不足以见流彩华章之美。中国是一个“诗歌的国度”，古典诗词是中国传统文化的奇葩，是中华民族文化遗产中极为珍贵的一部分。',p3:'早在3000多年前，我们的祖先就创作出了以“诗三百”为代表的很好诗篇，此后每个历史时期，诗歌创作都结出了丰硕的成果，其中不少名篇佳句脍炙人口，传诵至今。'},
                        // {id:'2',url:require('../assets/images/book/book2.jpg'),name:'亲密关系',price:40,au:'(加拿大)克里斯多福·孟',pub:'山西经济出版社',time:'2011-03-01',count:1,p1:'在爱与被爱的过程中，我们都曾经历过痛苦、恐惧，也体验过狂喜与极乐，我们渴望建立永恒真挚的亲密关系，却又害怕再度受伤。',p2:'我们对一个人产生好感是因为这个人身上或多或少有我们需求的点，但是永远不可能有一个集合所有优点的人。这才是合理认知。于是我们妄图改变对方。进行权力斗争来控制对方。我们因为儿时未被满足的需求在对方身上能得到慰藉走到一起，而又因为儿时受过的伤害又在对方身上重现而开始拒对方于千里之外，最后发现一切幻灭。',p3:'我们每个人寻找配偶的动力都是源于孩提时代未被满足的归属感和重要性的需求。而每个人求偶的过程中都会假装自己有对方需求的点，双方都伪装自己，于是埋下幻灭的根源。'},
                        // {id:'3',url:require('../assets/images/book/book3.jpg'),name:'人性的弱点',price:30,au:'戴尔·卡耐基',pub:"北京联合出版社",time:'2015-06',count:1,p1:'一个人在事业上的成功，有15％归结于他的专业知识，另外85％归结于他表达思想、领导他人和唤起他人热情的能力',p2:'千万莫逞口舌之能，据理力争偶然或许能让你得到一些胜利的快慰，但你永远得不到对方的好感；如果固执已见，甚至自己错了而不勇于认错的话，要想改变他人可能会事倍功半。如果能够避免发挥自己的“弱点”，而对别人“投其所好”往往能事半功倍。',p3:'犯错的人永远只会怪罪于他人，而绝不可能反躬自省、承认错误。”如果无视人性的这一特点， 如果只会对犯错误的人恶语批评，结果只能引起他对自己的辩护，结果仍然于事无补。每个人都以得到他人的重视而自得，卡耐基强调，与人相处的最大秘密乃是给予他人由衷的认可和毫不吝惜的赞美。因为“人性深处最大的欲望，莫过于受到外界的认可与赞扬'},
                    ],
                    id:1
                },
            ],
            newbook:[],
            Selectionbook:[]
        }
    },
    components:{
        HomeBottomSwiper,
        FourCard,
        Bottom
    },
    created(){
        this.getthCase()
        this.getSixList()
    },
    mounted(){

    },
    methods: {
        toShop(){
            this.$router.replace('/shop')
        },

        getthCase(){
            let num = 3
            getCase(num).then(res=>{
                res.data.forEach(item => {
                    this.newbook.push(item)
                })
                console.log(this.newbook);
            })
        },
        getSixList(){
            let num = 6
            getCase(num).then(res=>{
                res.data.forEach(item => {
                    this.Selectionbook.push(item)
                })
            })
        },
    },
}
</script>

<style>
    .home{
        width: 100%;
    }
    .banner{
        width: 100%;
        height: 760px;
        background: url('../assets/images/book/back.jpg') no-repeat;
        background-size: 100% 760px;
    }
    .banner-container{
        width: 80%;
        margin: 0 auto;
        /* padding: 100px; */
        box-sizing: border-box;
    }
    .banner-container h1{
        margin: 0;
        font-size: 4rem;
        font-weight: 400;
    }
    .banner-container p{
        font-size: 3rem;
        margin-top: 20px;
        font-weight: 300;
        color: #fff;
    }
    .banner-container button{
        width: 100px;
        height: 40px;
        margin-top: 50px;
        background: #ed1c24;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        border: none;
        outline: none;
        border-radius: 5px;
    }
    .banner-container button:hover{
        background: darkseagreen;
    }
    .home-content{
        width: 80%;
        margin: 40px auto;
    }
    .two-card{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .one-card{
        width: 49%;
        height: 320px;
    }
    .one-card-text{
        box-sizing: border-box;
        padding: 2rem 1rem;
        color: #fff;
    }
    .one-card-text .title{
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.8rem;
        text-align: left;
        color: #fff;
    }
    .one-card-text .p1{
        display: block;
        height: 1.5rem;
        margin-top: 20px;
        line-height: 1.5rem;
        font-size: 1.3rem;
    }
    .one-card-text .price{
        margin-top: 20px;
        line-height: 1.5rem;
        font-size: 1.3rem;
    }
    .one-card-text button{
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
    
    .one-card-text button:hover{
        background: darkseagreen;
    }

    .home-bottom-content{
        width: 100%;
    }
    .home-bottom-content::after{
        display: block;
        clear: both;
        content: '';
    }
    .bottom-left{
        width: 75%;
        padding: 0 10px 0 10px;
        box-sizing: border-box;
        float: left;
    }
    .bottom-right{
        width: 23%;
        margin-left: 2%;
        float: right;
        margin-top: 30px;
    }
</style>