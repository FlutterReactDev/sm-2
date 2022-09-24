$(document).ready(function () {

  AOS.init({
    once: true,
  });

  $(".keys_list").slick({
    variableWidth: true,
    arrows: false,
    touchThreshold: 100,
    slidesToScroll: 1,
  });
  tabMobiChange()
  tagCanvasResponse();
  incTab();

  cardsAnimation();
  slider();
  animateBg();
  techSlider();
  typingAnimation();
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
  var t = document.querySelectorAll(".ind_list_item"),
  a = document.querySelectorAll(".ind_icon_tab"),
  indText = document.querySelectorAll(".ind-text-tab");
 
  var dataIndex = ''
  var currentActiveInd = 0
for (let ind = 0; ind < t.length; ind++) {
  t[ind].addEventListener("click", function (e) {
      t[currentActiveInd].classList.remove("ind_list_item--active");
    if (e.target.parentNode.classList.contains("ind_list_item")) {
      e.target.parentNode.classList.add("ind_list_item--active");
      dataIndex = e.target.parentNode.dataset.contentIndex   
    } else {
      e.target.classList.add("ind_list_item--active");
      dataIndex = e.target.dataset.contentIndex      
    }
      a[currentActiveInd].style.display = "none";
      indText[currentActiveInd].style.display = "none";
      currentActiveInd = dataIndex
    $(a[currentActiveInd]).fadeIn(200),
      $(indText[currentActiveInd]).fadeIn(200);
  });
}

a[0].style.display = "block";
indText[0].style.display = "block";
}

function cardsAnimation() {
  var card = document.querySelector('.about_cards')
  var cards = document.querySelectorAll('.about_card') 
  var accardionCard = document.querySelectorAll('.card ')
  resetCard();
  $(accardionCard).click(function (e) {
    if (e.target.dataset.card) {
      var cardID = e.target.dataset.card;
      $(cards[cardID-1]).remove();
      $(card).prepend(createCard(cardID));

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
    $(cards).each(function (item) {
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
  var progressBarWidth =
    new Number($(".quiz_progress").css("width").replace("px", "")) / 5;

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

  $(".brief_quiz_btn-prev").css({
    display: "none",
  });

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
    if ($(e.target).is("img")) {
      if (e.target.parentNode.classList.contains("breif_left_icon")) {
        $(e.target.parentNode.parentNode).addClass("quiz_list_item--active");
      } else {
        dataValue = $(e.target.parentNode).attr("data-value");
        dataProp = $(e.target.parentNode).attr("data-prop");
        dataQuiz = $(e.target.parentNode).attr("data-quiz");
      }
    } else if (e.target.parentNode.classList.contains("quiz_list_item")) {
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

    if (currentSlide > 0) {
      $(".brief_quiz_btn-prev").css({
        display: "inline-block",
      });
    } else {
      $(".brief_quiz_btn-prev").css({
        display: "none",
      });
    }
  });
  $(".brief_quiz_btn-prev").click(function () {
    prevSlider();
    if (currentSlide > 0) {
      $(".brief_quiz_btn-prev").css({
        display: "inline-block",
      });
    } else {
      $(".brief_quiz_btn-prev").css({
        display: "none",
      });
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

    $(".progress_bar").css({
      width: `${(currentSlide + 1) * progressBarWidth - 4}`,
    });

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
    $(".progress_bar").css({
      width: `${(currentSlide + 1) * progressBarWidth - 4}`,
    });
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
  var techItem = document.querySelectorAll(".technology_list_item a")
  var techModal = document.querySelector(".technologies_modal")
  var techTags = document.querySelectorAll(".technologies_tags")
  var dataIndex= ''
  $(techItem).click(function (e) {
    e.preventDefault();
    
    dataIndex = e.target.dataset.contentIndex
    openModal()
    techTags[dataIndex].style.display = 'flex'
    $.fn.fullpage.setAllowScrolling(false);
  });

  $(".tag_close_btn").click(function () {
    closeModal()
    $.fn.fullpage.setAllowScrolling(true);
    techTags[dataIndex].style.display = 'none'
  });

  function openModal() {
    techModal.style.display = 'block'
  }
  function closeModal() {
    techModal.style.display = 'none'
  }
}

function tagCanvasResponse() {
  if ($(window).width() <= 767) {
    $("canvas").attr("width", "600");
    $("canvas").attr("height", "500");
  }

  if ($(window).height() <= 600) {
    $("canvas").attr("height", "400");
  }
  if($(window).width() <= 640) {
    $("#myCanvasContainer").hide();
  }
 
}

function typingAnimation() {
  var typed = new Typed(".area_code", {
    strings: [
      `<span style="color: #f083c3">public function index() </span><br /><span style="color: #000000">-</span><br /><span style="color: #000000">$this-load-›model('feedbac"</span><br /><span style="color: #000000">$data['feedbacks'] = $this- fee </span><br /><span style="color: #000000"><span style="color: #f083c3">if</span>(count($data['<span style="color: #807bed">feedbacks</span>']) § </span><br /><span style="color: #000000">$this÷load-›view('admin/feedbl</span><br /><span style="color: #000000">try else { </span><br /><span style="color: #000000">t</span><br /><span style="color: #f083c3">// you can change the new variable </span><br /><span style="color: #f083c3">}</span><br /><span style="color: #f083c3">//Controller Feedback pada method</span><br /><span style="color: #000000">$this-load-›view('<span style="color: #807bed">/feedback</span></span><br />`,
      `<span style="color: #f083c3">public function index() </span><br /><span style="color: #000000">-</span><br /><span style="color: #000000">$this-load-›model('feedbac"</span><br /><span style="color: #000000">$data['feedbacks'] = $this- fee </span><br /><span style="color: #000000"><span style="color: #f083c3">if</span>(count($data['<span style="color: #807bed">feedbacks</span>']) § </span><br /><span style="color: #000000">$this÷load-›view('admin/feedbl</span><br /><span style="color: #000000">try else { </span><br /><span style="color: #000000">t</span><br /><span style="color: #f083c3">// you can change the new variable </span><br /><span style="color: #f083c3">}</span><br /><span style="color: #f083c3">//Controller Feedback pada method</span><br /><span style="color: #000000">$this-load-›view('<span style="color: #807bed">/feedback</span></span><br />`,
    ],
    loop: true,
   
  });
}

function tabMobiChange() {
  var tabPaneList = document.querySelectorAll('.tab-pane')
  var navLinks = document.querySelectorAll('.nav-mobi-wrap .nav-link')
  
  $(".nav-mobi").slick({
    variableWidth: true,
    infinite: false,
    touchMove: false,
    adaptiveHeight: true,
    touchThreshold: 100,
    swipe: true,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><img src='img/slider-arrow-left.svg' alt=''/></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><img src='img/slider-arrow-right.svg' alt=''/></button>",
  });
  $(".nav-mobi").on("afterChange", function (event, slick, currentSlide) {
    tabPane = currentSlide;
    tabSlide = slick.$slides[currentSlide].children[0];
    hideElem(tabPaneList)
    showElem(tabPaneList,tabPane)
  });
  $(navLinks).click(function (e) {
    var tabId = e.target.getAttribute("data-slick-index")
      ? e.target.getAttribute("data-slick-index")
      : e.target.parentNode.parentNode.getAttribute("data-slick-index");

      hideElem(tabPaneList)
      showElem(tabPaneList,tabId)
  });

  function hideElem(elem) {
    for(let i =0;i < elem.length;i++) {
      tabPaneList[i].style.display = 'none'
    }
  }
  function showElem(elem,tabIndex) {
    for(let i =0; i < elem.length;i++) {
      if(elem[i].dataset.slickIndex == tabIndex) {
        $(elem[i]).fadeTo(50, 0.5).fadeTo(50, 1);
      }
    }
  }
}