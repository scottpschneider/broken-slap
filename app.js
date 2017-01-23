function GameService() {
    var dataStore = this;

    var target = new Target("Scarecrow", 100, 1, 5, 10, 200);

    var items = {
        shield: new Item('Shield', -0.3, "This is a way cool shield"),
        crows: new Item("Crows", 0.5, "More CROWS!"),
        straw: new Item("Straw", -0.2, "Stronger straw")
    };

    function Target(name, health, slap, punch, kick, roundhouse) {
        this.name = name;
        this.health = health;
        this.attacks = {
            "slap": slap,
            "punch": punch,
            "kick": kick,
            "roundhouse": roundhouse
        };
        this.items = []
        this.hits = 0
    };

    function Item(name, modifier, description) {
        this.name = name;
        this.modifier = modifier;
        this.description = description;
    };

    dataStore.attack = function (type) {
        target.health -= target.attacks[type] * this.addMods()
        if (target.health < 0) {
            target.health = 0
        }
        if (target.health > 100){
            target.health = 100 
        }
        target.hits += 1
    }

    // dataStore.punch = function () {
    //     target.health -= target.attacks.punch * this.addMods()
    //     if (target.health < 0) {
    //         target.health = 0
    //     }
    //     target.hits += 1
    //     update()
    // }

    // dataStore.kick = function () {
    //     target.health -= target.attacks.kick * this.addMods()
    //     if (target.health < 0) {
    //         target.health = 0
    //     }
    //     target.hits += 1
    //     update()
    // };

    dataStore.giveItem = function (item) {
        target.items.push(items[item])
    };

    dataStore.addMods = function () {
        var total = 1;
        for (var index = 0; index < target.items.length; index++) {
            var element = target.items[index];
            total += element.modifier
        }
        return total
    };

    dataStore.getTarget = function () {
        return Object.assign({}, target)
    };

    dataStore.getItems = function(){
        return Object.assign({}, items)
    }

}

function GameController() {
    var dataStore = new GameService()

    function drawItems() {
        var items = dataStore.getItems()
        var template = ``
        for (var element in items) {
            template += `<button type="button" class="btn" onclick="giveItem('` + element + `')">` + element + `</button>`
        }
        document.getElementById('items').innerHTML = template
    }

    function update() {
        var target = dataStore.getTarget()
        document.getElementById('health').innerHTML = target.health
        document.getElementById('name').innerHTML = target.name
        document.getElementById('hits').innerHTML = target.hits
        if (target.health <= 0) {
            document.getElementById("play-space").innerHTML = `<h1>Knockout!</h1>`
        }
    }

    this.attack = function(type){
        dataStore.attack(type)
        update()
    }

    this.giveItem = function(item){
        dataStore.giveItem(item)
        update()
    }

    update()
    drawItems()
}

GameController()