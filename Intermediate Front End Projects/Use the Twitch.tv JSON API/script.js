$(function() {
	$('.close-button').hide();

	/***** DEMO *****/
	$('#demo-button').click(function(evt) {
		evt.preventDefault();
		$('form').slideToggle();
		demo();
		$('.close-button').show();
	});

	$('.close-button').click(function(evt) {
		document.getElementById('demo').innerHTML = "";
		$(this).hide();
		$('form').slideToggle();
	});
});

function demo() {
	// for every username in demo array
		var demoArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

		// make JSON call to twitch API to get data
		$(demoArray).each(function(index, value) {
			$.getJSON('https://api.twitch.tv/kraken/channels/' + value + '?callback=?', function(data) {
				console.log(data);

				/* Create channel object for each channel */
				var channel = new Channel(data.id, data.display_name, data.followers, data.game, data.logo, data.status, data.url, data.views);

				/* pass channel to displayFunction */
				displayChannel(channel);
			});
		});
}
/* Channel constructor */
function Channel(id, display_name, followers, game, logo, status, url, views) {
	this.id = id;
	this.displayName = display_name;
	this.followers = followers;
	this.game = game;
	this.logo = logo;
	this.status = status;
	this.url = url;
	this.views = views;
}

/* display List of Channels */
function displayChannel(channel) {

	// create a div element and give it a class name of channel
	var channelContainer = document.createElement('div');
	channelContainer.className = "channel";

	// create element to hold content for each channel
	var html = "<img src='" + channel.logo + "'>";

	if (channel.game) {
		html += "<a href='" + channel.url + "' target='_blank'><h2 class='online'>" + channel.displayName + "</h2></a>";
		html += "<p class='game'>playing " + "<a href='https://www.twitch.tv/directory/game/" + encodeURI(channel.game) +"'  target='_blank'>" + channel.game + "</a></p>";
		html+= "<p class='status'>" + channel.status + "</p>";
	}
	else {
		html += "<a href='" + channel.url + "'><h2 class='offline'>" + channel.displayName + "</h2></a>";
		html += "<p class='game'>offline</p>";
	}

	// insert content into .channel div
	channelContainer.innerHTML = html;

	// add the .channel div to list of channels
	$('#demo').append(channelContainer);
}
