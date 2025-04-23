const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/ocean-data', async (req, res) => {
  const url = 'https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.csv?time,sea_surface_temperature&time>=2024-03-01T00:00:00Z&station=130w0n&distinct()&orderByMax("time")';
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/csv'
      }
    });
    res.send(response.data);
  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).send('Error fetching data from NOAA');
  }
});

const PORT = 5011;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
