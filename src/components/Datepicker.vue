<template>
  <div class="dp-container" v-show="isShow" @click.self="handleCancel">
    <div class="dp-date-container">
      <div class="dp-date-header" :style="{backgroundColor: themeColor}">
        <p>
          <span>{{getYearMonthDayStr(defaultDate)}}</span>
          <span v-if="isTimeSelect">23:50</span>
        </p>
        <p v-if="isDateTimeRange">
          <span>{{getYearMonthDayStr(defaultDate)}}</span>
          <span v-if="isTimeSelect">23:50</span>
        </p>
      </div>
      <div class="dp-date-content">
        <div class="dp-switch-date">
          <div>
            <span class="iconfont iconicon-test2"></span>
            <span class="iconfont iconicon-test"></span>
          </div>
          <div>
            <span>2020年10月</span>
          </div>
          <div>
            <span class="iconfont iconicon-test1"></span>
            <span class="iconfont iconicon-test3"></span>
          </div>
        </div>
        <div class="dp-weeks">
            <span
                class="mdp_week"
                v-for="(item, index) in weeks"
                :style="{color: index === 0 || index === 6 ? themeColor : ''}"
                :key="index">
                {{item}}
            </span>
        </div>
        <div class="dp-date-day">
          <div class="dp-day" v-for="(item, index) in days" :key="index">
            <span
                :style="{color: (new Date(year, month, item).getDay() === 6 || new Date(year, month, item).getDay() === 0) ? themeColor : ''}">
              {{item ? item : ''}}
            </span>
          </div>
        </div>
      </div>
      <div class="dp-date-footer">
        <button class="dp-button" @click.self="handleCancel" :style="{color: themeColor}">取消</button>
        <button class="dp-button" :style="{color: themeColor}">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getYearMonthDay, getYearMonthDayStr } from "../date-format";
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
      isAdjoinMonthDay: {
        type: Boolean,
        default: false
      }, // 是否允许在当前月份补充显示上月最后一星期的日期和下月的第一个星期的日期

      defaultDate: {
        type: Date || Array, // TODO: 还没有对数组进行验证
        default: () => { return new Date() }
      }, // 默认时间
      startDate: {
        type: Date,
        default: () => { return new Date(1900, 1, 1) }
      }, // 开始时间
      endDate: {
        type: Date,
        default: () => { return new Date() }
      }, // 结束时间

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
        getYearMonthDayStr,
        changeContentStatus: false, // 切换年份选择和日期选择
        year: '',
        month: '',
        day: '',
        days: [],
        monthMaxDayNum: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 每个月份最大天数
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        activeDays: [], // 存放选中的
      }
    },
    created() {
      if (this.isShow && this.defaultDate) {
        this.initDate(this.defaultDate) // 初始化日期
      } // FIXME: 保证刷新，数据不丢失 -- 怎么实现的
    },
    methods: {
      /**
       * 初始化日期
       * @method initDate
       * @param {Date} date 传入的标准时间
       * @author songjianet
       * @day 2020-05-08 09:30:08
       * */
      initDate(date) {
        if (!date) { return }

        [this.year, this.month, this.day] = getYearMonthDay(date)

        this.updateDate()
      },

      /**
       * 计算显示日期
       * @method initDate
       * @author songjianet
       * @day 2020-05-08 09:30:08
       * */
      updateDate() {
        this.days = []

        if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
          this.monthMaxDayNum[1] = 29
        } // 计算闰年

        let firstDay = new Date(this.year, this.month, 1).getDay() // 获取当前月份第一天是星期几

        for (let i = 0; i < firstDay; i++) {
          this.days.push(0) // 每个月在第一天之前进行补0操作，如firstDay为周二则需要补两个0
        }

        for (let i = 1; i <= this.monthMaxDayNum[this.month]; i++) {
          this.days.push(i) // 补完0后，根据该月最大的天数进行累加
        }
      }, // FIXME: 可以封装成一个单独的方法

      /**
       * 取消按钮
       * @method handleCancel
       * @author songjianet
       * @day 2020-05-08 10:16:16
       * */
      handleCancel() {
        this.changeContentStatus = false
        this.$emit('cancel')
      }
    },
    watch: {
      isShow() {
        this.initDate(this.defaultDate) // 初始化日期
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
        padding: 1rem 1.6rem;
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
        padding: 0.5rem 1.3rem;

        .dp-switch-date {
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          height: 1.5rem;
          line-height: 1.5rem;
          color: #666;

          span {
            margin: 0 0.2rem;
            color: #666;
            font: {
              size: 1.2rem;
            }
          }

          &:nth-of-type(2) {
            flex-grow: 20;

            span {
              display: inline-block;
              width: 100%;
              text-align: center;
              font-size: 0.9rem;
            }
          }
        }

        .dp-weeks {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin: 1.8rem 0 0.2rem 0;

          span {
            font-size: 0.25rem;
            width: 14.285%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999;
          }
        }

        .dp-date-day {
          font-size: 0.25rem;
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .dp-day {
            width: 14.285%;
            height: 0;
            padding-bottom: 14.285%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            span {
              position: absolute;
              top: calc(50% - 0.5rem);
              height: 1rem;
            }
          }
        }
      }

      .dp-date-footer {
        margin: 0 1.3rem;
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