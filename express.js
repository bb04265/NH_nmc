const express = require('express');
const request = require("request");
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/index', function(req,res){
    res.render('index');
});

app.get('/inquireBalance', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/InquireBalance.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "Header": {
                    "ApiNm": "InquireBalance",
                    "Tsymd": "20201211",
                    "Trtm": "112428",
                    "Iscd": "000697",
                    "FintechApsno": "001",
                    "ApiSvcCd": "ReceivedTransferA",
                    "IsTuno": isTuno,
                    "AccessToken": "93061c4aa817ece5ee30747f3de8fc3e49c8b6c07e7657ebfea9641dab3fecb9"
                },
                "FinAcno": "00820100006970000000000004265"
            })
    };

    request(option, function(err, response, body){
        var balanceData = JSON.parse(body);
        console.log(balanceData);
    });
});

app.listen(3000);