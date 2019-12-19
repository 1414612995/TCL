
function fn(){
    const oBox = document.querySelector('.box');
    const moveUl = document.querySelector('.box ul');
    let picLi = document.querySelectorAll('.box ul li');
    const btnLi = document.querySelectorAll('.box ol li');
    const oLeft = document.querySelector('.left');
    const oRight = document.querySelector('.right');
    let index = 0;
    let flag = true;
    let timer = null;
    //2.改变布局，计算moveUl的宽度
    let firstLi = picLi[0].cloneNode(true); //克隆moveUl第一个子元素
    let lastLi = picLi[picLi.length - 1].cloneNode(true); //克隆moveUl最后一个子元素
    moveUl.appendChild(firstLi);
    moveUl.insertBefore(lastLi, moveUl.children[0]);
    //计算moveUl的宽度
    picLi = document.querySelectorAll('.box ul li'); //重新获取li的元素个数
    //一个li的宽度
    let liwidth = picLi[0].offsetWidth; 
    //设置moveUl的宽度
    moveUl.style.width = picLi.length * liwidth + 'px';
    //设置moveUl的位置
    moveUl.style.left = -liwidth + 'px';

    //3.给小圆圈按钮添加点击事件。
    for (let i = 0; i < btnLi.length; i++) {
        btnLi[i].onclick = function () {
            index = i;
            tabswitch();
            btnLi[index].className = 'active';
        }
    }
    //4.给左右箭头添加事件
    oRight.onclick = function () {
        if (flag) {
            flag = false;
            index++;
            tabswitch();
            //判断给第一个按钮添加active
            if (index > btnLi.length - 1) {
                btnLi[0].className = 'active';
            } else {
                btnLi[index].className = 'active';
            }
        }
    }
    oLeft.onclick = function () {
        if (flag) {
            flag = false;
            index--;
            tabswitch();
            //判断给第一个按钮添加active
            if (index < 0) {
                btnLi[btnLi.length - 1].className = 'active';
            } else {
                btnLi[index].className = 'active';
            }
        }
    }
    function tabswitch() {
        for (let j = 0; j < btnLi.length; j++) {
            btnLi[j].className = '';
        }
        bufferMove(moveUl, {
            left: -liwidth * (index + 1)
        }, function () { //进行判断
            if (index > btnLi.length - 1) {
                moveUl.style.left = -liwidth + 'px';
                index = 0;
            }
            if (index < 0) {
                moveUl.style.left = -liwidth * btnLi.length + 'px';
                index = btnLi.length - 1;
            }
            flag = true;
        });
    }
    //自动轮播
    timer = setInterval(() => {
        oRight.onclick();
    }, 2000);
    oBox.onmouseover = function () {
        oRight.style.display='block';
        oLeft.style.display='block';
        clearInterval(timer);
    };
    oBox.onmouseout = function () {
        oRight.style.display='none';
        oLeft.style.display='none';
        timer = setInterval(() => {
            oRight.onclick(); 
        }, 2000);
    };
}
fn();