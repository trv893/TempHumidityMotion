const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./sendEmail');

const app = express();

const sendTo = '';
const subject = 'Temperature, Humidity, and Motion Data';


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/your_endpoint', (req, res) => {
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;
  const motion = req.body.motion;

  console.log('Request body:', req.body);

  var msg = `Temperature: ${temperature} °C, Humidity: ${humidity} %, Motion: ${motion}`;
  console.log(msg);
  sendEmail(sendTo, subject, msg)
  .then(() => {
    console.log('Email sent successfully');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
  
  // Process the data as needed (e.g., store it in a database or trigger some action)

  res.status(200).send('Data received successfully');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

