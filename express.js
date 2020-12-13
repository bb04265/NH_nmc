const express = require('express');
const request = require("request");
const app = express();
const sampleApiData = require('./sample.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/index', function(req,res){
    res.render('index');
});
app.get('/elements', function(req,res){
    res.render('elements');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/health', function(req, res){
    res.render('health');
});

app.get('/health_result', function(req, res){
    res.render('health_result');
});

app.get('/inspection', (req, res)=>{
    res.json(sampleApiData)
});

app.get('/health_recommend', (req, res)=>{
    res.render('health_recommend')
});

app.get('/nbti_start', (req, res)=>{
    res.render('nbti_start')
});

app.get('/inquire_balance', (req, res)=>{
    res.render('inquire_balance')
});

app.get('/account', (req, res)=>{
    res.render('account')
});

app.get('/nbti_survey', (req, res)=>{
    res.render('nbti_survey')
});

app.get('/nbti_result', (req, res)=>{
    res.render('nbti_result')
});

app.get('/selftest', (req, res)=>{
    res.render('selftest')
});

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

//잔액 조회
app.post('/inquire_balance', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;
    var today = getFormatDate(new Date());

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/InquireBalance.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "Header": {
                    "ApiNm": "InquireBalance",
                    "Tsymd": today,
                    "Trtm": "112428",
                    "Iscd": "000700",
                    "FintechApsno": "001",
                    "ApiSvcCd": "ReceivedTransferA",
                    "IsTuno": isTuno,
                    "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
                },
                "FinAcno": "00820100007000000000000004413"
            })
    };

    request(option, function(err, response, body){
        var balanceData = JSON.parse(body);
        console.log(balanceData);
        res.json(balanceData);
    });
});

//거래내역 조회
app.post('/inquire_transaction_history', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;
    var today = getFormatDate(new Date());

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/InquireTransactionHistory.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Header": {
                "ApiNm": "InquireTransactionHistory",
                "Tsymd": today,
                "Trtm": "112428",
                "Iscd": "000700",
                "FintechApsno": "001",
                "ApiSvcCd": "ReceivedTransferA",
                "IsTuno": isTuno,
                "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
            },
            "Bncd": "011",
            "Acno": "3020000003222",
            "Insymd": "20201210",
            "Ineymd": today,
            "TrnsDsnc": "A",
            "Lnsq": "DESC",
            "PageNo": "1",
            "Dmcnt": "100"
        })
    };

    request(option, function(err, response, body){
        var historyData = JSON.parse(body);
        console.log(historyData);
        res.json(historyData);
    });
});

//입금이체
app.post('/received_transfer', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;
    var today = getFormatDate(new Date());

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Header": {
                "ApiNm": "ReceivedTransferAccountNumber",
                "Tsymd": today,
                "Trtm": "112428",
                "Iscd": "000700",
                "FintechApsno": "001",
                "ApiSvcCd": "ReceivedTransferA",
                "IsTuno": isTuno,
                "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
            },
                "Bncd": "011",
                "Acno": "3020000003222",
                "Tram": "1000", //임시 적립금
                "DractOtlt": "출금해 가용~^^",
                "MractOtlt": "적립금"
        })
    };

    request(option, function(err, response, body){
        var receivedTransferData = JSON.parse(body);
        console.log(receivedTransferData);
        res.json(receivedTransferData);
    });
});

//출금이체
app.get('/drawingTransfer', function(req, res) {
    var isTuno = Math.floor(Math.random() * 899999999) + 100000000;
    var today = getFormatDate(new Date());

    var option = {
        method: "POST",
        url: "https://developers.nonghyup.com/DrawingTransfer.nh",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Header": {
                "ApiNm": "DrawingTransfer",
                "Tsymd": today,
                "Trtm": "112428",
                "Iscd": "000700",
                "FintechApsno": "001",
                "ApiSvcCd": "DrawingTransferA",
                "IsTuno": isTuno,
                "AccessToken": "61e53b6d3d54329e20c3ff50a2f69b2df0ec25311c5e7649c133f4cf7007b57d"
            },
            "FinAcno": "00820100007000000000000004413",
            "Tram": "50000",
            "DractOtlt": "노릇노릇 야채"
        })
    };

    request(option, function(err, response, body){
        var drawingTransferData = JSON.parse(body);
        console.log(drawingTransferData);
    });
});

app.listen(3000);
