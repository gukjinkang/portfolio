// $(window).on('load', function(){
//     $("html, body").animate({scrollTop: 0},1);
// });

// /*--------------------loading--------------------*/
// $(window).load(function(){
//    setTimeout(function(){
//        $(".loader_con").fadeOut(500,function(){
//            $("body").removeClass("loading");
//        });
//    },1500);
// });

// $(function(){
// /*--------------------header blur--------------------*/
//     $(window).scroll(function(){
//         if(50 < $(this).scrollTop()){
//             $("header").addClass("blur");
//         }else{
//             $("header").removeClass("blur");
//         }

// /*--------------------top_btn--------------------*/
//         if($(this).scrollTop() > 300){
//             $("a.t_btn").removeClass("hide");
//         }else{
//             $("a.t_btn").addClass("hide");
//         }

// /*--------------------section ani--------------------*/
//         if($("#intro").height() / 2 > $(this).scrollTop()){

//         }else{
//             $("#about").removeClass("hide")
//         }
//         if($("#about").offset().top > $(this).scrollTop()){

//         }else{
//             $("#skill").removeClass("hide")
//         }
//         if($("#skill").offset().top > $(this).scrollTop()){

//         }else{
//             $("#portfolio").removeClass("hide")
//         }
//         if($("#portfolio").offset().top > $(this).scrollTop()){

//         }else{
//             $("#contact").removeClass("hide")
//         }
//     });

// /*--------------------nav ani--------------------*/
//     $(document).on('click', 'a[href^="#"]', function (event) {
//         event.preventDefault();
//         $("html,body").stop().animate({
//             scrollTop: $($.attr(this, 'href')).offset().top - 80
//         }, 1000);
//     });
// });

// /*--------------------gallery--------------------*/
// $(function(){
//         $("#portfolio .width_con .four_con li .gall").click(function(){
//             var place = $(this).attr("data-place");
//             var img_count = $(this).attr("data-img-count");
//             var selected = "";
//             $(".gallery .list, .gallery .viewer").html("");
//             $(".gallery .viewer").append("<a href='img/"+place+"/img_"+place+"_01.jpg' target='_blank' style='cursor: zoom-in;'><img class='"+place+"_img' src='img/"+place+"/img_"+place+"_01.jpg'></a>");
//             for(i=1; i<=img_count; i++){
//                 if(i==1){
//                     selected = "selected"
//                 }else{
//                     selected = ""
//                 }
//                 $(".gallery .list").append("<img class='"+selected+"' src='img/"+place+"/img_"+place+"_0"+i+".jpg'>");
//             }
//             $("body, .gallery_cover, .gallery").addClass("on");
//         });
//     });
//     $(document).on("click",".gallery .list img",function(){
//         $(".gallery .list img").removeClass("selected");
//         $(this).addClass("selected");
//         var src= $(this).attr("src");
//         $(".gallery .viewer").fadeOut(100,function(){
//             $(this).fadeIn(100).find("img").attr("src",src);
//             $(this).fadeIn(100).find("a").attr("href",src);
//         });
//     });

// $(function(){
//     $(".gallery_cover, .gallery button").click(function(){
//         $("body, .gallery_cover, .gallery").removeClass("on");
//     });
// });

// $(document).keydown(function(event) {
//     if ( event.keyCode == 27 ) {
//         $("body, .gallery_cover, .gallery").removeClass("on");
//     }
// });

// window.onresize = () => {
//   starinit();
// }
// function starinit(){
//     var style = ["style1", "style2", "style3", "style4"];
//     var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
//     var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

//     function getRandomArbitrary(min, max) {
//       return Math.floor(Math.random() * (max - min)) + min;
//     }

//     var star = "";
//     var starArray = 250;
//     var starCon = document.querySelector(".star_con");
//     var widthWindow = window.innerWidth;
//     var heightWindow = window.innerHeight;

//     for (var i = 0; i < starArray; i++) {
//       star += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
//       + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
//       + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
//     }

//     starCon.innerHTML = star;

// }
// window.onload = () => {
//     starinit();
// }

const toggleBtn = document.querySelector('.mb_btn .menu');
const navOn = document.querySelector('.mNav');
const lock = document.querySelector('body');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  navOn.classList.toggle('on');
  lock.classList.toggle('lock');
});

$(function() {
  $(window).scroll(function() {
    if(300 < $(this).scrollTop()) {
      $("header").addClass("blur");
      } else {
        $("header").removeClass("blur");
      }
  });
});

var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 60;
var numStars = 500;

$(function() {

  //크기값 계산
  screenH = $(window).height();
  screenW = 1920;

  //캔버스 불러오기
  canvas = $('#star');

  //캔버스 채우기
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');

  //별 만들기
  for(var i=0; i<numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 1.5;
    var opacity = Math.random();

    var star = new Star(x, y, length, opacity);

    stars.push(star);
  }

    animateInterval = setInterval(animate, 1000 / fps);
});

//캔버스 애니메이션 적용
function animate() {
  context.clearRect(0, 0, screenW, screenH);
  $.each(stars, function() {
    this.draw(context);
  })
}

//애니메이션 중지
function stopAnimation() {
  clearInterval(animateInterval);
}

function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * .03;
}

Star.prototype.draw = function() {
  context.rotate((Math.PI * 1 / 10));

  context.save();

  context.translate(this.x, this.y);

  if(this.opacity > 1) {
    this.factor = -1;
  }
  else if(this.opacity <= 0) {
    this.factor = 1;

    this.x = Math.round(Math.random() * screenW);
    this.y = Math.round(Math.random() * screenH);
  }

  this.opacity += this.increment * this.factor;

  context.beginPath()
  for (var i=5; i--;) {
    context.lineTo(0, this.length);
    context.translate(0, this.length);
    context.rotate((Math.PI * 2 / 10));
    context.lineTo(0, - this.length);
    context.translate(0, - this.length);
    context.rotate(-(Math.PI * 6 / 10));
  }
  context.lineTo(0, this.length);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
  context.shadowBlur = 5;
  context.shadowColor = '#fff';
  context.fill();

  context.restore();
}

/*intro title*/
var leftAni = document.getElementById('intro_title1'),
    rightAni = document.getElementById('intro_title2');

;(function(){

  var throttle = function(type, name, obj){
    var obj = obj || window;
    var running = false;
    var func = function(){
      if (running){ return; }
      running = true;
      requestAnimationFrame(function(){
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("scroll", "optimizedScroll"); //optimizedScroll은 스크롤 작동을 하게
})();

window.addEventListener("optimizedScroll", function(){

  leftAni.style.transform = "translate(" + window.pageYOffset + "%)";
  rightAni.style.transform = "translate(-" + window.pageYOffset + "%)";
})

