const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const fs = require('fs')
var cors = require('cors')
const data = JSON.parse( fs.readFileSync('./json/data.json'));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test',function(req,res){
    res.send(data.test);
})

app.get('/test/:id', function (req, res) {
    const {id} = req.params;
    const findData = data.test.find(obj=>obj.id ==id)
    res.send(findData);
})
//추가
app.post('/test',function(req,res){
    data.test.push(req.body);
    const body =JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./json/data.json',body);
    res.send(data.test);
})
//삭제
app.delete('/test/:id', function (req, res) {
    const {id} = req.params;
    data.test = data.test.filter(obj=>obj.id!= id);
    const body = JSON.stringify(data);
    fs.writeFileSync('./json/data.json',body);
    res.send(data);
})
//찾기
app.put('/test/:id', function (req, res) {
    // const {id} = req.params;
    const upDataeBody = req.body;

    data.test = data.test.map(obj=>{
        if(obj.id == upDataeBody.id){
            obj = upDataeBody;
        }
        return obj;
    })

    const body = JSON.stringify(data);
    fs.writeFileSync('./json/data.json',body);

    res.send(data.test);
})

app.listen(3030)