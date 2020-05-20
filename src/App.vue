<template>
  <div id="app">
    <button @click="show = true">点击打开</button>
    <datepicker
        :isShow="show"
        :defaultDate="defaultDate"
        :startDate="startDate"
        :endDate="endDate"
        :isOverDateTime="true"
        @cancel="show = false"/>
  </div>
</template>

<script>
  import Datepicker from "./components/Datepicker";

  export default {
    data() {
      return {
        show: false,
        defaultDate: new Date('2020/2/1'),
        startDate: new Date('2019/1/11'),
        endDate: new Date() 
      }
    },
    components: {
      Datepicker
    },
  }
</script>

<style lang="scss"></style>
