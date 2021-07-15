<template>
    <div class="regis">
        <div class="regis-content">
            <h2>新用户注册</h2>
            <div class="sss">
                <span>已有账户？</span> <span class="login" @click="toLogin">请登录</span>
            </div>
            <div v-if="!isRegis">
                <el-input class="use"  placeholder="请输入用户名" v-model="username" clearable></el-input>
                <el-input class="use"  placeholder="请输入手机号码" v-model="phone" clearable></el-input>
                <el-input class="use"  placeholder="请输入邮箱" v-model="email" clearable></el-input>
                <el-input class="use"  placeholder="请输入密码" v-model="password" clearable></el-input>
                <el-input  class="use" placeholder="请输入密码" v-model="repeat" clearable></el-input>
                <el-button type="primary" @click="regis">注册</el-button>
                <!-- <input class="in" v-model="username" type="text" placeholder="用户名">
                <input class="in" v-model="phone" type="tel" placeholder="手机号码">
                <input class="in" v-model="email" type="email" placeholder="邮箱">
                <input class="in" v-model="password" type="password" placeholder="设置密码">
                <input class="in" v-model="repeat" type="password" placeholder="确认密码">  -->
                <!-- <button @click="regis">立即注册</button> -->
                <!-- <div class="su"><input type="checkbox">我已阅读协议</div> -->
            </div>
            <div v-else>
                <el-input  class="use" placeholder="请输入手机号" v-model="userphone" clearable></el-input>
                <el-input  class="use" placeholder="请输入密码" v-model="userpassword" clearable></el-input>
                <el-button type="primary" @click="login">立即登录</el-button>
                <!-- <input type="tel" v-model="userphone" class="in" placeholder="请输入手机号码">
                <input type="password" v-model="userpassword" class="in" placeholder="请输入密码">
                <button @click="login">立即登录</button> -->
            </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import Bottom from '../components/Bottom.vue'

import axios from 'axios';
export default {
    data() {
        return {
            username:'',
            phone:'',
            email:'',
            password:'',
            repeat:'',
            userpassword:'',
            userphone:'',
            isRegis: false,
            avatar: '',  // 头像
        }
    },
    components:{
        Bottom
    },
    methods: {
        regis(){
            if(this.repeat == this.password){
                axios.post('/api/regis/adduser',{
                    username: this.username,
                    phone: this.phone,
                    email: this.email,
                    password: this.password,
                    avatar : this.avatar ? this.avatar : ''
                })
                .then(res => {
                    console.log(res)
                    if(res.data.msg == '注册成功'){
                        this.$message({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            title: '警告',
                            message: res.data,
                            type: 'warning'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                })
            }else{
                this.$message({
                    title: '警告',
                    message: '两次密码不一致',
                    type: 'warning'
                });
            }
        },
        toLogin(){
            this.isRegis = true
        },
        login(){
            if(!this.userpassword){
                this.$message({
                    title: '警告',
                    message: '请输入密码',
                    type: 'warning'
                });
            }
            axios.post('/api/login',{
                userphone: this.userphone,
                userpassword:this.userpassword
            })
            .then(res => {
                if(res.data == '密码错误'){
                    this.$message({
                        title:'警告',
                        message: res.data,
                        type:'warning'
                    })
                }else{
                    this.$message({
                        title:'成功',
                        message: '登录成功',
                        type:'success'
                    })
                    let user = {
                        username: res.data[0].username,
                        phone: res.data[0].phone,
                        token: res.data[0].token,
                        avatar: res.data[0].avatar,
                        email: res.data[0].email
                    }

                    this.$store.commit("saveUser",JSON.stringify(user))
                    this.$router.go(-1)
                    window.sessionStorage.setItem('user',JSON.stringify(user))
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
}
</script>

<style>
.use{
    margin-bottom: 20px;
    width: 40%;
    display: block;
}
    .regis{
        width: 100%;
    }
    .sss{
        height: 30px;
    }
    .regis-content{
        width: 70%;
        margin: 0 auto;
        padding-top: 80px;
    }
    .regis-content .in{
        font-family: 'Open Sans', sans-serif;
        background: #FFFFFF;
        border: 1px solid #E7E7E7;
        color: rgba(85, 81, 81, 0.84);
        padding: 8px;
        display: block;
        margin: 20px 0;
        width: 96.3333%;
        outline: none;
        -webkit-appearance: none;
        text-transform: capitalize;
    }
    button{
        width: 150px;
        height: 40px;
        color: #fff;
        background: #ed1c24;
        text-align: center;
        line-height: 40px;
        margin-top: 15px;
        border: none;
        outline: none;
        border-radius: 5px;
    }
    .login{
        display: inline-block;
        color: rgb(64, 158, 255);
        border-bottom: 1px solid rgb(64, 158, 255);
    }
    .login:hover{
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
    }
    .su{
        margin-top: 8px;
    }
</style>