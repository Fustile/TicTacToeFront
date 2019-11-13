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
        $.ajax({
            type: 'GET',
            url: '/game/state' + gameId,
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
        $.each(json.grid, function(index){
            index=index.slice(1)
            if (json.grid["g" + index] == "X"){
                $("#gameGrid" + [index]).html('<img src=img/Xb.png id="g' + [index] + '" class="gridX imgInactive">')
                $("#g" + [index]).show()
            }
            if (json.grid["g" + index] == "O"){
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
        if (json.gameState == "done"){
            $("#concede").text("BACK")
        }
        $(".playerOne").text(json.owner)
        if (json.owner == currentPlayer || currentPlayer == "owner"){
            currentPlayer = "owner"
            $(".playerOneImg").removeClass("imgInactive").addClass("imgActive")
            $(".gridX").removeClass("imgInactive").addClass("imgActive")
        }
        $(".playerTwo").text(json.opponent)
        if (json.opponent == currentPlayer || currentPlayer == "opponent"){
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
        if (json.gameResult == "owner"){
            $("#timer").text(json.owner + " won!")
        }
        if (json.gameResult == "opponent"){
            $("#timer").text(json.opponent + " won!")
        }
    }

    var num
    $("[id^=gameGrid]").click(function (){
        num = "g" + this.id.slice(8)
        if (buffer.turn == currentPlayer){
            let symbol = (currentPlayer == "owner"? "X" : "O")
            newTurn = {
                id: gameId,
                num: num,
                symbol: symbol,
            }
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
        if (buffer.gameResult == "owner"){
            document.location.href = "/"
            return
        }
        if (buffer.gameResult == "opponent"){
            document.location.href = "/"
            return
        }
        let n
        if (currentPlayer == "owner"){
            n = "opponent"
        }
        if (currentPlayer == "opponent"){
            n = "owner"
        }
        let Result ={
            id: gameId,
            result: n,
        }
        $.ajax({
            type: 'POST',
            url: '/games/result',
            data: JSON.stringify(Result),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function(json){
            },
        })
        document.location.href = "/"
    })


})
