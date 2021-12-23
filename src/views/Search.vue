<template>
  <div class="searchBox">
    <!-- close-on-click-overlay 默认为true 是否在点击遮罩层后关闭 -->
    <van-popup
      :close-on-click-overlay="false"
      v-model="show"
      position="top"
      :style="{ height: '60%' }"
    >
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>

      <div class="historyBox">
        <div class="history">
          <h3>搜索历史</h3>
          <i @click="emptyHistory" class="iconfont icon-trash"></i>
        </div>
        <div class="content">
          <span @click="searchData(item)" v-for="(item,index) in historicalContent" :key="index">{{item}}</span>
        </div>
      </div>

      <div class="historyBox">
        <div class="history">
          <h3>热门搜索</h3>
          <i @click="hide = !hide" :class="['iconfont', cut]"></i>
        </div>
        <div class="content" v-if="hide">
          <span>iPad</span>
          <span>电脑</span>
          <span>超薄本</span>
          <span>游戏本</span>
          <span>相机</span>
          <span>打印机</span>
          <span>苹果手机</span>
          <span>小米手机</span>
        </div>
        <div class="hide" v-else>已隐藏热门搜索</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value: "",
      hide: true,
      //转换为对象,获取本地存储的数据
      historicalContent:JSON.parse(localStorage.getItem('historyData') || '[]' ),
    };
  },
  methods: {
    reqSearchData(value){
      // 判断没有关键词
      if(!value){
        this.$toast('请输入关键词')
        return; // 不再往下执行
      }
      // 如果搜索历史记录不包含用户搜索的值,就把值存进去并放在前面显示
      if(!this.historicalContent.includes(value)){
        this.historicalContent.unshift(this.value)
        // 转换为字符串存到本地存储
        localStorage.setItem('historyData',JSON.stringify(this.historicalContent))
      }
      // 输入的值去搜索页面搜索商品
      this.$router.push(`/home/serach-goods/${value}`)
    },
    onSearch() {
      this.reqSearchData(this.value)
    },
    searchData(value){
      this.reqSearchData(value)
      this.value = value
    },
    onCancel() {
      this.$router.back();
    },
    emptyHistory() {
      this.$dialog.confirm({
        title: "删除历史搜索记录",
        message: "确定删除吗?不可恢复",
      })
        .then(() => {
          // on confirm
          // 清空数据
          this.historicalContent = []
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    cut() {
      return this.hide ? "icon-guanbi-yanjing" : "icon-yanjing";
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  .historyBox {
    padding: 6px;
    .history {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      span {
        background-image: linear-gradient(rgb(250, 246, 2), rgb(252, 4, 4));
        height: 30px;
        padding: 6px;
        color: #fff;
        margin:3px;
      }
    }
    .hide {
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-image: linear-gradient(rgb(56, 2, 250), rgb(248, 3, 3));
      color: #fff;
    }
  }
}
</style>