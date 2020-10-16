const express = require('express');
const morgan  = require('morgan');
const exhbs   = require('express-handlebars');
const path    = require('path');

const { database } = require('./keys');


const app = express();



app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


app.use('/GowPlay',require('./route/crud'));


app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'));
});