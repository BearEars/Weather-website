const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('.input-city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' && nameCountry.value === '') {
        showError('Ambos campos son obligatorios');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
})

function callAPI(city, country) {
    const apiKey = '20009b8679e09fb48f6aa225145b0265'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJson => {
            if (dataJson.cod === '404') {
                showError('Ciudad no encontrada');
            } else {
                clear();
                showWeather(dataJson);
            }

        })
        .catch(error => {
            console.log('error');
        })
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;

    const degrees = kelvToCent(temp);
    const max = kelvToCent(temp_max);
    const min = kelvToCent(temp_min);


    const content = document.createElement('div');
    content.innerHTML = `
    <h5 class="weather-location">Weather in ${name}</h5>
        <img class='icon-wheather' src='https://openweathermap.org/img/wn/${arr.icon}@2x.png' alt='weather icon'>
        <h2 class="grades">${degrees}°C</h2>
        <div class="max-min-container">
            <span class="temp" id="max-temp">Max: ${max}°C</span>
            <span class="temp" id="min-temp">Min: ${min}°C</span>
        </div>
    `;
    result.appendChild(content);
}

function showError(message) {
    const alert = document.createElement('span');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);

}

function kelvToCent(temp) {
    return parseInt(temp - 273.15);
}

function clear() {
    result.innerHTML = '';
}
