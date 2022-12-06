var key = 'e2e9e2de69bdf29accc1e83caa611a00';
var city = 'Minneapolis';
var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
// console.log('dayjs');
var cityData = [];


//saves text value of each search as an array in storage
$('.search').on("click", function (event){
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
        if(city === "") {
        return;
    };
    cityData.push(city);

    localStorage.setItem('city', JSON.stringify(cityData));
    fiveForecastEl.empty();
    getWeatherHistory();
    getTodayWeather();
});

//this will create buttons for the search history
var constHistEl = $('.cityHist');
function getWeatherHistory() {
    constHistEl.empty();

    for (let i = 0; i < cityData.length; i++) {
        var rowEl= $('<row>');
        var btnEl = $('<button>').text(`${cityData[i]}`)//

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
        getTodayWeather();    

    
    });
};

// grab today card body

var cardData = $('.cardData')

function getTodayWeather() {
    var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    $.ajax({
        url: getUrlCurrent,
        method: 'GET',
    }).then(function (response){
        $('.cardCityName').text(response.name);
        $('.TodayDate').text(date);

        //icons
        $('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        //temp
        var tempEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
        cardData.append(tempEl);
        //humidty
        var humidityEl = $('<p>').text(`Humidity: ${response.main.humidity} %`);
        cardData.append(humidityEl);
        //wind speed
        var windEl = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
        cardData.append(windEl);
        
        });
        getFiveDayForecast();
    };

    var fiveForecastEl = $('.fiveForecast');
    
    function getFiveDayForecast() {
        var getFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
        $.ajax({
            url: getFiveDay,
            method: 'GET',
        }).then(function (response) {
            var fiveDayWeatherArray = response.list;
            var theWeather = [];
            //Made a object that would allow for easier data read
            $.each(fiveDayWeatherArray, function (index, value) {
                testObj = {
                    date: value.dt_txt.split(' ')[0],
                    time: value.dt_txt.split(' ')[1],
                    temp: value.main.temp,
                    feels_like: value.main.feels_like,
                    icon: value.weather[0].icon,
                    humidity: value.main.humidity
                }
    
                if (value.dt_txt.split(' ')[1] === "12:00:00") {
                    theWeather.push(testObj);
                }
            })

            for (let i = 0; i < theWeather.length; i++) {

                var divCardData = $('<div>');
                divCardData.attr('class', 'card text-white bg-primary mb-3 cardOne');
                divCardData.attr('style', 'max-width: 200px;');
                fiveForecastEl.append(divCardData);
    
                var headerEl = $('<div>');
                headerEl.attr('class', 'card-header')
                var k = dayjs(`${theWeather[i].date}`).format('MM-DD-YYYY');
                headerEl.text(k);
                divCardData.append(headerEl)
                
                var bodyEl = $('<div>');
                bodyEl.attr('class', 'card-body');
                divCardData.append(bodyEl);
    
                var Icon = $('<img>');
                Icon.attr('class', 'icons');
                Icon.attr('src', `https://openweathermap.org/img/wn/${theWeather[i].icon}@2x.png`);
                bodyEl.append(Icon);
    
                var ElTemp = $('<p>').text(`Temperature: ${theWeather[i].temp} °F`);
                bodyEl.append(ElTemp);
                var ElFeel = $('<p>').text(`Feels Like: ${theWeather[i].feels_like} °F`);
                bodyEl.append(ElFeel);
                var ElHumidity = $('<p>').text(`Humidity: ${theWeather[i].humidity} %`);//
                bodyEl.append(ElHumidity);
            }
        });

      
    };
    function initLoad() {

        var storeHist = JSON.parse(localStorage.getItem('city'));
    
        if (storeHist !== null) {
            storeHist = storeHist
        }
        getWeatherHistory();
        getTodayWeather();
    };
    
    initLoad();

