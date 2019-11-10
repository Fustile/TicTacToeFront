var express = require("express")
var bodyParser = require("body-parser")
var MongoClient = require("mongodb").MongoClient

var app = express()
var db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var games = [
    {
        id: 1,
        name: "Game One"
    },
    {
        id: 2,
        name: "Game Two"
    },
    {
        id: 3,
        name: "Game Three"
    }
]



app.get("/hello", function(req, res){
    res.send(db)
})

app.get("/games/list", function(req, res){
    res.send(games)
})

app.get("/games/:id", function(req, res){
    console.log(req.params)
    var game = games.find(function (game) {
        return game.id === Number(req.params.id)
    })
    res.send(game.name)
})

app.post("/games/new", function (req, res, db) {
    var game = {
        name: req.body.name
    }

    // db.createCollection(games)
    db.collection("games").insert(game, function(err, result){
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.send(game)
    })
})

app.put("/games/:id", function (req,res) {
    var game = games.find(function (game) {
        return game.id === Number(req.params.id)
    })
    game.name = req.body.name
    res.sendStatus(200)
})

app.delete("/games/:id", function (req, res){
    games = games.filter(function (game){
        return game.id !==Number(req.params.id)
    })
    res.sendStatus(200)
})

app.get("/games/list", function(req, res){
    res.send(games)
})



MongoClient.connect('mongodb://localhost:27017/tictactoe', function(err, database){
    if (err) {
        return console.log(err)
    }
    db = database
    app.listen(4000, function() {
        console.log("API app started on port")
    })
})