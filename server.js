var express = require("express")
var bodyParser = require("body-parser")

var app = express()

app.use(express.static(__dirname));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var games = [{}]
//     {
//         id: 1,
//         owner: "Player",
//         opponent: undefined,
//         size: 3,
//         gameDuration: 0,
//         gameResult: undefined,
//         gameState: "ready",
//         grid: {
//             g1: "?",
//             g2: "?",
//             g3: "?",
//             g4: "?",
//             g5: "?",
//             g6: "?",
//             g7: "?",
//             g8: "?",
//             g9: "?",
//         }
//     },
//     {
//         id: 2,
//         owner: "Premade Two",
//         opponent: "Opponent",
//         size: 4,
//         gameDuration: 10,
//         gameResult: undefined,
//         gameState: "playing",
//         turn: "owner",
//         grid: {
//             g1: "?",
//             g2: "?",
//             g3: "?",
//             g4: "?",
//             g5: "?",
//             g6: "?",
//             g7: "?",
//             g8: "?",
//             g9: "?",
//         }
//     },
//     {
//         id: 3,
//         owner: "Premade Three",
//         opponent: "Opponent",
//         size: 5,
//         gameDuration: 110,
//         gameResult: "owner",
//         gameState: "done",
//         turn: "opponent",
//         grid: {
//             g1: "?",
//             g2: "?",
//             g3: "?",
//             g4: "?",
//             g5: "?",
//             g6: "?",
//             g7: "?",
//             g8: "?",
//             g9: "?",
//         }
//     }
// ]

app.get("/hello", function(req, res){
    res.send(__dirname)
})

app.get('/', function(req, res){
    res.render("home")
});

app.get('/game', function(req, res){
    res.render("game", {reqGame})
    reqGame = undefined
});

var reqGame

app.post("/games/join", function (req, res) {
    games.forEach(function(item){
        if (item.id == req.body.id){
            if (item.gameState == "ready"){
                item.opponent = req.body.username
                item.gameState = "playing"
                item.turn = "owner"
                console.log("game joined!")
            }
            reqGame = item
            reqGame.currentPlayer = req.body.username

        }
    })
    res.send(reqGame);
})

app.get("/games/list", function(req, res){
    res.send(games)
})

app.post("/game/state:id", function(req, res){
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
        gameState: "ready",
        grid: {
            g1: "?",
            g2: "?",
            g3: "?",
            g4: "?",
            g5: "?",
            g6: "?",
            g7: "?",
            g8: "?",
            g9: "?",
        }
    }
    reqGame = game
    reqGame.currentPlayer = req.body.username
    games.push(game)
    res.sendStatus(200)
})

app.post("/games/turn", function (req, res){
    games.forEach(function(item){
        if (item.id == req.body.id){
            item.grid[req.body.num] = req.body.symbol
            item.turn = (item.turn == "owner"? "opponent" : "owner")
        }
    })
    res.sendStatus(200)
})

    app.listen(4000, function() {
        console.log("API app started on port 4000")
    })
