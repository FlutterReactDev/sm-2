$(document).ready(function () {
  var tabPane = 0;
  var tabSlide = ''
  $(".anyclass").click(function () {
    // Действие при клике
    $(".anyclass").hide(200); // Действие скрывать
    $(".anyclass").show(200); // Действие показывать
    $(".anyclass").fadeOut(300); // Плавное исчезновение
    $(".anyclass").fadeIn(300); // Плавное показ
    $(".anyclass").fadeTo(300, 0.5).fadeTo(300, 1); // Исчезновение и Показ

    $(".anyclass").css({
      // Css свойства
      display: "flex",
    });

    $(".anyclass").animate(
      {
        // анимирование на высоту или ширину
        display: "flex",
      },
      3000
    );

    $(".anyclass").slideUp(300); // Сворачивать Скрывать с верху

    $(".anyclass").slideDown(300); // Сворачивать Показывать с верху

    $(".anyclass").text(Hi); // текст

    $(".anyclass").width(150); // ширина
    $(".anyclass").height(300); // высота
  });
  // if($(window).width() <= 767) {
  //   $('.section_keys .container .row').addClass('h-100')
  // }
  $(".keys_list").slick({
    variableWidth: true,
    arrows: false,
    adaptiveHeight: true,
  });
  $(".nav-mobi").slick({
    variableWidth: true,
    infinite: false,
    touchMove: false,
    adaptiveHeight: true,
    swipe:true,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><img src='img/slider-arrow-left.svg' alt=''/></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><img src='img/slider-arrow-right.svg' alt=''/></button>",
  });
  $('.nav-mobi').on('afterChange', function(event, slick, currentSlide){
   tabPane = currentSlide
   tabSlide = slick.$slides[currentSlide].children[0]
  
 
  tabSlide.click()
  });
  $(".nav-link ").click(function (e) {
    $(".nav-link ").removeClass("active");
  });
  $(window).resize(function() {
    if ($(window).width() < 767) {
      $("canvas").attr("width", '600');
      $("canvas").attr("height", '500');
    }else {
      $("canvas").attr("width", '800');
      $("canvas").attr("height", '600');
    }
});
  incTab();
  cardsAnimation();
  slider();
  animateBg();
  techSlider();
});
function animateBg() {
  $(document).mousemove(function (n) {
    if (window.innerWidth < 768) return;
    if ($(".modal").hasClass("modal--active")) return;
    animateMainBg(n.pageX / window.innerWidth, n.pageY / window.innerHeight);
  });

  function animateMainBg(n, a) {
    var coordinate1 = 0;
    var coordinate2 = 0;
    (coordinate1 = 10 * (n -= 1)),
      (coordinate2 = 10 * (a -= 1)),
      $(".main_img_1").css(
        "transform",
        `translate3d(${coordinate1 * 3}px, ${coordinate2 * 3}px, 0)`
      );
    $(".main_img_2").css(
      "transform",
      `translate3d(${coordinate1 * 2}px, ${coordinate2 * 2}px, 0)`
    );
    $(".technologies_content").css(
      "transform",
      `translate3d(${coordinate1 * 2}px, ${coordinate2 * 2}px, 0)`
    );
  }
}
function incTab() {
  $(".ind_list_item").click(function (e) {
    var data = "";

    $(".ind_list_item").removeClass("ind_list_item--active");
    if (e.target.parentNode.classList.contains("ind_list_item")) {
      $(e.target.parentNode).addClass("ind_list_item--active");
      data = $(e.target.parentNode).attr("data-tab");
    } else {
      $(e.target).addClass("ind_list_item--active");

      data = $(e.target).attr("data-tab");
    }

    $(".inc_icon_tab").css({ display: "none" });
    $(`.ind-text-tab`).css({ display: "none" });
    $(`.inc_icon_tab[data-content='${data}']`).fadeIn();
    $(`.ind-text-tab[data-content='${data}']`).fadeIn();
  });

  $(".inc_icon_tab").first().fadeIn();
  $(".ind-text-tab").fadeOut();
  $(".ind-text-tab").first().fadeIn();
}
function cardsAnimation() {
  resetCard();
  $(".card").click(function (e) {
    if ($(e.target).attr("data-card")) {
      var cardID = $(e.target).attr("data-card");
      $(`.about_card[data-card="${cardID}"]`).remove();
      $(".about_cards").prepend(createCard(cardID));

      resetCard();

      // $(`.about_card[data-card="${cardID}"]`).animate({
      //   top: '150px',
      //   left:'350px'
      // },100);

      // setTimeout(function () {
      //   resetCard()
      //   $(`.about_card[data-card="${cardID}"]`).animate({'top': '-19px','left':'26px'});
      // },400)
    }
  });
  function resetCard() {
    var maxIndex = 5;
    $(".about_card").each(function (item) {
      $(".about_card")
        .eq(item)
        .css({
          top: `-${(item + 1) * 19}px`,
          left: `${(item + 1) * 26}px`,
          zIndex: `${maxIndex}`,
        });
      maxIndex--;
    });
  }

  function createCard(img) {
    return `<div class="about_card" data-card="${img}">
    <img src="img/card${img}.png" alt=""/>
  </div>`;
  }
}
function slider() {
  var progressBarWidth = new Number($('.quiz_progress').css("width").replace('px', ''))/5;

  var currentSlide = 0;
  var currentQuiz = 1;
  var currentQuizActive = 0;

  var activeElemets = {};
  var data = {
    projectType: "",
    projectPlatform: "",
    projectState: "",
    projectStart: "",
    contact: {
      username: "",
      phone: "",
      email: "",
      comment: "",
    },
  };

    $('.brief_quiz_btn-prev').css({
      display:'none'
    })
  
  $(".quiz_content").css({ display: "none" });
  $(".quiz_content").first().css({ display: "block" });
  $(".brief_breadcrumbs_item")
    .first()
    .addClass("brief_breadcrumbs_item--active");

  $(".quiz_list_item").click(function (e) {
    var dataValue = "";
    var dataProp = "";
    var dataQuiz = "";
    $(".quiz_list_item").removeClass("quiz_list_item--active");
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--filled");

    if (e.target.parentNode.classList.contains("quiz_list_item")) {
      $(e.target.parentNode).addClass("quiz_list_item--active");
      dataValue = $(e.target.parentNode).attr("data-value");
      dataProp = $(e.target.parentNode).attr("data-prop");
      dataQuiz = $(e.target.parentNode).attr("data-quiz");
      activeElemets[dataQuiz] = dataValue;
    } else {
      $(e.target).addClass("quiz_list_item--active");
      dataValue = $(e.target).attr("data-value");
      dataProp = $(e.target).attr("data-prop");
      dataQuiz = $(e.target).attr("data-quiz");
      activeElemets[dataQuiz] = dataValue;
    }
    addActiveClass(activeElemets);
    data[dataProp] = dataValue;
    $(".brief_breadcrumbs_item .brief_breadcrumbs_item_name")
      .eq(dataQuiz)
      .text(data[dataProp]);
  });
  $(".quiz_list_item").click(function () {
   
      nextSlider();
     
      if(currentSlide > 0) {
        $('.brief_quiz_btn-prev').css({
          display:'inline-block'
        })
      }else {
        $('.brief_quiz_btn-prev').css({
          display:'none'
        })
      }
  });
  $(".brief_quiz_btn-prev").click(function () {
   
    prevSlider();
    if(currentSlide > 0) {
      $('.brief_quiz_btn-prev').css({
        display:'inline-block'
      })
    }else {
      $('.brief_quiz_btn-prev').css({
        display:'none'
      })
    }
  });

  $(".brief_quiz_btn-submit").click(onSubmit);
  function onSubmit() {
    console.log(data);
  }
  function nextSlider() {
    $(".quiz_content").eq(currentSlide).fadeOut();
    $(".brief_breadcrumbs_item").removeClass("brief_breadcrumbs_item--active");
    itemPick = "";
    currentSlide++;
    currentQuizActive++;
    if (currentQuizActive > 4) {
      currentQuizActive = 4;
    }
    if ($(".quiz_content").eq(currentSlide).attr("data-pass") == "false") {
      currentQuiz++;
    }
    if (currentSlide > 4) {
      currentSlide = 4;
    }
    if (currentQuiz > 5 && currentSlide > 4) {
      currentQuiz = 5;
    }
    if (currentSlide == 4) {
      $(".brief_quiz_btn-submit").css({ display: "inline-block" });
      $(".brief_quiz_btn-next").css({ display: "none" });
    }
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--active");

    $(".progress_bar").css({ width: `${(currentSlide + 1) * progressBarWidth - 4}` });

    $(".quiz_step span").text(currentSlide + 1);
    $(".quiz_content").eq(currentSlide).attr("data-pass", "true");
    setTimeout(function () {
      $(".quiz_content").eq(currentSlide).fadeIn();
    }, 400);
  }
  function prevSlider() {
    $(".quiz_content").eq(currentSlide).fadeOut();
    $(".brief_quiz_btn-submit").css({ display: "none" });
    $(".brief_quiz_btn-next").css({ display: "inline-block" });
    currentSlide--;
    currentQuizActive--;
    if (currentQuizActive < 0) {
      currentQuizActive = 0;
    }
    if (currentSlide < 0) {
      currentSlide = 0;
    }
    $(".brief_breadcrumbs_item").removeClass("brief_breadcrumbs_item--active");
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--active");
    $(".progress_bar").css({ width: `${(currentSlide + 1) * progressBarWidth - 4}` });
    $(".quiz_step span").text(currentSlide + 1);
    setTimeout(function () {
      $(".quiz_content").eq(currentSlide).fadeIn();
    }, 400);
  }
  function addActiveClass(items) {
    for (const key in items) {
      $(`.quiz_list_item[data-value="${items[key]}"]`).addClass(
        "quiz_list_item--active"
      );
    }
  }
}
function techSlider() {
  $(".technology_list_item a").click(function (e) {
    e.preventDefault();
    var dataContent = $(e.target).attr("data-content");

    $(".technologies_modal").css({
      display: "block",
    });

    $(`.technologies_tags[data-content="${dataContent}"]`).css({
      display: "flex",
    });
    $(".tag_close_btn").click(function () {
      $(".technologies_modal").css({
        display: "none",
      });
      $(".technologies_tags").css({ display: "none" });
    });
  });

  $(".technologies_tags").css({ display: "none" });
}
