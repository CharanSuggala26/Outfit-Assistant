const express = require('express');
const axios = require('axios');
const expAsyncHandler = require('express-async-handler');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const OPENWEATHER_API_KEY=process.env.OPENWEATHER_API_KEY;
const url = "https://api.segmind.com/v1/try-on-diffusion";

// Function to convert an image file from the filesystem to base64
function imageFileToBase64(imagePath) {
    const imageData = fs.readFileSync(path.resolve(imagePath));
    return Buffer.from(imageData).toString('base64');
}

router.post('/',expAsyncHandler(async (req, res) => {
    const { location, Ocassion,date, gender } = req.body;

    let weatherData;

    try {
        const geoResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
        );

        if (geoResponse.data.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const {lat,lon} = geoResponse.data[0];

        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        weatherData = weatherResponse.data;
    } catch (err) {
        return res.status(500).json({ err });
    }

    const api_key = process.env.GEMINI_KEY;
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig, history: [] });

    const result = await chatSession.sendMessage(
       `I will give you some weather conditions, Gender, Location. Give me one or two search keywords to search for an outfit suitable for those conditions and location with respect to gender. \n\nLocation: ${location}, \nTemperature: ${weatherData.main.temp}°C, \nWeather: ${weatherData.weather[0].main}, \nGender: ${gender}. Give me the search terms in such a way that they can directly be sent as html link params (using %20 etc.)`
    );

    const searchQuery = result.response.text();

        //const resp = await axios.get(`https://data.unwrangle.com/api/getter/?platform=amazon_search&search=${searchQuery}&country_code=us&page=1&api_key=ff65bfe894020493b8daf6198887828b930d318b`);
        const resp=await axios.get(`https://data.unwrangle.com/api/getter/?platform=amazon_search&search=${searchQuery}&country_code=us&page=1&api_key=ff65bfe894020493b8daf6198887828b930d318b`);
        // We are Extracting the top 20 results' thumbnails
        const thumbnails = resp.data.results.slice(0, 10).map(item => ({
            asin: item.asin,
            thumbnail: item.thumbnail
        }));

        console.log(thumbnails)

        return res.send({status: 200, payload: {thumbnails, weatherData}});
}));


// POST endpoint to handle the request of Virtual-Try-ON
router.post('/try-on', expAsyncHandler(async (req, res) => {
    const api_key = process.env.MODEL_KEY;
    const { model_image, cloth_image } = req.body;

    // Convert images to base64 if they are URLs or file paths
    const modelImageBase64 =  imageFileToBase64(model_image);
    const clothImageBase64 =  imageFileToBase64(cloth_image);

    const data = {
        model_image: modelImageBase64,
        cloth_image: clothImageBase64,
        category:  "Upper body",
        num_inference_steps: 35,
        guidance_scale: 2,
        seed:  12467,
        base64: true
    };

    try {
        const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
        res.json(response.data); // Return the generated image or result
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
}));



module.exports = router;





