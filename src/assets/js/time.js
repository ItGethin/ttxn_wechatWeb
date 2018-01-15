
let time = {
	Data:function (time){
			       var d = new Date(time);
			       var year = d.getFullYear();
			       var month = d.getMonth()+1;
			       var day = d.getDate();
			       var hour = d.getHours();
			       var minutes = d.getMinutes();
			       var seconds = d.getSeconds();
			      
			       var newtime= new Date(); 			       
			       var years = newtime.getFullYear();
			       var months = newtime.getMonth()+1;
			       var days = newtime.getDate();
			       var hours = newtime.getHours();
			       var minutess = newtime.getMinutes(); 
			       var thirty=30;
			       var second=60;
					if( year==years && month-months<=1 && days<day){
						
						return(thirty-day+days+"天前更新");
					}
					else if(year==years && month==months && days>day){
						return(days-day+"天前更新");
					}
					else if(year==years && month==months && days==day && hour==hours && minutess>minutes){
						return(minutess-minutes+"分钟前更新");
					}
					else if(year==years && month==months && days==day  && hours-hour==1 && minutes>minutess){
						return(second-minutes+minutess+"分钟前更新");
					}
					else if(year==years && month==months && days==day  && hours-hour>1){
						return(hours-hour+"小时前更新");
					}
					else if(years==" " && months==" " && days==" "  && hours==" "){
						return(" ");
					}
					else{
						return("很久以前更新");
					}
			   }, 
	
	
  //  返回 10:20 时长
  sConversionTime: function (time) {
    if (typeof time !== 'number' || time < 0) {
      return time
    }
    var hour = parseInt(time / 3600)
    time = time % 3600
    var minute = parseInt(time / 60)
    time = time % 60
    var second = time.toFixed(0);
    var str = ([minute, second]).map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join(':');
    if (!str) {
      str = 0;
    }
    return str
  },

  //  返回总的分钟数
  minuteReturn: function (time) {
    if (typeof time !== 'number' || time < 0) {
      return time
    }

    let minute = parseInt(time / 60) > 1 ? parseInt(time / 60) : 1;
    return minute
  },

  // 返回更新的时间   
  // time 时间的字符串
  getUpdateTime: function (time) {
    if (typeof time !== 'string') {
      return time
    }
    let date = time.split(' ')[0].split('-'); // 时间
    let year = date[0]; // 获取年
    let month = date[1]; // 月份
    let day = date[2]; //日期
    let now = new Date().getFullYear().toString(); // 获取当前年份

    return result = year === now ? `${month}-${day}` : `${year}-${month}-${day}`;
  },
  
//几天几时  几分
  
  // 返回用户的评论时间
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
      return nowYear - year + '年前';
    } else if (month != nowMonth) {
    //   console.log('月份不相同');
      return nowMonth - month + '月前';
    } else if (day != nowDay) {
    //   console.log('日期不相同');
      return nowDay - day + '天前';
    } else if (time1 != nowtime1) {
    //   console.log('小时不相同');
      return nowtime1 - time1 + '小时前';
    } else if (minute != nowMinute) {
      return "刚刚";
    }
  }
}

export default time;
