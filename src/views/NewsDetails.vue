<template>
  <div class="NewsContainer">
    <h1 class="title">{{ newsData.title }}</h1>
    <div class="info">
      <span class="date"
        >时间:{{ newsData.add_time | dataFormat("YYYY-MM-DD") }}</span
      >
      <span class="count">浏览次数:{{ newsData.click }}</span>
    </div>
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <div class="content" v-html="newsData.content"></div>
    <van-field
      v-model="content"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button round type="info" block @click="postComment"
      >发布评论</van-button
    >
    <!-- 发布列表 -->
    <div class="issueList" v-for="(item, index) in issueList" :key="index">
      <div class="user">{{ item.user_name }} : {{ item.content }}</div>
      <div class="time">
        评论时间:{{ item.add_time | dataFormat("YYYY-MM-DD") }}
      </div>
    </div>
    <van-button
      :loading="loading"
      loading-text="加载中..."
      round
      plain
      hairline
      type="danger"
      block
      @click="seeMore"
      >查看更多</van-button
    >
    <!-- 回到顶部 -->
    <GotoTop />
  </div>
</template>

<script>
import {
  fetchNewsDetail,
  fetchComments,
  fetchPostComment,
} from "@/api/index.js";
import GotoTop from "@/components/GotoTop.vue";
export default {
  props: ["id"],
  data() {
    return {
      page: 1,
      content: "",
      newsData: {},
      issueList: [],
      loading: false, // 是否加载中
      isDone: false, // 是否加载完成
    };
  },
  methods: {
    async _fetchNewsDetail() {
      let { message } = await fetchNewsDetail(this.id);
      this.newsData = message;
    },
    async _fetchComments() {
    this.loading = true   // 显示加载中
      let { message } = await fetchComments(this.id, this.page);
      this.loading = false  // 显示查看更多
      // 如果没有数据了,代表完成,退出,不再执行下面的
      if(message.length === 0){
          this.isDone = true;
          return;
      }
      // 数据合并
      this.issueList =[...this.issueList,...message];
    },
    async postComment() {
      let { message, insertId, status } = await fetchPostComment(
        this.id,
        this.content
      );
      if (status === 0) {
        this.$toast(message);
        // 创造一个评论项
        let item = {
          add_time: Date.now(),
          content: this.content,
          id: insertId,
          user_name: "匿名用户",
        };
        // 把内容显示在前面
        this.issueList.unshift(item);
        // 把留言框的内容清空
        this.content = "";
      }
    },
    seeMore() {
      if (this.isDone) {
        this.$toast("已经到底了,不要在点了");
        return;
      }
      this.page++;
      this._fetchComments();
    },
  },
  created() {
    this._fetchNewsDetail();
    this._fetchComments();
  },
  components: {
    GotoTop,
  },
};
</script>

<style lang="scss" scoped>
.NewsContainer {
  padding: 8px;
  .title {
    font-weight: 700;
    font-size: 22px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    color: slateblue;
  }
  .content{
      // 深度选择器,图片始终占屏幕百分百
      ::v-deep img{
          width:100%
      }
  }
  .issueList {
    background-color: #f2f2f2;
    margin: 10px 0;
    font-size: 12px;
  }
}
</style>