var options = {
	valueNames: [
		'name',
		'source',
		'author',
		'summary',
		'stats',
		'genre',
		'category']
};

var entryList = new List('entry-list', options);
var hash = window.location.hash;
var searchInput = document.querySelector('input.search');

if(hash.length > 1) {
	searchInput.value = hash.substr(1);
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("keyup", false, true);
		searchInput.dispatchEvent(evt);
	}
	else {
		searchInput.fireEvent("onkeyup");
	}
}

searchInput.addEventListener('keyup', function () {
	window.location.hash = this.value;
});

function stripHtml(html){
	var tmp = document.createElement('div');
	tmp.innerHTML = html.trim();
	return tmp.textContent.replace(/\s/g, '') || tmp.innerText.replace(/\s/g, '') || '';
}

function unique(value, index, self) {
	return (self.indexOf(value) === index) && (value != '');
}

/**
 * Returns an array of unique options of the valueName, plus 'all' and 'n/a' options.
 */
function getOptions(valueName) {
	return Array.prototype.concat('all', entryList.items.map(obj => stripHtml(obj.values()[valueName])).filter(unique).sort(), 'n/a');
}

/**
 *	Populates given select form with options.
 *	@param select
 *	@param options Array of the options
 */
function populateOptions(select, options) {
	for(var i = 0; i < options.length; i++) {
		var option = options[i];
		var element = document.createElement('option');
		element.textContent = option;
		element.value = option;
		select.appendChild(element);
	}
}

var filterSource = document.querySelector('#filter-source');
var filterAuthor = document.querySelector('#filter-author');
var filterGenre = document.querySelector('#filter-genre');
var filterCategory = document.querySelector('#filter-category');


function filters () {
	entryList.filter(function (item) {
		var source = filterSource.value;
		var author = filterAuthor.value;
		var genre = filterGenre.value;
		var category = filterCategory.value;

		return (source === 'all'
				|| ((source == 'n/a') && item.values().source.trim() === '')
				|| (stripHtml(item.values().source) === source))
			&& (author === 'all'
				|| ((author === 'n/a') && item.values().author.trim() === '')
				|| (stripHtml(item.values().author) === author))
			&& (genre === 'all'
				|| ((genre === 'n/a') && item.values().genre.trim() === '')
				|| (stripHtml(item.values().genre) === genre))
			&& (category === 'all'
				|| ((category === 'n/a') && item.values().category.trim() === '')
				|| (stripHtml(item.values().category) === category));
	});
}

populateOptions(filterSource, getOptions('source'));
filterSource.onchange = function () {filters();};

populateOptions(filterAuthor, getOptions('author'));
filterAuthor.onchange = function () {filters();};

populateOptions(filterGenre, getOptions('genre'));
filterGenre.onchange = function () {filters();};

populateOptions(filterCategory, getOptions('category'));
filterCategory.onchange = function () {filters();};
