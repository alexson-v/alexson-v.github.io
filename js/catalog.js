'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const priceRange = document.querySelector('.filters__price .range'),
          priceRangeInputs = document.querySelectorAll('.filters__price .inputs input');
    
    noUiSlider.create(priceRange, {
        start: [1200, 12387],
        connect: true,
        range: {
            'min': 1200,
            'max': 12387
        }
    });

    priceRange.noUiSlider.on('update', function (values, handle) {
        priceRangeInputs[handle].value = parseInt(values[handle]);
    });
      
    priceRangeInputs[0].addEventListener('change', function () {
        priceRange.noUiSlider.set([this.value, null]);
    });
    
    priceRangeInputs[1].addEventListener('change', function () {
        priceRange.noUiSlider.set([null, this.value]);
    });


    const filtersModal = document.querySelector('.mobile-filters'),
          filtersBody = document.querySelector('.filters'),
          filtersBtn = document.querySelector('.catalog__btn.filter'),
          filtersBtnClose = document.querySelector('.mobile-filters__close');
    
    if (document.documentElement.clientWidth <= 992) {
        filtersModal.append(filtersBody);
    }

    filtersBtn.addEventListener('click', () => {
        filtersModal.classList.add('mobile-filters_active');
        filtersBody.classList.add('filters_active');
        document.body.classList.add('blocked');
    });

    function closeMobileFilters() {
        filtersModal.classList.remove('mobile-filters_active');
        filtersBody.classList.remove('filters_active');
        document.body.classList.remove('blocked');
    }
    filtersBtnClose.addEventListener('click', () => {
        closeMobileFilters();
    });
    filtersModal.addEventListener('click', (e) => {
        if (!e.target.closest('.filters')) {
            closeMobileFilters();
        }
    });
});