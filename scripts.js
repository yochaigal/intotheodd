var options = {
	valueNames: [
		'name',
		'source',
		'author',
		'summary',
		'stats',
		'category']
};

var entryList = new List('entry-list', options);
var hash = window.location.hash;
var searchInput = document.querySelector('input.search');
var splitExp = /,\s+/; // split commas with trailing spaces

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
	tmp.innerHTML = html.trim().toLowerCase();
	return tmp.textContent || tmp.innerText || '';
}

function unique(value, index, self) {
	return (self.indexOf(value) === index) && (value != '');
}

/**
 * Returns an array of unique options of the valueName (splitting commas), plus 'all' and 'n/a' options.
 */
function getOptions(valueName) {
	var raw = entryList.items.map(obj => stripHtml(obj.values()[valueName])).filter(unique);
	var result = [];
	for(i = 0; i < raw.length; i++) {
		result = result.concat(raw[i].toLowerCase().split(splitExp));
	}
	return Array.prototype.concat('all', result.filter(unique).sort(), 'n/a');
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
var filterCategory = document.querySelector('#filter-category');

function filters () {
	entryList.filter(function (item) {
		var source = filterSource.value;
		var author = filterAuthor.value;
		var category = filterCategory.value;

		return (source === 'all'
				|| ((source == 'n/a') && item.values().source.trim() === '')
				|| (stripHtml(item.values().source).split(splitExp).indexOf(source) >= 0))
			&& (author === 'all'
				|| ((author === 'n/a') && item.values().author.trim() === '')
				|| (stripHtml(item.values().author).split(splitExp).indexOf(author) >= 0))
			&& (category === 'all'
				|| ((category === 'n/a') && item.values().category.trim() === '')
				|| (stripHtml(item.values().category).split(splitExp).indexOf(category) >= 0));
	});
}

populateOptions(filterSource, getOptions('source'));
filterSource.onchange = function () {filters();};

populateOptions(filterAuthor, getOptions('author'));
filterAuthor.onchange = function () {filters();};

populateOptions(filterCategory, getOptions('category'));
filterCategory.onchange = function () {filters();};

