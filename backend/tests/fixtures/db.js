let mongoose = require('mongoose')
const User = require('../../models/userModel');
const Contact = require('../../models/contactModel');

let userOneId = new mongoose.Types.ObjectId()

let userOne = {
    _id: userOneId,
    email: 'arpited7@gmail.com',
    password: 'helloworld'
}

let userTwoId = new mongoose.Types.ObjectId()

let userTwo = {
    _id: userTwoId,
    email: 'arpited@gmail.com',
    password: 'helloworld',
}

const contactOne  = {
    _id = new mongoose.Types.ObjectId(),
    name: 'contact 1',
    address: 'ktm',
    email: 'c1@yahoo.com' 
}

const contactTwo  = {
    _id = new mongoose.Types.ObjectId(),
    name: 'contact 2',
    address: 'bhaktapur',
    email: 'c2@yahoo.com' 
}
const contactThree  = {
    _id = new mongoose.Types.ObjectId(),
    address: 'patan',
    email: 'c3@yahoo.com' 
}

let setUpDB = async () => {
    await User.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Contact(taskOne).save()
    await new Contact(taskTwo).save()
    await new Contact(taskThree).save()
}

module.exports = {
    userOneId, userOne, userTwo, userTwoId, setUpDB, contactOne
}