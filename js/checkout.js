'use strict';

document.addEventListener('DOMContentLoaded', () => {
    $ = jQuery;
    $(document).ready(function(e) {
		e('#phone').mask('+38 (999) 999-99-99');
	});

    // jQuery Validate
    function validateForms(form) {
        $(form).validate({
            rules: {
                firstName: {
                    required: true,
                    minlength: 2,
                },
                lastName: {
                    required: true,
                    minlength: 2,
                },
                patronimic: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
            },
            messages: {
                firstName: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть принаймні {0} символа")
                },
                lastName: {
                    required: "Будь ласка, введіть своє прізвище",
                    minlength: jQuery.validator.format("Введіть принаймні {0} символа")
                },
                patronimic: {
                    required: "Будь ласка, введіть своє по батькові",
                    minlength: jQuery.validator.format("Введіть принаймні {0} символа")
                },
                phone: "Будь ласка, введіть свій номер телефону",
            }
        });
    }
    validateForms('form');

    // Cut and paste product-in-checkout amount in product info
    if (document.documentElement.clientWidth <= 375) {
        const productSoldAmount = document.querySelectorAll('.product__amount');
        productSoldAmount.forEach(function(item) {
            item.previousElementSibling.append(item);
        });
    }
    
    // Visualization of the transition from ordering to thanking for the purchase
    const checkoutProcessBlock = document.querySelector('.checkout__process'),
          checkoutSuccessBlock = document.querySelector('.checkout__success'),
          submitCheckoutBtn = document.querySelector('button.checkout__finish');
    
    submitCheckoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkoutProcessBlock.classList.add('checkout__process_hidden');
        checkoutSuccessBlock.classList.add('checkout__success_show');
        window.scrollTo(0, 0);
    });
});