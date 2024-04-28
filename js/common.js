document.addEventListener('DOMContentLoaded', () => {

	const vh = window.innerHeight / 100;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

    const header = document.querySelector('.header'),
          body = document.querySelector('body');

    const burgerMenuBtn = document.querySelector('.header__burger'),
		  burgerMenuWindow = document.querySelector('.header__mobile-menu'),
		  burgerLinks = document.querySelectorAll('.header__mobile-menu__nav li a');

	burgerMenuBtn.addEventListener('click', () => {
		burgerMenuBtn.classList.toggle('header__burger_active');
		header.classList.toggle('header_burgered');
		burgerMenuWindow.classList.toggle('header__mobile-menu_active');
		body.classList.toggle('blocked');
	});

	burgerLinks.forEach(link => {
		link.addEventListener('click', () => {
			burgerMenuBtn.classList.remove('header__burger_active');
			header.classList.remove('header_burgered');
			burgerMenuWindow.classList.remove('header__mobile-menu_active');
			body.classList.remove('blocked');
		});
	});
});