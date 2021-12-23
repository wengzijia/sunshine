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
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="confirmPassword"
        type="password"
        name="confirmPassword"
        label="确认密码"
        placeholder="请输入确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
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
     <div style="text-align:center;">
      <img src="../assets/images/gongan.png" alt="" />
      粤ICP备2021159048号-1
    </div>
  </div>
</template>

<script>
import {fetchRegister} from '@/api/user.js';
export default {
    data(){
        return {
            username:'',
            password:'',
            confirmPassword:''
        }
    },
    methods:{
        async onSubmit(formData){
            if(this.password !== this.confirmPassword){
                this.$toast('密码不一致')
                return;
            }
            // 传送数据给注册接口
            let {status,message} = await fetchRegister(formData)
            this.$toast(message)
            if(status === 0){
                this.$router.push('/login')
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>