/**
 * 对传入字符串时间进行格式化标准时间
 * 针对用户传入的时间字符串格式为中横向分割在苹果手机下不支持的处理方式，如：1900-1-1
 * @method dateFormat
 * @param { String } val 传入的字符串时间格式
 * @return { Date } 返回处理后的标准时间
 * @author songjianet
 * @day 2020-05-07 10:37:50
 * */

function dateFormat(val) {
  let time = []

  if (val.indexOf('/') > 0) {
    time = val.split('/')
  } else if (val.indexOf('-') > 0) {
    time = val.split('-')
  }

  return new Date(time[0], time[1], time[2])
}

export { dateFormat }