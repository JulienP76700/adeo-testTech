const request = require('supertest');
const app = require('./index');

describe('GET /horoscope', () => {
  test('should return the zodiac sign for a valid birthdate', async () => {
    const response = await request(app).get('/horoscope?month=06&day=21');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('zodiacSign');
  });

  test('should return 400 if birthdate parameter is missing', async () => {
    const response = await request(app).get('/horoscope');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Birthdate query parameter is invalid');
  });

  test('should return 400 if birthdate parameter is not a number', async () => {
    const response = await request(app).get('/horoscope?month=june&day=21');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Birthdate query parameter is invalid');
  });

  test('should return 400 for an invalid birthdate format', async () => {
    const response = await request(app).get('/horoscope?month=21&day=06');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid birthdate format');
  });
});
