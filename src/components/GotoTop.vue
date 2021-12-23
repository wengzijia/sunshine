<template>
  <div v-show="isShow" class="gotoTop flex_c_c" @click="gotoTop">TOP</div>
</template>

<script>
export default {
    props:{
        top:{
            type:Number,
            default:800  // 不传默认800
        }
    },
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        scrollTop(){
            // 获取滚上去的距离,这里考虑了兼容性
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 如果滚上去的距离大于传过来的距离,就显示,否则就隐藏
            if(scrollTop >= this.top){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        gotoTop(){
            // 连续赋值为0  回到顶部
            document.documentElement.scrollTop = document.body.scrollTop = 0
        }
    },
    mounted(){
        // 添加滚动事件
        document.addEventListener('scroll',this.scrollTop)
    },
    deactivated () {
        // 移除滚动事件
        document.removeEventListener('scroll',this.scrollTop)
    }
};
</script>

<style lang="scss" scoped>
.gotoTop {
  position: fixed;
  right: 8px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: rgb(4, 41, 250);
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.1), white);
  box-shadow: -2px -2px 8px -2px white, 2px 2px 8px -2px rgba(0, 0, 0, 0.15);
}
</style>