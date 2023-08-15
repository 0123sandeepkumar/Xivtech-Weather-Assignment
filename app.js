const getWeatherButton = document.getElementById('getWeatherButton');
const citiesInput = document.getElementById('citiesInput');
const weatherResults = document.getElementById('weatherResults');

getWeatherButton.addEventListener('click', async () => {
  const cities = citiesInput.value.split(',').map(city => city.trim());

  try {
    const response = await fetch('/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cities })
    });

    const data = await response.json();

    let resultsHTML = '<h2>Weather Results:</h2>';
    for (const city in data.weather) {
      resultsHTML += `<p>${city}: ${data.weather[city]}</p>`;
    }

    weatherResults.innerHTML = resultsHTML;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherResults.innerHTML = '<p>Error fetching weather data</p>';
  }
});
