$(document).ready(function(){

    $("#gameId").hide()
    var gameId = $("#gameId").text()
    gameId = gameId.replace(/"/g,"")
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
            url: '/games/' + gameId,
            data: JSON.stringify(update),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function(json){
                if (json == buffer)
                return
                buffer = json
                // fillGrid(json)

            }
        })
    }









    $("#concede").click(function(){
        // gameId.replace(/\"/g, "")
        // console.log(username)
        // var game = "<%= reqGame %>"
        console.log(gameId);
    })

    // <script>var game = "<%= game %>";</script>


















})
