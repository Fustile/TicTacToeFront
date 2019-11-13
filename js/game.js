$(document).ready(function(){

    $(".playerContainer").removeClass("playerActive")

    var gameId = $("#gameId").text()
    gameId = gameId.replace(/"/g,"")

    var currentPlayer = $("#currentPlayer").text()
    currentPlayer = currentPlayer.replace(/"/g,"")

    refreshState()

    window.setInterval(function(){
        console.log("Refreshed")
        if (buffer == undefined)
        return
        refreshState()
    }, 2000);



    var buffer
    function refreshState(){
        var update = {
            id: gameId
        }
        $.ajax({
            type: 'POST',
            url: '/game/state' + gameId,
            data: JSON.stringify(update),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function(json){
                if (buffer !== json){
                    buffer = json
                    applyState(json)
                }
            }
        })
    }

    function applyState(json) {
        console.log(json.grid)
        $.each(json.grid, function(index){
            index=index.slice(1)
            if (json.grid["g" + index] == "X"){
                console.log("X in grid " + [index])
                $("#gameGrid" + [index]).html('<img src=img/Xb.png id="g' + [index] + '" class="gridX imgInactive">')
                $("#g" + [index]).show()
            }
            if (json.grid["g" + index] == "O"){
                console.log("O in grid " + [index])
                $("#gameGrid" + [index]).html('<img src=img/Ob.png id="g' + [index] + '" class="gridO imgInactive">')
                $("#g" + [index]).show()
            }
        })
        if (json.gameState == "ready"){
            $("#playerTwoContainer").hide()
        }
        if (json.gameState !== "ready"){
            $("#playerTwoContainer").show()
        }
        $(".playerOne").text(json.owner)
        if (json.owner == currentPlayer){
            currentPlayer = "owner"
            $(".playerOneImg").removeClass("imgInactive").addClass("imgActive")
            $(".gridX").removeClass("imgInactive").addClass("imgActive")
        }
        $(".playerTwo").text(json.opponent)
        if (json.opponent == currentPlayer){
            currentPlayer = "opponent"
            $(".playerTwoImg").removeClass("imgInactive").addClass("imgActive")
            $(".gridO").removeClass("imgInactive").addClass("imgActive")
        }
        if (json.turn == "owner"){
            $("#playerOneContainer").addClass("playerActive")
            $("#playerTwoContainer").removeClass("playerActive")

        }
        if (json.turn == "opponent"){
            $("#playerOneContainer").removeClass("playerActive")
            $("#playerTwoContainer").addClass("playerActive")
        }
    }

    var num
    $("[id^=gameGrid]").click(function (){
        num = "g" + this.id.slice(8)
        if (buffer.turn == currentPlayer){
            console.log("currentPlayer makes a turn")
            let symbol = (currentPlayer == "owner"? "X" : "O")
            newTurn = {
                id: gameId,
                num: num,
                symbol: symbol,
            }
            console.log(newTurn)
            $.ajax({
                type: 'POST',
                url: '/games/turn',
                data: JSON.stringify(newTurn),
                contentType: "application/json;charset=utf-8",
                dataType: 'json',
                success: function(json){
                },
            })
            refreshState()
        }
    })


    $("#concede").click(function(){
        document.location.href = "/"
    })


})
