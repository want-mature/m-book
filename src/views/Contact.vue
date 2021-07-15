<template>
    <div class="contact">
        <div class="contact-content">
            <div class="con-title">联系我们</div>
            <div class="user">
                <p>用户名</p>
                <el-input  placeholder="请输入用户名" v-model="name" clearable></el-input>
            </div>
            <div class="user">
                <p>建议</p>
                <el-input type="textarea" :rows="4" placeholder="请输入您的建议" v-model="suggests"></el-input>
            </div>
            <el-button type="primary" @click="submit">提交建议</el-button>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import Bottom from '../components/Bottom'

import axios from 'axios'
export default {
    data() {
        return {
            name:'',
            suggests:'',
            time:''
        }
    },
    components:{
        Bottom
    },
    methods:{
        submit(){
            if(!this.name || !this.suggests){
                alert('请输入信息')
            }else{
                let y = new Date().getFullYear()
                let m = new Date().getMonth()
                let d = new Date().getDate()
                let h = new Date().getHours()
                let min = new Date().getMinutes()
                let s = new Date().getSeconds()
                this.time = y+'-'+m+'-'+d+' '+h+':'+min+':'+s
                let url = '/api/contact'
                axios.post(url,{
                    name: this.name,
                    suggests:this.suggests,
                    time:this.time
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
                alert('提交成功')
            }
        }
    }

}
</script>


<style>
    .contact{
        width: 100%;
    }
    .contact-content{
        width: 70%;
        margin: 0 auto;
        padding-top: 80px;
    }
    .con-title{
        font-size: 1.5em;
        color: #ed1c24;
        text-shadow: 0 1px 0 #ffffff;
        text-transform: uppercase;
    }
    .user{
        width: 100%;
    }
    .user p{
        margin: 0;
        padding: 0;
        margin-top: 20px;
        color: #777777;
        display: block;
        font-size: 0.9em;
        text-transform: capitalize;
        font-weight: 500;
    }
    .user input,textarea{
        font-family: 'Open Sans', sans-serif;
        background: #FFFFFF;
        border: 1px solid #E7E7E7;
        color: rgba(85, 81, 81, 0.84);
        padding: 8px;
        display: block;
        margin-top: 8px;
        width: 96.3333%;
        outline: none;
        -webkit-appearance: none;
        text-transform: capitalize;
    }
    .el-button{
        margin-top: 15px;
    }
</style>