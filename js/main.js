'use strict'

document.addEventListener('DOMContentLoaded', () => {

	let oldWidth = window.innerWidth;
	window.onresize = function () {
		let newWidth = window.innerWidth;
		if (newWidth != oldWidth) {
			location.reload();
			oldWidth = newWidth;
		}
	};

    const header = document.querySelector('.header'),
          body = document.querySelector('body');

	// Cookies modal
    const cookiesNotice = document.querySelector('.cookies');

    if (typeof(cookiesNotice) != 'undefined' && cookiesNotice != null) {
        function checkCookies() {
            const cookiesDate = localStorage.getItem('cookiesDate');
            const cookiesAcceptButton = cookiesNotice.querySelector('.cookies__accept');
            const cookiesDeclineButton = cookiesNotice.querySelector('.cookies__decline');
            let cookiesBtns = [cookiesAcceptButton, cookiesDeclineButton];
            if( !cookiesDate || (+cookiesDate + 31536000000) < Date.now() ){
                cookiesNotice.classList.add('cookies_active');
            }
            cookiesBtns.forEach(function(item) {
                item.addEventListener('click', function() {
                    localStorage.setItem( 'cookiesDate', Date.now() );
                    cookiesNotice.classList.remove('cookies_start');
                    cookiesNotice.classList.remove('cookies_active');
                    cookiesNotice.classList.add('cookies_hidden');
                });
            });
        }
        checkCookies();
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > document.documentElement.clientHeight - 75) {
            header.classList.add('header_scrolled');
        } else if (window.scrollY < document.documentElement.clientHeight - 75) {
            header.classList.remove('header_scrolled');
        }
    });

	window.addEventListener('load', function() {
		const scrollPosition = localStorage.getItem('scrollPosition');
		if (scrollPosition && parseInt(scrollPosition) > (document.documentElement.clientHeight - 75)) {
			header.classList.add('header_scrolled');
		} else {
			header.classList.remove('header_scrolled');
		}
	});
	window.addEventListener('scroll', function() {
		localStorage.setItem('scrollPosition', window.scrollY);
	});

    document.querySelectorAll('.terms__item-header').forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            let content = this.nextElementSibling;
            let arrow = this.lastElementChild;
            if (content.classList.contains('visible')) {
                content.classList.remove('visible');
                arrow.classList.remove('active');
            } else {
                content.classList.add('visible');
                arrow.classList.add('active');
            }
        });
    });

    const thankyou = document.querySelector('.thankyou'),
	      overlay = document.querySelector('.overlay'),
	      temporaryBtn = document.querySelector('.contacts__form-btn'),
          closeThankyou = document.querySelector('.thankyou__back');

	function openThankyouModal() {
		temporaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
			if (thankyou.classList.contains('thankyou_hidden')) {
				thankyou.classList.remove('thankyou_hidden');
			}
			thankyou.classList.add('thankyou_active');
			overlay.classList.add('overlay_active');
			body.classList.add('blocked');
		});
	}
	openThankyouModal();

    closeThankyou.addEventListener('click', function() {
        thankyou.classList.remove('thankyou_active');
		thankyou.classList.add('thankyou_hidden');
        overlay.classList.remove('overlay_active');

		if (!header.classList.contains('header_burgered')) {
			body.classList.remove('blocked');
		}

		window.setTimeout(function() { 
			thankyou.classList.remove('thankyou_hidden');
		}, 1500);
    });

    // jQuery Validate
	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2,
				},
				email: {
					required: true,
					email: true,
				},
                message: {
                    required: false,
                },
			},
			messages: {
				name: {
					required: 'Please enter your name',
					minlength: $.validator.format('Please enter at least {0} symbols')
				},
				email: {
					required: 'Please enter your e-mail address',
					email: 'Please enter valid e-mail address'
				}
			}
		});
	}
	validateForm('.contacts__form');

	const offer = document.querySelector('.offer'),
	      contactsLink = document.querySelector('.offer__content-btn'),
          closeOffer = document.querySelector('.offer__close'),
		  offerArr = [contactsLink, closeOffer];

	if (offer && document.documentElement.clientHeight >= 425) {
		window.setTimeout(function() { 
			if (window.localStorage) {
				const offer = localStorage.getItem( 'offer' );
		
				if (offer > new Date()) {
					return;
				}
				
				let expires = new Date();
				expires = expires.setHours(expires.getHours() + 24);
		
				localStorage.setItem( 'offer', expires );
			}
		
			offer.classList.add('offer_active');
			overlay.classList.add('overlay_active');
			body.classList.add('blocked');
		}, 30000);
	}

	function closeOfferModal() {
		offerArr.forEach(function(item) {
			item.addEventListener('click', function() {
				offer.classList.remove('offer_active');
				offer.classList.add('offer_hidden');
				overlay.classList.remove('overlay_active');

				if (!header.classList.contains('header_burgered')) {
					body.classList.remove('blocked');
				}

				window.setTimeout(function() { 
					offer.classList.remove('offer_hidden');
				}, 1500);
			});
		});
	}
	closeOfferModal();

	if (document.documentElement.clientWidth <= 992) {
		document.querySelector('.hero__hint-text').textContent = 'Swipe down';
	}
	if (document.documentElement.clientWidth <= 576) {
		document.querySelectorAll('.metrics__item-descr br').forEach(function(item) {
			item.replaceWith(' ');
		});
	}

	if (document.documentElement.clientWidth <= 576) {
        document.querySelector('.cookies__descr br').replaceWith(' ');
	}
});

$('a[href^="#"]').bind('click.smoothscroll',function (e) {
	e.preventDefault();
	let target = this.hash,
		$target = $(target);
	if (document.documentElement.clientWidth >= 576) {
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - 150
		}, 900, 'swing');
	} else {
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - 140
		}, 900, 'swing');
	}
});