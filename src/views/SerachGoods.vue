<template>
  <div class="search-goods" v-show="isshow">
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 有数据的时候才显示 -->
    <van-dropdown-menu v-if="searchData.length">
      <van-dropdown-item @change="alter" v-model="sort" :options="option" />
    </van-dropdown-menu>
    <!-- 搜索结果页面 -->
    
    <div>
      <transition-group class="goodslist" name="van-slide-left">
      <Product
      v-show="visible=true"
        v-for="item in searchData"
        :key="item.id"
        :data="item"
        @click="Descriptions"
      ></Product>
          </transition-group>
    </div>

    <!-- 没有数据才显示 -->
    <van-empty v-if="!searchData.length" description="暂无搜索结果" />
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import { fetchSearchGoods } from "@/api/index.js";
export default {
  data() {
    return {
      // 获取输入的值
      keyword: this.$route.params.keyword,
      page: 1,
      pagesize: 8,
      searchData: [],
      sort: "buy",
      order: "asc",   // 升序 asc 降序 desc
      option: [
        { text: "销量", value: "buy" },
        { text: "好评", value: "likes" },
        { text: "价格", value: "sell_price" },
      ],
      visible:false,
      isshow:true
    };
  },
  methods: {
    async reqSearchData() {
      let data = {
        value: this.keyword,
        sort: this.sort,
        order: this.order,
        page: this.page,
        pagesize: this.pagesize,
      };
      let result = await fetchSearchGoods(data);
      this.searchData = result;
    },
    Descriptions(item) {
      this.$router.push("/productDetails/" + item.id);
    },
    onCancel() {
      // 返回上两层
      this.$router.go(-2);
    },
    onSearch() {
      this.reqSearchData();
    },
    alter(value) {
      // 更改排序字段
      this.sort = value;
      // 在发送请求即可
      this.searchData = [];
      this.reqSearchData();
    },
  },
  created() {
    this.reqSearchData();
  },
   beforeRouteUpdate(to, from, next) {
    console.log('path:',to.name)
    // 判断是否是home页面,是则true,否则是false
    // this.showHome = to.name === 'Home' 
    next();
  },
  components: {
    Product
  },
};
</script>

<style lang="scss" scoped>
.search-goods{
  .goodslist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: rgb(245, 241, 241);
    height: 100%;
    padding: 10px;
    .item{
      border-radius: 20px;
    }
  }
}


</style>