/* jshint esversion: 6 */
const trafficList = document.getElementById('traffic-list');
const lineChart = document.getElementById('traffic-line-chart');
const dailyBarChart = document.getElementById('traffic-bar-chart');
const mobilePieChart = document.getElementById('traffic-pie-chart');
const alertBarClose = document.querySelector('.alert-bar span');
const sendButton = document.querySelector('.message-user button');
const form = document.forms['messageUser'];
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');
const alertContainer = document.querySelector('.alert');
const modal = document.getElementById('notification-modal');
const showModal = document.getElementById('notification-bell');
const closeModal = document.querySelector('.close');
const closeNotification = document.querySelectorAll('.close-notification');
const notificationList = document.querySelector('.modal-content ul');
let clickCount = 0;
let li = trafficList.querySelectorAll('li');

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
        },
      ]
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
          left  : 20,
          right : 25,
          top   : 10,
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

trafficList.addEventListener('click', function(e) {
  let li = trafficList.querySelectorAll('li');
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

function drawBarChart(labels, data) {
  let newBarChart = new Chart(dailyBarChart, {
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

alertBarClose.onclick = function() {
  alertContainer.classList.add('hidden');
}

window.onload = function() {
  form.reset();
}

sendButton.addEventListener('click', function (e) {
  e.preventDefault();
  const userValidation = document.forms['messageUser']['userName'].value;
  const messageValidation = document.forms['messageUser']['message'].value;
  const validationText = document.querySelector('.message-user span');
  if (userValidation === "" && messageValidation === "") {
    input.classList.add('invalid');
    input.placeholder = 'Please enter a username';
    textarea.classList.add('invalid');
    textarea.placeholder = 'Please enter a message'
  } else if (userValidation === "") {
    input.classList.add('invalid');
    input.placeholder = 'Please enter a username';
  } else if (messageValidation === "") {
    textarea.classList.add('invalid');
    textarea.placeholder = 'Please enter a message'
  } else {
    validationText.textContent = 'Your message has been sent!';
    form.reset();
    setTimeout(function () { validationText.textContent = '' }, 5000);
  }
});

input.onfocus = function() { 
  input.classList.remove('invalid');
  input.placeholder = 'Search for User';
};

textarea.onfocus = function() {
  textarea.classList.remove('invalid'); 
  textarea.placeholder = 'Message for User';
};

showModal.onclick = function() {
    modal.style.display = 'block';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

for (let notice = 0; notice < closeNotification.length; notice++) {
  let span = closeNotification[notice];
  span.onclick = function() {
    span.parentNode.classList.add('hidden');
    clickCount++;
    if (clickCount === closeNotification.length){
      notificationList.innerHTML = '<span class="no-notifications">No new notifications</span>';
      alertContainer.classList.add('hidden');
    }
  }
}
