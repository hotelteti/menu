const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
window.addEventListener('popstate', event => {
	const showMenu = location.hash === '#menu';
	$('.nav').hidden = !showMenu;
	$('main').hidden = showMenu;

	if (showMenu) {
		window.scrollTo(0, 0);
	} else {
		$(location.hash).scrollIntoView();
	}
});

function zoomOnClick(event) {
	event.currentTarget.disabled = true;
	event.currentTarget.firstChild.style.height = 'auto';
}

$$('.dish-image').forEach(button => {
	button.addEventListener('click', zoomOnClick);
});

const allergenToggle = $('.toggle-allergens');
allergenToggle.addEventListener('click', () => {
	localStorage.showAllergens = Number(
		document.body.classList.toggle('show-allergens')
	);
});

document.body.classList.toggle(
	'show-allergens',
	Number(localStorage.showAllergens)
);
