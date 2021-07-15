<template>
    <div class="shop">
        <div class="shop-left">
            <FourCard @load="load"></FourCard>
        </div>
        <div class="shop-right">
            <div class="head-title">
                <div class="head-left"><span :class="classCurrent === '全部' ? 'classActive' : ''" @click="load('全部')">全部分类</span> ———</div>
                <div class="head-class">
                    <span class="class-item" :class="classCurrent === item ? 'classActive' : ''" @click="load(item)" v-for="(item,index) in classItem" :key="index">{{item}}</span>
                    
                </div>
                <!-- <div class="head-right">
                    <span>排序：</span>
                    <span class="b">流行 | </span>
                    <span class="b">新上架 | </span>
                    <span class="b">折扣 | </span>
                    <span class="b">价格：高 低</span>
                </div> -->
                <div class="clear-fix"></div>
            </div>

            <div class="right-item">
                <div class="shop-item" v-for="item in shopList" @click="toDetails(item)" :key="item.bookId">
                    <!-- 使用require渲染图片，require渲染的条件是 1、相对路径../assets 2、图片名 3、后缀 .png等 -->
                    <img :src="require('../assets'+item.bookUrl+'.jpg')" alt="">
                    <div class="book-title">{{item.bookName}}</div>
                    <div class="book-info1">{{item.info1}}</div>
                    <div class="book-info2">{{item.info2}}</div>
                    <div class="book-price">￥{{item.price}}</div>
                </div>
            </div>
        </div>
        <div class="clear-fix"></div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import FourCard from '../components/FourCard'
import Bottom from '../components/Bottom.vue'
import { getShopCase } from '../apis/case.js'
export default {
    data() {
        return {
            shopList:[
                // {id:14,url:require('../assets/images/book/book14.jpg'),name:'月亮与六便士',info1:'满地都是六便士',info2:'他却抬头看见了月亮',price:35,au:'毛姆',pub:'时代文艺出版社',time:'1919-03',count:1,p1:'思特里克兰德是个在伦敦做事的证券经纪人，他有一个富裕和美满的家庭：妻子漂亮，爱慕虚荣，两个孩子健康快乐。',p2:'按理说，他应该满足于这种人世的快乐才对，尽管这种生活未免庸俗和平静。但是，就在他们婚后的第17个年头，他突然离家去了巴黎，抛弃了在外人看来很好的事业和家庭。就在人们以为他的出走是因为有外遇的时候，人们发现的事实却是：他原来只是为了画画。',p3:'这时的思特里克兰德没有任何的绘画基础，他只是爱好画画而已。在外人看来，他简直疯了，他的生活开始变得窘迫，几次险些因饥饿和疾病而死。他画的画也完全不像个样子，总是在原有的事物上进行破坏，除了有个蹩脚的画家戴尔克·施特略夫把他当成上帝外，任何人都不会买他的画，事实上他也从不轻易卖画。'},
                // {id:12,url:require('../assets/images/book/book12.jpg'),name:'橘子不是唯一的水果',info1:'橘子不是唯一的水果',info2:'就像世间没有唯一的答案',price:23,au:'珍妮特·温特森',pub:'东方出版社',time:'1985',count:1,p1:'在英国一个偏远的小镇，女孩珍妮特生长在一个信奉福音派新教的家庭里。母亲是一个偏执虔诚的教徒，喜欢将事物分成敌友两派。恶魔，邻居，性是她的敌人，而上帝，她家的狗，夏洛特·勃朗特的小说是她的好友。在母亲的教育下，教会活动成了她日常生活的一切。',p2:'随着她慢慢成长，珍妮特发现自己与小镇和母亲的偏执并不和谐。于是，当她爱上了另外一个女孩，并且这种超出常规之外的爱被发现后，两者的矛盾爆发了。',p3:'这场她人生中最初的爱恋在教会和母亲的阻止下无疾而终，但让珍妮特理解了内心的渴望。她离开了小镇和母亲，同时也带着这份决绝进入了她的成年。'},
                // {id:13,url:require('../assets/images/book/book13.jpg'),name:'毕业',info1:'所谓事实的背后',info2:'只是一个个欲盖弥彰的误会',price:33,au:'东野圭吾',pub:'南海出版公司',time:'2012-07',count:1,p1:'就读于国立T大学的加贺恭一郎及朋友等人面临毕业，突然牧村祥子被发现死在她的公寓里，先是被认定为自杀，',p2:'随着调查的深入，他杀的线索逐渐增多，案情逐渐明朗之时，命案再一次发生，在“雪月花之式”中，波香又被毒杀，案情变得更加复杂，为了弄清楚真相，加贺不断的追查。当他遇见无法解开的谜团时，还是向和他关系并不好的父亲求助，他的父亲是警察，因为长年专注工作忽略家庭，致使他的母亲离家出走。通过父亲给出多准备几副“雪月花”牌的提示下，加贺终于弄清楚了“雪月花之式”的下毒方式，不久也解开了祥子死亡之谜。'},
                // {id:15,url:require('../assets/images/book/book15.jpg'),name:'了不起的女孩',info1:'——100个改变世界的传奇女性',info2:'',price:35,au:'蒙哥玛丽\简•奥斯汀',pub:'东方出版社',time:'2012-10-01',count:1,p1:'了不起的女孩不喜欢阅读“粗俗暴力”的文字，她们会更喜欢《了不起女孩不得不读的经典名著》中温馨、优美和感人的篇章.',p2:'她们会陶醉于浪漫的邂逅和美妙的礼物，她们渴望拥有一个温柔善良的淑女应该具有的优秀品质。她们从“天赐佳礼，温馨无边”中学到了温情和快乐;她们从“梦幻深情，爱意满怀”中感悟了浪漫和美丽;她们从“守护天使，温暖人间”中体验了关爱和善良;她们从“战火柔情，铿锵玫瑰”中收获了坚强和力量。对于了不起的女孩来说，她们的感情更加细腻，更富有爱心和情感，喜欢触及心扉的氛围和柔情似水的相遇，而这种与众不同的情怀构成了她们美丽和魅力的源泉。',p3:'除此之外，蒙哥玛丽等专著的《了不起女孩不得不读的经典名著》中当然还涵盖了自信、乐观、宽容、承诺、情义、正直等重要的美德——正是这一切让她们成为了不起的女孩。'},
                // {id:86,url:require('../assets/images/book/book86.jpg'),name:'爱你就像爱生命',info1:'——但愿我和你是一首唱不完的歌',info2:'',price:40,au:'王小波，李银河',pub:'湖南文艺',time:'2017-07',count:1,p1:'本书收录了王小波与李银河的“两地书”，以及李银河深情怀念王小波的三篇文章，并收录二人的“媒人”《绿毛水怪》。',p2:'再现了他们的爱与生活，是一部感动国人的爱情绝唱。其中不仅有热切、坦诚的情感表白，还有彼此对于书籍、诗歌乃至社会的看法，闪耀着理想与爱情的火花，令人动容。'},
                // {id:11,url:require('../assets/images/book/book11.jpg'),name:'第七天',info1:'——现实的荒谬比小说更甚',info2:'',price:29.5,au:'余华',pub:' 新经典文化',time:'2013-06',count:1,p1:'“浓雾弥漫之时，我走出了出租屋，在空虚混沌的城市里孑孓而行。我要去的地方名叫殡仪馆，这是它现在的名字，它过去的名字叫火葬场。我得到一个通知，让我早晨九点之前赶到殡仪馆，我的火化时间预约在九点半。”',p2:'这是余华最新长篇小说《第七天》的开篇，给读者留下了足够大的悬念，一个走向殡仪馆、将被火化的人，在死亡之后还能留给读者什么呢？这次余华用荒诞的笔触和意象讲述了一个比《活着》更绝望、比《兄弟》更荒诞的故事，让读者体会到一种寒冬腊月被囚禁于积年冰川里的寒冷，一种剧烈拉锯式切肤的疼痛和虐心，一种茫茫荒野身心俱疲后无着无落的绝望。',p3:'《第七天》是一个值得精细阅读的文本，绝不是网传那样简单的新闻堆砌和记录。'},
                // {id:32,url:require('../assets/images/book/book32.jpg'),name:'和时间赛跑',info1:'假若你一直和时间赛跑',info2:'你就可以成功',price:44,au:'林清玄',pub:'湖南少年儿童出版社',time:'2018-08-01',count:1,p1:'这是一本从林清玄的经典作品中，精选出适合青少年阅读的篇章，汇编而成的文学作品集，收录了多篇入选教育部新编语文教材的篇目。',p2:'林清玄的文字兼具文学的美感和思想的深度，能够潜移默化地影响孩子的品味。本书在精选美文的基础上，以新的阅读理念，丰富孩子的视野，带给孩子心灵上的成长。'},
                // {id:24,url:require('../assets/images/book/book24.jpg'),name:'听听那冷雨',info1:'梦是一床太短的被',info2:'无论如何也盖不完满',price:32,au:'余光中',pub:'中国友谊出版公司',time:'2019-03-31',count:1,p1:'惊蛰一过，春寒加剧。先是料料峭峭，继而雨季开始，时而淋淋漓漓，时而淅淅沥沥，天潮潮地湿湿，即连在梦里，也似乎把伞撑着。',p2:'而就凭一把伞，躲过一阵潇潇的冷雨，也躲不过整个雨季。连思想也都是潮润润的。每天回家，曲折穿过金门街到厦门街迷宫式的长巷短巷，雨里风里，走入霏霏令人更想入非非。想这样子的台北凄凄切切完全是黑白片的味道，想整个中国整部中国的历史无非是一张黑白片子，片头到片尾，一直是这样下着雨的。这种感觉，不知道是不是从安东尼奥尼那里来的。',p3:'不过那一块土地是久违了，二十五年，四分之一的世纪，即使有雨，也隔着千山万山，千伞万伞。二十五年，一切都断了，只有气候，只有气象报告还牵连在一起，大寒流从那块土地上弥天卷来，这种酷冷吾与古大陆分担。不能扑进她怀里，被她的裾边扫一扫吧也算是安慰孺慕之情。'},
                // {id:16,url:require('../assets/images/book/book16.jpg'),name:'嘿，小家伙',info1:'愿这些如繁星的睡前故事',info2:'驱散你梦中的黑暗',price:27,au:'温酒',pub:'湖南文艺出版社',time:'2017-12',count:1,p1:'“我走了很远很远，从不问归期。 但即便走了几千里，你也在我心里。”',p2:'谁说长大了就不能读童话？谁说成人了就没有童话看？每个人心里都有一个永远长不大的孩子。世界已经够冷了，总得有点东西用来暖心，一壶温过的酒，或者几个故事。',p3:'愿这些如繁星的睡前故事，驱散你梦中的黑暗。'},
            ],
            query:'全部',
            classItem:['小说','散文','文学','心理学','文集','启蒙','随笔'],
            classCurrent: '全部'
        }
    },
    components:{
        FourCard,
        Bottom
    },
    created(){
        if(this.$route.query.class){
            this.query = this.$route.query.class;
            this.classCurrent = this.$route.query.class;
        }else{
            this.query = '全部'
        }
        this.getShopList()
    },
    methods: {
        toDetails(item){
            // this.$store.commit('setInfoList',item)
            this.$router.replace({path:'/info',query:{id:item.bookId}})
        },
        getShopList(){
            this.shopList = []
            getShopCase(this.query).then( res => {
                res.data.forEach(item => {
                    this.shopList.push(item)
                });
            })
        },
        load(item){
            this.query = item
            this.classCurrent = item
            this.getShopList()
        }
    },
}
</script>

<style>
    .shop{
        width: 80%;
        margin: 0 auto;
        margin-top: 50px;
    }
    .shop::after{
        display: block;
        content: '';
        clear: both;
    }
    .shop-left{
        width: 23%;
        margin-right: 2%;
        float: left;
        /* margin-top: 30px; */
    }
    .shop-right{
        width: 75%;
        float: right;
    }
    .shop-right .head-title{
        width: 100%;
    }
    .head-title .head-left{
        /* float: left; */
        font-size: 1em;
        text-transform: uppercase;
        color: #555555;
        font-weight: 600;
        cursor: pointer;
    }
    .head-title .head-left span:hover{
        border-bottom: 1px solid tomato;
        color: tomato;
        cursor: pointer;
    }
    .head-class{
        margin-top: 20px;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .head-class .class-item{
        margin-right: 10px;
        font-size: .9em;
        text-transform: uppercase;
        color: #555555;
        font-weight: bold;
        display: inline-block;
    }
    .head-class .class-item:hover{
        border-bottom: 1px solid tomato;
        color: tomato;
        cursor: pointer;
    }
    .head-class .classActive{
        color: tomato;
    }
    .classActive{
        color: tomato;
    }
    .clear-fix{
        display: block;
        content: '';
        clear: both;
    }
    .head-title .head-right{
        float: right;
        color: #1B242F;
        font-size: .9rem;
        display: block;
    }
    .head-right .b:hover{
        border-bottom: 1px solid #1B242F;
        cursor: pointer;
    }
    .right-item{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /* justify-content: space-around; */
    }
    .right-item .shop-item{
        width: 200px;
        text-align: left;
        margin-top: 40px;
        background: #FFFFFF;
        /* border-right: 1px solid #f0f0f0; */
        border-radius: 10px;
        box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
        text-align: center;
        margin-right: 60px;
    }
    .right-item .shop-item:nth-of-type(4n){
        margin-right: 0;
    }
    .shop-item img{
        width: 200px;
        height: 200px;
        border-radius: 10px;
    }
    .shop-item .book-title{
        font-size: 1.1rem;
        font-weight: bold;
        margin: 10px 0;
    }
    .shop-item .book-info1,.book-info2{
        color: #777777;
        font-size: 0.9rem;
        /* margin: 2px; */
    }
    .shop-item .book-price{
        margin-top: 8px;
        font-size: 1.2em;
        color: #ed1c24;
        font-weight: 600;
    }
</style>