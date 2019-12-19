 function bufferMove(obj, json, fn) {
    var speed = 0;
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    clearInterval(obj.timer); //防止事件下面定时器叠加
    obj.timer = setInterval(function () {
        var flag = true; 
        for (var attr in json) {
            var currentValue = null;
            if (attr === 'opacity') {
                currentValue = getStyle(obj, attr) * 100; 
            } else {
                currentValue = parseInt(getStyle(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - currentValue) / 5; 
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.判断运动开启和停止
            if (currentValue !== json[attr]) { 
                if (attr === 'opacity') { 
                    obj.style.opacity = (currentValue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ');'; //IE
                }
                obj.style[attr] = currentValue + speed + 'px'; 
                flag = false; 
            }
        }

        if (flag) { 
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
        }
    }, 10);
}