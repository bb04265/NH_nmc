const express = require('express');
const app = express();
const sampleApiData = require('./sample.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//login session settings

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/index', function(req,res){
    res.render('index');
});

app.get('/health', function(req, res){
    res.render('health');
});
app.get('/generic', function(req, res){
    res.render('generic');
});
app.get('/elements', function(req, res){
    res.render('elements');
});
app.get('/health_result', function(req, res){
    res.render('health_result');
});
app.get('/inspection', (req, res)=>{
    res.json(sampleApiData)
})
app.get('/health_recommend', (req, res)=>{
    res.render('health_recommend')
})


app.listen(3000);
