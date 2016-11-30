var express = require('express');
var approot = require("app-root-path");
var bodyParser = require('body-parser');
var cors = require("cors");
var mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://pranjali21:pranjali21@ds111798.mlab.com:11798/heroku_lb7xqcrg");

var schema = new mongoose.Schema({

    Rank: Number,
    Stadium : String,
    Capacity : String,
    City : String,
    State : String

});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var data_value = mongoose.model('data',schema,'stadium');

//app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 5000;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function (request,response) {
    response.render(__dirname+ 'pages/index');
});

app.get('/db1', function (request,response) {

    data_value.find({},{"Rank":1 ,"_id":0}, function (err, data) {
        //console.log(data);
        return response.json(data);
    });
})


app.get('/db/:rank',function(request,response){
  data_value.findOne({"Rank": request.params.rank}, {"_id":0}, function (err, data) {
       response.json(data);

  })
})


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
module.exports = app;