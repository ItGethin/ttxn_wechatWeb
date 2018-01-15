 const returnTop = () => {
  clearInterval(timer);
  var timer = setInterval(function () {
    let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var current = curHeight;
    var speed = (0 - current) / 5;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    if (curHeight === 0) { //当前高度为零,停止这次计时器  
      clearInterval(timer);
    }
    document.documentElement.scrollTop = curHeight + speed;
    document.body.scrollTop = curHeight + speed;
  }, 50);
}

export default {
    returnTop
}
