var getAnimatedEle={
    '.screen-1':[
        ".screen-1_tit",
        ".screen-1_phone",
        ".screen-1_shadow"
    ],
    '.screen-2':[
        '.screen-2_tit',
        '.screen-2_desc',
        '.screen-2_phone'
    ],
    '.screen-3':[
        '.screen-3_tit',
        '.screen-3_desc',
        '.screen-3_phone',
        '.screen-3_phone_feature'
    ],
    '.screen-4':[
        '.screen-4_tit',
        '.screen-4_desc',
        '.screen-4_phone',
        '.screen-4_phone-1',
        '.screen-4_phone-2',
        '.screen-4_phone-3',
        '.screen-4_phone-4'
    ],
    '.screen-5':[
        '.screen-5_tit',
        '.screen-5_desc',
        '.screen-5_phone'
    ]
}

window.onload= function () {
    // 一屏动画
    var screen_1=document.querySelector(".screen-1");
    setTimeout(screenAnimate('.screen-1'),300);
    //导航点击事件
    var navBtns=document.querySelectorAll(".header_nav_items");
    for(var i=0;i<navBtns.length;i++){
        navBtns[i].index=i;
        navBtns[i].onclick= function () {
            var follow=document.querySelector('.follow');
            var toLeft=this.offsetLeft;
            var index=this.index;
            document.querySelector('.current').classList.remove('current');
            this.classList.add("current");
            follow.style.left=toLeft+"px";
                document.body.scrollTop=index*800-60;
                document.documentElement.scrollTop=index*800-60;
                window.pageYOffset=index*800-60;
            // if(document.body.scrollTop!=undefined){
            //     document.body.scrollTop=index*800;
            // }
            // else if (window.pageYOffset!=undefined){
            //     window.pageYOffset=index*800;
            // }
            // else{
            //     document.documentElement.scrollTop=index*800;
            // }
        }
        navBtns[i].onmouseover= function () {
            var follow=document.querySelector('.follow');
            var toLeft=this.offsetLeft;
            followAnimate(follow,toLeft);
        };
        navBtns[i].onmouseout= function () {
            var follow=document.querySelector('.follow');
            var current=document.querySelector(".current");
            var toTarget=current.offsetLeft;
            followAnimate(follow,toTarget);
        }
    }
    //侧边栏点击事件
    var sideBarBtns=document.querySelectorAll('.sideBar_item');
    for(var j=0;j<sideBarBtns.length;j++){
        sideBarBtns[j].index=j;
        sideBarBtns[j].onclick= function () {
            document.querySelector('.active').classList.remove('active');
            this.classList.add("active");
            document.body.scrollTop=this.index*800;
            document.documentElement.scrollTop=this.index*800;
        }
    }
}
window.onscroll= function () {
    var scrollTop=getScroll();
    var header=getClass("header")[0];
    var headerNav=document.querySelector('.header_nav');
    var screen_2=document.querySelector('.screen-2');
    var ele=document.querySelector(".follow");
    var navBtns=document.querySelectorAll('.header_nav_items');
    var sideBarBtns=document.querySelectorAll('.sideBar_item');
    var target=0;
    // scrollTop<100?header.style.backgroundColor="#fff":header.style.backgroundColor="rgba(0,0,0,.5)";
    // console.log(scrollTop);
    if(scrollTop<100){
        header.style.backgroundColor="#fff";
        headerNav.style.color="#292E35";
    }
    else{
        header.style.backgroundColor="rgba(0,0,0,.5)";
        headerNav.style.color="#fff";
    }
    if(scrollTop<400){
        getClass("sideBar")[0].style.opacity=0;
    }
    else{
        getClass("sideBar")[0].style.opacity=1;
    }
    if(scrollTop<700){
        animate('.screen-1',navBtns[0],sideBarBtns[0]);
    }
    if(scrollTop>800*1-100){
        animate('.screen-2',navBtns[1],sideBarBtns[1]);
    }
    if(scrollTop>800*2-100){
        animate('.screen-3',navBtns[2],sideBarBtns[2]);
    }
    if(scrollTop>800*3-100){
        animate('.screen-4',navBtns[3],sideBarBtns[3]);
    }
    if(scrollTop>800*4-100){
        animate('.screen-5',navBtns[4],sideBarBtns[4]);
    }
}
//屏动画
function screenAnimate(className) {
    var start=false;
    for(var i=0;i<getAnimatedEle[className].length;i++){
        var oldClass=getAnimatedEle[className][i].substr(1);
        document.querySelector(getAnimatedEle[className][i]).setAttribute('class',start?oldClass+" "+oldClass+'_'+'animated_start':oldClass+" "+oldClass+'_'+'animated_done');
    }
    start=!start;
}

//跟随动画
function followAnimate(element,target) {

    clearInterval(element.timer);
    element.timer=setInterval(function () {
        //获取当前值
        var current=element.offsetLeft;
        //定义步长
        var step=0;
        step=(target-current)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        //重新定义
        element.style.left=element.offsetLeft+step+'px';
        //判断是否停止动画
        if(element.offsetLeft==target){
            clearInterval(element.timer);
        }
    },30)
}

//相应屏显示和navBtn跟随
function animate(screen,navBtn,sideBarBtns) {
    var follow=document.querySelector(".follow");
    screenAnimate(screen);
    target=navBtn.offsetLeft;
    followAnimate(follow,target);
    document.querySelector('.current').classList.remove('current');
    navBtn.classList.add("current");
    if(sideBarBtns){
        document.querySelector('.active').classList.remove('active');
        sideBarBtns.classList.add("active");
    }
}