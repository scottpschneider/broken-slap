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

function giveItem(item) {
    target.items.push(items[item])
};

function addMods() {
    var total = 1;
    for (var index = 0; index < target.items.length; index++) {
        var item = target.items[index];
        total += item.modifier
    }
    return total
};

function drawItems() {
    var template = ``
    for (var item in items) {
        template += `<button type="button" class="btn" onclick="giveItem('` + item + `')">` + item + `</button>`
    }
    document.getElementById('items').innerHTML = template
}

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
