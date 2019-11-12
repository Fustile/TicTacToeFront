$(document).ready(function(){

                                            // Index.html

    for (let n = 0; n < 20; n++) {
        $("#game" + n).hide()
    }




    refreshList()

    window.setInterval(function(){
        console.log("Refreshed")
        if (buffer == undefined)
        return
        refreshList()
    }, 2000);


    var buffer
    function refreshList(){
        $.ajax({
            type: 'GET',
            url: '/games/list',
            dataType: 'json',
            success: function(json){
                if (json == buffer)
                return
                buffer = json
                fillGrid(json)
            }
        })
    }

    function fillGrid(json){
        $.each(json, function(index){
            // console.log( [index + 1] + ": " + json[index].owner );
            $("#game" + [index+1]).find(".name1").removeClass("winner")
            $("#game" + [index+1]).find(".name1").removeClass("winner")
            if (json[index].gameState == "ready"){
                $("#game" + [index+1]).attr("class","gridReady")
                $("#game" + [index+1]).find(".name1").text(json[index].owner)
                $("#game" + [index+1]).find(".name2").hide()
            }
            if (json[index].gameState == "playing"){
                $("#game" + [index+1]).attr("class","gridProgress")
                $("#game" + [index+1]).find(".name1").text(json[index].owner)
                $("#game" + [index+1]).find(".name2").text(json[index].opponent)
                $("#game" + [index+1]).find(".name2").show()
            }
            if (json[index].gameState == "done"){
                if ( json[index].gameResult == "owner"){
                    $("#game" + [index+1]).find(".name1").addClass("winner")
                    $("#game" + [index+1]).find(".name1").html(json[index].owner + '<i class="fa fa-check" aria-hidden="true"></i>')
                    $("#game" + [index+1]).find(".name2").text(json[index].opponent)
                }
                if ( json[index].gameResult == "opponent"){
                    $("#game" + [index+1]).find(".name2").addClass("winner")
                    $("#game" + [index+1]).find(".name1").text(json[index].owner)
                    $("#game" + [index+1]).find(".name2").html(json[index].opponent + '<i class="fa fa-check" aria-hidden="true"></i>')
                }
                $("#game" + [index+1]).attr("class","gridEnded")
                $("#game" + [index+1]).find(".name2").show()
            }
            $("#game" + [index+1]).find(".gameTime").text(json[index].gameDuration)
            $("#game" + [index+1]).show()
        })
    }

    var num
    var _id
    $("[id^=game]").click(function () {
        // if ($(this).hasClass("gridReady") == true) {
        //     console.log("class gridReady")
            if (user == undefined){
                $("#usernameInput").css('outline', 'solid 1px red');
                return
            }
            num = this.id.slice(4)
            num--
            _id = buffer[num].id
            var joinGame = {
                username: user,
                id: _id
            }
            if ($(this).hasClass("gridReady") == false) {
                console.log("class not gridReady")
                joinGame.id = 0
            }
            console.log(JSON.stringify(joinGame))
            $.ajax({
                type: 'POST',
                url: '/games/join',
                data: JSON.stringify(joinGame),
                contentType: "application/json;charset=utf-8",
                dataType: 'json',
                success: function(json){
                    console.log(json)
                },
            })
            document.location.href = "/game"
  
        // }
    })

    var user
    $("#usernameSubmit").click(function(){
        if ($("#usernameInput").val() == ""){
            $("#usernameInput").css('outline', 'solid 1px red');
            return
        }
        console.log("submit clicked")
        user = $("#usernameInput").val()
        $("#usernameInput").hide()
        $("#usernameSubmit").hide()
        $(".username").text($("#usernameInput").val())
    })

    $("#newGameButton").click(function(){
        if (user == undefined){
            $("#usernameInput").css('outline', 'solid 1px red');
            return
        }
        var newGame = {
            username: user,
            size: 3
        }
        console.log(JSON.stringify(newGame))
        $.ajax({
            type: 'POST',
            url: '/games/new',
            data: JSON.stringify(newGame),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function(json){
                console.log(json)
            },
        })
    })
    

                                            // Game.html




})