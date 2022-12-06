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

var cardTodayBody = $('.cardTodayBody')

function getWeatherToday() {
    var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    $.ajax({
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
        //humidty
        var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
        cardTodayBody.append(pElHumid);
        //wind speed
        var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
        cardTodayBody.append(pElWind);
        
        });
        getFiveDayForecast();
    };

    var fiveForecastEl = $('.fiveForecast');
    
    function getFiveDayForecast() {
        var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
        $.ajax({
            url: getUrlFiveDay,
            method: 'GET',
        }).then(function (response) {
            var fiveDayArray = response.list;
            var myWeather = [];
            //Made a object that would allow for easier data read
            $.each(fiveDayArray, function (index, value) {
                testObj = {
                    date: value.dt_txt.split(' ')[0],
                    time: value.dt_txt.split(' ')[1],
                    temp: value.main.temp,
                    feels_like: value.main.feels_like,
                    icon: value.weather[0].icon,
                    humidity: value.main.humidity
                }
    
                if (value.dt_txt.split(' ')[1] === "12:00:00") {
                    myWeather.push(testObj);
                }
            })

            for (let i = 0; i < myWeather.length; i++) {

                var divElCard = $('<div>');
                divElCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
                divElCard.attr('style', 'max-width: 200px;');
                fiveForecastEl.append(divElCard);
    
                var divElHeader = $('<div>');
                divElHeader.attr('class', 'card-header')
                var m = dayjs(`${myWeather[i].date}`).format('MM-DD-YYYY');
                divElHeader.text(m);
                divElCard.append(divElHeader)
    
                var divElBody = $('<div>');
                divElBody.attr('class', 'card-body');
                divElCard.append(divElBody);
    
                var divElIcon = $('<img>');
                divElIcon.attr('class', 'icons');
                divElIcon.attr('src', `https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);
                divElBody.append(divElIcon);
    
                //Temp
                var pElTemp = $('<p>').text(`Temperature: ${myWeather[i].temp} °F`);
                divElBody.append(pElTemp);
                //Feels Like
                var pElFeel = $('<p>').text(`Feels Like: ${myWeather[i].feels_like} °F`);
                divElBody.append(pElFeel);
                //Humidity
                var pElHumid = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);
                divElBody.append(pElHumid);
            }
        });

      
    };
    function initLoad() {

        var storeHist = JSON.parse(localStorage.getItem('city'));
    
        if (storeHist !== null) {
            storeHist = storeHist
        }
        getHistory();
        getWeatherToday();
    };
    
    initLoad();

