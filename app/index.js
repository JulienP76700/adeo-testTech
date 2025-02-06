const express = require('express');
const { getSign } = require('horoscope');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
  })
);

// Route to get horoscope sign
app.get('/horoscope', (req, res) => {
  const { day, month } = req.query;
  // console.log("date : " + month, day)
  if (!day || !month || isNaN(day) || isNaN(month)) {
    return res.status(400).json({ error: 'Birthdate query parameter is invalid' });
  }

  const sign = getSign({ month: parseInt(month), day: parseInt(day) }, { overrideErrors: true });
  if (!sign) {
    return res.status(400).json({ error: 'Invalid birthdate format' });
  }

  res.json({
    month: month,
    day: day,
    zodiacSign: sign 
  });
});

module.exports = app;