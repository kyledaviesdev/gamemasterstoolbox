import random

def main():
    race = get_race()
    subrace = get_subrace(race)
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print(f"Race: {race}")
    print(f"Subrace: {subrace}")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    aclass = get_class()
    subclass = get_subclass(aclass)
    print(f"Class: {aclass}")
    print(f"Subclass: {subclass}")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    background = get_background()
    print(f"Background: {background}")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    

def get_race():
    races = ["Aarakocra⑩", "Aasimar⑩", "Centaur④", "Changelings^", "Corvian①", "Crystalkin①", "Deepling①", "Dhampir⑤", "Dragonborn②", "Dwarf", "Elf", "Fairy①", "Firbolgs⑩", "Genasi⑩", "Geppettin⑨", "Giff!", "Gith③", "Gnome", "Goblinoids^", "Goliath⑩", "Hadozee!", "Halfling", "Half-Elf", "Half-Orc", "Harengon⨉", "Hexblood⑤", "Hollow One⑩", "Human", "Kalashtar^", "Kenku⑩", "Leonin④", "Loxodon~", "Mandrake⑨", "Minotaur④", "Mousefolk⑨", "Near-Human⑨", "Orc⑩", "Owlin⑥", "Plasmoid!", "Reborn⑤", "Satyr④", "Shifters^", "Simic Hybrid~", "Spirithost⑨", "Tabaxi⑩", "Thri-Kreen!", "Tiefling", "Tortles⑩", "Triton④", "Vedalken~", "Warforged^"]
    race = random.choice(races)
    return race

def get_subrace(race):
    subrace = ""
    if race == "Aarakocra⑩":
        subraces = ["None"];
    elif race == "Aasimar⑩":
        subraces = ["Protector Aasimar⑩", "Scourge Aasimar⑩", "Fallen Aasimar⑩"];
    elif race == "Centaur④":
        subraces = ["None"];
    elif race == "Changelings^":
        subraces = ["None"];
    elif race == "Corvian①":
        subraces = ["None"];
    elif race == "Crystalkin①":
        subraces = ["Shardmind①", "Glassheart①"];
    elif race == "Deepling①":
        subraces = ["None"];
    elif race == "Dhampir⑤":
        subraces = ["None"];
    elif race == "Dragonborn②":
        subraces = ["Chromatic Dragonborn②","Gem Dragonborn②","Metallic Dragonborn②"]   
    elif race == "Dwarf":
        subraces = ["Duergar③", "Ember Dwarf①", "Gold Dwarves⑦", "Hill Dwarf", "Mountain Dwarf", "Shield Dwarves⑦", "Stone Dwarf①", "Tundra Dwarf①"];
    elif race == "Elf":
        subraces = ["Astral Elf!" ,"Bright Elf①", "Dark Elf (Drow)", "Eladrin③", "Green Elf①", "High Elf", "Moon Elf⑦", "Pallid Elf⑩", "Sea Elf③", "Shadar-kai③", "Sun Elf⑦", "Thimble Elf①", "Wood Elf"];
    elif race == "Fairy①":
        subraces = ["Pixie①", "Sprite①", "Scamp①"];
    elif race == "Firbolgs⑩":
        subraces = ["None"];
    elif race == "Genasi⑩":
        subraces = ["Air Genasi⑩", "Ash Genasi①", "Earth Genasi⑩", "Fire Genasi⑩", "Ice Genasi①", "Slime Genasi①", "Storm Genasi①", "Water Genasi⑩"];
    elif race == "Geppettin⑨":
        subraces = ["Bisque⑨", "Marionette⑨", "Raggedy⑨"];
    elif race == "Giff!":
        subraces = ["None"];
    elif race == "Gith③":
        subraces = ["Githyanki③", "Githzerai③"];
    elif race == "Gnome":
        subraces = ["Autognome", "Deep Gnomes③", "Forest Gnome", "Rock Gnome"]
    elif race == "Goblinoids^":
        subraces = ["Bugbear^", "Goblin^", "Hobgoblin^"];
    elif race == "Goliath⑩":
        subraces = ["None"];
    elif race == "Hadozee!":
        subraces = ["None"];
    elif race == "Halfling":
        subraces = ["Jungle Halfling①", "Lightfoot Halfling", "Lotusden Halfling⑩", "River Halfling①",
                    "Stout Halfling", "Strongheart Halfling⑦"];
    elif race == "Half-Elf":
        subraces = ["Wood Elf (Variant)⑦", "Moon Elf (Variant)⑦", "Sun Elf (Variant)⑦",
                    "Aquatic Elf (Variant)⑦"];
    elif race == "Half-Orc":
        subraces = ["None"];
    elif race == "Harengon⨉":
        subraces = ["None"];
    elif race == "Hexblood⑤":
        subraces = ["None"];
    elif race == "Hollow One⑩":
        subraces = ["None"];
    elif race == "Human":
        subraces = ["None"]
    elif race == "Kalashtar^":
        subraces = ["None"]
    elif race == "Kenku⑩":
        subraces = ["None"];
    elif race == "Leonin④":
        subraces = ["None"];
    elif race == "Loxodon~":
        subraces = ["None"];
    elif race == "Mandrake⑨":
        subraces = ["Spring⑨", "Summer⑨", "Autumn⑨", "Winter⑨"];
    elif race == "Minotaur④":
        subraces = ["None"];
    elif race == "Mousefolk⑨":
        subraces = ["Mouseling⑨", "Ratling⑨"];
    elif race == "Near-Human⑨":
        subraces = ["Aboleth Spawn⑨", "Aquatic⑨", "Beastman⑨", "Firebrand⑨", "Green Skin⑨",
                    "Grendel⑨", "Grue⑨", "Hobbin⑨", "Mul⑨", "Ogre-Blooded⑨", "Blooded⑨",
                    "Porterling⑨", "Proto-Man⑨", "Reptiloid⑨", "Roguean⑨", "Stoneborn⑨", 
                    "Tauran⑨", "Windswept⑨"];
    elif race == "Orc⑩":
        subraces = ["None"];
    elif race == "Owlin⑥":
        subraces = ["None"];
    elif race == "Plasmoid!":
        subraces = ["None"];
    elif race == "Reborn⑤":
        subraces = ["None"];
    elif race == "Satyr④":
        subraces = ["None"];
    elif race == "Shifters^":
        subraces = ["Beasthide^", "Longtooth^", "Swiftstride^", "Wildhunt^"];
    elif race == "Simic Hybrid~":
        subraces = ["None"];
    elif race == "Spirithost⑨":
        subraces = ["None"];
    elif race == "Tabaxi⑩":
        subraces = ["None"];
    elif race == "Thri-Kreen!":
        subraces = ["None"];
    elif race == "Tiefling":
        subraces = ["Appearance Variant⑦", "Feral Variant⑦", 
                    "Devil's Tongue Variant⑦", "Hellfire Variant⑦", "Winged Variant⑦"];
    elif race == "Tortles⑩":
        subraces = ["None"];
    elif race == "Triton④":
        subraces = ["None"];
    elif race == "Vedalken~":
        subraces = ["None"];
    elif race == "Warforged^":
        subraces = ["None"];

    subrace = random.choice(subraces)
    return subrace

def get_class():
    classes = ["Alchemist⑨", "Artificer^", "Barbarian", "Bard", "Captain⑨", "Cleric", "Craftsman⑨", "Druid", "Fighter", "Gunslinger⑨", "Investigator⑨", "Martyr⑨", "Monk", "Necromancer⑨", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warden⑨", "Warlock", "Warmage⑨", "Witch⑨", "Wizard"]
    aclass = random.choice(classes)
    return aclass

def get_subclass(aclass):
    subclass = ""
    subclasses = ""
    preMod = ""
    postMod = ""

    if aclass == "Alchemist⑨":
        subclasses = ["Amorist⑨", "Apothecary⑨", "Dynamo Engineer⑨", "Mad Bomber⑨", "Mutagenist⑨",
                    "Ooze Rancher⑨", "Venomsmith⑨", "Xenoalchemist⑨"];

    elif aclass == "Artificer^":
        subclasses = ["Alchemist^", "Armorer⑧", "Artillerist^", "Battle Smith^"];

    elif aclass == "Barbarian":
        preMod = "Path of ";
        subclasses = ["the Ancestral Guardian*", "the Beast⑧", "the Berserker", "the Colossus⑨", "the Fin⑨", "the Heavy Metal⑨", "the Muscle Wizard⑨", "the Quake Bringer①", "the Rage Mage⑨", "the Sky Caller①", "the Storm Herald*", "the Totem Warrior", "Tranquility⑨", "the Verdant Warden①", "Wild Magic⑧", "the Zealot*"];
                
        
    elif aclass == "Bard":
        preMod = "College of ";
        subclasses = ["Cantors⑨", "Creation⑧", "Eloquence⑧", "Fochlucan⑦", "Glamour*",
                    "Graffiti⑨", "the Herald⑦", "Jesters⑨", "Journeys①", "Lore", "the Mad God⑨",
                    "Masks⑨", "New Olamn⑦", "Romance⑨", "Spirits⑤", "Swords*", "Valor", "Whispers*"];



    elif aclass == "Captain⑨":
        subclasses = ["Dragon", "Eagle", "Jolly Roger", "Lion",
                    "Ram", "Raven", "Turtle"];
        postMod = " Banner⑨";

        
    elif aclass == "Cleric":
        subclasses = ["Arcana⑦", "Destruction⑨", "Forge*", "Grave*", "Knowledge",
                    "Life", "Light", "Madness⑨", "Mountain①", "Nature", "Order⑧",
                    "Peace⑧", "Pestilence⑨", "Rum⑨", "Sea①", "Tempest", "Travel①", "Travel⑨",
                    "Trickery", "Twilight⑧", "War", "Wealth⑨", "Winter①"];
        postMod = " Domain";


    elif aclass == "Craftsman⑨":
        subclasses = ["Arcane Masters'", "Armigers'", "Bladeworkers'", "Calibarons'",
                    "Forgeknight's", "Mechanauts'", "Thunderlords'", "Trapper's"];
        postMod = " Guild⑨";

        
    elif aclass == "Druid":
        preMod = "Circle of ";
        subclasses = ["the City⑨", "the Deep⑨", "Dreams*", "the Fist⑨", "the Land",
                    "the Moon", "Seeds①", "the Shepherd*", "Spores⑧", "Stars⑧",
                    "Stones⑨", "Storms①", "Swords⑦", "Vermin⑨", "Wildfire⑧", "the Wyrm⑨"];

        
    elif aclass == "Fighter":
        subclasses = ["Arcane Archer*", "Battle Master", "Bone Knight⑨", 
                    "Brawler⑨", "Cavalier*", "Celestial Lancer⑨",
                    "Champion", "Corsair⑨", "Dungeoneer⑨", "Echo Knight⑩",
                    "Eldritch Knight", "Flame Dancer①", "Mage Hand Magus⑨", "Psi Warrior⑧",
                    "Purple Dragon Knight⑦", "Rune Knight⑧", "Samurai*", "Wind Knight①"];


    elif aclass == "Gunslinger⑨":
        subclasses = ["Gun Tank⑨", "Gun-Ko Master⑨", "High Roller⑨", "Musketeer⑨",
                    "Pistolero⑨", "Sharpshooter⑨", "Spellslinger⑨", "Trick Shot⑨", "White Hat⑨"];

    elif aclass == "Investigator⑨":
        subclasses = ["Antiquarian⑨", "Archivist⑨", "Detective⑨", "Exterminator⑨",
                    "Inquisitor⑨", "Medium⑨", "Occultist⑨", "Spy⑨"];

    elif aclass == "Martyr⑨":
        preMod = "Burden of "
        subclasses = ["Atonement⑨", "Discord⑨", "the End⑨", "Mercy⑨",
                    "Rebirth⑨", "Revolution⑨", "Truth⑨", "Tyranny⑨"];

        
    elif aclass == "Monk":
        preMod = "Way of "
        subclasses = ["the Ascendant Dragon②", "the Astral Self⑧", "the Bow⑨", "the Dark Moon⑦",
                    "the Drunken Master*", "the Flagellant⑨", "the Flying Fist①", "the Four Elements", "Four Fists⑨",
                    "the Hin Fist⑦", "the Kensei*", "the Long Death⑦", "the Mask⑨", "Mercy⑧", "the Open Hand", "the Rose⑨", "Shadow", "Street Fighting⑨", "the Sun Soul*"];


    elif aclass == "Necromancer⑨":
        subclasses = ["Blood Ascendent⑨", "Death Knight⑨", "Overlord⑨", "Pale Master⑨", "Pharaoh⑨",
                    "Plague Lord⑨", "Reanimator⑨", "Reaper⑨"];

            
    elif aclass == "Paladin":
        preMod = "Oath of "
        subclasses = ["the Ancients", "Companion⑦", "Conquest*", "the Crown⑦", "Devotion ",
                    "Dynamism①", "Eternal Night⑨", "the Gilded Eye⑦", "Glory⑧", "Heresy⑨", 
                    "Purification①", "Redemption*", "Revelry⑨", "the Sun⑨", "Vengeance", "the Watchers⑧", "Winter⑨"];


    elif aclass == "Ranger":
        subclasses = ["Beastborne⑨", "Beast Master", "Drakewarden②", "Fey Wanderer⑧",
                    "Fire Keeper①", "Freerunner⑨", "Gloom Stalker*", "Highwayman⑨",
                    "Horizon Walker*", "Hunter", "Mariner①", "Monster Slayer*", "Spellbreaker⑨", "Swarm Keeper⑧", "Trophy Hunter⑨", "Vigilante⑨"];


    elif aclass == "Rogue":
        subclasses = ["Aerialist①", "Arachnoid Stalker⑨", "Arcane Trickster", "Assassin",
                    "Enforcer⑨", "Grifter⑨", "Inquisitive*", "Mastermind*", "Phantom⑧",
                    "Scout*", "Shadow Master⑨", "Soulknife⑧", "Swashbuckler*", "Temporal Trickster⑨", "Thief", "Titan Slayer⑨"];


    elif aclass == "Sorcerer":
        subclasses = ["Aberrant Mind⑧", "Clockwork Soul⑧", "Cosmic Affinity①",
                    "Divine Soul*", "Draconic Bloodline", "Elemental Magic①", "Emotion Lord⑨",
                    "Green Thumb①", "Mirrorkin⑨", "Oozemaster⑨", "Reincarnated Hero⑨", "Shadow Magic*",
                    "Spiritborn⑨", "Storm Sorcery*", "Toon Magic⑨", "Wild Magic"];
                    

    elif aclass == "Warden⑨":
        subclasses = ["Bloodwrath Guardian⑨", "Grey Watchman⑨", "Nightgaunt⑨",
                    "Soulblood Shaman⑨", "Stoneheart Defender⑨", "Storm Sentinel⑨", "Verdant Protector⑨"];


    elif aclass == "Warlock":
        subclasses = ["the Archfey", "the Celestial*", "the Dead Mists⑨", 
                    "the Dragon①", "the Fathomless⑧", "the Fiend", "the Future You⑨",
                    "the Genie⑧", "the GM⑨", "the Great Old One", "the Hexblade*", 
                    "the Legacy⑨", "the Magician⑨", "the Symbiont⑨", "the Undead⑤", "the Undying⑦"];
                    
    elif aclass == "Warmage⑨":
        preMod = "House of "
        subclasses = ["Bishops⑨", "Cards⑨", "Dice⑨", "Kings⑨", "Knights⑨",
                    "Lancers⑨", "Pawns⑨", "Rooks⑨"];

    elif aclass == "Witch⑨":
        subclasses = ["Black", "Blood", "Green", "Purple", "Red",
                    "Steel", "Tea", "Technicolor", "White"];
        postMod = " Magic⑨";


    elif aclass == "Wizard":
        preMod = "School of "
        subclasses = ["Abjuration", "Bladesinging⑧", "Conjuration", "Chronomancy⑨",
                    "Cronurgy⑩", "Divination", "Enchantment", "Evocation", "Familiar Master⑨",
                    "Gastronomy⑨", "Graviturgy⑩", "Illusion", "Necromancy", "Magic Missile Mage⑨",
                    "Mystic Savant⑨", "Order of Scribes⑧", "Somnomancy⑨", "Transmutation", "War Magic*"];
    
    subclass = random.choice(subclasses)

    if subclass == "the Storm Herald*":
        types = ["Desert*", "Sea*", "Tundra*"]                
    elif subclass == "the Totem Warrior":
        types = ["Bear", "Eagle", "Elk⑦", "Tiger⑦", "Wolf"]
    elif subclass == "the Land":
        types = ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Jungle①", "Mountain", "Sky①", "Swamp", "Underdark", "Underwater①", "Volcanic①"]
    else:
        types = [""]

    type = random.choice(types)
    subclass += " " + type

    result = preMod + subclass + postMod
    return result

def get_background():
    backgrounds = ["Acolyte", "Astral Drifter!", "Athlete④", "Charlatan", "City Watch⑦", "Clan Crafter⑦", "Cloistered Scholar⑦", "Courtier⑦", "Criminal", "Entertainer", "Faction Agent⑦", "Far Traveler⑦", "Feylost⨉", "Folk Hero", "Gladiator", "Grinner⑩", "Guild Artisan", "Guild Merchant", "Haunted One⑤", "Hermit", "House Agent^", "Inheritor⑦", "Investigator⑦", "Knight", "Knight of the Order⑦", "Lorehold Student⑥", "Mercenary Veteran⑦", "Noble", "Outlander", "Pirate", "Prismari Student⑥", "Quandrix Student⑥", "Sage", "Sailor", "Silverquill Student⑥", "Soldier", "Spy", "Urban Bounty Hunter⑦", "Urchin", "Uthgardt Tribe Member⑦", "Voltstucker Agent⑩", "Waterdhavian Noble⑦", "Wildspacer!", "Witchlight Hand⨉", "Witherbloom Student⑥"]
    background = random.choice(backgrounds)
    return background

action = 0
while action != 8:
    print("What would you like to randomize? ")
    print("1. Everything")
    print("2. Race")
    print("3. Class")
    print("4. Background")
    print("5. Race and Class")
    print("6. Race and Background")
    print("7. Class and Background")
    print("8. Quit")
    action = int(input("Enter the action number you'd like: "))
    if action == 1:
        main()
    elif action == 2:
        race = get_race()
        subrace = get_subrace(race)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Race: {race}")
        print(f"Subrace: {subrace}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    elif action == 3:
        aclass = get_class()
        subclass = get_subclass(aclass)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Class: {aclass}")
        print(f"Subclass: {subclass}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    elif action == 4:
        background = get_background()
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Background: {background}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    elif action == 5:
        race = get_race()
        subrace = get_subrace(race)
        aclass = get_class()
        subclass = get_subclass(aclass)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Race: {race}")
        print(f"Subrace: {subrace}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Class: {aclass}")
        print(f"Subclass: {subclass}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    elif action == 6:
        race = get_race()
        subrace = get_subrace(race)
        background = get_background()
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Race: {race}")
        print(f"Subrace: {subrace}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Background: {background}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    elif action == 7:
        aclass = get_class()
        subclass = get_subclass(aclass)
        background = get_background()
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Class: {aclass}")
        print(f"Subclass: {subclass}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(f"Background: {background}")
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    else:
        action = 8
    