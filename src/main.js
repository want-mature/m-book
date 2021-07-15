import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.prototype.$http = axios;

Vue.prototype.$check = function () {
  let user = JSON.parse(window.sessionStorage.getItem("user"))
  
  if(user){
    if(this.$store.state.user){
      return
    }else{
      this.$store.commit("saveUser",JSON.stringify(user))
    }
  }else{
    this.$router.push('/regis')
    this.$message({
      title: '警告',
      message: '请先登录！',
      type: 'warning'
    });
  }
}

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
