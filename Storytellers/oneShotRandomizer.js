let output = "Hello";
let towns = ["Skystead", "Yarrin", "Fjordton", "Haling Cove", "Lockwood Village", 
"Daekrahm Village", "Old Begtuok", "Lumina Village", "Tarnstead Outpost", 
"Aygisth Village", "Western Solaris", "Warchester Town", "Akriel Town",
"Glimmer Villa", "Town of Ebba", "Sky Port"];
let cityTypes = ["Coastal", "Forested", "Cliffside", "Port", "Mountain", "Underground", 
"Desert", "Frozen Tundra", "Taiga", "Rain Forested", "Grassland", "Savanna",
"Underwater", "Swamp"];
let locations = ["Mine", "Ruin", "Haunted House", "Camp", "School", "Temples",
"Fortress", "Castle", "Dungeon", "Road", "Bridge", "Ferry", 
"Inn", "Tavern", "Port", "Saloon", "Prison", "Shop", "Church",
"Bathhouse", "Library", "Arena", "Auction", "Party", "Performance",
"Healers", "Brawl", "Tea Shop", "Forest", "Festival", "Watch duty"];
let names = ["Raven", "Brona", "Lorelai", "Alastair", "Azazel", "Jabez", "Sable",
"Hades", "Odon", "Typhon", "Adrielle", "Thanatos", "Revon", "Kol",
"Nyx", "Vlasta", "Keres", "Kuraim", "Ozul"];
let races = ["Dwarf", "Elf", "Halfling",
"Human", "Dragonborn", "Gnome", "Half-elf",
"Half-orc", "Tiefling", "Aarakocra", "Genasi",
"Goliath", "Changelings", "Goblinoids", "Kalashtar",
"Orc", "Shifters", "Warforged", "Corvian",
"Crystalkin", "Deepling", "Fairy", "Centaur", "Leonin",
"Minotaur", "Satyr", "Triton", "Aasimar", "Firbolgs",
"Kenku", "Tortles", "Simic Hybrid", "Vedalken", "Loxodon",
"Tabaxi", "Hollow One"];
let classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
"Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"];
let backgrounds = ["Acolyte", "Charlatan", "Criminal", "Entertainer", 
"Spy", "Gladiator", "Guild Artisan", "Guild Merchant", "Hermit", 
"Noble", "Knight", "Outlander", "Sage", "Sailor", "Pirate", "Soldier", 
"Urchin", "House Agent", "City Watch", "Investigator", "Clan Crafter", 
"Cloistered Scholar", "Courtier", "Faction Agent", "Far Traveler", 
"Inheritor", "Knight of the Order", "Mercenary Vetran", "Urban Bounty Hunter",
"Uthgardt Tribe Member", "Waterdhavian Noble", "Hidden Villager", 
"Planar Traveler", "Grinner", "Volstrucker Agent", "Athlete"];
let items = ["Door of Delusion", "Gloves of Resurrection", "Eternity Crown", "Mask of Vengeance", "Tablet of Karma", "Pillar of Invincibility",
"Fire Chalice"];


var story = document.querySelector(".story")

function getRandom(list){
    let item = list[Math.floor(Math.random()*list.length)];
    return item;
}

function articleTemplate(){
    story.innerHTML = "";
    let town = getRandom(towns);
    let townType = getRandom(cityTypes);
    let location = getRandom(locations);
    let name = getRandom(names);
    let race = getRandom(races);
    let subrace = get_subrace(race) + " ";
    let aclass = getRandom(classes);
    let subclass = get_subclass(aclass) + ", ";
    let background = getRandom(backgrounds);
    let item = getRandom(items);
    story.innerHTML += `
        <p>In a ${townType} environment lies a town called ${town}. In the ${location} we find our adventurers. These merry few are pitted against ${name}, the ${background}, the ${subrace}${race} with their abilities as a(n) ${subclass}${aclass} who is on the search for the ${item}.</p>
    `;
}

function get_subrace(race){
    let subrace = ""
    let subraces = ""
    //I included all races incase later on more subclasses are available
    if (race == "Dwarf") {
            subraces =  ["Hill Dwarf", "Mountain Dwarf", "Duergar", "Ember Dwarf",
            "Stone Dwarf", "Tundra Dwarf"];
    };
    if (race == "Elf") {
            subraces = ["High", "Wood", "Dark (Drow)", "Moon", 
            "Sun", "Pallid", "Sea", "Bright", "Green", 
            "Thimble"];
    };
    if (race == "Halfling") {
            subraces = ["Lightfoot", "Stout", "Jungle", "River",
                "Lotusden", "Strongheart"];
    };
    if (race == "Human") {
            subraces =  [""];
    };
    if (race == "Dragonborn") {
            subraces = ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold",
            "Green", "Red", "Silver", "White", "Draconblood", "Ravenite"];
    };
    if (race == "Gnome") {
            subraces = ["Forest", "Rock", "Deep (Svirfneblin)"];
    };
    if (race == "Half-elf") {
            subraces = ["Wood (Variant)", "Moon (Variant)", "Sun (Variant)",
                "Aquatic (Variant)"];
    };
    if (race == "Half-orc") {
            subraces = [""];
    };
    if (race == "Tiefling") {
            subraces = ["Feral (Variant)", "Devil's Tongue (Variant)", 
            "Hellfire (Variant)", "Winged (Variant)", "Apperance (Variant)"];
    };
    if (race == "Aarakocra") {
            subraces = [""];
    };
    if (race == "Genasi") {
            subraces = ["Air", "Earth", "Fire",
                "Water", "Ash", "Ice", "Slime",
                "Storm"];
    };
    if (race == "Goliath") {
            subraces = [""];
    };
    if (race == "Changelings") {
            subraces = [""];
    };
    if (race == "Goblinoids") {
            subraces = ["Bugbear", "Goblin", "Hobgoblin"];
    };
    if (race == "Kalashtar") {
            subraces = [""];
    };
    if (race == "Orc") {
            subraces = [""];
    };
    if (race == "Shifters") {
            subraces = ["Beasthide", "Longtooth", "Swiftstride", "Wildhunt"];
    };
    if (race == "Warforged") {
            subraces = [""];
    };
    if (race == "Corvian") {
            subraces = [""];
    };
    if (race == "Crystalkin") {
            subraces = ["Shardmind", "Glassheart"];
    };
    if (race == "Deepling") {
            subraces = [""];
    };
    if (race == "Fairy") {
            subraces = ["Pixies", "Sprites", "Scamps"];
    };
    if (race == "Centaur") {
            subraces = [""];
    };
    if (race == "Leonin") {
            subraces = [""];
    };
    if (race == "Minotaur") {
            subraces = [""];
    };
    if (race == "Satyr") {
            subraces = [""];
    };
    if (race == "Triton") {
            subraces = [""];
    };
    if (race == "Aasimar") {
            subraces = ["Protector", "Scourge", "Fallen"];
    };
    if (race == "Firbolgs") {
            subraces = [""];
    };
    if (race == "Kenku") {
            subraces = [""];
    };
    if (race == "Tortles") {
            subraces = [""];
    };
    if (race == "Simic Hybrid") {
            subraces = [""];
    };
    if (race == "Vedalken") {
            subraces = [""];
    };
    if (race == "Loxodon") {
            subraces = [""];
    };
    if (race == "Tabaxi") {
            subraces = [""];
    };
    if (race == "Hollow One") {
            subraces = [""];
    };
    subrace = getRandom(subraces);
    return subrace;
}

function get_subclass(aclass){
    let subclass = ""
    let subclasses = []
    if (aclass == "Barbarian"){
        subclasses = ["Path of the Berserker", "Path of the Totem Warrior", "Path of the Quake Bringer", "Path of the Sky Caller",
            "Path of the Verdant Warden", "Path of the Ancestral Gardian", "Path of the Storm Herald", "Path of the Zealot"];
    };

    if (aclass == "Bard"){
        subclasses = ["College of Lore", "College of Valor", "College of Eloquence", "College of Journeys", "College of Glamour",
            "College of Swords", "College of Whispers"];
    };

    if (aclass == "Cleric"){
        subclasses = ["Knowledge Domain", "Life Domain", "Light Domain", "Nature Domain", "Tempest Domain",
            "Trickery Domain", "War Domain", "Arcana Domain", "Mountain Domain", "Sea Domain", "Travel Domain",
            "Winter Domain", "Forge Domain", "Grave Domain", "Order Domain"];
    };

    if (aclass == "Druid"){
        subclasses = ["Circle of Land", "Circle of Moon", "Circle of Swords", "Circle of Seeds", "Circle of Storms",
            "Circle of Dreams", "Circle of Shepherd", "Circle of Spores"];
    };

    if (aclass == "Fighter"){
        subclasses = ["Champion", "Battle Master","Eldritch Knight", 
            "Purple Dragon Knight", "Flame Dancer", "Wind Knight",
            "Arcane Archer", "Cavalier", "Samurai", "Echo Knight"];
    };

    if (aclass == "Monk"){
        subclasses = ["Way of the Open Hand", "Way of the Shadow", "Way of the Four Elements", "Way of the Long Death",
            "Way of the Sun Soul", "Way of the Flying Fist", "Way of the Drunken Master", "Way of the Kensei"];
    };

    if (aclass == "Paladin"){
        subclasses = ["Oath of Devotion", "Oath of Ancients", "Oath of Vengeance", "Oath of Glory", "Oath of Crown",
            "Oath of Dynamism", "Oath of Purification", "Oath of Conquest", "Oath of Redemption"];
    };

    if (aclass == "Ranger"){
        subclasses = ["Hunter", "Beast Master", "Fire Keeper", "Mariner",
            "Gloom Stalker", "Horizon Walker", "Monster Slayer"];
    };

    if (aclass == "Rogue"){
        subclasses = ["Thief", "Assassin", "Arcane Trickster", "Mastermind",
            "Swashbuckler", "Aerialist", "Inquisitive", "Scout"];
    };

    if (aclass == "Sorcerer"){
        subclasses = ["Draconic Bloodline", "Wild Magic", "Storm Sorcery",
            "Cosmic Affinity", "Elemental Magic", "Green Thumb", "Divine Soul",
            "Shadow"];
    };

    if (aclass == "Warlock"){
        subclasses = ["Archfey Patron", "Fiend Patron", "Great Old One Patron", 
            "Undying Patron", "Dragon Patron", "Celestial Patron", "Hexblade Patron"];
    };

    if (aclass == "Wizard"){
        subclasses = ["School of Abjuration", "School of Conjuration", "School of Divination", "School of Enchantment",
            "School of Evocation", "School of Illusion", "School of Necromancy", "School of Transmutation", "School of Bladesinging",
            "School of War", "School of Chronurgy", "School of Graviturgy"];
    };

    if (aclass == "Artificer"){
        subclasses = ["Alchemist", "Artillerist", "Battle Smith"];
    };

    subclass = getRandom(subclasses);

    return subclass
}

articleTemplate();
let button = document.querySelector(".refresh")
button.addEventListener("click", articleTemplate)