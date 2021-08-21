var cityInputArray = [];
var pastArray = [];
var today = moment();
var APIKey = '42ebbcabbd6bc88838ddb3a3c08682cb';
var onLoad = ''

if (localStorage.getItem('City') !== null) {
  onLoad = localStorage.getItem('City');
}

var onLoadArray = onLoad.split(',')
console.log(onLoadArray)
if (onLoadArray) {
  for (var i = 0; i < onLoadArray.length; i++) {
    var liHistory = document.createElement('li');
    liHistory.setAttribute('class', 'history-list-class');
    liHistory.textContent = onLoadArray[i];
    $('#history-list').append(liHistory)
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function loadDash() {
  $('#main-dashboard-container').show();
  $('#main-todays-container').hide();
  $('#main-5-container').hide();
}

loadDash()

$('#dash-btn').on('click', loadDash)

$('#todays-btn').on('click', todaysForecast)

function todaysForecast () {
  $('#main-dashboard-container').hide();
  $('#main-todays-container').show();
  $('#main-5-container').hide();
}

$('#five-btn').on('click', function () {
  $('#main-dashboard-container').hide();
  $('#main-todays-container').hide();
  $('#main-5-container').show();
})

$(".todays-date").text('Today is ' + today.format("MMM Do, YYYY"));
console.log(today);

$('#search-button').on('click', function () {
  $('.history-list-class').html('');
  cityHistoryArray = [];
  pastArray = [];

  if(typeof pastArray == 'string') {
    pastArray = pastArray.split(',')
  }
  console.log(pastArray)

  var cityInput = $('#search-input').val();
  currentCity = cityInput;

  cityInputArray.push(cityInput);
  cityInputArray.push(onLoadArray);
  localStorage.setItem('City', cityInputArray);
  console.log(cityInputArray);
  console.log(cityHistoryArray)
  var cityHistory = localStorage.getItem('City');

  if (cityHistory) {
    cityHistoryArray = cityHistory.split(',')
    pastArray.push(cityHistoryArray)
  } else {
    cityHistory = []
  }
  console.log(typeof pastArray)
  console.log(pastArray)
  pastArray = Object.values(pastArray)
  console.log(pastArray)
  var pastArray0 = pastArray[0]
  for (var i = 0; i < pastArray0.length; i++) {
    var liHistory = document.createElement('li');
    liHistory.setAttribute('class', 'history-list-class');
    liHistory.textContent = pastArray0[i];
    console.log(pastArray0[i])
    $('#history-list').append(liHistory)
  }

  todaysForecast();
  showApiData();
  return
})

$('.history-list-class').on('click', function () {
  var cityInput = $(this).text()
  currentCity = cityInput;
  console.log(cityInput)

  showApiData();
  todaysForecast();
})

function showApiData () {
  $('.additions').html('');
  $('.gray').html('');
  $('#todaysUVI').html('');
  $('.day-img').html('');
  $('.gray1').html('');

  var imageIcons = document.getElementsByTagName('img');

  for (var i = 0; i < imageIcons.length; i++) {
    imageIcons[0].parentNode.removeChild(imageIcons[0]);
  }

  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;
  var requestUrl1Lon = ''
  var requestUrl1Lat = ''
  console.log(requestUrl)

  fetch(requestUrl)
  .then(function (response) {
    console.log(response);
    if (!response.ok) {
      throw Error("ERROR");
    }
    return response.json();
  })
  .then(function (data) {
    if (typeof data === "undefined") {
      console.log("this was undefined");
    }
    console.log(data);

    var todaysTemp = document.createElement('h3');
    todaysTemp.textContent = data.main.temp + ' degrees F';
    todaysTemp.setAttribute('class', 'additions');
    $('#todays-temp').append(todaysTemp);

    var todaysWind = document.createElement('h3');
    todaysWind.textContent = data.wind.speed + ' MpH';
    todaysWind.setAttribute('class', 'gray');
    $('#todays-wind-title').append(todaysWind);

    requestUrl1Lat = data.coord.lat
    requestUrl1Lon = data.coord.lon

    var requestUrl1 = 'https://api.openweathermap.org/data/2.5/onecall?&lat=' + requestUrl1Lat + '&lon=' + requestUrl1Lon + '&units=imperial&appid=42ebbcabbd6bc88838ddb3a3c08682cb'
  
    fetch(requestUrl1)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      var todayIcon = document.createElement('img');
      todayIcon.setAttribute('class', 'additions');
      todayIcon.src = './assets/images/' + data.daily[0].weather[0].icon + '.png'
      $('#todays-temp').append(todayIcon)

      var tomorrowIcon = document.createElement('img');
      tomorrowIcon.setAttribute('class', 'additions');
      tomorrowIcon.src = './assets/images/' + data.daily[1].weather[0].icon + '.png'
      $('#tomorrow-img-div').append(tomorrowIcon)

      var day2Icon = document.createElement('img');
      day2Icon.setAttribute('class', 'additions');
      day2Icon.src = './assets/images/' + data.daily[2].weather[0].icon + '.png'
      $('#day-2-img').append(day2Icon)

      var day3Icon = document.createElement('img');
      day3Icon.setAttribute('class', 'additions');
      day3Icon.src = './assets/images/' + data.daily[3].weather[0].icon + '.png'
      $('#day-3-img').append(day3Icon)

      var day4Icon = document.createElement('img');
      day4Icon.setAttribute('class', 'additions');
      day4Icon.src = './assets/images/' + data.daily[4].weather[0].icon + '.png'
      $('#day-4-img').append(day4Icon)

      var day5Icon = document.createElement('img');
      day5Icon.setAttribute('class', 'additions');
      day5Icon.src = './assets/images/' + data.daily[5].weather[0].icon + '.png'
      $('#day-5-img').append(day5Icon)

      var todaysUV = document.createElement('h3');
      todaysUV.textContent = data.daily[0].uvi;
      todaysUV.setAttribute('class', 'gray1');
      $('#todays-uv-div').append(todaysUV);

      if (data.daily[0].uvi < 4) {
        $('#todays-uv-div').css('background-color', 'green')
      } else if (data.daily[0].uvi > 3 && data.daily[0].uvi < 7) {
        $('#todays-uv-div').css('background-color', 'yellow')
      } else {
        $('#todays-uv-div').css('background-color', 'red')
      }

      var todaysHumidity = document.createElement('h3');
      todaysHumidity.setAttribute('class', 'additions');
      todaysHumidity.textContent = data.daily[0].humidity + '%';
      $('#todays-humidity').append(todaysHumidity);

      var oneHour = document.createElement('p2');
      oneHour.setAttribute('class', 'additions');
      oneHour.textContent = data.hourly[0].temp + ' degrees F'
      $('#hour-1').append(oneHour)

      var oneHour = document.createElement('p2');
      oneHour.setAttribute('class', 'additions');
      oneHour.textContent = data.hourly[1].temp + ' degrees F'
      $('#hour-2').append(oneHour)

      var oneHour = document.createElement('p2');
      oneHour.setAttribute('class', 'additions');
      oneHour.textContent = data.hourly[2].temp + ' degrees F'
      $('#hour-3').append(oneHour)

      var oneHour = document.createElement('p2');
      oneHour.setAttribute('class', 'additions');
      oneHour.textContent = data.hourly[3].temp + ' degrees F'
      $('#hour-4').append(oneHour)

      var tomorrowTemp = document.createElement('h3');
      tomorrowTemp.textContent = data.daily[1].temp.day + ' degrees F'
      tomorrowTemp.setAttribute('class', 'additions');
      $('#five-tomorrow-temp').append(tomorrowTemp);

      var tomorrowDetArray = ['UV Index: ' + data.daily[1].uvi, 'Humidity: ' + data.daily[1].humidity + '%', 'Wind Speed: ' + data.daily[1].wind_speed + ' MpH']

      $('#tomorrow-uv-1').text('UV Index: ' + data.daily[1].uvi)

      for (var i = 1; i < tomorrowDetArray.length; i++) {
        var liTomorrow = document.createElement('li');
        liTomorrow.setAttribute('class', 'additions');
        liTomorrow.textContent = tomorrowDetArray[i];
        $('#tomorrow-details').append(liTomorrow);
      }

      if (data.daily[1].uvi < 4) {
        document.querySelector('#tomorrow-details').children[0].style.background = 'green'
      } else if (data.daily[1].uvi > 3 && data.daily[1].uvi < 7) {
        document.querySelector('#tomorrow-details').children[0].style.background = 'yellow'
      } else {
        document.querySelector('#tomorrow-details').children[0].style.background = 'red'
      }

      var day2Array = [moment.unix(data.daily[2].dt).format('MM/DD/YY'), 'UV Index: ' + data.daily[2].uvi, 'Humidity: ' + data.daily[2].humidity + '%', 'Wind Speed: ' + data.daily[2].wind_speed + ' MpH']

      for (var i = 0; i < day2Array.length; i++) {
        var liDay2 = document.createElement('li');
        liDay2.setAttribute('class', 'additions');
        liDay2.textContent = day2Array[i];
        $('#day-2-ul').append(liDay2);
      }

      if (data.daily[2].uvi < 4) {
        document.querySelector('#day-2-ul').children[1].style.background = 'green'
      } else if (data.daily[2].uvi > 3 && data.daily[2].uvi < 7) {
        document.querySelector('#day-2-ul').children[1].style.background = 'yellow'
      } else {
        document.querySelector('#day-2-ul').children[1].style.background = 'red'
      }

      var day3Array = [moment.unix(data.daily[3].dt).format('MM/DD/YY'), 'UV Index: ' + data.daily[3].uvi, 'Humidity: ' + data.daily[3].humidity + '%', 'Wind Speed: ' + data.daily[3].wind_speed + ' MpH']

      for (var i = 0; i < day3Array.length; i++) {
        var liDay3 = document.createElement('li');
        liDay3.setAttribute('class', 'additions');
        liDay3.textContent = day3Array[i];
        $('#day-3-ul').append(liDay3);
      }

      if (data.daily[3].uvi < 4) {
        document.querySelector('#day-3-ul').children[1].style.background = 'green'
      } else if (data.daily[3].uvi > 3 && data.daily[3].uvi < 7) {
        document.querySelector('#day-3-ul').children[1].style.background = 'yellow'
      } else {
        document.querySelector('#day-3-ul').children[1].style.background = 'red'
      }

      var day4Array = [moment.unix(data.daily[4].dt).format('MM/DD/YY'), 'UV Index: ' + data.daily[4].uvi, 'Humidity: ' + data.daily[4].humidity + '%', 'Wind Speed: ' + data.daily[4].wind_speed + ' MpH']

      for (var i = 0; i < day4Array.length; i++) {
        var liDay4 = document.createElement('li');
        liDay4.setAttribute('class', 'additions');
        liDay4.textContent = day4Array[i];
        $('#day-4-ul').append(liDay4);
      }

      if (data.daily[4].uvi < 4) {
        document.querySelector('#day-4-ul').children[1].style.background = 'green'
      } else if (data.daily[4].uvi > 3 && data.daily[1].uvi < 7) {
        document.querySelector('#day-4-ul').children[1].style.background = 'yellow'
      } else {
        document.querySelector('#day-4-ul').children[1].style.background = 'red'
      }

      var day5Array = [moment.unix(data.daily[5].dt).format('MM/DD/YY'), 'UV Index: ' + data.daily[5].uvi, 'Humidity: ' + data.daily[5].humidity + '%', 'Wind Speed: ' + data.daily[5].wind_speed + ' MpH']

      for (var i = 0; i < day5Array.length; i++) {
        var liDay5 = document.createElement('li');
        liDay5.setAttribute('class', 'additions');
        liDay5.textContent = day5Array[i];
        $('#day-5-ul').append(liDay5);
      }

      if (data.daily[5].uvi < 4) {
        document.querySelector('#day-5-ul').children[1].style.background = 'green'
      } else if (data.daily[5].uvi > 3 && data.daily[5].uvi < 7) {
        document.querySelector('#day-5-ul').children[1].style.background = 'yellow'
      } else {
        document.querySelector('#day-5-ul').children[1].style.background = 'red'
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}