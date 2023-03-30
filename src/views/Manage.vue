<template xmlns:font-size="http://www.w3.org/1999/xhtml">
    <el-container style="height: 100vh">
      <el-aside  :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
       <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"/>
      </el-aside>


      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user"/>
        </el-header>

        <el-main>
<!--          表示当前页面的子路由会在<router-view />里面展示-->
          <router-view @refreshUser="getUser" />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'HomeView',
  data(){
    return{
      collapseBtnClass:"el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      user: {}
    }
  },
  components: {
    Aside,
    Header
  },
  created() { //页面元素渲染之前触发
    //从后台获取最新的user
    this.getUser()
  },
  methods: {
    collapse(){
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){ // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      }else { //展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : {}
      //从后台获取数据
      this.request.get("/user/username" + username).then(res => {
      this.user = res.data
      })
    }
  }
}
</script>

<style>

</style>