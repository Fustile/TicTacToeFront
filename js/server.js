var express = require("express")
var bodyParser = require("body-parser")
var MongoClient = require("mongodb").MongoClient

var app = express()
var db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var players = [
    {
        id: 1,
        name: "Player One"
    },
    {
        id: 2,
        name: "Player Two"
    },
    {
        id: 3,
        name: "Player Three"
    }
]

var games = [
    {

    }
]


app.get("/hello", function(req, res){
    res.send("Hello API")
})

app.get("/players/list", function(req, res){
    res.send(players)
})

app.get("/players/:id", function(req, res){
    console.log(req.params)
    var player = players.find(function (player) {
        return player.id === Number(req.params.id)
    })
    res.send(player.name)
})

app.post("/playersadd", function (req, res) {
    var player = {
        id: Date.now(),
        name: req.body.name
    }
    players.push(player)
    console.log(req.body)
    res.send(player)
})

app.put("/players/:id", function (req,res) {
    var player = players.find(function (player) {
        return player.id === Number(req.params.id)
    })
    player.name = req.body.name
    res.sendStatus(200)
})

app.delete("/players/:id", function (req, res){
    players = players.filter(function (player){
        return player.id !==Number(req.params.id)
    })
    res.sendStatus(200)
})

app.get("/players/list", function(req, res){
    res.send(games)
})

app.listen(4000, function() {
    console.log("API app started on port 4000")
})