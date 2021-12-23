<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
        <van-button
          style="margin-top: 18px"
          to="/register"
          color="#7232dd"
          plain
          round
          block
          native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
    <div style="text-align: center">
      <img src="../assets/images/gongan.png" alt="" />
      京公网安备 44030902003170号 粤ICP备2021159048号-1
    </div>
  </div>
</template>

<script>
import { fetchLogin } from "@/api/user.js";
export default {
  data() {
    return {
      username: "wengzijia",
      password: "1",
    };
  },
  methods: {
    async onSubmit(formData) {
      let { status, message, token, userInfo } = await fetchLogin(formData);
      // this.$toast(message)
      this.$dialog.alert({ message });
      // 如果状态等于0,代表成功
      if (status === 0) {
        // 把token存储到Vuex,然后Vuex再把数据同步到本地存储
        this.$store.commit("setToken", token);
        // 登录成功把用户信息存起来
        this.$store.commit("setUserInfo", userInfo);
        let { redirect } = this.$route.query;
        if (redirect) {
          // 回到原来页面
          this.$router.push(redirect);
        } else {
          this.$router.push("/user");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>