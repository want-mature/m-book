<template>
  <div id="app">
    <div class="nav">
      <router-link v-for="(item,index) in titleList" :key="index" :to="item.link">{{item.title}}</router-link>
      <!-- <router-link to="/home">首页</router-link>
      <router-link to="/shop">商城</router-link>
      <router-link to="/info">信息</router-link>
      <router-link to="/cart">购物车</router-link>
      <router-link to="/regis">注册</router-link>
      <router-link to="/contact">联系我们</router-link>
      <router-link to="/suggest">用户建议</router-link> -->
      <div class="top-avatar">
        <div class="avatar" @click="toPerson">
          <img class="avatar-img" :src="require('../src/assets'+avatarimg+'.jpg')" alt="">
        </div>
        <div class="aaa-info">
          <div class="item" @click="toPerson">个人中心</div>
          <div class="item" @click="out">退出登录</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- <bottom></bottom> -->
  </div>
</template>

<script>
import Bottom from './components/Bottom'
export default {
  name: 'App',
  data() {
    return {
      titleList:[
        {title: '首页', link:'/home'},
        {title: '商城', link:'/shop'},
        // {title: '详情', link:'/info'},
        {title: '购物车', link:'/cart'},
        {title: '注册/登录', link:'/newPages/login'},
        {title: '联系我们', link:'/contact'},
        {title: '用户建议', link:'/suggest'},
      ],
      avatarimg:'/images/avatar/365595',
      user:{}
    }
  },
  components: {
    Bottom
  },
  created(){
    
  },
  methods:{
    out(){
      window.sessionStorage.setItem('user',null)
      this.$store.state.user = null
      this.$router.push({path:'/home'})
    },
    toPerson(){
      this.$router.push({path:'/person'})
    }
  }
}
</script>

<style>
  html body{
    margin: 0;
    padding: 0;
    background: #f2f2f2;
  }
  #app{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .nav{
    width: 100%;
    height: 68px;
    min-width: 1000px;
    background: #FFFFFF;
    padding-left: 100px;
    box-sizing: border-box;
    position: relative;
  }
  .nav a{
    display: inline-block;
    width: 120px;
    text-align: center;
    line-height: 68px;
    color: #000000;
    text-decoration: none;
    font-size: 1.1em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }
  .nav .router-link-active{
    background: rgb(0, 103, 124);
    color: #FFFFFF;
  }
  .nav a:hover{
    background: rgb(0, 103, 124);
    color: #FFFFFF;
  }

  .top-avatar{
    min-height: 44px;
    width: 100px;
    position: absolute;
    top: 3px;
    right: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .avatar{
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }

  .avatar-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .aaa-info{
    height: 60px;
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    display: none;
  }
  .aaa-info .item{
    height: 30px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  .aaa-info .item:hover{
    background: #f7f7f7;
  }
  .top-avatar:hover .aaa-info{
    display: block;
  }

</style>
