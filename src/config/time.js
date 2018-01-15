/**
 * 时间格式
 * 作者: Gethin
 * 时间: 2018-1-3
 */

const time = {

  /*
    返回时长
    @params: duration   时长,秒数
    返回的字段：10:20
  */
  sConversionTime: function (time) {
    if (typeof time !== 'number' || time < 0) {
      return time
    }

    let hour, minute, second, str;
    hour = time > 3599 ? Math.floor(time / 3600) : 0;
    minute = (time % 3600) > 59 ? Math.floor(time % 3600 / 60) : 0;
    second = time % 60;
    if (hour) {
      str = [hour, minute, second].map((item, index, array) => {
        return item < 10 ? "0" + item : item
      }).join(":")
    } else {
      str = [minute, second].map((item, index, array) => {
        return item < 10 ? "0" + item : item
      }).join(":")
    }
    return str;
  },

  //  返回总的分钟数
  minuteReturn: function (time) {
    if (typeof time !== 'number' || time < 0) {
      return time
    }

    let minute = parseInt(time / 60) > 1 ? parseInt(time / 60) : 1;
    return minute
  },

  /** 
      返回更新的时间
      @params 2017-12-26 20:20
      11-26   
  */
  getUpdateTime: function (time) {
    if (typeof time !== 'string') {
      return time
    }

    let date = time.split(' ')[0].split('-'); // 时间
    let year = date[0]; // 获取年
    let month = date[1]; // 月份
    let day = date[2]; //日期
    let now = new Date().getFullYear().toString(); // 获取当前年份

    return year === now ? `${month}-${day}` : `${year}-${month}-${day}`;
  },


  /**
   * 功能: 返回上架时间  课程目录的上架时间
   * @params: time  "2016-01-02 10:04:01"
   *  A：不足1小时的显示为XX分钟前
      B：超过1小时的显示为XX小时前
      C：1周之内显示XX天前
      D：超过1周，今年以内时间（每年日历的1月1日刷新年份）显示格式：月-日 ，例：2017年8月7日  显示为：08-07
      E：非今年以内时间（日期格式 ：年-月-日 ） 例：2017年11月8日 显示为：2017-12-08 
   */

  getShelfTime(time) {
    if (time === undefined || time === null) {
      return time
    }

    // 现在的时间 Fri Dec 29 2017 12:10:45 GMT+0800 (中国标准时间)
    let now = new Date();
    let nowYear = now.getFullYear(),
      nowMonth = now.getMonth() + 1,
      nowDay = now.getDate(),
      nowHour = now.getHours(),
      nowMinute = now.getMinutes();

    // "2016-01-02 10:04:01"
    let date = time.split(' ')[0]; // 获取年月日
    let hour = time.split(' ')[1].split(':')[0]; // 获取时间  小时
    let year = date.split('-')[0], // 获取年份
      month = date.split('-')[1], //获取月份
      day = date.split('-')[2], // 获取天
      minute = time.split(' ')[1].split(':')[1]; // 获取分钟

    if (year != nowYear) { // 年份不同
      return `${year}-${month}-${day}`
    } else if ((nowDay - day) > 7) { // 超过一周
      return `${month}-${day}`
    } else if ((nowDay - day) < 8 && (nowDay - day) > 0) { // 一周之内
      return `${nowDay - day}天前`
    } else if (hour != nowHour) { // 小时不同
      return `${nowHour - hour}小时前`
    } else if (minute != nowMinute) { // 分钟不同
      return `${nowMinute - minute}分钟前`
    }
  },



  /*
    返回更新的时间   返回用户的评论时间
    @params: time  时间字符串  2017-10-12 08:20
    返回的字段： 2017-12-03、几小时前、几分钟前、刚刚
  */
  commentTime(time) {
    let date = time.split(' ')[0]; // 获取年月日
    let time1 = time.split(' ')[1].split(':')[0]; // 获取时间  小时
    let year = date.split('-')[0], // 获取年份
      month = date.split('-')[1],
      day = date.split('-')[2],
      minute = time.split(' ')[1].split(':')[1];


    let now = new Date();
    let nowYear = now.getFullYear(),
      nowMonth = now.getMonth() + 1,
      nowDay = now.getDate(),
      nowtime1 = now.getHours(),
      nowMinute = now.getMinutes();

    if (year != nowYear) {
      return `${year}-${month}-${day}`;
    } else if (month != nowMonth) {
      //   console.log('月份不相同');
      return nowMonth - month + '月前';
    } else if (day != nowDay) {
      //   console.log('日期不相同');
      return nowDay - day + '天前';
    } else if (time1 != nowtime1) {
      //   console.log('小时不相同');
      return nowtime1 - time1 + '小时前';
    } else { // 分钟不同  返回刚刚
      return "刚刚";
    }
  },



  /**
 * 功能: 返回购买的时间
 * @params 时间戳 1515059155000
 * 时间规则 返回的格式
    A：不足1小时的显示为XX分钟前
    B：超过1小时的显示为XX小时前
    C：1个月之内显示XX天前
    D：今年以内时间（每年日历的1月1日刷新年份）显示格式：月-日 ，例：2017年8月7日  显示为：08-07
    E：非今年以内时间（日期格式 ：年-月-日 ）
    例：2017年11月8日 显示为：2017-12-08
 */
  buyTime(time) {
    if (typeof time !== 'number' || time < 0) {
      return time
    };

    // 现在的时间 Fri Dec 29 2017 12:10:45 GMT+0800 (中国标准时间)
    let now = new Date();
    let nowYear = now.getFullYear(),
      nowMonth = now.getMonth() + 1,
      nowDay = now.getDate(),
      nowtime1 = now.getHours(),
      nowMinute = now.getMinutes();
    // console.log(nowYear,nowMonth,nowDay,nowtime1,nowMinute);

    // 时间戳转日期 标准时间格式  Fri Dec 29 2017 10:50:04 GMT+0800 (中国标准时间)
    var time = new Date(time);
    let year = time.getFullYear(),
      month = time.getMonth() + 1,
      day = time.getDate(),
      time1 = time.getHours(),
      minute = time.getMinutes();
    // console.log(year,month,day,time1,minute);
    if (year != nowYear) { // 非今年
      return `${year}-${month}-${day}`;
    } else if (month != nowMonth) {
      //   console.log('月份不相同');
      return `${month}-${day}`;
    } else if (day != nowDay && ((nowDay - day) === 1)) {
      //   console.log('日期不相同');
      return '昨天';
    } else if (day != nowDay && ((nowDay - day) > 1)) {
      return nowDay - day + '天前';
    } else if (time1 != nowtime1) {
      //   console.log('小时不相同');
      return nowtime1 - time1 + '小时前';
    } else { // 分钟不同  返回刚刚
      return "刚刚";
    }
  },


    /**
     * 学习记录  今天 昨天 更早
     * @params time  时间戳   例:1515394808000
    */
  getTimeState(time) {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const todayTime = today.getTime();   // 当天00:00 的时间戳
    let flag = todayTime - time;
    if (flag < 0 || flag === 0) {
        return "今天";
    } else if (flag < 86399999) {  // 一天的时间戳为  86400,000
        return "昨天"
    } else if(flag > 86400000) {
        return '更早'
    }
  }



}
export default time;
