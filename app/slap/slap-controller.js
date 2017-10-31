/**
 * CONTROLLER
 * Stuff that changes the DOM
 * Initializes Service
 * Middleman between user and actual data
 * 
 * WHAT IS A CONTROLLER?
 */

function SlapController() {
    // PRIVATE PARTS
    var slapService = new SlapService()

    //controller manipulates the DOM private called once
    function drawItems() {
        var items = slapService.getItems()
        var template = ``
        for (var item in items) {
            template += `<button type="button" class="btn" onclick="giveItem('` + item + `')">` + item + `</button>`
        }
        document.getElementById('items').innerHTML = template
    }

    //CONTROLLER private 
    function update() {
        var target = slapService.getTarget()
        document.getElementById('health').innerHTML = target.health
        document.getElementById('name').innerHTML = target.name
        document.getElementById('hits').innerHTML = target.hits
        if (target.health <= 0) {
            document.getElementById("play-space").innerHTML = `<h1>Knockout!</h1>`
        }
    }

    // PUBLIC PARTS
    this.attack = function attack(type){
        slapService.attack(type)
        update()   
    }

    update()
    drawItems()
}