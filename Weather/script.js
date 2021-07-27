document.querySelector('.searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;
  let apiKey = '0847962c8609f584ed5bdd55ab222206';

  if(input !== '') {
    clearInfo();
    showWarning('Loading...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=en`;

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        desc: json.weather[0].description,
        min: json.main.temp_min,
        max: json.main.temp_max,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    } else {
      clearInfo();
      showWarning('Não encontramos essa localização');
      swal('404', 'City Not Found', 'error');
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning('');
  document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.weatherInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>KM/H</span>`;

  document.querySelector('.weather img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.description').innerHTML = `${json.desc}`;
  document.querySelector('.min').innerHTML = `${json.min} <sup>ºC</sup>`;
  document.querySelector('.max').innerHTML = `${json.max} <sup>ºC</sup>`;
  document.querySelector('.windPoint').style.transform = `rotate(${json.windAngle-90}deg)`;

  document.querySelector('.result').style.display = 'block';

}

function clearInfo() {
  showWarning('');
  document.querySelector('.result').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.warning').innerHTML = msg;
}
