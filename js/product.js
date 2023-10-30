'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const productSliderThumbs = document.querySelector('.product__slider-thumbs'),
          productSliderMain = document.querySelector('.product__slider-main');

    // Product images slider inizialization
    let productImgThumbsSlider = new Swiper(productSliderThumbs, {
        slidesPerView: 'auto',
        direction: 'vertical',
        freeMode: true,
      });
    let productImgSlider = new Swiper(productSliderMain, {
        spaceBetween: 18,
        thumbs: {
            swiper: productImgThumbsSlider,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                loop: true
            },
            426: {
                loop: false
            }
        }
    });
    
    if (document.documentElement.clientWidth <= 576) {
        document.querySelector('.upsell.product-page').classList.remove('product-page');
    }

    const btn360 = document.querySelector('.btn-360');
    function createProductImgSliderMobile() {
        document.querySelector('.product__slider-main .tag-compilation').after(btn360);
        productSliderThumbs.remove();
    }
    if (document.documentElement.clientWidth <= 425) {
        createProductImgSliderMobile();
    }
});