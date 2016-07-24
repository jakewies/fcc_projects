// document ready
$(function() {

	$('.container').hide();
	// get first quote
	getQuote();
	$('.container').show();

	// display buttons only after first quote appears
	setTimeout(function() {
		$('.button-box').animate({
			opacity: 1
		}, 500);
	}, 1500);

	// on click get quote
	$('button').on('click', getQuote);

});



/********
 * VARS *
 ********/
var quote,
	author;



/********************
 * Helper Functions *
 ********************/

// create ajax request
function getQuote() {

	$.ajax({
		headers: {
			'X-MASHAPE-KEY': '2s4KXUZihbmshVlAWd7OD9hfPCr7p1UPdSqjsn6fRMlc1Pk6k1'
		},
		url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
		success: function(quoteData) {

			// convert ajax response to json
			var response = JSON.parse(quoteData);
			quote = '"' + response.quote + '"';
			author = response.author;

			// function calls
			displayQuote();
			tweetURL();
			changeAccent();
		}
	});
}

// display new quote
function displayQuote() {
	$('.quote-box').animate({
			opacity: 0
		}, 500, function() {
			$(this).find('#quote').html(quote);
			$(this).find('#author').html('- ' + author);
			$(this).animate({
				opacity: 1
			}, 500);
	});
}

// change color of new quote button --> https://css-tricks.com/snippets/javascript/random-hex-color/
function changeAccent() {
	var color = '#' + Math.floor(Math.random()*16777215).toString(16);
	$('button').css('background-color', color);
}

// change href of twitter button to enable tweet action
function tweetURL() {
	var tweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " - " + author) + "&via=FreeCodeCamp";
	$('.fa').attr("href", tweet);
	console.log(tweet);
}
