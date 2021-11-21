<template>
  <div id="app">
    <van-nav-bar
      :title="defaultTitle"
      :left-text="isback"
      :left-arrow ="isShowBack"
      @click-left="onClickLeft"
      v-show="isShowNavBar"
    />
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#0a32f8"
      v-show="isShowTabBar"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="user">个人中心</van-tabbar-item>
    </van-tabbar>
    <!-- 路由匹配的内容容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      defaultTitle: "默认首页",
      isShowBack:true,
      isback:"",
      isShowNavBar:false,
      isShowTabBar:true,
      isOnLine:navigator.online // 是否在线
    };
  },
  // 通过watch把元信息的标题赋值给组件的标题
  watch: {
    // 通过$route可以获取路由信息
    $route: {
      // handler就是处理监听变动时的函数
      // handler函数通常情况下只有在监听的属性发生改变时才会触发
      handler: function (route) {
        // 这样可以容错
        if (route.meta) {
          let { title,isShowBack,isShowNavBar } = route.meta;
          this.defaultTitle = title;
          this.isShowBack = isShowBack ? false : true;  // 是否显示返回箭头
          this.isback = isShowBack ? "" : "返回"   // 是否显示返回
          this.isShowNavBar = isShowNavBar ? true :false // 是否显示导航栏
          this.isShowTabBar = isShowBack ? true :false // 是否显示底部导航栏      返回箭头显示他就不显示
        }
      },
      immediate:true // 刷新立即执行一次    立即执行handler方法
    },
    // 监听网络状态
    isOnLine(){
      // 离线
      this.isOnLine === false && this.$toast.fail('您的网络有问题,请检查')
      // 在线
      this.isOnLine === true && this.$toast.success('网络连接正常')
    }
  },
  methods:{
    // 返回
    onClickLeft(){
      this.$router.back()
    },
    // 网络状态
    NetworkStatu(e){
      // 调用watch里面的方法
      this.isOnLine = e.type === 'online' ? true : false
    }
  },
  mounted(){
    window.addEventListener('online',this.NetworkStatu)
    window.addEventListener('offline',this.NetworkStatu)
  }
};
</script>

<style lang="scss">
// 导入公共的scss文件
@import "./assets/scss/common.scss";
* {
    box-sizing: border-box;
}

#app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
  // 底部居中
  .van-tabbar {
    min-width: 320px;
    max-width: 750px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>