<template>
  <div class="aa" @click="clickHandler">
      {{content}}
      <span>{{abc}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    props: {
      content: {
        type: String,
        default: 'Hello'
      }
    },
    data(){
        return {
            abc:'yzf'
        }
    },
    mounted(){
        setTimeout(()=>{
            this.abc = 'asdfa'
            this.$emit('change', this.abc)
        },3000)
    },
  
    methods: {
      clickHandler(e) {
        this.$emit('click', e)
      },
    }
  }
</script>
<style lang="stylus" scoped>
 .aa{
    position fixed;
    left  0;
    top 0;
    width: 100vw;
    height:100vh;
    background: yellow;
 }
</style>