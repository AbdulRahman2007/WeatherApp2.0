import  Express  from "express";
import axios from "axios";
const port = 3000;
const app = Express();

app.set('view engine', 'ejs');
app.use(Express.static('public'));


app.get("/", (req,res) => {
    res.render("index");
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = '15a89ea6469e7d66f9db7e299c80a71b';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
        };
        res.render('weather', { weatherData });
    } catch (error) {
        res.render('error', { error: 'City not found' });
    }
});



app.listen(port, (req , res) => {
    console.log("server has started")
});