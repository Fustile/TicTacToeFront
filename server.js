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

app.get("/game/state:id", function(req, res){
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

            let g1 = item.grid.g1
            let g2 = item.grid.g2
            let g3 = item.grid.g3
            let g4 = item.grid.g4
            let g5 = item.grid.g5
            let g6 = item.grid.g6
            let g7 = item.grid.g7
            let g8 = item.grid.g8
            let g9 = item.grid.g9


            if (g1 == "X" && g1 == g2 && g2 == g3){
                item.gameResult = "owner"
                item.gameState = "done"
            }

            if (g4 == "X" && g4 == g5 && g5 == g6){
                item.gameResult = "owner"
                item.gameState = "done"
            }

            if (g7 == "X" && g7 == g8 && g8 == g9){
                item.gameResult = "owner"
                item.gameState = "done"
            }


            if (g1 == "X" && g1 == g4 && g4 == g7){
                item.gameResult = "owner"
                item.gameState = "done"
            }

            if (g2 == "X" && g2 == g5 && g5 == g8){
                item.gameResult = "owner"
                item.gameState = "done"
            }

            if (g3 == "X" && g3 == g6 && g6 == g9){
                item.gameResult = "owner"
                item.gameState = "done"
            }


            if (g1 == "X" && g1 == g5 && g5 == g9){
                item.gameResult = "owner"
                item.gameState = "done"
            }

            if (g3 == "X" && g3 == g5 && g5 == g7){
                item.gameResult = "owner"
                item.gameState = "done"
            }



            if (g1 == "O" && g1 == g2 && g2 == g3){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            if (g4 == "O" && g4 == g5 && g5 == g6){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            if (g7 == "O" && g7 == g8 && g8 == g9){
                item.gameResult = "opponent"
                item.gameState = "done"
            }


            if (g1 == "O" && g1 == g4 && g4 == g7){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            if (g2 == "O" && g2 == g5 && g5 == g8){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            if (g3 == "O" && g3 == g6 && g6 == g9){
                item.gameResult = "opponent"
                item.gameState = "done"
            }


            if (g1 == "O" && g1 == g5 && g5 == g9){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            if (g3 == "O" && g3 == g5 && g5 == g7){
                item.gameResult = "opponent"
                item.gameState = "done"
            }

            function detectDraw(element, index, array){
                console.log ("element = ")
                console.log (element)
                for (index of element){
                    console.log("index of element")
                }
                // if (element == "?")
                // console.log("full")
                // else
                // console.log("not full")

            }
            console.log([item.grid].find(detectDraw))
        }
    })
    res.sendStatus(200)
})

app.post("/games/result", function (req, res){
    games.forEach(function(item){
        if (item.id == req.body.id){
            item.gameResult = req.body.result
            item.gameState = "done"
        }
    })
    res.sendStatus(200)
})

    app.listen(4000, function() {
        console.log("API app started on port 4000")
    })
