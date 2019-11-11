var express = require("express")
var bodyParser = require("body-parser")
var fs = require("fs")

var app = express()
app.use(express.static(__dirname));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var games = [
    {
        id: 1,
        owner: "Premade One",
        opponent: undefined,
        size: 3,
        gameDuration: 0,
        gameResult: undefined,
        gameState: "ready"
    },
    {
        owner: "Premade Two",
        opponent: "Opponent",
        size: 4,
        gameDuration: 10,
        gameResult: undefined,
        gameState: "playing"
    },
    {
        id: 3,
        owner: "Premade Three",
        opponent: "Opponent",
        size: 5,
        gameDuration: 110,
        gameResult: "owner",
        gameState: "done"
    }
]



app.get("/hello", function(req, res){
    res.send("Hello")
})

app.get('/', function(req, res){
    res.render("index.html");
});

app.get("/games/list", function(req, res){
    res.send(games)
})

// app.get("/games/:id", function(req, res){
//     console.log(req.params)
//     var game = games.find(function (game) {
//         return game.id === Number(req.params.id)
//     })
//     res.send(game)
// })

app.post("/games/new", function (req, res) {
    var game = {
        id: Date.now(),
        owner: req.body.username,
        opponent: undefined,
        size: req.body.size,
        gameDuration: 0,
        gameResult: undefined,
        gameState: "ready"
    }
    games.push(game)
        res.sendStatus(200)
})

// app.put("/games/:id", function (req,res) {
//     var game = games.find(function (game) {
//         return game.id === Number(req.params.id)
//     })
//     game.name = req.body.name
//     res.sendStatus(200)
// })

// app.delete("/games/:id", function (req, res){
//     games = games.filter(function (game){
//         return game.id !==Number(req.params.id)
//     })
//     res.sendStatus(200)
// })

app.post("/games/join", function (req, res) {
    var game = games.find(function (game) {
        return game.id === Number(req.params.id)
    })
    if (game.gameState !== "ready"){
        res.sendStatus(200)
        return
    }
    game.opponent = req.body.opponent
    game.gameState = "playing"
    res.sendStatus(200)
})




    app.listen(4000, function() {
        console.log("API app started on port 4000")
    })
