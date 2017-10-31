//SERVICE private
var target = new Target("Scarecrow", 100, 1, 5, 10, 200);

//Service private
var items = {
    shield: new Item('Shield', -0.3, "This is a way cool shield"),
    crows: new Item("Crows", 0.5, "More CROWS!"),
    straw: new Item("Straw", -0.2, "Stronger straw"),
    fire: new Item("Fire", 1.6, "its super effective")
};

//DATA service private
function Target(name, health, slap, punch, kick, roundhouse) {
    this.name = name;
    this.health = health;
    this.attacks = {
        slap: slap,
        punch: punch,
        kick: kick,
        roundhouse: roundhouse
    };
    this.items = []
    this.hits = 0
};

//service private
function Item(name, modifier, description) {
    this.name = name;
    this.modifier = modifier;
    this.description = description;
};

//controller???????///SERVICE
//WE NEED THIS IN TWO PLACES\

//attack attack
//separation of concerns
//SERVICE public 
//Conroller public
function attack(type) {
    target.health -= target.attacks[type] * addMods()
    if (target.health < 0) {
        target.health = 0
    }
    if (target.health > 100) {
        target.health = 100
    }
    target.hits += 1
    update()
}
//both public
function giveItem(item) {
    target.items.push(items[item])
};

//Service private
function addMods() {
    var total = 1;
    for (var index = 0; index < target.items.length; index++) {
        var item = target.items[index];
        total += item.modifier
    }
    return total
};

//controller manipulates the DOM private called once
function drawItems() {
    var template = ``
    for (var item in items) {
        template += `<button type="button" class="btn" onclick="giveItem('` + item + `')">` + item + `</button>`
    }
    document.getElementById('items').innerHTML = template
}

//CONTROLLER private 
function update() {
    document.getElementById('health').innerHTML = target.health
    document.getElementById('name').innerHTML = target.name
    document.getElementById('hits').innerHTML = target.hits
    if (target.health <= 0) {
        document.getElementById("play-space").innerHTML = `<h1>Knockout!</h1>`
    }
}

update()
drawItems()
