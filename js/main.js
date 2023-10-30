'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Swiper JS
    const heroSliderImg = new Swiper('.hero__slider-img', {
        speed: 2000,
        parallax: true,
        slidesPerView: 1,
    });
    const heroSliderText = new Swiper('.hero__slider-text', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 2000,
        touchAngle: 45,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        }
    });
    try {
        heroSliderImg.controller.control = heroSliderText;
        heroSliderText.controller.control = heroSliderImg;
    } catch(e) {
      
    }


    const laborNode = document.querySelector('.hero__labor-heading .rect').nextSibling,
          laborTimetable = document.querySelector('.hero__labor-timetable');

    if (document.documentElement.clientWidth <= 768) {
        laborNode.remove();
        laborTimetable.firstChild.textContent = 'ПН-ПТ: ';
        laborTimetable.lastChild.previousSibling.textContent = 'СБ-НД: ';
    }
});