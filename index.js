$('.today').click(function () {
    $('#chartToday').css("display", "block");
    $('#chartTomorrow').css("display", "none");
    $('#chartNextDay').css("display", "none");
    $('.todayMain').css("background-color", "beige");
    $('.tomorrowMain').css("background-color", "white");
    $('.nextDayMain').css("background-color", "white");
    window.scroll({
      top: 2000,
      behavior: "smooth",
    });
})

$('.tomorrow').click(function () {
    $('#chartToday').css("display", "none");
    $('#chartTomorrow').css("display", "block");
    $('#chartNextDay').css("display", "none");
    $('.todayMain').css("background-color", "white");
    $('.tomorrowMain').css("background-color", "beige");
    $('.nextDayMain').css("background-color", "white");
    window.scroll({
        top: 2000,
        behavior: "smooth",
    });
})

$('.dayAfterTomorrow').click(function () {
    $('#chartToday').css("display", "none");
    $('#chartTomorrow').css("display", "none");
    $('#chartNextDay').css("display", "block");
    $('.todayMain').css("background-color", "white");
    $('.tomorrowMain').css("background-color", "white");
    $('.nextDayMain').css("background-color", "beige");
    window.scroll({
      top: 2000,
      behavior: "smooth",
    });
})

function dayStatus(imgID, blockId, arrayRain, arrayCloud) {
    console.log(blockId, imgID);
    var todayStatus = 0;
    for (let index = 0; index < arrayRain.length; index++) {
        const rain = arrayRain[index];
        const cloud = arrayCloud[index];

        if (rain > 0 && cloud > 30) {
            todayStatus = 3;
        } else if (rain > 0) {
            todayStatus = 2;
        } else if (cloud > 30) {
            todayStatus = 1;
        }
    }

    if (todayStatus == 3)
    {
        document.getElementById(blockId).innerText = "雨・曇"
        $(imgID).attr('src', '../image/rain.png');
    }
    else if (todayStatus == 2)
    {
        document.getElementById(blockId).innerText = "雨"
        $(imgID).attr({src: '../image/rain.png', style: 'width: 57%'});
    }
    else if (todayStatus == 1)
    {
        document.getElementById(blockId).innerText = "曇"
        $(imgID).attr('src', '../image/cloud.png');
    } 
    else
    {
        document.getElementById(blockId).innerText = "晴";
        $(imgID).attr({src: '../image/sun.png', style: 'width: 54%'});
    }
}
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.70&hourly=rain,cloudcover&past_days=3&forecast_days=3&timezone=Asia%2FTokyo`;
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const dayBeforYesterdayRain = data.hourly.rain.slice(0, 24);
    const yesterdayRain = data.hourly.rain.slice(24, 48);
    const todayRain = data.hourly.rain.slice(48, 72);
    const tomorrowRain = data.hourly.rain.slice(72, 96);
    const dayAfterTomorrowRain = data.hourly.rain.slice(96, 120);

    const dayBeforYesterdayCloud = data.hourly.cloudcover.slice(0, 24);
    const yesterdayCloud = data.hourly.cloudcover.slice(24, 48);
    const todayCloud = data.hourly.cloudcover.slice(48, 72);
    const tomorrowCloud = data.hourly.cloudcover.slice(72, 96);
    const dayAfterTomorrowCloud = data.hourly.cloudcover.slice(96, 120);

    dayStatus("#todayImg", "today", todayRain, todayCloud);
    dayStatus("#tomorrowImg", "tomorrow", tomorrowRain, tomorrowCloud);
    dayStatus("#dayAfterTomorrowImg", "dayAfterTomorrow", dayAfterTomorrowRain, dayAfterTomorrowCloud);    

    const chartToday = document.getElementById('chartToday');
    const chartTomorrow = document.getElementById('chartTomorrow');
    const chartNextDay = document.getElementById('chartNextDay');

    new Chart(chartToday, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
          label: '⛅',
          data: [todayCloud[0], todayCloud[2], todayCloud[4], todayCloud[6], todayCloud[8], todayCloud[10], todayCloud[12], todayCloud[14], todayCloud[16], todayCloud[18], todayCloud[20], todayCloud[22]],
          borderWidth: 1
          },
          {
            label: '🌧',
            data: [todayRain[0], todayRain[2], todayRain[4], todayRain[6], todayRain[8], todayRain[10], todayRain[12], todayRain[14], todayRain[16], todayRain[18], todayRain[20], todayRain[22]],
            borderWidth: 1,
            type: 'bar'
          }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(chartTomorrow, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
          label: '⛅',
          data: [tomorrowCloud[0], tomorrowCloud[2], tomorrowCloud[4], tomorrowCloud[6], tomorrowCloud[8], tomorrowCloud[10], tomorrowCloud[12], tomorrowCloud[14], tomorrowCloud[16], tomorrowCloud[18], tomorrowCloud[20], tomorrowCloud[22]],
          borderWidth: 1
          },
          {
            label: '🌧',
            data: [tomorrowRain[0], tomorrowRain[2], tomorrowRain[4], tomorrowRain[6], tomorrowRain[8], tomorrowRain[10], tomorrowRain[12], tomorrowRain[14], tomorrowRain[16], tomorrowRain[18], tomorrowRain[20], tomorrowRain[22]],
            borderWidth: 1,
            type: 'bar'
          }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
    new Chart(chartNextDay, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
          label: '⛅',
          data: [dayAfterTomorrowCloud[0], dayAfterTomorrowCloud[2], dayAfterTomorrowCloud[4], dayAfterTomorrowCloud[6], dayAfterTomorrowCloud[8], dayAfterTomorrowCloud[10], dayAfterTomorrowCloud[12], dayAfterTomorrowCloud[14], dayAfterTomorrowCloud[16], dayAfterTomorrowCloud[18], dayAfterTomorrowCloud[20], dayAfterTomorrowCloud[22]],
          borderWidth: 1
          },
          {
            label: '🌧',
            data: [dayAfterTomorrowRain[0], dayAfterTomorrowRain[2], dayAfterTomorrowRain[4], dayAfterTomorrowRain[6], dayAfterTomorrowRain[8], dayAfterTomorrowRain[10], dayAfterTomorrowRain[12], dayAfterTomorrowRain[14], dayAfterTomorrowRain[16], dayAfterTomorrowRain[18], dayAfterTomorrowRain[20], dayAfterTomorrowRain[22]],
            borderWidth: 1,
            type: 'bar'
          }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
})
.catch(error => {
    console.log(error);
});