var key = 'e2e9e2de69bdf29accc1e83caa611a00';
var city = 'Minneapolis';


var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
// console.log('dayjs');
var cityHist = [];


//saves text value of each search as an array in storage
$('.search').on("click", function (event){
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if(city === "") {
        return;
    };
    cityHist.push(city);

    localStorage.setItem('city', JSON.stringify(cityHist));
    fiveForecastEl.empty();
    getHistory();
    getWeatherToday();
});

//this will create buttons for the search history
var constHistEl = $('.cityHist');
function getHistory() {
    constHistEl.empty();

    for (let i = 0; i < cityHist.length; i++) {
        var rowEl= $('<row>');
        var btnEl = $('<button>').text(`${cityHist[i]}`)

        rowEl.addClass('row hisBtnRow');
        btnEl.addClass('btn btn-outline-seconday histBtn');
        btnEl.attr('type', 'button');

        constHistEl.prepend(rowEl);
        rowEl.append(btnEl);
    } if (!city) {
        return;
    }
    $('histBtn').on("click", function (event){
        event.preventDefault();
        city = $(this).text();
        fiveForecastEl.empty();
        getWeatherToday();    

    
    });
};

// grab today card body

var cardTodayBody = $('.cardBodyToday')

function getWeatherToday() {
    var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    $.fetch({
        url: getUrlCurrent,
        method: 'GET',
    }).then(function (response){
        $('.cardTodayCityName').text(response.name);
        $('cardTodayDate').text(date);

        //icons
        $('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        //temp
        var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
        cardTodayBody.append(pEl);
        // feels like 
        var pElTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
        cardTodayBody.append(pElTemp);
        //humidty
        var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
        cardTodayBody.append(pElHumid);
        //wind speed
        var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
        cardTodayBody.append(pElWind);
        // setting lat and long for the city that is searched
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;

        var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;


        $.fetch({
            url: getUrlUvi,
            method: 'GET',
        }).then(function (response){
            var pElUvi = $('<p>').text(`UV Index: `);
            var uviSpan = $('<span>').text(response.current.uvi);
            var uvi = response.current.uvi;
            pElUvi.append(uviSpan);
            vardToday
        })

        })
    }
}