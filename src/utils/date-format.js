/**
 * 通过标准时间获取年，月，日
 * @method getYearMonthDay
 * @param {Date} date 标准时间格式
 * @return {Array} 返回处理后的数组，包含年，月，日
 * @author songjianet
 * @day 2020-05-08 14:40:14
 * */
function getYearMonthDay(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

/**
 * 通过标准时间获取年，月，日
 * @method getYearMonthDay
 * @param {Date} date 标准时间格式
 * @return {String} 返回处理后的时间字符串，如2020年1月1日
 * @author songjianet
 * @day 2020-05-08 14:40:14
 * */
function getYearMonthDayStr(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export {
  getYearMonthDay,
  getYearMonthDayStr
}