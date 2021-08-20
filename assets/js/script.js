var cityInputArray=[];
var today = moment();
var cityHistory = localStorage.getItem('City');
console.log(cityHistory)

if (cityHistory) {
cityHistory = cityHistory.split(',')
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

$('#todays-btn').on('click', function () {
  $('#main-dashboard-container').hide();
  $('#main-todays-container').show();
  $('#main-5-container').hide();
})

$('#five-btn').on('click', function () {
  $('#main-dashboard-container').hide();
  $('#main-todays-container').hide();
  $('#main-5-container').show();
})

$(".todays-date").text('Today is ' + today.format("MMM Do, YYYY"));
console.log(today);

$('#search-button').on('click', function () {
  var cityInput = $('#search-input').val();
  cityInputArray.push(cityInput);
  localStorage.setItem('City', cityInputArray);
  console.log(cityInputArray);
})

for (var i = 0; i < cityHistory.length; i++) {
  var li = document.createElement('li');
  li.textContent = cityHistory[i];
  $('#history-list').append(li)
}

