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

