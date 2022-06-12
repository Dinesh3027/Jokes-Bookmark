const express = require('express');
const bodyParser = require('body-parser');
const apis = require('./routes/app');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api', apis.router);


app.listen(3000, function () {
    console.log('listening on 3000')
});