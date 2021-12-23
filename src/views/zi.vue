<template>
    <div>
      来自父亲:{{message}}
      <button @click="tell">告诉父亲</button>
    </div>
</template>

<script>
    export default {
        props:['message'],
        data(){
            return {
                name:'儿子'
            }
        },
        methods:{
            tell(){
                this.$emit('alter',this.name)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>