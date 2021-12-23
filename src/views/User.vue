<template>
  <div class="userContainer">
    <div class="userBox">
      <div class="imgWrap">
        <img
          v-if="!$store.state.userInfo.avatar"
          src="../assets/images/mi.png"
          alt=""
        />
        <van-image
          round
          width="60px"
          height="60px"
          style="margin-right: 20px"
          v-else
          :src="avatar"
        />
        <van-uploader :after-read="uploadPhoto">
          <van-button icon="plus" size="mini" type="primary"
            >修改头像</van-button
          >
        </van-uploader>
      </div>
      <div class="username">用户名:{{ $store.state.userInfo.username }}</div>
    </div>
    <van-cell-group inset>
      <van-cell icon="completed" to="/orderlist" title="我的订单" is-link />
      <van-cell icon="cash-back-record" title="我的积分" is-link />
      <van-cell icon="edit" title="我的评价" is-link />
      <van-cell icon="logistics" to="/address" title="收货地址" is-link />
      <van-cell icon="phone-circle-o" title="绑定手机" is-link />
      <van-cell icon="shield-o" title="修改密码" is-link />
      <van-cell icon="friends-o" title="账号昵称" is-link />
      <van-cell icon="comment-o" title="消息管理" is-link />
      <van-cell icon="phone-o" title="服务电话" value="400-6666-8888" />
    </van-cell-group>
    <van-button
      size="small"
      plain
      hairline
      round
      type="info"
      block
      @click="logOut"
      >退出登录</van-button
    >
    <div style="text-align: center">
      <img src="../assets/images/gongan.png" alt="" />
      京公网安备 44030902003170号  粤ICP备2021159048号-1
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { upload } from "@/api/user.js";
export default {
  data() {
    return {};
  },
  computed: {
    avatar() {
      return process.env.VUE_APP_BASE_URL + "/" + this.$store.state.userInfo.avatar
    },
  },
  methods: {
    // 辅助函数
    ...mapMutations(["clearUserInfo"]),
    logOut() {
      let _this = this;
      this.$dialog
        .confirm({
          title: "确定退出登录吗?",
        })
        .then(() => {
          _this.clearUserInfo();
          this.$router.replace("/login"); // this指向 VueComponent
        })
        .catch(() => {});
    },
    async uploadPhoto(file) {
      // 此时可以自行将文件上传至服务器
      let userId = this.$store.state.userInfo.id;
      if (file) {
        let fromData = new FormData();
        fromData.append("user_id", userId);
        fromData.append("file", file.file);
        let { message, status, src } = await upload(fromData);
        this.$toast(message);
        if (status === 0) {
          this.$store.commit("uploadPhoto", src);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.userContainer {
  // padding:10px ;
  .userBox {
    background-image: radial-gradient(#f3f3f0, #bcc0f1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .imgWrap {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        border-radius: 50%;
        box-shadow: 0px 0px 20px gold;
      }
    }
    .username {
      font-size: 22px;
      color: purple;
    }
  }
}
</style>