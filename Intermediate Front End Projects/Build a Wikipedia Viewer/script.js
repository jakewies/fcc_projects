/* Get Request */
$(function() {
	// getWikiData();
	$('form').submit(function(evt) {
		evt.preventDefault();
		// reset results
		$('.search-results').html('');
		// make ajax request
		getWikiData(encodeURI($('.search-box').val()));
	});
});

function getWikiData(query) {
		// Make ajax request
		$.ajax({
			type: 'GET',
			url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cpageimages%7Cextracts&generator=search&redirects=1&inprop=url&pilimit=50&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=' + query + '&gsrlimit=10&callback=?',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				displayResults(data.query.pages);
				//console.log(data.query.pages);
			},
			error: function(errorMessage) {
				console.log(errorMessage);
			},
		});
}

function displayResults(pages) {
	for (var page in pages) {
		// declare parent element to contain each result
		var anchor = document.createElement('a');
		anchor.setAttribute('target', '_blank');
		anchor.setAttribute('href', pages[page].canonicalurl);
		anchor.className = "result";

		// declare inner html for each result
		var html = "<div>";

		// add result info
		if (pages[page].thumbnail) {
			html += "<img src='" + pages[page].thumbnail.source + "' alt='" + pages[page].title + "'>";
		}
		html += "<h2>" + pages[page].title + "</h2>";
		html += "<p>" + pages[page].extract + "</p>";

		// end inner html
		html += "</div>";

		// add html to containing parent element
		anchor.innerHTML = html;
		$('.search-results').append(anchor);
	}
}
