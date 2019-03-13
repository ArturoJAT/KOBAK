$(function () {
  /* activate scrollspy menu */
  $('body').scrollspy({
    target: '#navbar-collapsible',
    offset: 52
  });


  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scroll-up').fadeIn();
    } else {
      $('.scroll-up').fadeOut();
    }

  });


  /* smooth scrolling sections */
  $('.smoothScroll').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 800);


        // activte animations in this section
        target.find('.animate').delay(1200).addClass("animated");
        setTimeout(function () {
          target.find('.animated').removeClass("animated");
        }, 2000);

        return false;
      }
    }
  });
  window.sr = ScrollReveal({ reset: true });
  sr.reveal('.box', { duration: 200 });
  sr.reveal('.banner', { duration: 200 });
  sr.reveal('.sectionbanner', { duration: 200 });

  sr.reveal('.galdiv',{duration:200});

});
window.onload = function () {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var numberOfDots = 100;
  var conDistance = 180;

  function Dot(x, y, dx, dy, r) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.r = r;

  }

  var dots = [];

  var parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  if (WIDTH <= 414) {
      numberOfDots = 25;
      conDistance = 120;
  }
  window.addEventListener('resize', function (event) {
      var parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      WIDTH = canvas.width;
      HEIGHT = canvas.height;

  });

  function init() {
      var r = 2;
      for (var i = numberOfDots; i--;) {

          var x = Math.floor(Math.random() * (WIDTH - 20)) + 10;
          var y = Math.floor(Math.random() * (HEIGHT - 20)) + 10;
          var dx = (Math.random()) * 2 - 1;
          var dy = (Math.random()) * 2 - 1;

          var dot = new Dot(x, y, dx, dy, r);
          dots.push(dot);

          r++;
          if (r > 5)
              r = 2;
      }
      start();
      requestAnimationFrame(start);

  }

  function start() {
      draw();
      requestAnimationFrame(start);
  }

  function draw() {
      clear();

      for (var i = numberOfDots; i--;) {
          if (dots[i].x > WIDTH) {
              dots[i].x = WIDTH - 30;
          }
          if (dots[i].y > HEIGHT) {
              dots[i].y = HEIGHT - 30;

          }
          for (var c = numberOfDots; c--;) {
              if (i + 1 < dots.length && c != i) {
                  line(dots[i], dots[c])
              }
          }
          circle(dots[i]);


          if (dots[i].x + dots[i].dx > WIDTH || dots[i].x + dots[i].dx < 0) {
              dots[i].dx = -dots[i].dx;
          }
          if (dots[i].y + dots[i].dy > HEIGHT || dots[i].y + dots[i].dy < 0) {
              dots[i].dy = -dots[i].dy;
          }

          dots[i].x += dots[i].dx;
          dots[i].y += dots[i].dy;
      }
  }

  function circle(dot) {
      ctx.beginPath();
      var color = (dot.x * 360) / WIDTH;
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
  }

  function line(dot1, dot2) {
      var a = dot1.x - dot2.x;
      var b = dot1.y - dot2.y;
      var c = Math.sqrt(a * a + b * b);
      if (c < conDistance) {
          ctx.beginPath();
          ctx.moveTo(dot1.x, dot1.y);
          ctx.lineTo(dot2.x, dot2.y);
          ctx.strokeStyle = 'rgba(255, 255, 255,' + (conDistance - c) / conDistance + ')';
          ctx.stroke();
      }
  }

  function clear() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

  }
  init();
}