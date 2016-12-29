$(document).ready(function () {
  /**
   * Реинициализация для шаблонизации
   */
  function reInit() {
    $('.js-select').select2({
      minimumResultsForSearch: Infinity
    });
    $('.js-datepicker').datepicker({
      language: "ru",
      todayHighlight: true,
      toggleActive: true,
      format: "dd.mm.yyyy",
      multidate: true,
      multidateSeparator: "-"
    });
  }

  /**
   * Фиксируем колонку, если она доскролена до конца экрана
   */

  /**
   * Инициализация RangeSlider
   */
  $('.js-progress').ionRangeSlider({
    type: "single",
    min: 0,
    max: 5,
    step: 1,
    from: 1,
    keyboard: true,
    values: ["1000", "2000", "3000", "4000", "5000"],
    grid: true,
    prettify: function (num) {
      return num + ' &euro;';
    }
  });

  /**
   * Разворачивание подробной информации в блоке "Страхование путешественников"
   */
  $('.js-company-more-btn').on('click', function () {
    $(this).parents('.js-company').toggleClass('_open');
  });

  /**
   * Переключение радиокнопок в блоке "Готовые решения"
   */
  $('.js-rf-item').on('click', function () {
    if (!$(this).hasClass('_active')) {
      $('.js-rf-item').removeClass('_active');
      $('.js-rf-item').find('input[type=radio]').prop('checked');
      $(this).addClass('_active');
      $(this).find('input[type=radio]').prop('checked', true)
    }
  });

  /**
   * Добавление нового человека в "Кол-во" застрахованых
   */
  $(document).on('click', '.js-insurance-ppl-add', function () {
    var list = $(this).parents('.js-insurance-ppl');
    var source = $("#insurancedPpl").html();
    var template = Handlebars.compile(source);
    var index = list.children().length;

    list.append(template({name: index}));
    reInit();
  });

  /**
   * Переключение табов
   */
  $('.js-tabs-item').on('click', function () {
    var parent = $(this).parents('.tabs');
    var tabData = $(this).attr('data-tab');

    parent.find('.js-tabs-item').removeClass('_active');
    $(this).addClass('_active');
    parent.find('.js-content-item').removeClass('_active');
    parent.find('.js-content-item[data-content=' + tabData + ']').addClass('_active');
  });

  /**
   * Сворачивание/разворачивание "Дополнительные опции"
   */
  $('.js-ao-close').on('click', function () {
    $(this).parents('.additional-options').toggleClass('_closed');
  });

  /**
   * Крутим скролл страницы наверх
   */
  $(document).on('click', '.js-back-to-top', function () {
    $("html, body").animate({scrollTop: 0}, 600);
  });

  /**
   * Добавление путешественника
   */
  $('.js-add-new-traveler').on('click', function () {
    var list = $('.js-travelers-list');
    var source = $('#addCard').html();
    var template = Handlebars.compile(source);
    var index = $('.js-travelers-list .add-card').length + 1;

    list.append(template({counter: index}));
    reInit();
  });

  /**
   * Удаление карточки путешественника
   */
  $(document).on('click', '.js-add-card-close', function () {
    $(this).parent().remove();
    $('.add-card').each(function (index, item) {
      $(item).find('.add-card__counter').html(index + 1)
    })
  });

  /**
   * Закрывание дропдауна
   */
  $('.dropdown__header').on('click', function () {
    $(this).parent().toggleClass('_open');
  });




  /**
   * Скролл с разной скоростью для двух колонок
   */
   $.fn.moveIt = function(){
      var $window = $(window);
      var instances = [];

      $(this).each(function(){
        instances.push(new moveItItem($(this)));
      });

      window.onscroll = function(){
        var scrollTop = $window.scrollTop();
        instances.forEach(function(inst){
          inst.update(scrollTop);
        });
      }
    }

    var moveItItem = function(el){
      this.el = $(el);
      this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function(scrollTop){
      var pos = scrollTop / this.speed;
      if($('.page__right').hasClass("scroll-to-fixed-fixed")){
        // this.el.css('transform', 'translateY(' + 0 + 'px)');
      }else{
        this.el.css('transform', 'translateY(' + -pos + 'px)');
      }
      // this.el.css('transform', 'translateY(' + -pos + 'px)');
    };

    // Initialization
    // $(function(){
    //   $('[data-scroll-speed]').moveIt();
    //  });

   /**
   * фиксируем контент
   */
  $(window).scrollTop(0);
  var scrollCounter = 0;
  var fixed = false;
  $('.page__inner_index .js-scroll-column:nth-of-type(2)').scrollToFixed( {
      marginTop: function() {
        var marginTop = $(window).height() - $('.js-scroll-column:nth-of-type(2)').outerHeight(true) +0;
        if (marginTop >= 0) {
          return 0;

        }else{
          return marginTop;

        }

      },
      zIndex: 1,
      postFixed: function() {
        console.log('fixed off');
        // $(this).css('transform', 'translateY(0)')
      },
      preFixed: function() {
        console.log('fixed on');
        // $(this).css('transform', 'translateY(1px)')
      }
   } );
  $('.calc .js-scroll-column:nth-of-type(1)').scrollToFixed( {
      marginTop: function() {
        var marginTop = $(window).height() - $('.js-scroll-column:nth-of-type(1)').outerHeight(true) +0;
        if (marginTop >= 0) {
          return 0;

        }else{
          return marginTop;

        }

      },
      zIndex: 1,
      postFixed: function() {
        console.log('fixed off');
        // $(this).css('transform', 'translateY(0)')
      },
      preFixed: function() {
        console.log('fixed on');
        // $(this).css('transform', 'translateY(1px)')
      }
   } );

  // $('.calc #insurance-policy').scrollToFixed( {
  //     marginTop: 113,
  //     limit: 1000,
  //     zIndex: 1,
  //     postFixed: function() {
  //       console.log('fixed off');
  //       // $(this).css('transform', 'translateY(0)')
  //     },
  //     preFixed: function() {
  //       console.log('fixed on');
  //       // $(this).css('transform', 'translateY(1px)')
  //     }
  //  } );


  // $(window).on('scroll', function () {
  //   var _scrollCurrentCounter = $(this).scrollTop();

  //   if ($('.js-scroll-column:nth-of-type(1)').height() < $('.js-scroll-column:nth-of-type(2)').height()) {
  //     $('.js-scroll-column:nth-of-type(2)').removeClass('js-fix-this');
  //     $('.js-scroll-column:nth-of-type(1)').addClass('js-fix-this');
  //   }
  //   if ($('.js-scroll-column:nth-of-type(2)').height() < $('.js-scroll-column:nth-of-type(1)').height()) {
  //     $('.js-scroll-column:nth-of-type(1)').removeClass('js-fix-this');
  //     $('.js-scroll-column:nth-of-type(2)').addClass('js-fix-this');
  //   }

  //   var _fixedBottomPosition = document.querySelector('.js-fix-this').getBoundingClientRect().bottom;

  //   if (!fixed && _fixedBottomPosition <= $(window).height()) {
  //     fixed = true;
  //     $('.js-fix-this').addClass('_fixed');
  //     scrollCounter = _scrollCurrentCounter;
  //   }

  //   if (_scrollCurrentCounter < scrollCounter) {
  //     $('.js-fix-this').removeClass('_fixed');
  //     fixed = false;
  //   }
  // });


});

/**
   *  CUSTOM SCROLL
   */
// new SimpleBar($('.content-how-work')[0])
// new SimpleBar($('#work-service')[0])
// new SimpleBar($('#insurance-policy')[0])
  // var el = document.querySelector('.content-how-work');
  // var serchScroll = document.querySelector('.scrollSeacrh');
  // Ps.initialize(el);
  // Ps.initialize(serchScroll);
// new SimpleBar(document.getElementById('#insurance-policy'), { autoHide: false });
// new SimpleBar(document.getElementById('#work-service'), { autoHide: false });

// $(window).on('scroll', function () {
//     var _scrollCurrentCounter = $(this).scrollTop();

//     if ($('.js-scroll-column:nth-of-type(1)').height() < $('.content-how-work .active').height()) {
//       console.log($('.content-how-work .active').height() +'this one')
//     }
//     else{
//       console.log($('.js-scroll-column:nth-of-type(1)').height()+'this two')
//     }
//   });

 // var contentHowWork = new SimpleBar('.content-how-work');
 /**
   *  Popup linkc
   */

// console.log(window.location.hash)
// var workService = window.location.hash

// if(workService === '#work-service'){
//   alert(1)
//   $('#work-service').addClass('active')
//   $('.how-work-ins-travel').show();
//   $('.how-work-ins-travel .top').addClass('active')
// }

 /**
   *  Меню accordion_menu
   */
// burger
$('.burger-menu').on('click', function () {

  if(!$('.burger-menu').hasClass('active')){
    $(this).addClass('active');
    $('.menu_header').addClass('active');
  }else{
    $(this).removeClass('active');
    $('.menu_header').removeClass('active');
  }

})
/**
   *  Меню how-work
   */

$('#how-this-work').on('click', function (e) {
  // e.preventDefault();

  $( ".how-work-ins-travel" ).toggle();


  if($('.burger-menu').hasClass('active')){
    $('.burger-menu').removeClass('active');
    $('.menu_header').removeClass('active');

    if(!$(this).hasClass('active')){
      $(this).addClass('active')
      $('.menu-how-work.top').addClass('active')
    }else{
      $(this).removeClass('active')
      $('.menu-how-work.top').removeClass('active');
      $('.content-how-work__item').removeClass('active');

    }

  }else{
    if(!$(this).hasClass('active')){
      $(this).addClass('active')
      $('.menu-how-work.top').addClass('active')
    }else{
      $(this).removeClass('active')
      $('.menu-how-work.top').removeClass('active');
      $('.content-how-work__item').removeClass('active');

    }
  }

});

$('.menu-how-work__link .link').on('click', function (e) {


  var link = $(this).attr('href');
  $('html, body').animate({
    scrollTop: $(link).offset().top - 113
  }, 200);

  // $('.content-how-work').show();
  $('.content-how-work__item').removeClass('active');
  $('.menu-how-work__link .link').removeClass('active');


  $(this).addClass('active');

  $(link).addClass('active');
  // console.log(link);

});