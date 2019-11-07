$(document).ready(function(){

    $("#usernameSubmit").click(function(){
        if ($("#usernameInput").val() == ""){
            $("#usernameInput").css('outline', 'solid 1px red');
            return
        }
        console.log("submit clicked")
        $("#usernameInput").hide()
        $("#usernameSubmit").hide()
        $(".username").text($("#usernameInput").val())
    })



















    // var players = {
    //     one: {
    //         state: false,
    //         name: null
    //     },
    //     two: {
    //         state: false,
    //         name: null
    //     },
    // }

    // $("#grid1").click(function(){
    //     $("#grid1").css("background-color","red")
    // })

    // $("#changePlayer").click(function(){

    // })

    // $("#newPlayer").click(function(){
    //     console.log(players.one)

    //     if (players.one.state == false && $("#inputName").val() !== ""){
    //         console.log("one")
    //         players.one.name = $("#inputName").val()
    //         players.one.state = true
    //         console.log(players.one)
    //     }
    //     else if (players.two.state == false && $("#inputName").val() !== ""){
    //         players.two.name = $("#inputName").val()
    //         players.two.state = true
    //         console.log(players.two)
    //     }
    //     console.log(players)
    // })



















})