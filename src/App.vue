<template>
  <div id="app">
    <button @click="show = true">点击打开</button>
    <datepicker
        :isShow="show"
        :defaultDate="defaultDate"
        @cancel="show = false"/>
  </div>
</template>

<script>
  import Datepicker from "./components/Datepicker";

  export default {
    data() {
      return {
        show: false,
        defaultDate: new Date('2019/2/1')
      }
    },
    components: {
      Datepicker
    },
  }
</script>

<style lang="scss"></style>
