// menu toggle
$(function () {
    var html = $('html, body'),
        navContainer = $('.nav-container'),
        navToggle = $('.nav-toggle'),
        navDropdownToggle = $('.has-dropdown');
    overlay = $("<div class='overlay'></div> ");
    overlay2 = $("<div class='overlay'></div> ");

    // Nav toggle
    navToggle.on('click', function (e) {
        overlay.toggle();
        var $this = $(this);
        e.preventDefault();
        $this.toggleClass('is-active');
        navContainer.toggleClass('is-visible');
        html.toggleClass('nav-open');
    });


    $("body").prepend(overlay);
    overlay.click(function () {
        navToggle.trigger('click');
        // $(this).toggle();
    })

    $("body").prepend(overlay2);
    overlay2.click(function () {
        $(this).toggle();
    })
    // Nav dropdown toggle
    navDropdownToggle.on('click', function () {
        var $this = $(this);
        $this.toggleClass('is-active').siblings().removeClass('is-active'); 
        if ($this.children('ul').hasClass('open-nav')) {
            $this.children('ul').removeClass('open-nav');
            $this.children('ul').slideUp(350);
        }
        else {
            $this.parent().parent().find('li .nav-dropdown').removeClass('open-nav');
            $this.parent().parent().find('li .nav-dropdown').slideUp(350);
            $this.children('ul').toggleClass('open-nav');
            $this.children('ul').slideToggle(350);
        }
    });

    // Prevent click events from firing on children of navDropdownToggle
    navDropdownToggle.on('click', '*', function (e) {
        e.stopPropagation();
    });


});

//scroll to top button
// ----------- croll --------------//
(function ($) {
    //Scroll to Top
    function headerStyle() {
        if ($('.header').length) {
            var windowpos = $(window).scrollTop();
            var scrollLink = $('.scroll-top');
            if (windowpos >= 185) {
                scrollLink.addClass('open');
            } else {
                scrollLink.removeClass('open');
            }
        }
    }
    headerStyle();
    // Scroll to Target
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }

    $(window).on('scroll', function () {
        headerStyle();
    });


})(window.jQuery);
$(".has-dropdown-1 .menu-link").click(function () {
    $(".product-dropdown").toggleClass("active");
});

// click language search
$( ".box-search i" ).on( "click", function() {
    $( ".search-pc" ).toggle();
});
//  fixed header 
$(window).on("scroll resize", function () {
  if (window.innerWidth >= 992) {
    if ($(document).scrollTop() > 10) {
      $(".header").addClass("fixd-header");
    } else {
      $(".header").removeClass("fixd-header");
    }
  } else {
    // Nếu dưới 992px thì luôn gỡ bỏ class (nếu có)
    $(".header").removeClass("fixd-header");
  }
});
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $(".menu_mb").addClass("fixd-header-mobile");
    } else {
      $(".menu_mb").removeClass("fixd-header-mobile");
    }
});

//Featured
$('.car-card').on('mouseleave', function () {
    var $card = $(this);
    var $firstBar = $card.find('.car-card__bar').first();
    var $image = $card.find('.car-card__image');
    var image = $firstBar.data('image');

    $card.find('.car-card__bar').removeClass('active');
    $firstBar.addClass('active');

    $image.css('opacity', 0);

    setTimeout(function () {
        $image.attr('src', image);
        $image.css('opacity', 1);
    }, 150);
});

$('.car-card__bar').on('mouseenter', function () {
    var $bar = $(this);
    var $card = $bar.closest('.car-card');
    var $image = $card.find('.car-card__image');
    var image = $bar.data('image');

    $card.find('.car-card__bar').removeClass('active');
    $bar.addClass('active');

    $image.css('opacity', 0);

    setTimeout(function () {
        $image.attr('src', image);
        $image.css('opacity', 1);
    }, 150);
});
// end Featured



document.addEventListener("DOMContentLoaded", () => {

	function setupRange({
		minInput,
		maxInput,
		active,
		output,
		format
	}) {
		const minEl = document.querySelector(minInput);
		const maxEl = document.querySelector(maxInput);
		const activeEl = document.querySelector(active);
		const outputEl = document.querySelector(output);

		function update() {
			let min = Number(minEl.value);
			let max = Number(maxEl.value);

			// Không cho 2 giá trị chồng/ngược nhau
			if (min > max) {
				[min, max] = [max, min];

				minEl.value = min;
				maxEl.value = max;
			}

			const minValue = Number(minEl.min);
			const maxValue = Number(minEl.max);

			const minPercent =
				((min - minValue) / (maxValue - minValue)) * 100;

			const maxPercent =
				((max - minValue) / (maxValue - minValue)) * 100;

			// Thanh xanh nằm giữa 2 thumb
			activeEl.style.left = `${minPercent}%`;
			activeEl.style.right = `${100 - maxPercent}%`;

			outputEl.textContent = format(min, max);
		}

		minEl.addEventListener("input", () => {
			if (Number(minEl.value) > Number(maxEl.value)) {
				minEl.value = maxEl.value;
			}

			update();
		});

		maxEl.addEventListener("input", () => {
			if (Number(maxEl.value) < Number(minEl.value)) {
				maxEl.value = minEl.value;
			}

			update();
		});

		update();
	}


	// PRICE
	setupRange({
		minInput: "#priceMin",
		maxInput: "#priceMax",
		active: "#priceActive",
		output: "#priceValue",

		format: (min, max) => {
			return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
		}
	});


	// 0-60 MPH
	setupRange({
		minInput: "#speedMin",
		maxInput: "#speedMax",
		active: "#speedActive",
		output: "#speedValue",

		format: (min, max) => {
			return `${min}s – ${max}s`;
		}
	}); 
});

// slider

$(".slider").owlCarousel({
    items: 1,
    responsive: {
        1200: { items: 1 },
        992: { items: 1 },
        768: { items: 1 },
        480: { items: 1 },
        0: { items: 1 }
    },
    rewind: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    smartSpeed: 3000, //slide speed smooth
    dots: false,
    dotsEach: false,
    loop: true,
    nav: true,
    navText: ['<i class="fa fa-angle-left arrow-slider"></i>', '<i class="fa fa-angle-right arrow-slider"></i>'],
    margin:0,
    animateOut: ['fadeOut'], // default: false
    animateIn: ['fadeIn'], // default: false
    center: false,
});
// end slider 
$(document).ready(function () { 
        var $section = $('#company-stats');
        var hasAnimated = false;

        function startCounters() {

            if (hasAnimated) {
                return;
            }

            hasAnimated = true;

            $section.find('.counter').each(function () {

                var $this = $(this);
                var target = parseInt($this.attr('data-target'), 10);

                $({ count: 0 }).animate(
                    {
                        count: target
                    },
                    {
                        duration: 2000,

                        easing: 'swing',

                        step: function (now) {
                            $this.text(
                                Math.floor(now).toLocaleString('en-US')
                            );
                        },

                        complete: function () {
                            $this.text(
                                target.toLocaleString('en-US')
                            );
                        }
                    }
                );

            });
        }


        function checkStatsPosition() {

            var windowTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            var sectionTop = $section.offset().top;

            // Khi phần tử đi vào khoảng 80% viewport
            if (
                windowTop + windowHeight * 0.8 >= sectionTop
            ) {
                startCounters();
            }
        }


        $(window).on('scroll', checkStatsPosition);

        // Kiểm tra luôn khi trang vừa load
        checkStatsPosition();

    });

// slider-car-card

$(".slider-car-card").owlCarousel({
    items: 3,
    responsive: {
        1200: { items: 3, slideBy: 3},
        992: { items: 3, slideBy: 3},
        768: { items: 2, slideBy: 2},
        480: { items: 1, slideBy: 1}, 
        0: { items: 1 }
    },
    rewind: false,
    autoplay: false,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    //smartSpeed: 3000, //slide speed smooth
    dots: true,
    dotsEach: false,
    loop: true,
    nav: true,
    navText: ['<i class="fa fa-angle-left arrow-slider"></i>', '<i class="fa fa-angle-right arrow-slider"></i>'],
    margin:30,   
    center: false,
});


$(".slider-panner").owlCarousel({
    items: 6,
    responsive: {
        1200: { items: 6},
        992: { items: 5},
        768: { items: 4},
        480: { items: 3}, 
        0: { items: 2 }
    },
    rewind: false,
    autoplay: false,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    //smartSpeed: 3000, //slide speed smooth
    dots: false,
    dotsEach: false,
    loop: true,
    nav: false,
    //navText: ['<i class="fa fa-angle-left arrow-slider"></i>', '<i class="fa fa-angle-right arrow-slider"></i>'],
    margin:30,   
    center: false,
});

$(".slider-related").owlCarousel({
    items: 4,
    responsive: {
        1200: { items: 4},
        992: { items: 3},
        768: { items: 2},
        480: { items: 2}, 
        0: { items: 2 }
    },
    rewind: false,
    autoplay: false,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    //smartSpeed: 3000, //slide speed smooth
    dots: false,
    dotsEach: false,
    loop: true,
    nav: true,
    navText: ['<i class="fa fa-angle-left arrow-slider"></i>', '<i class="fa fa-angle-right arrow-slider"></i>'],
    margin:30,   
    center: false,
});

