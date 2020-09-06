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

function filters () {
	entryList.filter(function (item) {
		var filterCategory = document.querySelector('#filter-category').value;
		return (filterCategory === 'all' || ((filterCategory === 'na') && item.values().category === '') || item.values().category.endsWith(filterCategory+'</a>'));
	});
}

document.querySelector('#filter-category').onchange = function () {filters();};

