var key = 'e2e9e2de69bdf29accc1e83caa611a00';
var city = 'Minneapolis';


var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
console.log('dayjs');
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