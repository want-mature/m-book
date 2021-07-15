<template>
    <div class="content">
        <input type="file" @change="getFile()" multiple="multiplt">
        <button @click="upload">点击上传</button>
        <div v-html="svg"></div>
        <input type="text" v-model="tex" @change="sus">
    </div>
</template>

<script>
import {upLoadAvatar} from '../apis/user.js'
import axios from 'axios'
export default {
    data() {
      return {
        imageUrl: '',
        file:null,
        svg:null,
        svgText: '',
        tex:''
      };
    },
    created(){
      this.getCode()
    },
    methods: {
      getFile(){
        this.file = event.target.files[0]
        let formData = new FormData()
        formData.append("file",this.file)
        axios.post('/api/user/upLoadAvatar',formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
      },
      upload(){
        
      },
      getCode(){
        axios.post('/api/user/code')
        .then(res => {
          console.log(res.data);
          this.svg = res.data.svg
          this.svgText = res.data.svgText
        })
        .catch(err => {
          console.error(err); 
        })
      },
      sus(){
        console.log(this.svgText === this.tex);
        console.log(this.svgText,this.tex);
      }
    }
  }
</script>