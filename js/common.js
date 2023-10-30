'use strict';

// Preloader initialization
window.onload = () => {
    const preloader = document.querySelector('.preloader');
    document.body.classList.add('blocked');
    window.setTimeout(function () {
        preloader.classList.add('preloader_loaded');
        document.body.classList.remove('blocked');
    }, 500);
}

// If window's width changes, page will reload
// let oldWidth = window.innerWidth;
// window.onresize = function () {
// 	let newWidth = window.innerWidth;
// 	if (newWidth != oldWidth) {
// 		location.reload();
// 		oldWidth = newWidth;
// 	}
// };

document.addEventListener('DOMContentLoaded', () => {

    const numberBtn = document.querySelector('.number-btn'),
          numberBtnArrow = numberBtn.querySelector('svg'),
          fakeNumberBtn = document.querySelector('.phone-numbers__basic'),
          fakeNumberBtnArrow = document.querySelector('.phone-numbers__basic svg'),
          numberList = document.querySelector('.phone-numbers');

    // Tiny Number Modal
    numberBtn.addEventListener('click', () => {
        numberList.classList.add('phone-numbers_active');
        numberBtnArrow.classList.add('active');
        fakeNumberBtnArrow.classList.add('active');
    });
    function closeNumberList() {
        numberList.classList.remove('phone-numbers_active');
        numberBtnArrow.classList.remove('active');
        fakeNumberBtnArrow.classList.remove('active');
    }
    fakeNumberBtn.addEventListener('click', () => {
        closeNumberList();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.phone-numbers') && !e.target.closest('.number-btn') && numberList.classList.contains('phone-numbers_active')) {
            closeNumberList();
        }
    });

    
    const dropdownBurgerBtn = document.querySelector('.dropdown-burger'),
          dropdownBurgerDashes = document.querySelector('.dropdown-burger .burger'),
          dropdownBurgerMenu = document.querySelector('.header__products');
    const dropdownBurgerBtnMobile = document.querySelector('.dropdown-burger.mobile-hero'),
          dropdownBurgerBtnMobileDashes = document.querySelector('.dropdown-burger.mobile-hero .burger');
    
    // Dropdown with products (toggle for > 992px)
    if (document.documentElement.clientWidth > 992) {
        dropdownBurgerBtn.addEventListener('click', (e) => {
            dropdownBurgerDashes.classList.toggle('burger__active');
            dropdownBurgerMenu.classList.toggle('header__products_active');
            document.body.classList.toggle('blocked');
        });
    }

    // Close dropdown with products by clicking out of the box
    dropdownBurgerMenu.addEventListener('click', (e) => {
        if (!e.target.closest('.header__products-content')) {
            if (document.documentElement.clientWidth > 992) {
                dropdownBurgerDashes.classList.remove('burger__active');
            }

            removeBurgerBtnMobileDashes();

            dropdownBurgerMenu.classList.remove('header__products_active');
            document.body.classList.remove('blocked');
        }
    });

    if (dropdownBurgerBtnMobile) {
        dropdownBurgerBtnMobile.addEventListener('click', () => {
            if (dropdownBurgerBtnMobileDashes) {
                dropdownBurgerBtnMobileDashes.classList.add('burger__active');
            }
            dropdownBurgerMenu.classList.add('header__products_active');
            document.body.classList.add('blocked');
        });
    }

    function removeBurgerBtnMobileDashes() {
        if (dropdownBurgerBtnMobileDashes && dropdownBurgerBtnMobileDashes.classList.contains('burger__active')) {
            dropdownBurgerBtnMobileDashes.classList.remove('burger__active');
        }
    }

    // Tabs initialization in dropdown with products
    if (document.documentElement.clientWidth > 510) {
        const dropdownBurgerItems = document.querySelectorAll('.product-menu .product-menu__item');
        dropdownBurgerItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't give user category-links while we have tabs with products
                e.preventDefault();
                
                for (let elem of dropdownBurgerItems) {
                    elem.classList.remove('product-menu__item_active');
                    elem.nextElementSibling.classList.remove('product-menu__hidden_active');
                }
                item.classList.add('product-menu__item_active');
                item.nextElementSibling.classList.add('product-menu__hidden_active');
            });
        });
    }

    // Swiper JS
    const productsSlider = document.querySelectorAll('.products__slider');
    if (productsSlider.length >= 1) {
        productsSlider.forEach(slider => {
            new Swiper(slider, {
                direction: 'horizontal',
                slidesPerView: 'auto',
                centeredSlidesBounds: true,
                updateOnWindowResize: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        });
    }

    // Cart modal variables
    const cartBtn = document.querySelectorAll('.header__cart'),
          cartModal = document.querySelector('.modal_cart'),
          cartBody = document.querySelector('.modal_cart .modal__body'),
          cartCloseBtn = document.querySelector('.modal_cart__close');

    // Search modal variables
    const searchBtns = document.querySelectorAll('.search-cta'),
          searchModal = document.querySelector('.modal_search'),
          searchBody = document.querySelector('.modal_search .modal__body'),
          searchCloseBtn = document.querySelector('.modal_search__close');

    function openModal(btnArr, modal, body) {
        btnArr.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                body.classList.add('active');
                document.body.classList.add('blocked');
            });
        });
    }

    if (cartModal) {
        openModal(cartBtn, cartModal, cartBody);
    }
    
    openModal(searchBtns, searchModal, searchBody);

    // TEMPORARY call of the cart after clicking on the product button
    const addToCartBtn = document.querySelector('.product__info-to-cart');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.classList.add('active');
            cartBody.classList.add('active');
            document.body.classList.add('blocked');
        });
    }

    function closeModal(modal, body, close) {
        function closeActions() {
            modal.classList.remove('active');
            body.classList.remove('active');
            document.body.classList.remove('blocked');
        }
        close.addEventListener('click', () => {
            closeActions();
        });
        modal.addEventListener('click', (e) => {
            if (!e.target.closest('.modal__body')) {
                closeActions();
            }
        });
    }
    if (cartModal) {
        closeModal(cartModal, cartBody, cartCloseBtn);
    }
    closeModal(searchModal, searchBody, searchCloseBtn);

    // Cookies modal
    const cookiesNotice = document.querySelector('.cookies'),
          cookiesBody = document.querySelector('.cookies__body');

    if (typeof(cookiesNotice) != 'undefined' && cookiesNotice != null) {
        function checkCookies() {
            const cookiesDate = localStorage.getItem('cookiesDate');
            const cookiesCloseButton = cookiesNotice.querySelector('.cookies__btns-accept');
            if( !cookiesDate || (+cookiesDate + 31536000000) < Date.now() ){
                cookiesNotice.classList.add('cookies_active');
                cookiesBody.classList.add('cookies__body_active');
                document.body.classList.add('blocked');
            }
            cookiesCloseButton.addEventListener('click', () => {
                localStorage.setItem( 'cookiesDate', Date.now() );
                cookiesNotice.classList.remove('cookies_active');
                cookiesBody.classList.remove('cookies__body_active');
                document.body.classList.remove('blocked');
            });
        }
        checkCookies();
    }

    // Special offer modal
    const specialOfferWrapper = document.querySelector('.special-offer'),
          specialOfferBody = document.querySelector('.special-offer__body'),
          specialOfferCloseBtn = document.querySelector('.special-offer__close');

    if (specialOfferWrapper) {
        window.setTimeout(function(){ 
            if (window.localStorage) {
                const specialOffer = localStorage.getItem( 'specialOffer' );
        
                if (specialOffer > new Date()) {
                    return;
                }
                
                let expires = new Date();
                expires = expires.setHours(expires.getHours() + 24);
        
                localStorage.setItem( 'specialOffer', expires );
            }
        
            specialOfferWrapper.classList.add('special-offer_active');
            specialOfferBody.classList.add('special-offer__body_active');
        }, 30000);
    
        function closeSpecialOffer() {
            specialOfferWrapper.classList.remove('special-offer_active');
            specialOfferBody.classList.remove('special-offer__body_active');
        }
    
        specialOfferCloseBtn.addEventListener('click', () => {
            closeSpecialOffer();
        });
    
        if (document.documentElement.clientWidth <= 576) {
            specialOfferWrapper.addEventListener('click', (e) => {
                if (!e.target.closest('.special-offer__body')) {
                    closeSpecialOffer();
                }
            });
        }
    }

    // Burger Menu in mobiles
    const mobileMenuBurgerBtn = document.querySelector('.header__mobile-menu__burger'),
          mobileMenu = document.querySelector('.mobile-menu'),
          mobileMenuBody = document.querySelector('.mobile-menu__body'),
          mobileMenuCloseBtn = document.querySelector('.mobile-menu__close'),
          headerSearchBtn = document.querySelector('.header__search'),
          mobileSearchBtn = document.querySelector('.mobile-menu__search'),
          headerNav = document.querySelector('.header__nav'),
          heroSection = document.querySelector('.hero .container');

    if (document.documentElement.clientWidth <= 992) {
        mobileMenuCloseBtn.after(dropdownBurgerBtn);
        mobileSearchBtn.after(headerNav);

        if (heroSection) {
            heroSection.prepend(headerSearchBtn);
        } else {
            headerSearchBtn.remove();
        }
        
    }

    mobileMenuBurgerBtn.addEventListener('click', () => {
        if ( dropdownBurgerMenu.classList.contains('header__products_active') ) {
            mobileMenu.classList.add('mobile-menu_active');
            mobileMenuBody.classList.add('mobile-menu__body_active');
            document.body.classList.add('blocked');
            // ---
            dropdownBurgerMenu.classList.remove('header__products_active');
        } else {
            mobileMenu.classList.add('mobile-menu_active');
            mobileMenuBody.classList.add('mobile-menu__body_active');
            document.body.classList.add('blocked');
        }
        removeBurgerBtnMobileDashes();
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('mobile-menu_active');
        mobileMenuBody.classList.remove('mobile-menu__body_active');
        document.body.classList.remove('blocked');
    }

    mobileMenu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__body')) {
            closeMobileMenu();
        }
    });
    mobileMenuCloseBtn.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Dropdown with products (make active for <= 992px)
    if (document.documentElement.clientWidth <= 992) {
        dropdownBurgerBtn.addEventListener('click', (e) => {
            closeMobileMenu();
            dropdownBurgerMenu.classList.add('header__products_active');
            document.body.classList.add('blocked');
        });
    }

    // Close dropdown with products by close icon (make closed for <= 992px)
    const dropdownBurgerMenuCloseBtn = document.querySelector('.header__products-close');
    dropdownBurgerMenuCloseBtn.addEventListener('click', () => {
        dropdownBurgerMenu.classList.remove('header__products_active');
        document.body.classList.remove('blocked');
        removeBurgerBtnMobileDashes();
    });

    // Replace product names on parent wrapper in product-cards
    if (document.documentElement.clientWidth <= 375) {
        const productCardsNames = document.querySelectorAll('.product-card__name');
        productCardsNames.forEach(function(item) {
            item.parentElement.parentElement.prepend(item);
        });
    }
});