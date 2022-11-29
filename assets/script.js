var key = 'e2e9e2de69bdf29accc1e83caa611a00';
var city = 'Minneapolis';


var date = dayjs().format('dddd, MMMM Do YYYY');
var datetime = dayjs()('YYYY-MM-DD HH:MM:SS')

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
