<template>
<div style="line-height: 60px; display: flex">
  <div style="flex: 1" >
    <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>

    <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-dropdown style="width: 70px; cursor: pointer">
<!--    <div style="display: inline-block">-->
<!--      <img src="https://img-blog.csdnimg.cn/c6d0ece75d3f4833bd820b8aa2eb952b.png" alt=""-->
<!--            style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">-->
<!--    </div>-->
    <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
      <el-dropdown-item style="font-size: 14px; padding: 5px 0">
        <router-link to="/person">个人信息</router-link>
      </el-dropdown-item>
      <el-dropdown-item style="font-size: 14px; padding: 5px 0">
        <span style="text-decoration: none" @click="logout">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
import user from "../views/User.vue";

export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    user: Object
  },
  computed: {
    user() {
      return user
    },
    currentPathName () {
      return this.$store.state.currentPathName; //需要监听的数据
    }
  },
  data(){
    return {

    }
  },
  methods: {
    collapse() {
       //this.$parent.$parent.$parent.$parent.collapse()
       this.$emit("asideCollapse")
    },
    logout() {
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
    }
  }
  // watch: {
  //   currentPathName (newVal, oldVal) {
  //     console.log(newVal)
  //   }
  // }
}
</script>

<style scoped>

</style>