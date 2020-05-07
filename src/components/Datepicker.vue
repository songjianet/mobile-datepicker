<template>
  <div class="dp-container" v-show="isShow" @click.self="handleCancel">
    <div class="dp-date-container">
      <div class="dp-date-header" :style="{backgroundColor: themeColor}">
        <p>
          <span>2020年10月10号</span>
          <span>23:50</span>
        </p>
        <p>
          <span>2020年10月11号</span>
          <span>23:50</span>
        </p>
      </div>
      <div class="dp-date-content">
        <div class="dp-switch-date">
          <span class="iconfont iconicon-test2"></span>
          <span class="iconfont iconicon-test"></span>
          <span>2020年10月</span>
          <span class="iconfont iconicon-test1"></span>
          <span class="iconfont iconicon-test3"></span>
        </div>
      </div>
      <div class="dp-date-footer">
        <button class="dp-button" :style="{color: themeColor}">取消</button>
        <button class="dp-button" :style="{color: themeColor}">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/scss/iconfont.scss'

  export default {
    name: 'Datepicker',
    props: {
      isShow: {
        type: Boolean,
        default: false,
        required: true
      }, // 控制显隐
      isTimeSelect: {
        type: Boolean,
        default: false
      }, // 是否启用时间选择
      isDateTimeRange: {
        type: Boolean,
        default: false
      }, // 是否日期时间范围选择，不启用则只能选择一天

      defaultDate: {
        type: Date || String,
        default: () => { return new Date() }
      }, // 默认时间
      startDate: {
        type: Date || String,
        default: () => { return new Date(1900, 1, 1) }
      }, // 开始时间
      endDate: {
        type: Date || String,
        default: () => { return new Date() }
      }, // 开始时间

      language: {
        type: String,
        default: 'zh'
      }, // 语言

      themeColor: {
        type: String,
        default: '#2F78FF'
      } // 主题色
    },
    data() {
      return {
        changeContentStatus: false, // 切换年份选择和日期选择
      }
    },
    methods: {
      handleCancel() {
        this.changeContentStatus = false
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/initialization";
  @import "../assets/scss/screen";

  .dp-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .dp-date-container {
      width: 80%;
      min-height: 10rem;
      background-color: #fff;

      .dp-date-header {
        padding: 1rem 1.3rem;
        color: #fff;

        p {
          margin: 0.2rem 0;

          span:first-child {
            display: inline-block;
            width: 9rem;
            font: {
              size: 1.1rem;
              weight: 500;
            }
          }

          span:last-child {
            display: inline-block;
            font-size: 0.9rem;
          }
        }
      }

      .dp-date-content {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 0.4rem 0.6rem;
        display: flex;

        span {
          display: inline-block;
          flex: 1;

          &:nth-of-type(3) {
            flex: 0 0 50% 0 0;
          }
        }
      }

      .dp-date-footer {
        margin: 0 0.6rem;
        display: flex;
        height: 2.5rem;
        line-height: 2.5rem;
        justify-content: flex-end;
        align-items: center;

        .dp-button {
          border: none;
          outline: none;
          background-color: #fff;
          font-weight: 500;
          font-size: 0.275rem;

          &:last-child {
            margin-left: 1.2rem;
          }
        }
      }
    }
  }
</style>