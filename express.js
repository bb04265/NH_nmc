const express = require('express');
const request = require("request");
const app = express();
const sampleApiData = require('./sample.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//login session settings

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/index', function(req,res){
    res.render('index');
});

app.get('/health', function(req, res){
    res.render('health');
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

app.get('/nbti_start', (req, res)=>{
    res.render('nbti_start')
})

//잔액 조회(소연)
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

//거래내역 조회(미래)
app.get('/inquireTransactionHistory', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/InquireTransactionHistory.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Header": {
                "ApiNm": "InquireTransactionHistory",
                "Tsymd": "20201211",
                "Trtm": "112428",
                "Iscd": "000700",
                "FintechApsno": "001",
                "ApiSvcCd": "ReceivedTransferA",
                "IsTuno": isTuno,
                "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
              },
            "Bncd": "011",
            "Acno": "3020000002982",
            "Insymd": "20201210",
            "Ineymd": "20201211",
            "TrnsDsnc": "A",
            "Lnsq": "DESC",
            "PageNo": "1",
            "Dmcnt": "100"
        })
    };

    request(option, function(err, response, body){
        var historyData = JSON.parse(body);
        console.log(historyData);
    });
});

//출금이체(미래)
app.get('/drawingTransfer', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;

    //등록한 계좌 중 선택해서 해도 좋겠어요 시간 남으면... ^^
    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/DrawingTransfer.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Header": {
                "ApiNm": "DrawingTransfer",
                "Tsymd": "20201211",
                "Trtm": "112428",
                "Iscd": "000700",
                "FintechApsno": "001",
                "ApiSvcCd": "DrawingTransferA",
                "IsTuno": isTuno,
                "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
              },
              "FinAcno": "00820100007000000000000004413",
              "Tram": "50000",
              "DractOtlt": "붉은 야채_" + isTuno
        })
    };

    request(option, function(err, response, body){
        var drawingTransferData = JSON.parse(body);
        console.log(drawingTransferData);
    });
});



app.listen(3000);