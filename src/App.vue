<template>
  <div id="app">
    <button @click="show = true">点击打开</button>
    <datepicker :isShow="show" @cancel="show = false"></datepicker>
  </div>
</template>

<script>
  import Datepicker from "./components/Datepicker";

  export default {
    data() {
      return {
        show: false
      }
    },
    components: {
      Datepicker
    },
  }
</script>

<style lang="scss"></style>
