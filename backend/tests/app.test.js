const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
let { setUpDB } = require('./fixtures/db');

beforeEach(setUpDB);

test('should create an account', async () => {
    let response = await request(app)
    .post('/register')
    .send({
        email: 'arpited7@gmail.com',
        password: '12345',
    })
    .expect(201)
    const user = await User.create(response.body);
    expect(user).not.toBeNull();
})

