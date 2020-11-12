const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/intsocial-development',{ useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;