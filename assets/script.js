var apiKey = "e2e9e2de69bdf29accc1e83caa611a00";
var city;
var responseText = document.getElementById('response-text');

var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


function getApi(requestUrl) {
    fetch(queryUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          responseText.textContent = response.status;
        }
        return response.json();
    });
  }
  
  getApi(queryUrl);