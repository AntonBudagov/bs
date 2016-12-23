// (function(mainApp) {




//   "use strict";

//   $("input[type='tel']").mask("?+7 (999) 999-99-99");


//   const price = 20000



// /*
// --------------------------------------------------------------------------------
// Anchor
// --------------------------------------------------------------------------------
// */
// var $root = $('html, body');

// $('.anchor').on('click', function(e){
//     $root.animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 500);
//     return false;
// });
// /*
// --------------------------------------------------------------------------------
// SUM
// --------------------------------------------------------------------------------
// */

//   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     $('#numberCounter1').attr('type', 'number');

//     document.addEventListener('gesturestart', function (e) {
//       e.preventDefault();
//     });

//   }else{

//     $('#numberCounter1').attr('type', 'text');
//     // check code press
//     $('#numberCounter1').on('keypress', function(e){

//       if(e.which == 8){
//         return true
//       }
//       else if ((e.which < 48 || e.which > 57) || (e.wich < 96 || e.wich > 105)) {
//         return false
//       }
//       else{
//         if($('#numberCounter1').val() == '' && e.which == 48){
//           return false
//         }
//       }
//     })
//   }

//   $('#numberCounter1').keyup(function(){
//       var number = parseInt($('#numberCounter1').val())
//       if(Number.isNaN(number)){
//         $('#price1').text('20 000 руб.')
//       }else{
//         var sum = price * number;
//         // console.log(spaceNumber(sum))
//         $('#price1').text(spaceNumber(sum)+ ' руб.')

//       }

//     })

//   function spaceNumber(n) {
//     n += "";
//     n = new Array(4 - n.length % 3).join("U") + n;
//     return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
//   }

// /*
// --------------------------------------------------------------------------------
// Form
// --------------------------------------------------------------------------------
// */
//   $('form').submit(function(e){
//       e.preventDefault();

//       var error = false;

//       $(this).find('input').each(function(){
//           var elem = $(this);
//           if(elem.val() === ''){
//               error = true;
//               elem.addClass('error');
//           } else {
//               elem.removeClass('error');

//               if (elem.attr('name')=='email') {
//                   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//                   if (re.test(elem.val())) {
//                       elem.removeClass('error');
//                   } else {
//                       error = true;
//                       elem.addClass('error');
//                   }
//               }

//               if (elem.attr('name')=='phone') {
//                 if (elem.val().length === 18) {
//                     elem.removeClass('error');
//                 } else {
//                     error = true;
//                     elem.addClass('error');
//                 }
//               }

//           }
//       });

//       if (!error) {
//           var form_data = $(this).serializeArray();

//           // count PC
//           if($(this).hasClass('countTrue')){
//             var count = parseInt($("#numberCounter1").val()) || 0;
//             var price = count * 20000;
//             if (count>0){ form_data.push({name: 'count', value: count}); form_data.push({price: 'price', value: price + ' руб.'});}
//           }
//           $.ajax({
//               type: "POST",
//               url: "send.php",
//               data: form_data,
//               dataType: 'json'
//           }).done(function (res) {
//               if (res.send) {
//                   document.location.href = '/thanks.html';
//               } else {
//                   alert("Возникла ошибка при отправке формы!!!")
//               }
//           });
//       }
//   })


// /*
// --------------------------------------------------------------------------------
// Map
// --------------------------------------------------------------------------------
// */
// ymaps.ready(function () {
//     var makrCenter = '';
//     var mapCenter = '';
//     if($(window).width() <= 768){

//       mapCenter = [46.954074, 142.750985];
//       makrCenter = [46.954074, 142.750985];

//     }else{

//       mapCenter = [46.954074, 142.748985];
//       makrCenter = [46.954074, 142.750985];

//     }
//     var myMap = new ymaps.Map('map', {
//       center: mapCenter,
//       zoom: 17,
//       controls: []
//     });

//       // Создадим geolacation.
//       var geolocation = ymaps.geolocation;
//       // Создадим пользовательский макет ползунка масштаба.
//       var  ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='myControlar'>" +
//                 "<div id='zoom-in' class='btn'><i class='icon-plus i-plus'></i></div><br>" +
//                 "<div id='zoom-out' class='btn'><i class='icon-minus i-minus'></i></div>" +
//             "</div>", {

//             // Переопределяем методы макета, чтобы выполнять дополнительные действия
//             // при построении и очистке макета.
//             build: function () {
//                 // Вызываем родительский метод build.
//                 ZoomLayout.superclass.build.call(this);

//                 // Привязываем функции-обработчики к контексту и сохраняем ссылки
//                 // на них, чтобы потом отписаться от событий.
//                 this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
//                 this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

//                 // Начинаем слушать клики на кнопках макета.
//                 $('#zoom-in').bind('click', this.zoomInCallback);
//                 $('#zoom-out').bind('click', this.zoomOutCallback);
//             },

//             clear: function () {
//                 // Снимаем обработчики кликов.
//                 $('#zoom-in').unbind('click', this.zoomInCallback);
//                 $('#zoom-out').unbind('click', this.zoomOutCallback);

//                 // Вызываем родительский метод clear.
//                 ZoomLayout.superclass.clear.call(this);
//             },

//             zoomIn: function () {
//                 var map = this.getData().control.getMap();
//                 // Генерируем событие, в ответ на которое
//                 // элемент управления изменит коэффициент масштабирования карты.
//                 this.events.fire('zoomchange', {
//                     oldZoom: map.getZoom(),
//                     newZoom: map.getZoom() + 1
//                 });
//             },

//             zoomOut: function () {
//                 var map = this.getData().control.getMap();
//                 this.events.fire('zoomchange', {
//                     oldZoom: map.getZoom(),
//                     newZoom: map.getZoom() - 1
//                 });
//             }
//         });


//       // Добавим элемент управления с собственной меткой геолокации на карте.
//       var geolocationControl = new ymaps.control.GeolocationControl({
//           // data: {
//           //     // content: 'Красная кнопка!',
//           //     // title: 'Нажмите на кнопку'
//           // },
//           options: {noPlacemark: true,
//                     layout: ymaps.templateLayoutFactory.createClass(
//                   // Если кнопка не нажата, к ней применится css-стиль 'myButton'
//                   // Если кнопка нажата, к ней применятся css-стили 'myButton' и 'myButtonSelected'.
//                    "<div class='myControlar'><div id='path-in' class='btn'><i class='i-path'></i></div><br></div>"
//                   // "<div class='myButton {% if state.selected %}myButtonSelected{% endif %}' id='i-path' title='{{ data.title }}'>" +
//                   // "{{ data.content }}" +
//                   // "</div>"
//               )}
//           });
//         // geolacation event
//         geolocationControl.events.add('click', function (event) {

//        ymaps.geolocation.get({
//           // Выставляем опцию для определения положения по ip
//           provider: 'yandex',
//           // Автоматически геокодируем полученный результат.
//           mapStateAutoApply: true,
//           autoReverseGeocode: true
//           }).then(function (result) {
//           // Выведем в консоль данные, полученные в результате геокодирования объекта.
//           result.geoObjects.get(0).properties.get('metaDataProperty');
//           // console.log(result.geoObjects.get(0).properties.get('metaDataProperty'))
//           result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
//           myMap.geoObjects.add(result.geoObjects);
//           });
//         });
//       // создаем точку на карте
//       // var  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//       var  myPlacemark = new ymaps.Placemark(makrCenter, {

//             hintContent: 'Контакт',
//             balloonContent: 'г. Южно-Сахалинск, ул. Имени космонавта Поповича 23 – 101'
//         }, {
//             // Опции.
//             // Необходимо указать данный тип макета.
//             iconLayout: 'default#image',
//             // Своё изображение иконки метки.
//             iconImageHref: 'img/mark.png',
//             // Размеры метки.
//             iconImageSize: [96, 64],
//             // Смещение левого верхнего угла иконки относительно
//             // её "ножки" (точки привязки).
//             iconImageOffset: [-26, -62]
//         }),
//     zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });

//     // myMap.controls.add(geolocationControl);
//     myMap.controls.add(geolocationControl, { float: 'none', position: {left: '20px', top: '90px'} });

//     myMap.controls.add(zoomControl,  { float: 'none', position: {left: '20px', top: '150px'} });
//     myMap.geoObjects.add(myPlacemark);
//     myMap.behaviors.disable('scrollZoom');
//     $(window).width() <= 768 ? myMap.behaviors.disable("drag") : myMap.behaviors.enable("drag");

//   });

// })(window);
