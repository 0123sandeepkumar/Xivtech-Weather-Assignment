const express = require('express');
//const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    const apiKey = '4cd0d6d6e449eff3901a45f85f4ce1b6'; // Replace with your actual API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    for (const city of cities) {
      const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      const temperature = data.main.temp;
      weatherData[city] = `${temperature}°C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
