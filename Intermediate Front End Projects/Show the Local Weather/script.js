$(function() {
	// load up initial weather forecast
	getLocation();
	setTimeout(function() {
		$('#weather-container').css('opacity', '1');
	}, 1000);
});

// Object that holds weather data for user's current location
var weatherData = {};


/* Get the user's current location and pass them to weatherunderground API */
function getLocation() {
	var changer = "pdodfdddddddfdodsdddddtddpi",
		key = "a45298e562cf9d32"
	url = "http://api.wunderground.com/api/" + key + "/geolookup/q/autoip.json";

	// Works over http
	$.getJSON(url, function(data) {
		// Get city
		var city = data.location.city.split(' ').join('_');
		var state = data.location.state;
		getConditions(city, state);
	});
}

/* Parse data to get what we want from weatherunderground API */
function getConditions(city, state) {
	var key = "a45298e562cf9d32",
		url = "http://api.wunderground.com/api/" + key + "/conditions/q/" + state + "/" + city + ".json";
	$.getJSON({
		url: url,
		success: function(json) {
			/* Object that holds data points for current conditions */
			var conditions = json.current_observation;
			console.log(conditions);
			weatherData = {
				tempInF: conditions.temp_f,
				tempInC: conditions.temp_c,
				tempIcon: conditions.icon_url,
				isF: true,
				forecastUrl: conditions.forecast_url,
				city: city.split('_').join(' '),
				state: state
			};
			displayConditions(weatherData);
		},
		error: function(err) {
			console.log('Fail');
		}
	});
}

function displayConditions(data) {
	$('#weather-container').html('');

	// render #weather-container
	var html = "<img src='" + data.tempIcon + "'>";
	html += "<h3>" + data.city + ", " + data.state + "</h3>";
	html += "<h1>";
	html += data.isF === true ? data.tempInF + "&degF</h1>" : data.tempInC + "&degC</h1>";
	html += "<a href='" + data.forecastUrl + "' target='_blank'>Extended forecast</a>";
	html += "<a onclick= 'changeUnit()'>Change units</a>";
	$('#weather-container').append(html);
}

// change unit from Celsius Fahrenheit
function changeUnit() {
	weatherData.isF === true ? weatherData.isF = false : weatherData.isF = true;
	displayConditions(weatherData);
}
