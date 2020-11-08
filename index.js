const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const localPassport = require('./config/passport-local-strategy');
app.use(express.static('./assets'));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router


app.use('/',require('./routes'));

// using ejs view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'intsocial',
    //change before deployment
    secret: 'kiminonawa',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100) //after this time session expires
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(port,function(err){
    if(err){
        console.log(`error running the server: ${err}`);
    }
    else{
        console.log(`server is running on port ${port}`);
    }
});