var express = require("express")
var bodyParser = require("body-parser")
const path = require("path")

var app = express()

app.use(express.static(__dirname));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



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
        id: 2,
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

var GamePage = path.join(__dirname + "/game.html")

app.get("/hello", function(req, res){
    res.send(__dirname)
})

app.get('/', function(req, res){
    res.render("home")
});

app.get('/game', function(req, res){
    res.render("game", {reqGame})
});

var reqGame

app.post("/games/join", function (req, res) {
    games.forEach(function(item){
        if (item.id == req.body.id){
            reqGame = item
            item.opponent = req.body.username
            item.gameState = "playing"
            console.log("game joined!")
        }
    })
    res.send(reqGame);
})

app.get("/games/list", function(req, res){
    res.send(games)
})

app.post("/games/:id", function(req, res){
    let game
    games.forEach(function(item){
        if (item.id == req.params.id){
            game = item
        }
    })
    res.send(game)
})

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

// app.get("/join/:id/:username", function (req, res){
//     var reqId = req.params.id
//     var reqUsername = req.params.username
//     games.forEach(function(item){
//         if (item.id == reqId){
//             reqGame = item
//             if (item.gameState == "ready"){
//                 item.opponent = reqUsername
//                 item.gameState = "playing"
//                 console.log("game joined!")
//             }
//         }
//     })
//     console.log(reqId + reqUsername)
//     res.send(reqGame)
//     // res.render("game")
// })





    app.listen(4000, function() {
        console.log("API app started on port 4000")
    })
