import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/contact-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('database connected.'))
.catch(err => console.log('error in database connection.', err));