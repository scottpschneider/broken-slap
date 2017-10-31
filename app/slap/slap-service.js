/**
 * DATA ... other stuff yet to talk about
 */

function SlapService() {
    // PRIVATE PARTS
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
            "slap": slap,
            "punch": punch,
            "kick": kick,
            "roundhouse": roundhouse
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
    //Service private
    function addMods() {
        var total = 1;
        for (var index = 0; index < target.items.length; index++) {
            var item = target.items[index];
            total += item.modifier
        }
        return total
    };

    //  PUBLIC == this 

    this.attack = function attack(type) {
        //DO STUFF
        if (target.attacks[type]) {
            target.health -= target.attacks[type] * addMods()
            target.hits++
        }
    }

    this.getTarget = function getTarget() {
        return JSON.parse(JSON.stringify(target)) // non-primative passed by reference
        // primatives are passed by value
    }

    this.getItems = function getItems() {
        return JSON.parse(JSON.stringify(items))
    }

}