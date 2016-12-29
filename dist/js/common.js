$(document).ready(function() {
    function reInit() {
        $(".js-select").select2({
            minimumResultsForSearch: Infinity
        });
        $(".js-datepicker").datepicker({
            language: "ru",
            todayHighlight: true,
            toggleActive: true,
            format: "dd.mm.yyyy",
            multidate: true,
            multidateSeparator: "-"
        });
    }
    $(".js-progress").ionRangeSlider({
        type: "single",
        min: 0,
        max: 5,
        step: 1,
        from: 1,
        keyboard: true,
        values: [ "1000", "2000", "3000", "4000", "5000" ],
        grid: true,
        prettify: function(num) {
            return num + " &euro;";
        }
    });
    $(".js-company-more-btn").on("click", function() {
        $(this).parents(".js-company").toggleClass("_open");
    });
    $(".js-rf-item").on("click", function() {
        if (!$(this).hasClass("_active")) {
            $(".js-rf-item").removeClass("_active");
            $(".js-rf-item").find("input[type=radio]").prop("checked");
            $(this).addClass("_active");
            $(this).find("input[type=radio]").prop("checked", true);
        }
    });
    $(document).on("click", ".js-insurance-ppl-add", function() {
        var list = $(this).parents(".js-insurance-ppl");
        var source = $("#insurancedPpl").html();
        var template = Handlebars.compile(source);
        var index = list.children().length;
        list.append(template({
            name: index
        }));
        reInit();
    });
    $(".js-tabs-item").on("click", function() {
        var parent = $(this).parents(".tabs");
        var tabData = $(this).attr("data-tab");
        parent.find(".js-tabs-item").removeClass("_active");
        $(this).addClass("_active");
        parent.find(".js-content-item").removeClass("_active");
        parent.find(".js-content-item[data-content=" + tabData + "]").addClass("_active");
    });
    $(".js-ao-close").on("click", function() {
        $(this).parents(".additional-options").toggleClass("_closed");
    });
    $(document).on("click", ".js-back-to-top", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
    $(".js-add-new-traveler").on("click", function() {
        var list = $(".js-travelers-list");
        var source = $("#addCard").html();
        var template = Handlebars.compile(source);
        var index = $(".js-travelers-list .add-card").length + 1;
        list.append(template({
            counter: index
        }));
        reInit();
    });
    $(document).on("click", ".js-add-card-close", function() {
        $(this).parent().remove();
        $(".add-card").each(function(index, item) {
            $(item).find(".add-card__counter").html(index + 1);
        });
    });
    $(".dropdown__header").on("click", function() {
        $(this).parent().toggleClass("_open");
    });
    $.fn.moveIt = function() {
        var $window = $(window);
        var instances = [];
        $(this).each(function() {
            instances.push(new moveItItem($(this)));
        });
        window.onscroll = function() {
            var scrollTop = $window.scrollTop();
            instances.forEach(function(inst) {
                inst.update(scrollTop);
            });
        };
    };
    var moveItItem = function(el) {
        this.el = $(el);
        this.speed = parseInt(this.el.attr("data-scroll-speed"));
    };
    moveItItem.prototype.update = function(scrollTop) {
        var pos = scrollTop / this.speed;
        if ($(".page__right").hasClass("scroll-to-fixed-fixed")) {} else {
            this.el.css("transform", "translateY(" + -pos + "px)");
        }
    };
    $(window).scrollTop(0);
    var scrollCounter = 0;
    var fixed = false;
    $(".page__inner_index .js-scroll-column:nth-of-type(2)").scrollToFixed({
        marginTop: function() {
            var marginTop = $(window).height() - $(".js-scroll-column:nth-of-type(2)").outerHeight(true) + 0;
            if (marginTop >= 0) {
                return 0;
            } else {
                return marginTop;
            }
        },
        zIndex: 1,
        postFixed: function() {
            console.log("fixed off");
        },
        preFixed: function() {
            console.log("fixed on");
        }
    });
    $(".calc .js-scroll-column:nth-of-type(1)").scrollToFixed({
        marginTop: function() {
            var marginTop = $(window).height() - $(".js-scroll-column:nth-of-type(1)").outerHeight(true) + 0;
            if (marginTop >= 0) {
                return 0;
            } else {
                return marginTop;
            }
        },
        zIndex: 1,
        postFixed: function() {
            console.log("fixed off");
        },
        preFixed: function() {
            console.log("fixed on");
        }
    });
});

$(".burger-menu").on("click", function() {
    if (!$(".burger-menu").hasClass("active")) {
        $(this).addClass("active");
        $(".menu_header").addClass("active");
    } else {
        $(this).removeClass("active");
        $(".menu_header").removeClass("active");
    }
});

$("#how-this-work").on("click", function(e) {
    $(".how-work-ins-travel").toggle();
    if ($(".burger-menu").hasClass("active")) {
        $(".burger-menu").removeClass("active");
        $(".menu_header").removeClass("active");
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".menu-how-work.top").addClass("active");
        } else {
            $(this).removeClass("active");
            $(".menu-how-work.top").removeClass("active");
            $(".content-how-work__item").removeClass("active");
        }
    } else {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".menu-how-work.top").addClass("active");
        } else {
            $(this).removeClass("active");
            $(".menu-how-work.top").removeClass("active");
            $(".content-how-work__item").removeClass("active");
        }
    }
});

$(".menu-how-work__link .link").on("click", function(e) {
    var link = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(link).offset().top - 113
    }, 200);
    $(".content-how-work__item").removeClass("active");
    $(".menu-how-work__link .link").removeClass("active");
    $(this).addClass("active");
    $(link).addClass("active");
});