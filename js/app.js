/* jshint esversion: 6 */

// GLOBAL VARIABLES
const trafficList = document.getElementById('traffic-list');
const lineChart = document.getElementById('traffic-line-chart');
const dailyBarChart = document.getElementById('traffic-bar-chart');
const mobilePieChart = document.getElementById('traffic-pie-chart');
const alertBarClose = document.querySelector('.alert-bar span');
const sendButton = document.querySelector('.message-user button');
const form = document.forms.messageUser;
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');
const alertContainer = document.querySelector('.alert');
const modal = document.getElementById('notification-modal');
const showModal = document.getElementById('notification-bell');
const closeModal = document.querySelector('.close');
const closeNotification = document.querySelectorAll('.close-notification');
const notificationList = document.querySelector('.modal-content ul');
const saveSettings = document.getElementById('saveSettings');
const resetSettings = document.getElementById('resetSettings');
const emailNotifications = document.getElementById('emailNotifications');
const profileToPublic = document.getElementById('profileToPublic');
const timeZone = document.getElementById('timeZone');
let indicator = document.querySelector('.bell-container');
let li = trafficList.querySelectorAll('li');
let clickCount = 0;
let membersList = document.querySelectorAll('.new-members-info-container span');
let hourlyLabels = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00',
                    '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
let hourlyData = [249,120,75,19,22,57,102,222,490,520,652,790,465,701,799,557,1075,1632,3209,2444,2212,1890,1200,590];
let dailyLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let dailyBarLabels = ['S','M','T','W','T','F','S'];
let dailyData = [9263,4622,9490,8234,16090,11968,22696];
let weeklyLabels = ['Week 1','Week 2','Week 3','Week 4'];
let weeklyData = [26988,72345,51937,91891];
let monthlyLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let monthlyData = [212970,361858,232046,602798,722540,187901,587434,377597,513644,489716,843400,501086];

// Reset form fields and check local storage status on page load
window.onload = function () {
  form.reset();
  if (supportsLocalStorage()) {
    JSON.parse(localStorage.getItem('emailNotifications')) ? emailNotifications.checked = true : emailNotifications.checked = false;
    JSON.parse(localStorage.getItem('profileToPublic')) ? profileToPublic.checked = true : profileToPublic.checked = false;
    timeZone.selectedIndex = localStorage.getItem('timeZone');
  }
};

// Check if browser supports local storage
function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
}

// Generate new line chart from chart.js
function drawLineChart(labels, data) {
  newLineChart = new Chart(lineChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        label: 'Traffic',
        borderWidth: 1,
        borderColor: 'rgba(116,119,191,.8)',
        fill: true,
        backgroundColor: 'rgba(116,119,191,.3)',
        pointRadius: 6,
        pointBackgroundColor: 'rgb(255,255,255)',
        pointBorderColor: 'rgb(116,119,191)',
        pointBorderWidth: 2,
        pointHitRadius: 8,
        pointHoverRadius: 6,
        pointHoverBorderColor: 'rgb(191,116,119)',
        pointHoverBackgroundColor: 'rgb(228,197,198)'
      }, ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      elements: {
        line: {
          tension: 0
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 25,
          top: 10,
          bottom: 10
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: '#a5a5a5',
            fontFamily: 'Roboto',
            fontStyle: '100'
          },
          gridLines: {
            color: 'rgba(116,119,191,.5)',
            lineWidth: 0.5
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: '#a5a5a5',
            fontFamily: 'Roboto',
            fontStyle: '100'
          },
          gridLines: {
            color: 'rgba(116,119,191,.5)',
            lineWidth: 0.5
          }
        }]
      },
      tooltips: {
        caretPadding: 6
      }
    }
  });
}

drawLineChart(hourlyLabels, hourlyData);

// Display selected line chart in Traffic section
trafficList.addEventListener('click', function (e) {
  let clicked = e.target.id;

  if (e.target && e.target.nodeName === "LI") {
    li.forEach((li) => {
      li.classList.remove('active');
    });
  } else {
    return;
  }

  e.target.classList.add('active');
  newLineChart.destroy();

  if (clicked === 'hourly') {
    drawLineChart(hourlyLabels, hourlyData);
  } else if (clicked === 'daily') {
    drawLineChart(dailyLabels, dailyData);
  } else if (clicked === 'weekly') {
    drawLineChart(weeklyLabels, weeklyData);
  } else if (clicked === 'monthly') {
    drawLineChart(monthlyLabels, monthlyData);
  }
});

// Generate new bar chart from chart.js
function drawBarChart(labels, data) {
  newBarChart = new Chart(dailyBarChart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: 'rgb(116,119,191)',
        hoverBackgroundColor: 'rgb(77, 76, 114)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          maxBarThickness: 30,
          ticks: {
            fontColor: '#a5a5a5',
            fontFamily: 'Roboto',
            fontStyle: '100'
          },
          gridLines: {
            color: 'rgba(116,119,191,.5)',
            lineWidth: 0.5
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: '#a5a5a5',
            fontFamily: 'Roboto',
            fontStyle: '100'
          },
          gridLines: {
            color: 'rgba(116,119,191,.5)',
            lineWidth: 0.5
          }
        }]
      },
    }
  });
}

drawBarChart(dailyBarLabels, dailyData);

// Generate new pie/doughnut chart from chart.js
newPieChart = new Chart(mobilePieChart, {
  type: 'doughnut',
  data: {
    labels: ['Phones', 'Tablets', 'Desktop'],
    datasets: [{
      borderWidth: 0,
      data: [15, 20, 65],
      backgroundColor: ['rgb(115,177,191)', 'rgb(129,201,143)', 'rgb(116,119,191)'],
      hoverBackgroundColor: ['rgb(115,177,191)', 'rgb(129,201,143)', 'rgb(116,119,191)'],
      hoverBorderColor: ['rgb(88,162,179)', 'rgb(88,183,106)', 'rgb(103,106,185)'],
      hoverBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      fullWidth: false,
      position: 'right',
      labels: {
        boxWidth: 12,
        fontFamily: 'Roboto',
        fontColor: '#a5a5a5',
        fontStyle: 100
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 20,
        top: 0,
        bottom: 20
      }
    }
  }
});

// Close alert message bar
alertBarClose.onclick = function () {
  alertContainer.classList.add('hidden');
};

// Send user message validation
sendButton.addEventListener('click', function (e) {
  e.preventDefault();
  const userValidation = document.forms.messageUser.userName.value;
  const messageValidation = document.forms.messageUser.message.value;
  const validationText = document.querySelector('.message-user span');
  if (userValidation === "" && messageValidation === "") {
    input.classList.add('invalid');
    input.placeholder = 'Please enter a username';
    textarea.classList.add('invalid');
    textarea.placeholder = 'Please enter a message';
  } else if (userValidation === "") {
    input.classList.add('invalid');
    input.placeholder = 'Please enter a username';
  } else if (messageValidation === "") {
    textarea.classList.add('invalid');
    textarea.placeholder = 'Please enter a message';
  } else {
    validationText.textContent = 'Your message has been sent!';
    form.reset();
    setTimeout(function () {
      validationText.textContent = '';
    }, 5000);
  }
});

// Reset form validation message on search input
input.onfocus = function () {
  input.classList.remove('invalid');
  input.placeholder = 'Search for User';
};

// Reset form validation message on message textarea
textarea.onfocus = function () {
  textarea.classList.remove('invalid');
  textarea.placeholder = 'Message for User';
};

// Display notification modal
showModal.onclick = function () {
  modal.style.display = 'block';
  modal.classList.add('clicked');
};

// Hide notification modal
closeModal.onclick = function () {
  modal.style.display = 'none';
};

// Display notification message or no notifications message
for (let notice = 0; notice < closeNotification.length; notice++) {
  let span = closeNotification[notice];
  span.onclick = function () {
    span.parentNode.classList.add('hidden');
    clickCount++;
    if (clickCount === closeNotification.length) {
      notificationList.innerHTML = '<span class="no-notifications">No new notifications</span>';
      alertContainer.classList.add('hidden');
      indicator.classList.add('hidden');
    }
  };
}

// Primary autocomplete search code. Source: https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a, b, i, val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// Build an array of member's names
function memberNames() {
  let listOfNames = [];
  for (let name = 0; name < membersList.length; name++) {
    let memberName = membersList[name].textContent;
    listOfNames.push(memberName);
    if (listOfNames.length === membersList.length) {
      return listOfNames;
    }
  }
}

// Call autocomplete function
let membersArray = memberNames();
autocomplete(document.getElementById("memberSearch"), membersArray);

// Save settings local storage
saveSettings.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.setItem('emailNotifications', emailNotifications.checked);
  localStorage.setItem('profileToPublic', profileToPublic.checked);
  localStorage.setItem('timeZone', timeZone.selectedIndex);
  saveSettings.style.backgroundColor = '#85db81';
  saveSettings.style.boxShadow = 'none';
  saveSettings.textContent = 'SAVED';
  setTimeout(function () {
    saveSettings.style.backgroundColor = '';
    saveSettings.style.boxShadow = '';
    saveSettings.textContent = 'SAVE';
  }, 1500);
});

// Reset settings and clear local storage
resetSettings.addEventListener('click', function (e) {
  e.preventDefault();
  emailNotifications.checked = false;
  profileToPublic.checked = false;
  timeZone.selectedIndex = 0;
  localStorage.clear();
});