<template>
    <div class="content">
        <div class="item" v-for="(item,index) in suggest" :key="index">
            <div class="name-tips">
                <div class="name">{{item.name}}</div>
                <div class="tips">{{item.suggests}}</div>
            </div>
            <div class="time">{{item.time}}</div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import Bottom from '../components/Bottom.vue'

import { getSuggest } from '../apis/case.js'
export default {
    data(){
        return{
            suggest:[]
        }
    },
    components:{
        Bottom
    },
    mounted(){
        this.getSuggestList()
    },
    methods:{
        getSuggestList(){
            getSuggest().then(res => {
                res.data.forEach(item => {
                    this.suggest.push(item)
                });
            })
        }
    }
}
</script>

<style>
body{
    
        background: #f0f0f0;
}
    .content{
        width: 70%;
        margin: 100px auto;
    }
    .content .item{
        height: 100px;
        width: 100%;
        background: #FFFFFF;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
        margin-bottom: 20px;
    }
    .item .name-tips{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .item .name{
        font-weight: bold;

    }
    
</style>