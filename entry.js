function hideIfEmpty(elem, compare) {
	if(elem.textContent.trim() === compare) {
		// is empty
		elem.style.display = 'none';
	}
}

hideIfEmpty(document.querySelector('.post-stats'), '');
hideIfEmpty(document.querySelector('.post-genre'), 'genre:');
hideIfEmpty(document.querySelector('.post-cost'), 'cost:');
hideIfEmpty(document.querySelector('.post-category'), 'category:');
hideIfEmpty(document.querySelector('.post-source'), 'source:');

