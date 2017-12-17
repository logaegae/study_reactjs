const express = require('express');
const app = express();
const user = require('./routes/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const myLogger = (req, res, next) => {
//     console.log(req.url);
//     next();
// }

// app.get('/', function(req, res){
//     res.send('Hello World');
// });

// app.use(myLogger);
// npm repo morgan
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/',express.static('public'));
app.use('/user',user);

app.listen(3000, function(){
    console.log('server is listening on port 3000');
});
