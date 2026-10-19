
const apiKey = "31a5bb81750e4d409d2170550261110";
const forecastDays = 4;
let weather = null;

async function searchWeatherLocations(locationName) {
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${locationName}&days=${forecastDays}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(response.error.message);
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        return [];
    }
}

async function getWeatherData(locationName) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationName}&days=${forecastDays}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

async function showLocationWeather(locationName, triggerEl) {
    try {
        let locationWeatherData = await getWeatherData(locationName);
        weather = locationWeatherData;
        let locationPage = renderLocationPage(locationWeatherData);
        if (triggerEl) {
            const weatherSearch = triggerEl.closest('.weather-search');
            if (weatherSearch) {
                weatherSearch.querySelector('.result-card').classList.add('d-none');
                weatherSearch.querySelector('.search-input').value = locationName;
            }
        }
        const mainSection = document.querySelector('main');
        mainSection.innerHTML = locationPage;
        mainSection.classList = 'weather-page w-100 d-flex flex-column justify-content-center align-items-center gap-4 p-4';
        collapsedNav.classList.remove('show');
        collapsedBtn.setAttribute('data-active', 'false');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    } catch (error) {
        renderErrorPage(error);
        return;
    }
}

function renderErrorPage(error) {
    const mainSection = document.querySelector('main');
    const is404 = error?.message?.includes('400') || error?.message?.includes('404');
    mainSection.innerHTML = `
        <div class="error-page d-flex flex-column align-items-center justify-content-center gap-3 p-4 text-center">
            <span style="font-size: 4rem;">⚠️</span>
            <h2 class="fw-bold">${is404 ? 'Location Not Found' : 'Something Went Wrong'}</h2>
            <p class="text-black-50">
                ${is404
            ? `We couldn't find weather data for that location. Try a different search.`
            : `Unable to load weather data. Please check your connection and try again.`}
            </p>
        </div>
    `;
    mainSection.className = 'weather-page w-100 d-flex flex-column justify-content-center align-items-center gap-4 p-4';
}

function convertTemp(btn) {
    let currentTemp = btn.getAttribute('data-current');
    const temp = document.querySelector('.temp');
    const feelslike = document.querySelector('.feelslike');
    const maxMin = document.querySelectorAll('.max-min');
    if (currentTemp === 'c') {
        temp.innerHTML = `${Math.ceil(parseFloat(weather.current.temp_f))}&#8457;`;
        feelslike.innerHTML = `Feels Like ${weather.current.feelslike_f}&#8457;`;
        maxMin.forEach((span, index) => {
            span.innerHTML = `${Math.ceil(parseFloat(weather.forecast.forecastday[index].day.maxtemp_f))}° / 
                            ${Math.ceil(parseFloat(weather.forecast.forecastday[index].day.mintemp_f))}&#8457;`;
        });
        btn.querySelector('span').textContent = '°C';
        btn.setAttribute('data-current', 'f');
    }
    else {
        temp.innerHTML = `${Math.ceil(parseFloat(weather.current.temp_c))}&#8451;`;
        feelslike.innerHTML = `Feels Like ${weather.current.feelslike_c}&#8451;`;
        maxMin.forEach((span, index) => {
            span.innerHTML = `${Math.ceil(parseFloat(weather.forecast.forecastday[index].day.maxtemp_c))}° / 
                            ${Math.ceil(parseFloat(weather.forecast.forecastday[index].day.mintemp_c))}&#8451;`;
        });
        btn.querySelector('span').textContent = '°F';
        btn.setAttribute('data-current', 'c');
    }
}

function renderLocationPage(locationData) {
    console.log(locationData);
    let days = locationData.forecast.forecastday.map(day => {
        let date = new Date(day.date.replace(/-/g, '/'));

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    });
    console.log(locationData);
    return `
            <div class="location w-100 h-100 d-flex justify-content-between align-items-center p-2">
                <div class="w-100 location-info d-flex flex-column align-items-start gap-1">
                    <h1 class="fw-bold">${locationData.location.name}</h1>
                    <span class="text-black-50">${locationData.location.region}, ${locationData.location.country}</span>
                    <span class="text-black-50">Local Time: ${locationData.location.localtime}</span>
                </div>
                <div class="w-100 location-current-temp d-flex flex-column align-items-start gap-3">
                    <div class="d-flex flex-row justify-content-between align-items-center gap-3">
                        <img src=${locationData.current.condition.icon} width="50px" height="50px">
                        <div class="text-start">
                            <div class="d-flex flex-row align-items-center justify-content-center gap-3">
                                <h1 class="fw-bold temp">${Math.ceil(parseFloat(locationData.current.temp_c))}&#8451;</h1>
                                <button data-current="c" onclick="convertTemp(this)" class="convert-btn d-flex flex-row align-items-center justify-content-center gap-2 p-2 rounded">
                                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 2L21 6M21 6L17 10M21 6H7.8C6.11984 6 5.27976 6 4.63803 6.32698C4.07354 6.6146 3.6146 7.07354 3.32698 7.63803C3 8.27976 3 9.11984 3 10.8V11M3 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V13M3 18L7 22M3 18L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span class="fw-bold">°F</span>
                                </button>
                            </div>
                        <span class="text-black-50 feelslike">Feels Like ${locationData.current.feelslike_c}&#8451;</span>
                        </div>
                    </div>
                    <span class="fw-bold">${locationData.current.condition.text}</span>
                </div>
                <div class="w-100">
                    <div class="location-current row g-2">
                        <div class="current-wind col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">WIND</span>
                                <br>
                                <span class="fw-bold">${locationData.current.wind_kph} km/h ${locationData.current.wind_dir}</span>
                            </div>
                        </div>
                        <div class="current-Humidity col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">HUMIDITY</span>
                                <br>
                                <span class="fw-bold">${locationData.current.humidity}%</span>
                            </div>
                        </div>
                        <div class="current-Pressure col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">PRESSURE</span>
                                <br>
                                <span class="fw-bold">${locationData.current.pressure_mb} mb</span>
                            </div>
                        </div>
                        <div class="current-Precip col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">PRECIP</span>
                                <br>
                                <span class="fw-bold">${locationData.current.precip_mm} mm</span>
                            </div>
                        </div>
                        <div class="current-UV index col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">UV INDEX</span>
                                <br>
                                <span class="fw-bold">${locationData.current.uv}</span>
                            </div>
                        </div>
                        <div class="current-Visibility col-6 col-sm-4 col-lg-4">
                            <div class="weather-card text-start w-100 h-100 rounded p-2">
                                <span class="fw-bold text-black-50">VISIBILITY</span>
                                <br>
                                <span class="fw-bold">${locationData.current.vis_km} KM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 h-100 forecat-cards row g-2">
                <div class="col col-lg-3">
                    <div class="today-card d-flex flex-column align-items-start gap-3">
                        <span class="fw-bold">TODAY</span>
                        <img src=${locationData.forecast.forecastday[0].day.condition.icon} width="40px" height="40px">
                        <span class="fw-bold max-min">${Math.ceil(parseFloat(locationData.forecast.forecastday[0].day.maxtemp_c))}° / 
                            ${Math.ceil(parseFloat(locationData.forecast.forecastday[0].day.mintemp_c))}&#8451;
                        </span>
                        <span class="text-black-50 text-nowrap">${locationData.forecast.forecastday[0].day.daily_chance_of_rain}% rain</span>
                        <span class="text-black-50">${locationData.forecast.forecastday[0].day.condition.text}</span>
                    </div>
                </div>
                <div class="col col-lg-3">
                    <div class="tomorrow-card d-flex flex-column align-items-start gap-3">
                        <span class="fw-bold">${days[1]}</span>
                        <img src=${locationData.forecast.forecastday[1].day.condition.icon} width="40px" height="40px">
                        <span class="fw-bold max-min">${Math.ceil(parseFloat(locationData.forecast.forecastday[1].day.maxtemp_c))}° / 
                            ${Math.ceil(parseFloat(locationData.forecast.forecastday[1].day.mintemp_c))}&#8451;
                        </span>
                        <span class="text-black-50 text-nowrap">${locationData.forecast.forecastday[1].day.daily_chance_of_rain}% rain</span>
                        <span class="text-black-50">${locationData.forecast.forecastday[1].day.condition.text}</span>
                    </div>
                </div>
                <div class="col col-lg-3">
                    <div class="after-tomorrow-card d-flex flex-column align-items-start gap-3">
                        <span class="fw-bold">${days[2]}</span>
                        <img src=${locationData.forecast.forecastday[2].day.condition.icon} width="40px" height="40px">
                        <span class="fw-bold max-min">${Math.ceil(parseFloat(locationData.forecast.forecastday[2].day.maxtemp_c))}° / 
                            ${Math.ceil(parseFloat(locationData.forecast.forecastday[2].day.mintemp_c))}&#8451;
                        </span>
                        <span class="text-black-50 text-nowrap">${locationData.forecast.forecastday[2].day.daily_chance_of_rain}% rain</span>
                        <span class="text-black-50">${locationData.forecast.forecastday[2].day.condition.text}</span>
                    </div>
                </div>
                <div class="col col-lg-3">
                    <div class="after-tomorrow-card d-flex flex-column align-items-start gap-3">
                        <span class="fw-bold">${days[3]}</span>
                        <img src=${locationData.forecast.forecastday[3].day.condition.icon} width="40px" height="40px">
                        <span class="fw-bold max-min">${Math.ceil(parseFloat(locationData.forecast.forecastday[3].day.maxtemp_c))}° / 
                            ${Math.ceil(parseFloat(locationData.forecast.forecastday[3].day.mintemp_c))}&#8451;
                        </span>
                        <span class="text-black-50 text-nowrap">${locationData.forecast.forecastday[3].day.daily_chance_of_rain}% rain</span>
                        <span class="text-black-50">${locationData.forecast.forecastday[3].day.condition.text}</span>
                    </div>
                </div>
            </div>
    `;
}

function CreateLocationBtn(location) {
    return `
            <li class="location w-100">
                    <button class="location-btn text-start border-0" onclick="showLocationWeather('${location.name}', this)">${location.name}, ${location.region} <small style="font-size: 0.8rem;">${location.country}</small></button>
            </li>`;
}

document.querySelectorAll('.search-input').forEach(input => {
    input.addEventListener('input', async function () {
        const resultCard = this.nextElementSibling;
        let locationName = this.value.trim();
        if (locationName.length === 0) {
            resultCard.classList.add('d-none');
            return;
        }
        let Locations = await searchWeatherLocations(locationName);
        if (!Locations) return;
        resultCard.classList.remove('d-none');
        let locationsList = resultCard.querySelector('.locations');
        locationsList.innerHTML = '';
        if (Locations.length === 0) {
            locationsList.nextElementSibling.classList.remove('d-none');
            locationsList.classList.add('d-none');
        } else {
            locationsList.nextElementSibling.classList.add('d-none');
            locationsList.classList.remove('d-none');
        }
        const html = Locations.map(location => CreateLocationBtn(location)).join('');
        locationsList.innerHTML = html;
    });
});