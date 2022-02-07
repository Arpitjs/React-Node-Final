const request = require('supertest');
const app = require('../app');
const Contact = require('../models/contactModel');
let { setUpDB, userOne, userTwo, taskOne } = require('./fixtures/db')

beforeEach(setUpDB)

test('should create a contact', async () => {
    let response = await request(app)
    .post('/api/contact')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'jcsokcposc',
        email: 'sopkcposkc@okc',
        address: 'ocksopkcsc'
    })
    .expect(201)
    let task = await Contact.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

