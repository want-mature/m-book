<template>
    <div class="login-content">
        <div class="card column">
            <div class="title" v-if="isLogin">登录</div>
            <div class="title" v-if="!isLogin">注册</div>
            <div class="card-input column" v-if="isLogin">
                <div class="row row-input">
                    <div class="text">用户名</div>
                    <input type="text" v-model="username">
                </div>
                <div class="row row-input">
                    <div class="text">密码</div>
                    <input type="text" v-model="password">
                </div>
                <div class="row row-input">
                    <div class="text">验证码</div>
                    <div class="svg-input-img">
                        <input class="svg-input" type="text" v-model="svg_text">
                        <div class="svg" v-html="svg" @click="getSvg()"></div>
                    </div>
                </div>
                <div class="row btn">
                    <button @click="toLogin()">立即登录</button>
                </div>
            </div>
            <div class="card-input column" v-if="!isLogin">
                <div class="row row-input">
                    <div class="text">用户名</div>
                    <input type="text" v-model="username">
                </div>
                <div class="row row-input">
                    <div class="text">手机号</div>
                    <input type="text" v-model="phone">
                </div>
                <div class="row row-input">
                    <div class="text">密码</div>
                    <input type="password" v-model="password">
                </div>
                <div class="row row-input">
                    <div class="text">密码</div>
                    <input type="password" v-model="repeat">
                </div>
                <div class="row btn">
                    <button @click="toRegis()">立即注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from '../../apis/user'
import axios from 'axios'

export default {
    data() {
        return {
            isLogin: false,
            username: '',
            phone:'',
            password: '',
            repeat:'',
            svg_text: null,
            svg: null,  // 验证码图片
            
        }
    },
    created(){
        this.getSvg()
    },
    methods:{
        getSvg(){
            axios.post('/api/user/code').then(res => {
                this.svg = res.data.svg
            })
            .catch(err => {
                console.error(err); 
            })
        },
        toLogin(){
            if(this.svg_text == null) {
                this.$message({
                    title: '警告',
                    message: '验证码不能为空',
                    type: 'warning'
                })
            }
            login(this.username,this.password,this.svg_text).then(res => {
                console.log(res);
            }).catch(err =>{
                console.log(err);
            })
        }
    },
}
</script>

<style lang="scss">
    .login-content{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        // background: white;
        text-align: center;
        .column{
            display: flex;
            flex-direction: column;
        }
        .row{
            display: flex;
            flex-direction: row;
        }
        .card{
            width: 450px;
            height: 350px;
            margin: 100px auto;
            border-radius: 20px;
            background: white;
            box-shadow: 0px 14px 20px 0px rgba(201, 200, 197, 0.4);
            padding: 50px;
            box-sizing: border-box;
            align-items: center;
            .title{
                font-size: 24px;
                color: #303133;
                font-weight: 500;
                margin-bottom: 20px;
            }
            .card-input{
                width: 100%;
                height: 100%;
                align-items: center;
                .row-input{
                    width: 100%;
                    align-items: flex-start;
                    justify-content: space-evenly;
                    input{
                        height: 25px;
                        border-radius: 5px;
                        &:focus{
                            border-radius: 5px;
                        }
                    }
                    .text{
                        color: #999696;
                        font-weight: 500;
                        width: 60px;
                        // margin-right: 15px;
                        text-align: justify;
                        &::after{
                            content: '';
                            display: inline-block; 
                            padding-left: 100%;
                        }
                    }
                }
                .btn{
                    margin-top: 20px;
                    button{
                        width: 100px;
                        height: 30px;
                        background: #DCDFE6;
                        border: none;
                        border-radius: 5px;
                        box-shadow: 2px 2px 0 0 rgba($color: #DCDFE6, $alpha: .1);
                    }
                }
            }
        }
    }
</style>